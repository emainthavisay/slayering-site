/* =============================================================
   S·LAYERING — data

   SOURCING ALIEXPRESS
   --------------------
   Wide → https://fr.aliexpress.com/item/1005012976152050.html

   Photos fournies directement (fond neutre, qualité shooting).
   Pour changer une photo, remplace le fichier dans assets/colors/
   ou modifie le champ `photo` ci-dessous.
   ============================================================= */
const WIDE_COLORS = [
  { id: "beige",        name: "Camel",          hexA: "#c9b89a", hexB: "#8a6b4a", photo: "assets/colors/beige.jpg" },
  { id: "bleu",         name: "Midnight Navy",  hexA: "#1f2b44", hexB: "#e9e4d8", photo: "assets/colors/bleu.jpg" },
  { id: "bordeaux",     name: "Wine",           hexA: "#2a2d3d", hexB: "#8a3d3d", photo: "assets/colors/bordeaux.jpg" },
  { id: "dore",         name: "Champagne Gold", hexA: "#9a9a9a", hexB: "#c79a5e", photo: "assets/colors/dore.jpg" },
  { id: "faon",         name: "Toffee",         hexA: "#8a6a4a", hexB: "#1f2b44", photo: "assets/colors/faon.jpg" },
  { id: "fleur",        name: "Midnight Bloom", hexA: "#1a1a2e", hexB: "#e9e4d8", photo: "assets/colors/fleur.jpg" },
  { id: "leopard",      name: "Wild Leopard",   hexA: "#8a6237", hexB: "#3d2b1a", photo: "assets/colors/leopard.jpg" },
  { id: "marron-fonce", name: "Espresso",       hexA: "#2a1f18", hexB: "#8a5a2a", photo: "assets/colors/marron-fonce.jpg" },
  { id: "marron",       name: "Chestnut",       hexA: "#8a7a5a", hexB: "#c9a86a", photo: "assets/colors/marron.jpg" },
  { id: "pois",         name: "Ivory Dot",      hexA: "#e9e4d8", hexB: "#c79a5e", photo: "assets/colors/pois.jpg" },
];

const PRODUCT = {
  id: "wide",
  name: "Wide",
  basePrice: 22,
  // Tarif dégressif appliqué automatiquement selon la quantité TOTALE dans le panier
  packs: [
    { qty: 1, unit: 22 },
    { qty: 2, unit: 20 },
  ],
  colors: WIDE_COLORS,
};

const REVIEWS = [
  { name: "Léa M.",    meta: "Midnight Navy",  rating: 5, quote: "Je le noue à la taille et la tenue change du tout au tout. Le coloris est magnifique." },
  { name: "Camille R.",meta: "Espresso",       rating: 5, quote: "Reçu en trois jours. Plus qu'un accessoire, vraiment." },
  { name: "Inès B.",   meta: "Wild Leopard",   rating: 4, quote: "Parfait pour améliorer un look simple, je le porte au quotidien." },
  { name: "Sofia L.",  meta: "Wine",           rating: 5, quote: "La matière est superbe et le nouage tient toute la journée." },
  { name: "Manon T.",  meta: "Camel",          rating: 2, quote: "Je pensais que la couleur serait plus claire." },
  { name: "Zoé K.",    meta: "Ivory Dot",      rating: 5, quote: "Discret et élégant, je le porte tout le temps." },
  { name: "Alice P.",  meta: "Champagne Gold", rating: 4, quote: "Belle qualité de tissu, le seul bémol c'est que j'en veux déjà un autre..." },
  { name: "Chloé D.",  meta: "Toffee",         rating: 5, quote: "Noué sur le sac pour une soirée, tout le monde m'a demandé où je l'avais trouvé." },
];

