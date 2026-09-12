/* =============================================================
   S·LAYERING — data

   SOURCING ALIEXPRESS
   --------------------
   Wide → https://fr.aliexpress.com/item/1005012976152050.html
          (couleurs : 1, 12, 15, 17, 16, 19, 20, 21, 11, 5)

   Les photos ci-dessous ont été détourées automatiquement à partir
   des visuels envoyés (fond neutre). Si tu veux un rendu plus
   soigné sur l'un des coloris, renvoie-moi la photo d'origine et je
   retouche le fichier correspondant dans assets/colors/.
   ============================================================= */
const WIDE_COLORS = [
  { id: "w1",  name: "Jardin",       code: "1",  hexA: "#c9c0a6", hexB: "#e6ddc9", photo: "assets/colors/w1.jpg" },
  { id: "w12", name: "Marine Toile", code: "12", hexA: "#1f2b44", hexB: "#e9e4d8", photo: "assets/colors/w12.jpg" },
  { id: "w15", name: "Forêt",        code: "15", hexA: "#5a4a3a", hexB: "#e9e4d8", photo: "assets/colors/w15.jpg" },
  { id: "w17", name: "Paisley Nuit", code: "17", hexA: "#3a3324", hexB: "#8a6a4a", photo: "assets/colors/w17.jpg" },
  { id: "w16", name: "Faon",         code: "16", hexA: "#8a6a4a", hexB: "#1f2b44", photo: "assets/colors/w16.jpg" },
  { id: "w19", name: "Fleur Rouge",  code: "19", hexA: "#1a1a1a", hexB: "#e9e4d8", photo: "assets/colors/w19.jpg" },
  { id: "w20", name: "Pois",         code: "20", hexA: "#e9e4d8", hexB: "#c79a5e", photo: "assets/colors/w20.jpg" },
  { id: "w21", name: "Baroque",      code: "21", hexA: "#9a9a9a", hexB: "#c79a5e", photo: "assets/colors/w21.jpg" },
  { id: "w11", name: "Léopard",      code: "11", hexA: "#8a6237", hexB: "#3d2b1a", photo: "assets/colors/w11.jpg" },
  { id: "w5",  name: "Paon",         code: "5",  hexA: "#1f2b44", hexB: "#8a333d", photo: "assets/colors/w5.jpg" },
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
    photo: "assets/colors/w1.jpg",
    colors: WIDE_COLORS,
  },
];

const REVIEWS = [
  { name: "Léa M.",    meta: "Wide · Jardin",       rating: 5, quote: "Je la noue à la taille et la tenue change du tout au tout. Le coloris est magnifique." },
  { name: "Camille R.",meta: "Pack 3 · Baroque",    rating: 5, quote: "Reçu en trois jours. Je les enchaîne chaque semaine. Plus qu'un accessoire, vraiment." },
  { name: "Inès B.",   meta: "Wide · Léopard",      rating: 4, quote: "Elle est parfaite pour un look simple. Le nœud ne bouge pas de la journée." },
  { name: "Sofia L.",  meta: "Wide · Marine Toile", rating: 5, quote: "La matière est superbe et le nouage tient toute la journée. Dix coloris, forcément le mien y était." },
  { name: "Manon T.",  meta: "Wide · Forêt",        rating: 5, quote: "Portée en double tour sur un jean large, elle structure toute la silhouette." },
  { name: "Zoé K.",    meta: "Wide · Pois",         rating: 5, quote: "Discrète et élégante. Je la porte au bureau comme le week-end." },
  { name: "Alice P.",  meta: "Pack 2 · Paon",       rating: 4, quote: "Belle qualité de tissu, le seul bémol c'est que j'en veux déjà une troisième." },
  { name: "Chloé D.",  meta: "Wide · Faon",         rating: 5, quote: "Nouée sur le sac pour une soirée, tout le monde m'a demandé où je l'avais trouvée." },
];

/* =============================================================
   State
   ============================================================= */
const state = {
  cart: [],
  modal: { productId: null, colorId: null, packQty: 1 },
  reviewsPage: 0,
};

const money = (n) => `${n.toLocaleString("fr-FR")}\u00A0€`;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =============================================================
   Render: product cards
   ============================================================= */
function productCardSvg(product){
  return `
  <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g-${product.id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${product.accentA}"/>
        <stop offset="100%" stop-color="${product.accentB}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="500" fill="#151310"/>
    <path d="M120 60 C90 60 78 100 78 130 C78 165 100 185 108 215 L70 240 C45 255 30 285 30 325 L30 500 L370 500 L370 325 C370 285 355 255 330 240 L292 215 C300 185 322 165 322 130 C322 100 310 60 280 60 C 250 40 150 40 120 60 Z" fill="#1d1a16"/>
    <path d="M40 300 C140 275 260 275 360 300 L360 345 C260 322 140 322 40 345 Z" fill="url(#g-${product.id})"/>
  </svg>`;
}

