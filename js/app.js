function generateId() {
  return 'ord_' + Math.random().toString(36).slice(2, 9);
}

const LS_KEYS = {
  INV: 'cafe_inventory',
  ORD: 'cafe_orders',
  BILL: 'cafe_bills',
  STAFF: 'cafe_staff',
  THEME: 'cafe_theme',
  FAV: 'cafe_favorites'
};

// Rich Indian Cafe Sample Data
function getSampleInventory() {
  return [
    {
      id: 'i1',
      name: 'Kulhad Masala Chai',
      category: 'Chai & Kaapi',
      price: 40,
      qty: 60,
      image: 'assets/images/kulhad_chai.png',
      desc: 'CTC tea slow simmered with fresh ginger, cardamom & spices in clay kulhad cup.',
      rating: 4.9,
      badge: 'bestseller',
      tags: ['veg', 'jain']
    },
    {
      id: 'i2',
      name: 'South Indian Filter Kaapi',
      category: 'Chai & Kaapi',
      price: 90,
      qty: 45,
      image: 'assets/images/filter_coffee.png',
      desc: 'Authentic chicory coffee decoction frothing with milk in brass dabara set.',
      rating: 4.9,
      badge: 'bestseller',
      tags: ['veg']
    },
    {
      id: 'i3',
      name: 'Crispy Punjabi Samosas (2 pcs)',
      category: 'Desi Snacks',
      price: 60,
      qty: 50,
      image: 'assets/images/samosa.png',
      desc: 'Golden fried stuffed potato-pea pastries served with spicy mint & sweet tamarind chutney.',
      rating: 4.9,
      badge: 'bestseller',
      tags: ['veg']
    },
    {
      id: 'i4',
      name: 'Bombay Vada Pav',
      category: 'Desi Snacks',
      price: 70,
      qty: 35,
      image: 'assets/images/vada_pav.png',
      desc: 'Mumbai street icon spiced potato batata vada in soft pav with dry garlic chutney & fried green chili.',
      rating: 4.8,
      badge: 'special',
      tags: ['veg']
    },
    {
      id: 'i5',
      name: 'Iced Caramel Macchiato',
      category: 'Cold Beverages',
      price: 180,
      qty: 25,
      image: 'assets/images/iced_macchiato.png',
      desc: 'Cold layered espresso with vanilla milk, ice cubes, and rich caramel drizzle.',
      rating: 4.8,
      badge: 'special',
      tags: ['veg']
    },
    {
      id: 'i6',
      name: 'Japanese Uji Matcha Latte',
      category: 'Cold Beverages',
      price: 190,
      qty: 30,
      image: 'assets/images/matcha.png',
      desc: 'Premium ceremonial grade Japanese green tea whisked with silky oat milk.',
      rating: 4.7,
      badge: 'vegan',
      tags: ['veg', 'jain']
    },
    {
      id: 'i7',
      name: 'New York Berry Cheesecake',
      category: 'Bakery',
      price: 220,
      qty: 15,
      image: 'assets/images/cheesecake.png',
      desc: 'Classic dense cheesecake slice topped with fresh raspberries & blueberries.',
      rating: 4.9,
      badge: 'special',
      tags: ['veg']
    },
    {
      id: 'i8',
      name: 'Artisanal Avocado Toast',
      category: 'Desi Snacks',
      price: 240,
      qty: 20,
      image: 'assets/images/avocado_toast.png',
      desc: 'Smashed organic avocado on toasted sourdough with chili flakes & poached egg.',
      rating: 4.7,
      badge: 'gf',
      tags: ['nonveg']
    }
  ];
}

function loadInventory() {
  let inv = JSON.parse(localStorage.getItem(LS_KEYS.INV) || 'null');
  if (!inv || !inv.length || !inv[0].price || inv[0].price < 10) {
    inv = getSampleInventory();
    localStorage.setItem(LS_KEYS.INV, JSON.stringify(inv));
  }
  return inv;
}