/* =============================================================
   PAIEMENT — Stripe Payment Links (2 liens, tarif dégressif)
   --------------------------------
   Deux liens Stripe séparés sont branchés ci-dessous :
   - STRIPE_LINK_SOLO  → tarif "1 pièce" à 22 €
   - STRIPE_LINK_PACK2 → tarif forfaitaire "2 pièces" à 40 € (= 20 €/pièce)
   Chaque lien facture un prix FIXE — Stripe ne calcule pas de tarif
   dégressif arbitraire pour un one-time payment. La redirection dans
   le handler #checkoutBtn choisit le lien selon la quantité TOTALE du
   panier : 1 pièce → lien solo, 2 pièces → lien pack. Au-delà de 2
   pièces, il n'existe pas de lien Stripe qui calcule le bon montant
   automatiquement (limite de la plateforme pour du paiement ponctuel
   sans backend) — le client est prévenu et invité à finaliser en deux
   commandes, ou à contacter directement contact@slayering.com.
   Pour créer/modifier un lien : dashboard Stripe → Catalogue de
   produits → tarif concerné → "..." → "Créer un lien de paiement".
   Pense à cocher "Collecter les adresses des clients" (produit
   physique à expédier) et à limiter les pays de livraison à l'UE.
   ============================================================= */
/* =============================================================
   FORMULAIRE DE CONTACT — Formspree
   --------------------------------
   1. Crée un compte gratuit sur https://formspree.io
   2. "+ New Form" → donne-lui un nom (ex: "Contact Slayering")
   3. Dans les réglages du formulaire, indique l'adresse qui doit
      recevoir les messages : ema@inthavisay.fr (Formspree envoie un
      email de confirmation à valider une fois).
   4. Copie l'URL du formulaire (ex: https://formspree.io/f/xxxxabcd)
      et colle-la ci-dessous.
   Tant que ce champ est vide, le bouton "Envoyer" ouvre directement
   un email pré-rempli vers contact@slayering.com à la place — le
   formulaire reste utilisable, juste moins fluide.
   ============================================================= */
const FORMSPREE_ENDPOINT = ""; // ex: "https://formspree.io/f/xxxxabcd"

/* =============================================================
   ANALYTICS — Google Tag Manager (chargé uniquement après consentement)
   --------------------------------
   Conteneur GTM de www.slayering.com. Pour changer de conteneur,
   remplace simplement l'identifiant ci-dessous.
   Tant que ce champ est vide, rien n'est chargé, même si la cliente
   accepte les cookies dans le bandeau — le site reste fonctionnel et
   ne fait aucun tracking par défaut.
   ============================================================= */
const GTM_CONTAINER_ID = "GTM-WFT6JKG5";

// Deux liens Stripe distincts (un tarif fixe par lien, ils ne s'ajustent pas
// automatiquement à une quantité arbitraire — voir logique de redirection
// dans le handler #checkoutBtn plus bas).
const STRIPE_LINK_SOLO = "https://buy.stripe.com/fZu5kFb9h5TPgv1br4ds401"; // 1 pièce — 22 €
const STRIPE_LINK_PACK2 = "https://buy.stripe.com/7sY00lfpxbe9fqX1Quds402"; // 2 pièces — 40 € (forfait)

/* =============================================================
   State
   ============================================================= */
const state = {
  cart: [],           // [{ colorId, colorName, photo, qty }]
  selectedColorId: WIDE_COLORS[0].id,
  reviewIndex: 0,
};

const money = (n) => `${n.toLocaleString("fr-FR")}\u00A0€`;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function currentColor(){
  return PRODUCT.colors.find(c => c.id === state.selectedColorId);
}

/* =============================================================
   Product (inline, no modal)
   ============================================================= */
// Changement de photo produit : petit flou + fondu (au lieu d'un cut
// instantané), la même transition à chaque fois quel que soit le coloris.
function setProductPhoto(media, photo, animate){
  if (!animate || prefersReducedMotion){
    media.style.backgroundImage = `url('${photo}')`;
    return;
  }
  media.classList.add("is-switching");
  setTimeout(() => {
    media.style.backgroundImage = `url('${photo}')`;
    media.classList.remove("is-switching");
  }, 180);
}