function renderProductCards(){
  const wrap = document.getElementById("productCards");
  wrap.innerHTML = PRODUCTS.map(p => `
    <button type="button" class="product-card" data-product="${p.id}">
      <span class="product-card__media">
        ${p.photo ? `<img src="${p.photo}" alt="${p.name}">` : productCardSvg(p)}
        <span class="product-card__shine" aria-hidden="true"></span>
        <span class="product-card__price">Dès ${p.basePrice}&nbsp;€</span>
        <span class="product-card__colors">10 coloris</span>
      </span>
      <span class="product-card__body">
        <span class="product-card__head">
          <span class="product-card__name">${p.name}</span>
          <span class="product-card__dims">${p.dims}</span>
        </span>
        <p>${p.cardDesc}</p>
      </span>
    </button>
  `).join("");

  wrap.querySelectorAll(".product-card").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.product));
    initTilt(btn);
  });
}

/* Subtle 3D tilt following the cursor */
function initTilt(card){
  if (prefersReducedMotion) return;
  const media = card.querySelector(".product-card__media");
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    media.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    media.style.transform = "rotateY(0) rotateX(0)";
  });
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
        <span>${r.rating} / 5</span>
      </div>
      <p class="review-card__quote">« ${r.quote} »</p>
      <div class="review-card__who">
        <strong>${r.name}</strong>
        <span>${r.meta}</span>
      </div>
    </article>
  `).join("");

  const perPage = window.innerWidth <= 600 ? 1 : window.innerWidth <= 960 ? 2 : 4;
  const pages = Math.ceil(REVIEWS.length / perPage);
  const dashesWrap = document.getElementById("reviewsDashes");
  dashesWrap.innerHTML = Array.from({length: pages}, () => `<span></span>`).join("");
  updateReviewsView(perPage, pages);

  document.getElementById("reviewsPrev").onclick = () => {
    state.reviewsPage = Math.max(0, state.reviewsPage - 1);
    updateReviewsView(perPage, pages);
  };
  document.getElementById("reviewsNext").onclick = () => {
    state.reviewsPage = Math.min(pages - 1, state.reviewsPage + 1);
    updateReviewsView(perPage, pages);
  };
}

function updateReviewsView(perPage, pages){
  const track = document.getElementById("reviewsTrack");
  const cardWidth = track.firstElementChild.getBoundingClientRect().width;
  const gap = 22.4;
  const offset = state.reviewsPage * perPage * (cardWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;
  document.getElementById("reviewsPage").textContent =
    `${String(state.reviewsPage + 1).padStart(2,"0")} / ${String(pages).padStart(2,"0")}`;
  [...document.getElementById("reviewsDashes").children].forEach((el, i) => {
    el.classList.toggle("is-active", i === state.reviewsPage);
  });
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
      <span class="swatch__fill" style="${c.photo ? `background-image:url('${c.photo}');background-size:cover;background-position:center;` : `background:linear-gradient(135deg, ${c.hexA}, ${c.hexB})`}"></span>
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
        <span class="cart-item__swatch" style="${item.photo ? `background-image:url('${item.photo}');background-size:cover;background-position:center;` : `background:linear-gradient(135deg, ${item.hexA}, ${item.hexB})`}"></span>
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
   Scroll effects: progress bar, parallax, reveal-on-scroll
   ============================================================= */
function initScrollEffects(){
  const fill = document.getElementById("scrollbarFill");
  const heroScene = document.querySelector(".hero__scene");

  const onScroll = () => {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop;
    const max = doc.scrollHeight - doc.clientHeight;
    fill.style.width = `${max > 0 ? (scrolled / max) * 100 : 0}%`;

    if (heroScene && !prefersReducedMotion){
      const parallax = Math.min(scrolled * 0.35, 220);
      heroScene.style.transform = `translateY(${parallax}px)`;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
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
   Hero: cursor glow + load-in reveal
   ============================================================= */
function initHero(){
  const hero = document.getElementById("hero");
  const glow = document.getElementById("heroGlow");

  requestAnimationFrame(() => hero.classList.add("is-ready"));

  if (glow && !prefersReducedMotion){
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      glow.style.left = `${e.clientX - rect.left}px`;
      glow.style.top = `${e.clientY - rect.top}px`;
    });
  }
}

/* =============================================================
   Init
   ============================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderProductCards();
  renderReviews();
  renderCart();
  initScrollEffects();
  initMagnetic();
  initHero();

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
    state.reviewsPage = 0;
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