let inventory = loadInventory();
let favorites = JSON.parse(localStorage.getItem(LS_KEYS.FAV) || '[]');
let cart = {};
let activeCategory = 'all';
let searchKeyword = '';
let activeDietary = 'all';
let activeSort = 'popular';
let tipAmount = 0;
let discountRate = 0;
let customItemContext = null;

// DOM Elements
const menuGridEl = document.getElementById('menu-grid');
const cartDrawerOverlay = document.getElementById('cart-overlay');
const cartToggleBtn = document.getElementById('cart-toggle');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartBadgeCount = document.getElementById('cart-badge-count');
const cartDrawerCount = document.getElementById('cart-drawer-count');

const subtotalValEl = document.getElementById('subtotal-val');
const discountRowEl = document.getElementById('discount-row');
const discountValEl = document.getElementById('discount-val');
const tipValEl = document.getElementById('tip-val');
const cartTotalValEl = document.getElementById('cart-total-val');
const checkoutBtn = document.getElementById('checkout-btn');

// Theme Switcher
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function initTheme() {
  const savedTheme = localStorage.getItem(LS_KEYS.THEME) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
  if (themeIcon) {
    themeIcon.setAttribute('data-feather', theme === 'dark' ? 'sun' : 'moon');
    if (window.feather) feather.replace();
  }
}

themeToggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(LS_KEYS.THEME, next);
  updateThemeIcon(next);
  showToast(`Switched to ${next} mode`, 'info');
});

// Toast Notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  let icon = '⚡';
  if (type === 'success') icon = '✅';
  if (type === 'danger') icon = '❌';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Render Menu Grid
function renderMenu() {
  menuGridEl.innerHTML = '';

  let filtered = inventory.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchKeyword.toLowerCase()) || 
                        item.desc.toLowerCase().includes(searchKeyword.toLowerCase());
    let matchDiet = true;
    if (activeDietary === 'veg') matchDiet = item.tags && item.tags.includes('veg');
    if (activeDietary === 'nonveg') matchDiet = item.tags && item.tags.includes('nonveg');
    if (activeDietary === 'jain') matchDiet = item.tags && item.tags.includes('jain');
    if (activeDietary === 'bestseller') matchDiet = item.badge === 'bestseller';
    return matchCat && matchSearch && matchDiet;
  });

  // Sorting
  if (activeSort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (activeSort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (activeSort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

  if (filtered.length === 0) {
    menuGridEl.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: var(--text-muted);">
        <i data-feather="coffee" style="width: 48px; height: 48px; margin-bottom: 12px; opacity: 0.4;"></i>
        <h3>No items match your filter</h3>
        <p>Try resetting category or diet filters.</p>
      </div>
    `;
    if (window.feather) feather.replace();
    return;
  }

  filtered.forEach(item => {
    const isFav = favorites.includes(item.id);
    const card = document.createElement('div');
    card.className = 'card';

    let badgeMarkup = '';
    if (item.badge === 'bestseller') badgeMarkup = '<span class="badge badge-bestseller">⭐ Bestseller</span>';
    else if (item.badge === 'special') badgeMarkup = '<span class="badge badge-special">✨ Chef Special</span>';
    else if (item.tags && item.tags.includes('veg')) badgeMarkup = '<span class="badge badge-veg">🟢 Pure Veg</span>';
    else if (item.tags && item.tags.includes('nonveg')) badgeMarkup = '<span class="badge badge-nonveg">🔴 Non-Veg</span>';

    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${item.image || 'assets/images/kulhad_chai.png'}" alt="${item.name}" loading="lazy" />
        ${badgeMarkup}
        <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${item.id}" title="Add to Wishlist">
          <i data-feather="heart"></i>
        </button>
      </div>
      <div class="card-body">
        <div class="card-title-row">
          <h3>${item.name}</h3>
          <span class="card-rating">★ ${item.rating || '4.9'}</span>
        </div>
        <p class="card-desc">${item.desc || ''}</p>
        <div class="card-footer">
          <span class="card-price">₹${item.price.toFixed(0)}</span>
          <button class="btn-add" data-id="${item.id}">
            <i data-feather="plus"></i> Add
          </button>
        </div>
      </div>
    `;

    menuGridEl.appendChild(card);
  });

  if (window.feather) feather.replace();
  bindCardEvents();
}

function bindCardEvents() {
  menuGridEl.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
        showToast('Removed from favorites');
      } else {
        favorites.push(id);
        showToast('Added to favorites!', 'success');
      }
      localStorage.setItem(LS_KEYS.FAV, JSON.stringify(favorites));
      updateWishlistCount();
      renderMenu();
    });
  });

  menuGridEl.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = inventory.find(i => i.id === id);
      if (!item || item.qty <= 0) {
        showToast('Out of stock!', 'danger');
        return;
      }
      openCustomizationModal(item);
    });
  });
}