function renderProductInline(animate){
  const media = document.getElementById("productMedia");
  const colorNameEl = document.getElementById("productColorName");
  const swatchGrid = document.getElementById("swatchGrid");
  const priceEl = document.getElementById("priceAmount");
  if (!media || !swatchGrid) return;

  const color = currentColor();
  setProductPhoto(media, color.photo, animate);
  colorNameEl.textContent = color.name;
  priceEl.innerHTML = money(PRODUCT.basePrice);
  media.setAttribute("aria-label", `Photo de la ceinture foulard Wide, coloris ${color.name}`);

  swatchGrid.innerHTML = PRODUCT.colors.map(c => `
    <span class="swatch" data-color="${c.id}" role="button" tabindex="0"
      aria-label="Coloris ${c.name}" aria-pressed="${c.id === state.selectedColorId}" title="${c.name}">
      <span class="swatch__fill" style="background:${c.hexA};"></span>
    </span>
  `).join("");
  swatchGrid.querySelectorAll(".swatch").forEach(el => {
    el.classList.toggle("is-active", el.dataset.color === state.selectedColorId);
    const select = () => {
      if (el.dataset.color === state.selectedColorId) return;
      state.selectedColorId = el.dataset.color;
      renderProductInline(true);
      swatchGrid.querySelector(`[data-color="${state.selectedColorId}"]`)?.focus();
    };
    el.addEventListener("click", select);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " "){
        e.preventDefault();
        select();
      }
    });
  });

  document.getElementById("addToCartBtn").onclick = addSelectedToCart;
}

function addSelectedToCart(){
  const color = currentColor();
  const existing = state.cart.find(i => i.colorId === color.id);
  if (existing) existing.qty += 1;
  else state.cart.push({ colorId: color.id, colorName: color.name, photo: color.photo, qty: 1 });

  renderCart();
  pulseCartIcon();
  showToast(`Ajouté — Wide · ${color.name}`, "Dans ton panier.");
}

function pulseCartIcon(){
  const el = document.getElementById("openCartBtn2");
  if (!el || prefersReducedMotion) return;
  el.classList.remove("is-pulsing");
  void el.offsetWidth;
  el.classList.add("is-pulsing");
}

/* =============================================================
   Cart — tarif dégressif automatique selon la quantité totale
   ============================================================= */
function totalQty(){
  return state.cart.reduce((n, item) => n + item.qty, 0);
}

// Tarification par COMBINAISON, pas par palier uniforme :
// on décompose la quantité totale en autant de packs de 2 que possible
// (tarif "Pack x2"), plus un éventuel reste de 1 pièce au tarif solo.
// Ex : 1 → 22€ · 2 → 40€ · 3 → 40+22=62€ · 4 → 40+40=80€ · 5 → 40+40+22=102€
function packBreakdown(qty){
  const soloUnit = (PRODUCT.packs.find(p => p.qty === 1) || {}).unit ?? PRODUCT.basePrice;
  const packTier = PRODUCT.packs.find(p => p.qty === 2);
  const packUnit = packTier ? packTier.unit * 2 : soloUnit * 2; // prix total du pack (ex: 40€)
  const packs = Math.floor(qty / 2);
  const remainder = qty % 2;
  return { packs, packUnit, remainder, soloUnit };
}

function cartTotal(){
  const qty = totalQty();
  const { packs, packUnit, remainder, soloUnit } = packBreakdown(qty);
  return packs * packUnit + remainder * soloUnit;
}

// Prix (remisé) d'une tranche de `qty` pièces démarrant à la position
// `precedingQty` dans l'ordre global du panier. Comme les packs de 2 se
// forment sur la quantité TOTALE (tous coloris confondus), chaque article
// du panier doit être facturé selon la position de ses pièces dans cette
// numérotation globale, pas selon son propre sous-total isolé.
function itemDiscountedTotal(qty, precedingQty){
  const { packs, packUnit, soloUnit } = packBreakdown(totalQty());
  const packUnitEach = packUnit / 2;
  let sum = 0;
  for (let i = precedingQty; i < precedingQty + qty; i++){
    sum += (i < packs * 2) ? packUnitEach : soloUnit;
  }
  return sum;
}

