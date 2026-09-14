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
  { id: "beige",        name: "Beige",        hexA: "#c9b89a", hexB: "#8a6b4a", photo: "assets/colors/beige.jpg" },
  { id: "bleu",         name: "Bleu",         hexA: "#1f2b44", hexB: "#e9e4d8", photo: "assets/colors/bleu.jpg" },
  { id: "bordeaux",     name: "Bordeaux",     hexA: "#2a2d3d", hexB: "#8a3d3d", photo: "assets/colors/bordeaux.jpg" },
  { id: "dore",         name: "Doré",         hexA: "#9a9a9a", hexB: "#c79a5e", photo: "assets/colors/dore.jpg" },
  { id: "faon",         name: "Faon",         hexA: "#8a6a4a", hexB: "#1f2b44", photo: "assets/colors/faon.jpg" },
  { id: "fleur",        name: "Fleur",        hexA: "#1a1a2e", hexB: "#e9e4d8", photo: "assets/colors/fleur.jpg" },
  { id: "leopard",      name: "Léopard",      hexA: "#8a6237", hexB: "#3d2b1a", photo: "assets/colors/leopard.jpg" },
  { id: "marron-fonce", name: "Marron foncé", hexA: "#2a1f18", hexB: "#8a5a2a", photo: "assets/colors/marron-fonce.jpg" },
  { id: "marron",       name: "Marron",       hexA: "#8a7a5a", hexB: "#c9a86a", photo: "assets/colors/marron.jpg" },
  { id: "pois",         name: "Pois",         hexA: "#e9e4d8", hexB: "#c79a5e", photo: "assets/colors/pois.jpg" },
];

const PRODUCTS = [
  {
    id: "wide",
    name: "Wide",
    cutTag: "Coupe Wide",
    dims: "110 × 110 cm",
    kicker: "La plus présente.",
    desc: "Plus de tissu, plus de présence. La ceinture foulard large qui accessoirise n'importe quelle tenue. 10 coloris.",
    cardDesc: "Plus de tissu, plus de présence. La ceinture foulard large qui accessoirise n'importe quelle tenue. 10 coloris.",
    basePrice: 24,
    packs: [
      { qty: 1, unit: 24 },
      { qty: 2, unit: 22 },
      { qty: 3, unit: 21 },
      { qty: 4, unit: 20 },
    ],
    accentA: "#6b6339", accentB: "#b5573a",
    photo: "assets/colors/dore.jpg",
    colors: WIDE_COLORS,
  },
];

const REVIEWS = [
  { name: "Léa M.",    meta: "Wide · Bleu",         rating: 5, quote: "Je la noue à la taille et la tenue change du tout au tout. Le coloris est magnifique." },
  { name: "Camille R.",meta: "Pack 3 · Marron foncé", rating: 5, quote: "Reçu en trois jours. Je les enchaîne chaque semaine. Plus qu'un accessoire, vraiment." },
  { name: "Inès B.",   meta: "Wide · Léopard",      rating: 4, quote: "Elle est parfaite pour un look simple. Le nœud ne bouge pas de la journée." },
  { name: "Sofia L.",  meta: "Wide · Bordeaux",     rating: 5, quote: "La matière est superbe et le nouage tient toute la journée. Dix coloris, forcément le mien y était." },
  { name: "Manon T.",  meta: "Wide · Beige",        rating: 2, quote: "Jolie sur les photos mais plus fine que ce à quoi je m'attendais pour ce prix." },
  { name: "Zoé K.",    meta: "Wide · Pois",         rating: 5, quote: "Discrète et élégante. Je la porte au bureau comme le week-end." },
  { name: "Alice P.",  meta: "Pack 2 · Doré",       rating: 4, quote: "Belle qualité de tissu, le seul bémol c'est que j'en veux déjà une troisième." },
  { name: "Nadia F.",  meta: "Wide · Fleur",        rating: 1, quote: "Livrée avec une semaine de retard par rapport à ce qui était annoncé, dommage." },
  { name: "Chloé D.",  meta: "Wide · Faon",         rating: 5, quote: "Nouée sur le sac pour une soirée, tout le monde m'a demandé où je l'avais trouvée." },
];

/* =============================================================
   State
   ============================================================= */
const state = {
  cart: [],
  modal: { productId: null, colorId: null, packQty: 1 },
  reviewIndex: 0,
};

const money = (n) => `${n.toLocaleString("fr-FR")}\u00A0€`;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =============================================================
   Collection showcase (photo + bouton "Découvrir")
   Dépose une photo dans assets/showcase.jpg puis renseigne
   SHOWCASE_PHOTO ci-dessous pour l'afficher automatiquement.
   ============================================================= */
const SHOWCASE_PHOTO = "assets/showcase.jpg";