function updateWishlistCount() {
  const el = document.getElementById('wishlist-count');
  if (el) {
    el.textContent = favorites.length;
    el.style.display = favorites.length > 0 ? 'flex' : 'none';
  }
}

// Category Pills & Filters
document.querySelectorAll('#category-pills .cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#category-pills .cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    renderMenu();
  });
});

document.getElementById('dietary-filter').addEventListener('change', (e) => {
  activeDietary = e.target.value;
  renderMenu();
});

document.getElementById('sort-select').addEventListener('change', (e) => {
  activeSort = e.target.value;
  renderMenu();
});

const heroSearchInput = document.getElementById('hero-search-input');
const heroSearchBtn = document.getElementById('hero-search-btn');

heroSearchBtn.addEventListener('click', () => {
  searchKeyword = heroSearchInput.value.trim();
  renderMenu();
});
heroSearchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    searchKeyword = heroSearchInput.value.trim();
    renderMenu();
  }
});

// Customization Modal Logic for Indian Flavors
const customModal = document.getElementById('custom-modal');
const customTitle = document.getElementById('custom-title');
const customBody = document.getElementById('custom-body');
const customPriceDisplay = document.getElementById('custom-price-display');
const closeCustomBtn = document.getElementById('close-custom-modal');
const confirmAddCustomBtn = document.getElementById('confirm-add-custom');

function openCustomizationModal(item) {
  customItemContext = {
    item: item,
    basePrice: item.price,
    brewStrength: 'Kadak (Strong)',
    sugarLevel: 'Full Sugar',
    extraAdrak: false,
    extraElaichi: false,
    extraKesar: false,
    extraPav: false
  };

  customTitle.textContent = `Customize ${item.name}`;
  renderCustomizationBody();
  customModal.classList.add('open');
}

function calculateCustomTotal() {
  if (!customItemContext) return 0;
  let total = customItemContext.basePrice;
  if (customItemContext.extraAdrak) total += 10;
  if (customItemContext.extraElaichi) total += 10;
  if (customItemContext.extraKesar) total += 20;
  if (customItemContext.extraPav) total += 20;
  return total;
}