function renderCart(){
  const qty = totalQty();
  const { packs, packUnit, remainder, soloUnit } = packBreakdown(qty);
  const total = cartTotal();
  const fullPrice = qty * PRODUCT.basePrice;

  document.getElementById("cartCount") && (document.getElementById("cartCount").textContent = qty);
  const totalEl = document.getElementById("cartDrawerTotal");
  if (total < fullPrice && qty > 0){
    totalEl.innerHTML = `<s class="cart-item__was">${money(fullPrice)}</s> ${money(total)}`;
  } else {
    totalEl.innerHTML = money(total);
  }

  const badge = document.getElementById("cartBadge");
  badge.textContent = qty;
  badge.hidden = qty === 0;

  const packNote = document.getElementById("cartPackNote");
  if (qty >= 2){
    const parts = [];
    if (packs > 0) parts.push(`${packs}\u00A0pack${packs > 1 ? "s" : ""} de 2 (${money(packUnit)} chacun)`);
    if (remainder > 0) parts.push(`1\u00A0pièce solo (${money(soloUnit)})`);
    packNote.textContent = `Tarif appliqué automatiquement : ${parts.join(" + ")}.`;
  } else {
    packNote.textContent = "";
  }

  const itemsWrap = document.getElementById("cartItems");
  const emptyMsg = document.getElementById("cartEmpty");

  if (state.cart.length === 0){
    itemsWrap.innerHTML = "";
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
    let preceding = 0;
    itemsWrap.innerHTML = state.cart.map(item => {
      const itemFull = item.qty * PRODUCT.basePrice;
      const itemDiscounted = itemDiscountedTotal(item.qty, preceding);
      preceding += item.qty;
      const priceHtml = itemDiscounted < itemFull
        ? `<s class="cart-item__was">${money(itemFull)}</s> ${money(itemDiscounted)}`
        : money(itemDiscounted);
      return `
      <div class="cart-item">
        <span class="cart-item__swatch" style="background-image:url('${item.photo}');background-size:cover;background-position:center 62%;"></span>
        <span>
          <p class="cart-item__name">Wide — ${item.colorName}</p>
          <span class="cart-item__meta">${item.qty} pc${item.qty > 1 ? "s" : ""}</span><br>
          <button type="button" class="cart-item__remove" data-remove="${item.colorId}">Retirer</button>
        </span>
        <span class="cart-item__price">
          ${priceHtml}
        </span>
      </div>
    `;
    }).join("");

    itemsWrap.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.cart = state.cart.filter(i => i.colorId !== btn.dataset.remove);
        renderCart();
      });
    });
  }
}