function initCollectionShowcase(){
  const photoEl = document.getElementById("showcasePhoto");
  const btn = document.getElementById("discoverColorsBtn");
  if (!photoEl || !btn) return;

  if (SHOWCASE_PHOTO){
    photoEl.style.backgroundImage = `url('${SHOWCASE_PHOTO}')`;
    const placeholder = photoEl.querySelector(".showcase-photo__placeholder");
    if (placeholder) placeholder.remove();
  }

  btn.addEventListener("click", () => openModal("wide"));
}

/* =============================================================
   Render: reviews
   ============================================================= */
function stars(rating){
  return Array.from({length:5}, (_,i) => i < rating ? "★" : `<span class="off">★</span>`).join("");
}

function renderReviews(){
  const track = document.getElementById("reviewsTrack");
  track.innerHTML = REVIEWS.map(r => `
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
  `).join("");

  state.reviewIndex = 0;
  updateReviewsView();

  document.getElementById("reviewsPrev").onclick = () => {
    state.reviewIndex = Math.max(0, state.reviewIndex - 1);
    updateReviewsView();
  };
  document.getElementById("reviewsNext").onclick = () => {
    const perPage = window.innerWidth <= 600 ? 1 : window.innerWidth <= 960 ? 2 : 4;
    const maxIndex = Math.max(0, REVIEWS.length - perPage);
    state.reviewIndex = Math.min(maxIndex, state.reviewIndex + 1);
    updateReviewsView();
  };
}

function updateReviewsView(){
  const track = document.getElementById("reviewsTrack");
  const cardWidth = track.firstElementChild.getBoundingClientRect().width;
  const gap = 22.4;
  const offset = state.reviewIndex * (cardWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;
}

/* =============================================================
   Modal
   ============================================================= */
function swatchSvg(color){
  return `
  <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${color.hexA}"/>
        <stop offset="100%" stop-color="${color.hexB}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="500" fill="#0f0e0c"/>
    <path d="M110 55 C82 55 70 95 70 125 C70 160 92 180 100 208 L64 232 C40 248 26 276 26 314 L26 500 L374 500 L374 314 C374 276 360 248 336 232 L300 208 C308 180 330 160 330 125 C330 95 318 55 290 55 C 262 36 138 36 110 55 Z" fill="#1c1915"/>
    <path d="M30 300 C150 268 250 268 370 300 L370 360 C250 330 150 330 30 360 Z" fill="url(#mg)"/>
    <path d="M300 330 C 350 360 380 410 360 460" stroke="url(#mg)" stroke-width="26" fill="none" stroke-linecap="round"/>
    <path d="M96 335 C 55 360 35 405 55 450" stroke="url(#mg)" stroke-width="22" fill="none" stroke-linecap="round" opacity=".9"/>
  </svg>`;
}

function currentProduct(){ return PRODUCTS.find(p => p.id === state.modal.productId); }
function currentColor(){ return currentProduct().colors.find(c => c.id === state.modal.colorId); }
function currentPack(){
  const p = currentProduct();
  return p.packs.find(pk => pk.qty === state.modal.packQty);
}

function openModal(productId){
  const product = PRODUCTS.find(p => p.id === productId);
  state.modal.productId = productId;
  state.modal.colorId = product.colors[0].id;
  state.modal.packQty = 1;

  document.getElementById("modalCutTag").textContent = product.cutTag;
  document.getElementById("modalMeta").textContent = `${product.cutTag} — ${product.dims}`;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalKicker").textContent = product.kicker;
  document.getElementById("modalDesc").textContent = product.desc;

  document.getElementById("swatchGrid").innerHTML = product.colors.map(c => `
    <span class="swatch" data-color="${c.id}" title="${c.name}">
      <span class="swatch__fill" style="${c.photo ? `background-image:url('${c.photo}');background-size:cover;background-position:center 62%;` : `background:linear-gradient(135deg, ${c.hexA}, ${c.hexB})`}"></span>
    </span>
  `).join("");
  document.getElementById("swatchGrid").querySelectorAll(".swatch").forEach(el => {
    el.addEventListener("click", () => {
      state.modal.colorId = el.dataset.color;
      updateModalView();
    });
  });

  document.getElementById("packTabs").innerHTML = product.packs.map(pk => `
    <button type="button" data-qty="${pk.qty}">${pk.qty} pc${pk.qty > 1 ? "s" : ""}</button>
  `).join("");
  document.getElementById("packTabs").querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      state.modal.packQty = Number(btn.dataset.qty);
      updateModalView();
    });
  });

  document.getElementById("shuffleColor").onclick = () => {
    const others = product.colors.filter(c => c.id !== state.modal.colorId);
    state.modal.colorId = others[Math.floor(Math.random() * others.length)].id;
    updateModalView();
  };

  document.getElementById("addToCartBtn").onclick = addCurrentToCart;

  updateModalView();

  const modal = document.getElementById("productModal");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function updateModalView(){
  const color = currentColor();
  const pack = currentPack();

  const preview = document.getElementById("modalSwatchPreview");
  preview.style.opacity = 0;
  setTimeout(() => {
    preview.innerHTML = color.photo
      ? `<img src="${color.photo}" alt="${currentProduct().name} — ${color.name}" style="width:100%;height:100%;object-fit:cover;">`
      : swatchSvg(color);
    preview.style.opacity = 1;
  }, prefersReducedMotion ? 0 : 140);

  document.getElementById("modalColorName").textContent = color.name;

  document.querySelectorAll("#swatchGrid .swatch").forEach(el => {
    el.classList.toggle("is-active", el.dataset.color === color.id);
  });
  document.querySelectorAll("#packTabs button").forEach(btn => {
    btn.classList.toggle("is-active", Number(btn.dataset.qty) === pack.qty);
  });

  const total = pack.qty * pack.unit;
  document.getElementById("priceMeta").textContent =
    pack.qty === 1 ? "1 pièce" : `${pack.qty} pièces — ${pack.unit}\u00A0€/pièce`;
  document.getElementById("priceAmount").innerHTML = money(total);

  document.getElementById("addToCartBtn").innerHTML =
    pack.qty === 1
      ? `Ajouter au panier <span aria-hidden="true">+</span>`
      : `Ajouter le pack ${pack.qty} <span aria-hidden="true">+</span>`;
}