function renderCustomizationBody() {
  const isChaiOrKaapi = customItemContext.item.category === 'Chai & Kaapi';
  const isSnack = customItemContext.item.category === 'Desi Snacks';

  let html = '';

  if (isChaiOrKaapi) {
    html += `
      <div class="form-group">
        <label>Brew Strength</label>
        <select id="cust-strength" class="form-control">
          <option value="Kadak (Strong)" selected>Kadak (Strong)</option>
          <option value="Medium">Medium Brew</option>
          <option value="Light">Light & Smooth</option>
        </select>
      </div>

      <div class="form-group">
        <label>Sugar Customization</label>
        <select id="cust-sugar" class="form-control">
          <option value="Full Sugar">Full Sugar</option>
          <option value="Kam Chini (Less)">Kam Chini (Less Sugar)</option>
          <option value="Bina Chini (Zero)">Bina Chini (Sugar Free)</option>
        </select>
      </div>

      <div class="form-group">
        <label>Add Spices & Flavors</label>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <label style="cursor: pointer;"><input type="checkbox" id="add-adrak" /> Extra Fresh Adrak / Ginger (+₹10)</label>
          <label style="cursor: pointer;"><input type="checkbox" id="add-elaichi" /> Crushed Green Elaichi (+₹10)</label>
          <label style="cursor: pointer;"><input type="checkbox" id="add-kesar" /> Saffron Kesar Strings (+₹20)</label>
        </div>
      </div>
    `;
  } else if (isSnack) {
    html += `
      <div class="form-group">
        <label>Chutney Preference</label>
        <select id="cust-chutney" class="form-control">
          <option value="Both Mint & Tamarind">Both Teekhi & Meethi Chutney</option>
          <option value="Teekhi Mint Only">Only Teekhi Green Chutney</option>
          <option value="Meethi Tamarind Only">Only Meethi Tamarind Chutney</option>
        </select>
      </div>
      <div class="form-group">
        <label style="cursor: pointer;"><input type="checkbox" id="add-pav" /> Add Extra Butter Pav Pair (+₹20)</label>
      </div>
    `;
  }

  html += `
    <div class="form-group">
      <label>Special Instructions</label>
      <input type="text" id="cust-notes" class="form-control" placeholder="e.g. Make it extra hot, light chili..." />
    </div>
  `;

  customBody.innerHTML = html;
  customPriceDisplay.textContent = `₹${calculateCustomTotal()}`;

  // Change Listeners
  const checkAdrak = document.getElementById('add-adrak');
  if (checkAdrak) checkAdrak.addEventListener('change', (e) => {
    customItemContext.extraAdrak = e.target.checked;
    customPriceDisplay.textContent = `₹${calculateCustomTotal()}`;
  });

  const checkElaichi = document.getElementById('add-elaichi');
  if (checkElaichi) checkElaichi.addEventListener('change', (e) => {
    customItemContext.extraElaichi = e.target.checked;
    customPriceDisplay.textContent = `₹${calculateCustomTotal()}`;
  });

  const checkKesar = document.getElementById('add-kesar');
  if (checkKesar) checkKesar.addEventListener('change', (e) => {
    customItemContext.extraKesar = e.target.checked;
    customPriceDisplay.textContent = `₹${calculateCustomTotal()}`;
  });

  const checkPav = document.getElementById('add-pav');
  if (checkPav) checkPav.addEventListener('change', (e) => {
    customItemContext.extraPav = e.target.checked;
    customPriceDisplay.textContent = `₹${calculateCustomTotal()}`;
  });
}

closeCustomBtn.addEventListener('click', () => customModal.classList.remove('open'));

confirmAddCustomBtn.addEventListener('click', () => {
  if (!customItemContext) return;
  const notesInput = document.getElementById('cust-notes');
  const notes = notesInput ? notesInput.value.trim() : '';
  const finalPrice = calculateCustomTotal();

  const cartKey = `${customItemContext.item.id}_${customItemContext.extraAdrak ? 'adr' : ''}_${customItemContext.extraKesar ? 'kes' : ''}`;
  
  if (cart[cartKey]) {
    cart[cartKey].qty += 1;
  } else {
    cart[cartKey] = {
      key: cartKey,
      id: customItemContext.item.id,
      name: customItemContext.item.name,
      image: customItemContext.item.image,
      price: finalPrice,
      notes: notes,
      qty: 1
    };
  }

  customModal.classList.remove('open');
  showToast(`Added ${customItemContext.item.name} to order!`, 'success');
  renderCart();
  cartDrawerOverlay.classList.add('open');
});

// Cart Drawer Handling
cartToggleBtn.addEventListener('click', () => cartDrawerOverlay.classList.add('open'));
closeCartBtn.addEventListener('click', () => cartDrawerOverlay.classList.remove('open'));

cartDrawerOverlay.addEventListener('click', (e) => {
  if (e.target === cartDrawerOverlay) cartDrawerOverlay.classList.remove('open');
});

