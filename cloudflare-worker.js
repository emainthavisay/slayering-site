/* =============================================================
   S·LAYERING — Cloudflare Worker : création dynamique de session
   de paiement Stripe (Option B)
   --------------------------------
   À déployer sur Cloudflare Workers (compte gratuit).
   Nécessite une variable secrète STRIPE_SECRET_KEY (dashboard
   Cloudflare → ton Worker → Settings → Variables → "Encrypt").

   Ce que fait ce Worker :
   1. Reçoit en POST le contenu du panier : { cart: [{colorName, qty}, ...] }
   2. Recalcule le prix total LUI-MÊME (jamais confiance dans un prix
      envoyé par le navigateur — sinon un client pourrait le trafiquer).
   3. Crée une session Stripe Checkout avec le bon montant.
   4. Renvoie { url: "https://checkout.stripe.com/..." } au site, qui
      redirige la cliente dessus.
   ============================================================= */

const ALLOWED_ORIGIN = "https://slayering.com";
const PACK_UNIT_CENTS = 2000; // 20 € / pièce, tarif "pack de 2"
const SOLO_UNIT_CENTS = 2200; // 22 € / pièce, tarif à l'unité
const MAX_QTY = 30;           // garde-fou anti-abus

const EU_COUNTRIES = ["FR","BE","LU","DE","ES","IT","NL","PT","IE","AT"];

function corsHeaders(){
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(data, status = 200){
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(), "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request, env){
    if (request.method === "OPTIONS"){
      return new Response(null, { headers: corsHeaders() });
    }
    if (request.method !== "POST"){
      return jsonResponse({ error: "Méthode non autorisée" }, 405);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "JSON invalide" }, 400);
    }

    const cart = Array.isArray(body.cart) ? body.cart : [];
    const qty = cart.reduce((n, item) => n + (Number(item.qty) || 0), 0);

    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY){
      return jsonResponse({ error: "Quantité invalide" }, 400);
    }

    // Tarif dégressif : packs de 2 (20€/pièce) + reste éventuel à l'unité (22€)
    const packs = Math.floor(qty / 2);
    const remainder = qty % 2;

    const line_items = [];
    if (packs > 0){
      line_items.push({
        price_data: {
          currency: "eur",
          product_data: { name: `Wide — tarif pack (${packs * 2} pièces)` },
          unit_amount: PACK_UNIT_CENTS,
        },
        quantity: packs * 2,
      });
    }
    if (remainder > 0){
      line_items.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Wide — pièce solo" },
          unit_amount: SOLO_UNIT_CENTS,
        },
        quantity: remainder,
      });
    }

    // Détail des coloris choisis, transmis en métadonnée (visible dans le
    // dashboard Stripe, pas pendant le paiement) pour savoir quoi préparer.
    const colorsLabel = cart
      .map(item => `${String(item.colorName || "?").slice(0, 40)} x${Number(item.qty) || 0}`)
      .join(", ")
      .slice(0, 480);

    const params = new URLSearchParams();
    params.append("mode", "payment");
    params.append("success_url", "https://slayering.com/?commande=confirmee");
    params.append("cancel_url", "https://slayering.com/");
    EU_COUNTRIES.forEach(code =>
      params.append("shipping_address_collection[allowed_countries][]", code)
    );
    params.append("metadata[coloris]", colorsLabel);

    line_items.forEach((li, idx) => {
      params.append(`line_items[${idx}][price_data][currency]`, li.price_data.currency);
      params.append(`line_items[${idx}][price_data][product_data][name]`, li.price_data.product_data.name);
      params.append(`line_items[${idx}][price_data][unit_amount]`, String(li.price_data.unit_amount));
      params.append(`line_items[${idx}][quantity]`, String(li.quantity));
    });

    let stripeRes;
    try {
      stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });
    } catch {
      return jsonResponse({ error: "Impossible de joindre Stripe" }, 502);
    }

    const session = await stripeRes.json();
    if (!stripeRes.ok){
      return jsonResponse({ error: session.error?.message || "Erreur Stripe" }, 500);
    }

    return jsonResponse({ url: session.url });
  },
};