function closeModal(){
  const modal = document.getElementById("productModal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function addCurrentToCart(){
  const product = currentProduct();
  const color = currentColor();
  const pack = currentPack();
  const total = pack.qty * pack.unit;

  state.cart.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
    productId: product.id,
    productName: product.name,
    colorId: color.id,
    colorName: color.name,
    hexA: color.hexA,
    hexB: color.hexB,
    photo: color.photo,
    qty: pack.qty,
    unit: pack.unit,
    total,
  });

  renderCart();
  pulseCartIcon();
  showToast(
    "Ajouté — " + (pack.qty > 1 ? `Pack ${pack.qty} · ` : "") + `${product.name} · ${color.name}`,
    `${money(total)} — dans ton panier.`
  );
  closeModal();
}

function pulseCartIcon(){
  const el = document.getElementById("openCartBtn2");
  if (!el || prefersReducedMotion) return;
  el.classList.remove("is-pulsing");
  void el.offsetWidth;
  el.classList.add("is-pulsing");
}

/* =============================================================
   Cart
   ============================================================= */
function cartTotal(){
  return state.cart.reduce((sum, item) => sum + item.total, 0);
}

function renderCart(){
  const count = state.cart.reduce((n, item) => n + item.qty, 0);
  const total = cartTotal();

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = total.toLocaleString("fr-FR");
  document.getElementById("cartDrawerTotal").innerHTML = money(total);

  const badge = document.getElementById("cartBadge");
  badge.textContent = count;
  badge.hidden = count === 0;

  const itemsWrap = document.getElementById("cartItems");
  const emptyMsg = document.getElementById("cartEmpty");

  if (state.cart.length === 0){
    itemsWrap.innerHTML = "";
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
    itemsWrap.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <span class="cart-item__swatch" style="${item.photo ? `background-image:url('${item.photo}');background-size:cover;background-position:center 62%;` : `background:linear-gradient(135deg, ${item.hexA}, ${item.hexB})`}"></span>
        <span>
          <p class="cart-item__name">${item.productName} — ${item.colorName}</p>
          <span class="cart-item__meta">${item.qty} pc${item.qty > 1 ? "s" : ""} · ${item.unit}\u00A0€/pc</span><br>
          <button type="button" class="cart-item__remove" data-remove="${item.id}">Retirer</button>
        </span>
        <span class="cart-item__price">${money(item.total)}</span>
      </div>
    `).join("");

    itemsWrap.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.cart = state.cart.filter(i => i.id !== btn.dataset.remove);
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

  // animated counters on the stat grid
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

/* Text-scramble / decode reveal effect for headings */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function scrambleReveal(el){
  if (el.dataset.scrambled) return;
  el.dataset.scrambled = "1";

  if (prefersReducedMotion) return; // keep the static final text as-is

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
   Stars divider (between Concept and Collection)
   ============================================================= */
function starSvg(size){
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.6 8.4L23 12l-8.4 2.6L12 24l-2.6-8.4L1 12l8.4-2.6z"/></svg>`;
}

function initStarsDivider(){
  const el = document.getElementById("starsDivider");
  if (!el) return;
  const COUNT = 16;
  let html = "";
  for (let i = 0; i < COUNT; i++){
    const left = 2 + Math.random() * 96;
    const top = 12 + Math.random() * 60;
    const size = 5 + Math.random() * 9;
    const d1 = (Math.random() * 5).toFixed(2);
    const d2 = (Math.random() * 3.4).toFixed(2);
    html += `<span class="stars-divider__star" style="left:${left}%; top:${top}%; animation-delay:${d1}s, ${d2}s;">${starSvg(size)}</span>`;
  }
  el.innerHTML = html;
}

/* =============================================================
   Magnetic buttons
   ============================================================= */
function initMagnetic(){
  if (prefersReducedMotion) return;
  document.querySelectorAll(".btn--solid, .btn--outline").forEach(btn => {
    btn.classList.add("magnetic");
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0,0)"; });
  });
}