function renderCart() {
  cartItemsContainer.innerHTML = '';
  let subtotal = 0;
  let totalCount = 0;

  const entries = Object.values(cart);
  if (entries.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 48px; color: var(--text-muted);">
        <i data-feather="shopping-bag" style="width: 48px; height: 48px; opacity: 0.3; margin-bottom: 12px;"></i>
        <p>Your cart is empty</p>
        <small>Add piping hot Chai or crispy Samosas!</small>
      </div>
    `;
    if (window.feather) feather.replace();
  } else {
    entries.forEach(item => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      totalCount += item.qty;

      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <img src="${item.image || 'assets/images/kulhad_chai.png'}" alt="${item.name}" />
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-sub">₹${item.price} each</div>
          <div class="cart-qty-controls">
            <button class="btn-qty" data-key="${item.key}" data-op="dec">-</button>
            <span><strong>${item.qty}</strong></span>
            <button class="btn-qty" data-key="${item.key}" data-op="inc">+</button>
            <span style="margin-left: auto; font-weight: 700; color: var(--primary);">₹${itemTotal}</span>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(row);
    });
  }

  // Summary
  const discountVal = subtotal * discountRate;
  const totalVal = Math.max(0, subtotal - discountVal + tipAmount);

  subtotalValEl.textContent = subtotal.toFixed(0);
  discountValEl.textContent = discountVal.toFixed(0);
  discountRowEl.style.display = discountRate > 0 ? 'flex' : 'none';
  tipValEl.textContent = tipAmount.toFixed(0);
  cartTotalValEl.textContent = totalVal.toFixed(0);

  cartBadgeCount.textContent = totalCount;
  cartDrawerCount.textContent = totalCount;

  cartItemsContainer.querySelectorAll('.btn-qty').forEach(b => {
    b.addEventListener('click', () => {
      const key = b.dataset.key;
      const op = b.dataset.op;
      if (op === 'inc') cart[key].qty++;
      else {
        cart[key].qty--;
        if (cart[key].qty <= 0) delete cart[key];
      }
      renderCart();
    });
  });
}

// Tip selector buttons
document.querySelectorAll('#tip-selector .tip-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#tip-selector .tip-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tipAmount = parseFloat(btn.dataset.tip);
    renderCart();
  });
});

// Coupon Code
document.getElementById('apply-coupon').addEventListener('click', () => {
  const code = document.getElementById('coupon-code').value.trim().toUpperCase();
  if (code === 'DESI20') {
    discountRate = 0.20;
    showToast('20% Desi Discount applied!', 'success');
  } else if (code === 'CHAI10') {
    discountRate = 0.10;
    showToast('10% Chai Lover discount applied!', 'success');
  } else {
    discountRate = 0;
    showToast('Invalid coupon. Try DESI20', 'danger');
  }
  renderCart();
});

const orderTypeSelect = document.getElementById('order-type-select');
const tableOrAddressInput = document.getElementById('table-or-address');

orderTypeSelect.addEventListener('change', (e) => {
  const val = e.target.value;
  if (val === 'dine-in') tableOrAddressInput.placeholder = 'Table Number (e.g. Table 4)';
  else if (val === 'takeaway') tableOrAddressInput.placeholder = 'Pickup Name / Contact #';
  else if (val === 'delivery') tableOrAddressInput.placeholder = 'Delivery Address';
});

// Place Order
checkoutBtn.addEventListener('click', () => {
  const cartEntries = Object.values(cart);
  if (cartEntries.length === 0) {
    showToast('Your cart is empty!', 'danger');
    return;
  }

  const tableOrAddr = tableOrAddressInput.value.trim() || 'Dine-In Table 1';
  const payMethod = document.getElementById('payment-method-select').value.toUpperCase();
  const orders = JSON.parse(localStorage.getItem(LS_KEYS.ORD) || '[]');
  const bills = JSON.parse(localStorage.getItem(LS_KEYS.BILL) || '[]');

  let subtotal = 0;
  cartEntries.forEach(item => subtotal += item.price * item.qty);
  const discountVal = subtotal * discountRate;
  const finalTotal = Math.max(0, subtotal - discountVal + tipAmount);

  const orderId = generateId();
  const now = Date.now();

  const newOrder = {
    id: orderId,
    items: cartEntries.map(ci => ({ id: ci.id, name: ci.name, qty: ci.qty, price: ci.price })),
    location: tableOrAddr,
    payMethod: payMethod,
    created: now,
    status: 'placed'
  };

  const newBill = {
    id: 'bill_' + Math.random().toString(36).slice(2, 9),
    orderId: orderId,
    subtotal: subtotal,
    discount: discountVal,
    tip: tipAmount,
    amount: finalTotal,
    created: now,
    paid: true
  };

  orders.push(newOrder);
  bills.push(newBill);

  cartEntries.forEach(ci => {
    const invItem = inventory.find(i => i.id === ci.id);
    if (invItem) invItem.qty = Math.max(0, invItem.qty - ci.qty);
  });

  localStorage.setItem(LS_KEYS.ORD, JSON.stringify(orders));
  localStorage.setItem(LS_KEYS.BILL, JSON.stringify(bills));
  localStorage.setItem(LS_KEYS.INV, JSON.stringify(inventory));

  cart = {};
  renderCart();
  cartDrawerOverlay.classList.remove('open');

  showToast(`Order Placed via ${payMethod}! (#${orderId})`, 'success');
  openTrackerModal(newOrder);
});

// Order Tracker Modal
const trackerModal = document.getElementById('tracker-modal');
const trackerBody = document.getElementById('tracker-body');
const closeTrackerBtn = document.getElementById('close-tracker');
const trackOrderNav = document.getElementById('track-order-nav');

trackOrderNav.addEventListener('click', (e) => {
  e.preventDefault();
  const orders = JSON.parse(localStorage.getItem(LS_KEYS.ORD) || '[]');
  if (orders.length === 0) {
    showToast('No active orders found.', 'info');
    return;
  }
  const lastOrder = orders[orders.length - 1];
  openTrackerModal(lastOrder);
});

closeTrackerBtn.addEventListener('click', () => trackerModal.classList.remove('open'));

function openTrackerModal(order) {
  let stepIndex = 1;
  if (order.status === 'preparing') stepIndex = 2;
  if (order.status === 'ready') stepIndex = 3;
  if (order.status === 'completed') stepIndex = 4;

  let itemsHtml = order.items.map(i => `
    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 14px;">
      <span>${i.qty}x ${i.name}</span>
      <span>₹${i.price * i.qty}</span>
    </div>
  `).join('');

  trackerBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <span class="badge badge-bestseller" style="font-size: 13px;">Order #${order.id}</span>
      <h3 style="margin-top: 8px;">Preparing Hot in Kitchen</h3>
      <small style="color: var(--text-muted);">Placed on ${new Date(order.created).toLocaleTimeString()} (${order.payMethod || 'UPI'})</small>
    </div>

    <div class="stepper">
      <div class="step ${stepIndex >= 1 ? 'active' : ''}">
        <div class="step-icon">1</div>
        <div class="step-lbl">Order Received</div>
      </div>
      <div class="step ${stepIndex >= 2 ? 'active' : ''}">
        <div class="step-icon">2</div>
        <div class="step-lbl">Brewing / Cooking</div>
      </div>
      <div class="step ${stepIndex >= 3 ? 'active' : ''}">
        <div class="step-icon">3</div>
        <div class="step-lbl">Ready for Table</div>
      </div>
      <div class="step ${stepIndex >= 4 ? 'active' : ''}">
        <div class="step-icon">4</div>
        <div class="step-lbl">Served</div>
      </div>
    </div>

    <div style="background: var(--bg-subtle); padding: 16px; border-radius: var(--radius-sm); margin-top: 20px;">
      <h4 style="margin-bottom: 12px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">Tax Invoice Receipt</h4>
      ${itemsHtml}
    </div>
  `;

  trackerModal.classList.add('open');
}

// Init Run
initTheme();
updateWishlistCount();
renderMenu();
renderCart();