function openCart(){
  const cart = document.getElementById("cartDrawer");
  cart.classList.add("is-open");
  cart.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeCart(){
  const cart = document.getElementById("cartDrawer");
  cart.classList.remove("is-open");
  cart.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* =============================================================
   Toast
   ============================================================= */
let toastTimer;
function showToast(title, sub){
  const toast = document.getElementById("toast");
  toast.innerHTML = `
    <span class="toast__text"><strong>${title}</strong><span>${sub}</span></span>
    <button type="button" class="toast__link" id="toastViewCart">Voir</button>
  `;
  toast.classList.add("is-visible");
  document.getElementById("toastViewCart").onclick = () => { openCart(); hideToast(); };
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 4200);
}
function hideToast(){
  document.getElementById("toast").classList.remove("is-visible");
}

/* =============================================================
   Render: reviews (défilement en boucle infinie)
   ============================================================= */
function stars(rating){
  return Array.from({length:5}, (_,i) => i < rating ? "★" : `<span class="off">★</span>`).join("");
}

// Boucle vraiment infinie : la piste contient 3 copies bout à bout des
// avis (A, B, C). On démarre au début de la copie B, et chaque clic
// avance/recule d'une carte, sans jamais revenir visuellement en arrière.
// Quand l'index sort de la copie centrale, on le rebase instantanément
// (transition coupée le temps d'un frame) vers la position équivalente
// dans B — invisible pour l'œil puisque B/A/C sont identiques.
function renderReviews(){
  const track = document.getElementById("reviewsTrack");
  const cardHTML = (r) => `
    <article class="review-card">
      <div class="review-card__stars">
        <span class="stars">${stars(r.rating)}</span>
      </div>
      <p class="review-card__quote">« ${r.quote} »</p>
      <div class="review-card__who">
        <strong>${r.name}</strong>
        <span>${r.meta}</span>
      </div>
    </article>
  `;
  const loop = [...REVIEWS, ...REVIEWS, ...REVIEWS];
  track.innerHTML = loop.map(cardHTML).join("");

  state.reviewIndex = REVIEWS.length;
  updateReviewsView(false);

  document.getElementById("reviewsPrev").onclick = () => {
    state.reviewIndex -= 1;
    updateReviewsView(true);
  };
  document.getElementById("reviewsNext").onclick = () => {
    state.reviewIndex += 1;
    updateReviewsView(true);
  };
}

function updateReviewsView(animate){
  const track = document.getElementById("reviewsTrack");
  const cardWidth = track.firstElementChild.getBoundingClientRect().width;
  const gap = 22.4;

  track.style.transition = animate ? "" : "none";
  if (!animate) track.offsetHeight; // force un reflow pour que "none" s'applique avant le transform
  const offset = state.reviewIndex * (cardWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;

  if (animate){
    track.addEventListener("transitionend", function rebase(){
      track.removeEventListener("transitionend", rebase);
      const n = REVIEWS.length;
      if (state.reviewIndex >= n * 2){
        state.reviewIndex -= n;
        updateReviewsView(false);
      } else if (state.reviewIndex < n){
        state.reviewIndex += n;
        updateReviewsView(false);
      }
    }, { once:true });
  }
}

/* =============================================================
   Scroll effects: progress bar, reveal-on-scroll, title scramble
   ============================================================= */
function initScrollEffects(){
  const fill = document.getElementById("scrollbarFill");

  const onScroll = () => {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop;
    const max = doc.scrollHeight - doc.clientHeight;
    fill.style.width = `${max > 0 ? (scrolled / max) * 100 : 0}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        entry.target.querySelectorAll("[data-scramble]").forEach(el => scrambleReveal(el));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => observer.observe(el));

  const statCells = document.querySelectorAll(".stat-grid dd");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  statCells.forEach(el => counterObserver.observe(el));
}

/* Text-scramble / decode reveal — uniquement sur les 4 titres marqués data-scramble */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function scrambleReveal(el){
  if (el.dataset.scrambled) return;
  el.dataset.scrambled = "1";
  if (prefersReducedMotion) return;

  const finalHTML = el.innerHTML;
  const finalText = finalHTML.replace(/<br\s*\/?>/gi, "\n");
  const duration = 750;
  const start = performance.now();

  function frame(now){
    const p = Math.min((now - start) / duration, 1);
    let out = "";
    for (let i = 0; i < finalText.length; i++){
      const ch = finalText[i];
      if (ch === "\n"){ out += "<br>"; continue; }
      if (ch === " " || ch === "."){ out += ch; continue; }
      const revealAt = i / finalText.length;
      out += (p > revealAt + 0.12) ? ch : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }
    el.innerHTML = out;
    if (p < 1) requestAnimationFrame(frame);
    else el.innerHTML = finalHTML;
  }
  requestAnimationFrame(frame);
}

function animateCount(el){
  const raw = el.textContent.trim();
  const match = raw.match(/\d+/);
  if (!match || prefersReducedMotion) return;
  const target = parseInt(match[0], 10);
  const suffix = raw.replace(match[0], "");
  const duration = 900;
  const start = performance.now();

  function tick(now){
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = `${Math.round(target * eased)}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* =============================================================
   Ambient floating stars (fond, section Collection)
   ============================================================= */
function starSvg(size){
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.6 8.4L23 12l-8.4 2.6L12 24l-2.6-8.4L1 12l8.4-2.6z"/></svg>`;
}

function initStarsAmbient(){
  const el = document.getElementById("starsAmbient");
  if (!el) return;
  const COUNT = 22;
  let html = "";
  for (let i = 0; i < COUNT; i++){
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const size = 5 + Math.random() * 9;
    const d1 = (Math.random() * 5).toFixed(2);
    const d2 = (Math.random() * 3.4).toFixed(2);
    html += `<span class="stars-ambient__star" style="left:${left}%; top:${top}%; animation-delay:${d1}s, ${d2}s;">${starSvg(size)}</span>`;
  }
  el.innerHTML = html;
}

/* =============================================================
   Boutons : hover uniforme (voir .btn:hover en CSS), plus d'effet
   "magnétique" qui suivait la position de la souris — tous les
   boutons du site poussent maintenant de la même façon, fixe.
   ============================================================= */
function initMagnetic(){
  // Volontairement vide : conservé pour ne pas casser l'appel dans
  // l'init ci-dessous. L'animation de survol vient uniquement de
  // .btn:hover (scale + translateY) dans styles.css.
}

/* =============================================================
   Global cursor halo + click ripple
   ============================================================= */
function initCursorFX(){
  const halo = document.getElementById("cursorHalo");
  if (halo && !prefersReducedMotion){
    let active = false;
    window.addEventListener("mousemove", (e) => {
      halo.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (!active){ halo.classList.add("is-active"); active = true; }
    }, { passive: true });
    document.addEventListener("mouseleave", () => halo.classList.remove("is-active"));
  }

  if (!prefersReducedMotion){
    document.addEventListener("click", (e) => {
      const r = document.createElement("span");
      r.className = "click-ripple";
      r.style.left = `${e.clientX}px`;
      r.style.top = `${e.clientY}px`;
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 650);
    });
  }
}

/* =============================================================
   Hero: load-in reveal
   ============================================================= */
function initHero(){
  const hero = document.getElementById("hero");
  if (!hero) return;
  requestAnimationFrame(() => hero.classList.add("is-ready"));
}

/* =============================================================
   Init
   ============================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderProductInline();
  renderReviews();
  renderCart();
  initScrollEffects();
  initMagnetic();
  initHero();
  initStarsAmbient();
  initCursorFX();

  document.getElementById("year").textContent = new Date().getFullYear();

  document.querySelectorAll("[data-cart-close]").forEach(el => el.addEventListener("click", closeCart));
  document.getElementById("openCartBtn2").addEventListener("click", openCart);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  window.addEventListener("resize", () => {
    state.reviewIndex = 0;
    renderReviews();
  });

  const form = document.getElementById("contactForm");
  const formLoadedAt = Date.now();

  function setFieldError(name, show){
    const input = form.elements[name];
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    const field = input?.closest(".field");
    if (!input || !errorEl || !field) return;
    field.classList.toggle("is-invalid", show);
    errorEl.hidden = !show;
  }

  function validateForm(){
    let valid = true;
    ["firstname", "email", "message"].forEach((name) => {
      const input = form.elements[name];
      const ok = input.checkValidity();
      setFieldError(name, !ok);
      if (!ok) valid = false;
    });
    return valid;
  }

  // Efface l'erreur dès que le champ redevient valide
  ["firstname", "email", "message"].forEach((name) => {
    form.elements[name]?.addEventListener("input", () => {
      if (form.elements[name].checkValidity()) setFieldError(name, false);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Anti-spam : champ honeypot rempli, ou envoi en moins de 2s après le
    // chargement de la page → très probablement un robot, on ignore en silence.
    const honeypot = form.elements["website"]?.value;
    const tooFast = Date.now() - formLoadedAt < 2000;
    if (honeypot || tooFast){
      document.getElementById("formNote").hidden = false;
      form.reset();
      return;
    }

    const data = new FormData(form);
    const firstname = data.get("firstname");
    const email = data.get("email");
    const message = data.get("message");

    if (FORMSPREE_ENDPOINT){
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: data,
        });
        if (res.ok){
          document.getElementById("formNote").hidden = false;
          form.reset();
        } else {
          showToast("Erreur d'envoi", "Le message n'a pas pu partir, réessaie dans un instant.");
        }
      } catch (err) {
        showToast("Erreur d'envoi", "Vérifie ta connexion et réessaie.");
      }
    } else {
      const subject = encodeURIComponent(`Message de ${firstname} via slayering.com`);
      const body = encodeURIComponent(`${message}\n\n— ${firstname} (${email})`);
      window.location.href = `mailto:contact@slayering.com?subject=${subject}&body=${body}`;
      document.getElementById("formNote").hidden = false;
      form.reset();
    }
  });

  // Construit "Camel x1, Midnight Navy x2" à partir du panier — tronqué à
  // 200 caractères, limite du champ client_reference_id chez Stripe.
  function cartReferenceId(){
    const label = state.cart.map(item => `${item.colorName} x${item.qty}`).join(", ");
    return label.slice(0, 200);
  }

  function withClientReference(stripeUrl, refId){
    if (!refId) return stripeUrl;
    const sep = stripeUrl.includes("?") ? "&" : "?";
    return `${stripeUrl}${sep}client_reference_id=${encodeURIComponent(refId)}`;
  }

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (state.cart.length === 0) return;
    const qty = totalQty();

    if (!STRIPE_LINK_SOLO || !STRIPE_LINK_PACK2){
      showToast("Paiement à configurer", "Ajoute tes liens Stripe dans script.js (constantes STRIPE_LINK_SOLO / STRIPE_LINK_PACK2).");
      return;
    }

    // Le coloris n'est pas un champ que Stripe peut facturer différemment
    // (même prix quel que soit le coloris), donc il n'y a pas de "produit
    // Stripe" par coloris. Mais Stripe Payment Links accepte un paramètre
    // ?client_reference_id=... qui est reporté tel quel sur le paiement
    // dans le dashboard Stripe (et dans l'email de notification) : on s'en
    // sert pour transmettre automatiquement le(s) coloris + quantité choisis,
    // sans backend. Ema les verra directement sur le paiement à préparer.
    const refId = cartReferenceId();

    if (qty === 1){
      window.location.href = withClientReference(STRIPE_LINK_SOLO, refId);
    } else if (qty === 2){
      window.location.href = withClientReference(STRIPE_LINK_PACK2, refId);
    } else {
      // Au-delà de 2 pièces : chaque lien Stripe est un tarif fixe pour
      // une quantité fixe, donc une seule page de paiement ne peut pas
      // couvrir une combinaison. On explique clairement au client quoi
      // régler, dans quel ordre, plutôt que de le laisser deviner.
      const { packs, packUnit, remainder, soloUnit } = packBreakdown(qty);
      const steps = [];
      if (packs > 0) steps.push(`${packs} paiement${packs > 1 ? "s" : ""} "Pack x2" (${money(packUnit)} chacun)`);
      if (remainder > 0) steps.push(`1 paiement "Article seul" (${money(soloUnit)})`);
      showToast(
        `${qty} pièces = ${steps.join(" + ")}`,
        "Le paiement en ligne ne gère qu'une page à la fois : passe ces règlements l'un après l'autre, ou écris-nous à contact@slayering.com pour qu'on te génère un lien groupé."
      );
    }
  });

  initCookieConsent();
});

/* =============================================================
   Cookie consent — bandeau + chargement conditionnel de l'analytics
   ============================================================= */
const COOKIE_CONSENT_KEY = "slayering_cookie_consent"; // "accepted" | "declined"

function loadAnalytics(){
  if (!GTM_CONTAINER_ID || window.__gtmLoaded) return;
  window.__gtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
  document.head.appendChild(s);
}

function initCookieConsent(){
  const banner = document.getElementById("cookieBanner");
  if (!banner) return;
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);

  if (stored === "accepted"){
    loadAnalytics();
  } else if (stored !== "declined"){
    banner.hidden = false;
  }

  document.getElementById("cookieAccept")?.addEventListener("click", () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    banner.hidden = true;
    loadAnalytics();
  });
  document.getElementById("cookieDecline")?.addEventListener("click", () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    banner.hidden = true;
  });
}