/* =============================================================
   Hero: load-in reveal + water-ripple effect on the photo
   ============================================================= */
function initHero(){
  const hero = document.getElementById("hero");
  if (!hero) return;
  requestAnimationFrame(() => hero.classList.add("is-ready"));
  initHeroRipple();
}

function initHeroRipple(){
  const canvas = document.getElementById("heroCanvas");
  const frame = document.getElementById("heroFrame");
  if (!canvas || !frame) return;
  const ctx = canvas.getContext("2d");

  const GRID_X = 34, GRID_Y = 42;
  let ripples = [];
  let imgReady = false;

  const img = new Image();
  img.src = "assets/hero.jpg";
  img.onload = () => { imgReady = true; resize(); };

  function resize(){
    const rect = frame.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
  }
  window.addEventListener("resize", resize);

  function addRipple(clientX, clientY){
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) return;
    ripples.push({ x, y, t: performance.now() });
    if (ripples.length > 10) ripples.shift();
  }

  let lastMove = 0;
  canvas.addEventListener("mousemove", (e) => {
    const now = performance.now();
    if (now - lastMove < 40) return;
    lastMove = now;
    addRipple(e.clientX, e.clientY);
  });
  canvas.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    if (t) addRipple(t.clientX, t.clientY);
  }, { passive: true });

  function draw(now){
    requestAnimationFrame(draw);
    if (!imgReady) return;
    const w = canvas.width, h = canvas.height;
    if (w === 0 || h === 0) return;

    ripples = ripples.filter(r => now - r.t < 1500);

    if (prefersReducedMotion || ripples.length === 0){
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      return;
    }

    const iw = img.naturalWidth, ih = img.naturalHeight;
    const cellW = w / GRID_X, cellH = h / GRID_Y;
    const srcCellW = iw / GRID_X, srcCellH = ih / GRID_Y;
    const aspect = h / w;

    ctx.clearRect(0, 0, w, h);
    for (let gy = 0; gy < GRID_Y; gy++){
      const cy = (gy + 0.5) / GRID_Y;
      for (let gx = 0; gx < GRID_X; gx++){
        const cx = (gx + 0.5) / GRID_X;
        let dx = 0, dy = 0;
        for (const r of ripples){
          const age = (now - r.t) / 1000;
          const ddx = cx - r.x, ddy = (cy - r.y) * aspect;
          const dist = Math.hypot(ddx, ddy);
          const wave = Math.sin(dist * 46 - age * 16) * Math.exp(-dist * 6.5) * Math.exp(-age * 1.8) * 0.05;
          const ang = Math.atan2(ddy, ddx);
          dx += Math.cos(ang) * wave;
          dy += Math.sin(ang) * wave;
        }
        const sampleU = Math.min(Math.max(cx + dx, 0), 1);
        const sampleV = Math.min(Math.max(cy + dy, 0), 1);
        const sx = Math.min(Math.max(sampleU * iw - srcCellW / 2, 0), iw - srcCellW);
        const sy = Math.min(Math.max(sampleV * ih - srcCellH / 2, 0), ih - srcCellH);
        ctx.drawImage(
          img,
          sx, sy, srcCellW, srcCellH,
          gx * cellW, gy * cellH, cellW + 1, cellH + 1
        );
      }
    }
  }
  requestAnimationFrame(draw);
}

/* =============================================================
   Init
   ============================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initCollectionShowcase();
  renderReviews();
  renderCart();
  initScrollEffects();
  initMagnetic();
  initHero();
  initStarsDivider();

  document.getElementById("year").textContent = new Date().getFullYear();

  document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  }));
  document.querySelectorAll("[data-cart-close]").forEach(el => el.addEventListener("click", closeCart));

  document.getElementById("openCartBtn").addEventListener("click", openCart);
  document.getElementById("openCartBtn2").addEventListener("click", openCart);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape"){ closeModal(); closeCart(); }
  });

  window.addEventListener("resize", () => {
    state.reviewIndex = 0;
    renderReviews();
  });

  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("formNote").hidden = false;
    form.reset();
  });

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (state.cart.length === 0) return;
    showToast("Commande", "Branche un moyen de paiement (Stripe, PayPal…) pour finaliser ce flux.");
  });
});
