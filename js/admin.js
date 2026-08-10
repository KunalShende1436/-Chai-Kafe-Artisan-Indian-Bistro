const LS_KEYS = {
  INV: 'cafe_inventory',
  ORD: 'cafe_orders',
  BILL: 'cafe_bills',
  STAFF: 'cafe_staff',
  THEME: 'cafe_theme'
};

function loadData(key, fallback) {
  return JSON.parse(localStorage.getItem(key) || 'null') || fallback;
}

function saveData(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// Sample Indian Staff Data
function getSampleStaff() {
  return [
    { id: 'st1', name: 'Ramesh Sharma', role: 'Head Chai Maker', shift: 'Morning (7am - 3pm)', status: 'Active' },
    { id: 'st2', name: 'Priya Iyer', role: 'Kaapi Barista', shift: 'Morning (7am - 3pm)', status: 'Active' },
    { id: 'st3', name: 'Vikas Kumar', role: 'Snack Master Chef', shift: 'Morning (7am - 3pm)', status: 'Active' },
    { id: 'st4', name: 'Aakash Patel', role: 'Shift Manager', shift: 'Evening (3pm - 11pm)', status: 'Active' }
  ];
}

// Admin Authentication
const loginView = document.getElementById('login-view');
const dashboardView = document.getElementById('dashboard-view');
const passInput = document.getElementById('admin-pass');
const loginBtn = document.getElementById('login-btn');
const btnLogout = document.getElementById('btn-logout');
const btnLogoutSide = document.getElementById('btn-logout-side');

function checkAuth() {
  if (sessionStorage.getItem('admin_logged') === 'true') {
    loginView.style.display = 'none';
    dashboardView.style.display = 'block';
    if (btnLogout) btnLogout.style.display = 'inline-flex';
    initDashboard();
  } else {
    loginView.style.display = 'block';
    dashboardView.style.display = 'none';
    if (btnLogout) btnLogout.style.display = 'none';
  }
}

loginBtn.addEventListener('click', () => {
  if (passInput.value === 'admin123') {
    sessionStorage.setItem('admin_logged', 'true');
    checkAuth();
    showToast('Dashboard unlocked!', 'success');
  } else {
    showToast('Incorrect password! Try admin123', 'danger');
  }
});

passInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') loginBtn.click();
});

function logoutAdmin() {
  sessionStorage.removeItem('admin_logged');
  passInput.value = '';
  checkAuth();
  showToast('Logged out of Admin Console', 'info');
}

if (btnLogout) btnLogout.addEventListener('click', logoutAdmin);
if (btnLogoutSide) btnLogoutSide.addEventListener('click', logoutAdmin);

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

// Theme Switcher
const adminThemeBtn = document.getElementById('theme-toggle-admin');
const adminThemeIcon = document.getElementById('admin-theme-icon');

function initAdminTheme() {
  const saved = localStorage.getItem(LS_KEYS.THEME) || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  if (adminThemeIcon) {
    adminThemeIcon.setAttribute('data-feather', saved === 'dark' ? 'sun' : 'moon');
    if (window.feather) feather.replace();
  }
}

if (adminThemeBtn) {
  adminThemeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(LS_KEYS.THEME, next);
    if (adminThemeIcon) {
      adminThemeIcon.setAttribute('data-feather', next === 'dark' ? 'sun' : 'moon');
      if (window.feather) feather.replace();
    }
  });
}

// Tab Navigation
const tabButtons = document.querySelectorAll('.sidebar-menu button');
const tabPanes = document.querySelectorAll('.admin-tab-pane');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.style.display = 'none');
    btn.classList.add('active');
    const tabId = 'tab-' + btn.dataset.tab;
    const targetPane = document.getElementById(tabId);
    if (targetPane) targetPane.style.display = 'block';
  });
});

// Init Dashboard Stats & Tables
function initDashboard() {
  if (!loadData(LS_KEYS.STAFF, []).length) {
    saveData(LS_KEYS.STAFF, getSampleStaff());
  }

  renderAnalytics();
  renderInventoryTable();
  renderOrdersTable();
  renderBillsTable();
  renderStaffTable();
}

function renderAnalytics() {
  const bills = loadData(LS_KEYS.BILL, []);
  const orders = loadData(LS_KEYS.ORD, []);
  const inventory = loadData(LS_KEYS.INV, []);
  const staff = loadData(LS_KEYS.STAFF, []);

  const totalRev = bills.reduce((sum, b) => sum + (b.amount || 0), 0);
  const lowStockCount = inventory.filter(i => i.qty <= 10).length;

  document.getElementById('stat-revenue').textContent = `₹${totalRev.toFixed(0)}`;
  document.getElementById('stat-orders').textContent = orders.length;
  document.getElementById('stat-low-stock').textContent = lowStockCount;
  document.getElementById('stat-staff').textContent = staff.length;

  // Render Visual Sales Chart (in INR ₹)
  const chartContainer = document.getElementById('sales-chart-container');
  chartContainer.innerHTML = '';

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = [2800, 4200, 3900, 5600, 7800, 9400, 8600]; // simulated daily values in INR

  values.forEach((v, idx) => {
    const heightPct = (v / 10000) * 100;
    const barWrap = document.createElement('div');
    barWrap.style.cssText = 'flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end;';
    barWrap.innerHTML = `
      <div style="font-size: 11px; font-weight: 700; color: var(--primary); margin-bottom: 6px;">₹${v}</div>
      <div style="width: 100%; max-width: 36px; height: ${heightPct}%; background: linear-gradient(180deg, var(--accent), var(--primary)); border-radius: var(--radius-sm) var(--radius-sm) 0 0; transition: height 0.4s ease;"></div>
      <div style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-weight: 600;">${days[idx]}</div>
    `;
    chartContainer.appendChild(barWrap);
  });
}

// Inventory Management
let currentInvSearch = '';

document.getElementById('inv-search').addEventListener('input', (e) => {
  currentInvSearch = e.target.value.toLowerCase();
  renderInventoryTable();
});

function renderInventoryTable() {
  const inv = loadData(LS_KEYS.INV, []);
  const table = document.getElementById('inventory-table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Item</th>
        <th>Category</th>
        <th>Price</th>
        <th>Stock Qty</th>
        <th>Badge</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector('tbody');

  const filtered = inv.filter(i => i.name.toLowerCase().includes(currentInvSearch) || i.category.toLowerCase().includes(currentInvSearch));

  filtered.forEach(it => {
    const isLow = it.qty <= 10;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${it.image || 'assets/images/kulhad_chai.png'}" style="width: 38px; height: 38px; border-radius: var(--radius-sm); object-fit: cover;" />
          <div>
            <strong>${it.name}</strong>
          </div>
        </div>
      </td>
      <td><span class="badge-status" style="background: var(--bg-subtle); color: var(--text-muted);">${it.category}</span></td>
      <td><strong>₹${it.price}</strong></td>
      <td>
        <span class="badge-status ${isLow ? 'status-placed' : 'status-completed'}">
          ${it.qty} ${isLow ? '⚠️ Low' : 'In Stock'}
        </span>
      </td>
      <td>${it.badge ? '⭐ ' + it.badge : '-'}</td>
      <td>
        <button class="btn-add small" style="padding: 4px 10px;" data-id="${it.id}" data-act="edit">Edit</button>
        <button class="btn-add small" style="padding: 4px 10px; background: var(--danger);" data-id="${it.id}" data-act="del">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      const id = b.dataset.id;
      const act = b.dataset.act;
      if (act === 'edit') openInventoryModal(id);
      if (act === 'del') deleteInventoryItem(id);
    });
  });
}

// Inventory Modal Handling
const invModal = document.getElementById('inv-modal');
const invForm = document.getElementById('inv-form');
const btnAddInvModal = document.getElementById('btn-add-inv-modal');
const closeInvModal = document.getElementById('close-inv-modal');
const cancelInvModal = document.getElementById('cancel-inv-modal');

btnAddInvModal.addEventListener('click', () => openInventoryModal(null));
closeInvModal.addEventListener('click', () => invModal.classList.remove('open'));
cancelInvModal.addEventListener('click', () => invModal.classList.remove('open'));

function openInventoryModal(id) {
  const inv = loadData(LS_KEYS.INV, []);
  document.getElementById('inv-id').value = id || '';
  if (id) {
    const item = inv.find(i => i.id === id);
    document.getElementById('inv-modal-title').textContent = 'Edit Inventory Item';
    document.getElementById('inv-name').value = item.name;
    document.getElementById('inv-category').value = item.category || 'Chai & Kaapi';
    document.getElementById('inv-badge').value = item.badge || '';
    document.getElementById('inv-price').value = item.price;
    document.getElementById('inv-qty').value = item.qty;
    document.getElementById('inv-image-preset').value = item.image || 'assets/images/kulhad_chai.png';
    document.getElementById('inv-desc').value = item.desc || '';
  } else {
    document.getElementById('inv-modal-title').textContent = 'Add New Inventory Item';
    invForm.reset();
  }
  invModal.classList.add('open');
}

invForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inv = loadData(LS_KEYS.INV, []);
  const id = document.getElementById('inv-id').value;
  const name = document.getElementById('inv-name').value.trim();
  const category = document.getElementById('inv-category').value;
  const badge = document.getElementById('inv-badge').value;
  const price = parseFloat(document.getElementById('inv-price').value) || 0;
  const qty = parseInt(document.getElementById('inv-qty').value) || 0;
  const image = document.getElementById('inv-image-preset').value;
  const desc = document.getElementById('inv-desc').value.trim();

  if (id) {
    const item = inv.find(i => i.id === id);
    if (item) {
      item.name = name; item.category = category; item.badge = badge;
      item.price = price; item.qty = qty; item.image = image; item.desc = desc;
    }
  } else {
    inv.push({
      id: 'i_' + Math.random().toString(36).slice(2, 9),
      name, category, badge, price, qty, image, desc, rating: 4.9
    });
  }

  saveData(LS_KEYS.INV, inv);
  invModal.classList.remove('open');
  showToast('Inventory saved!', 'success');
  renderInventoryTable();
  renderAnalytics();
});

function deleteInventoryItem(id) {
  if (confirm('Are you sure you want to delete this menu item?')) {
    let inv = loadData(LS_KEYS.INV, []);
    inv = inv.filter(i => i.id !== id);
    saveData(LS_KEYS.INV, inv);
    showToast('Item deleted', 'info');
    renderInventoryTable();
    renderAnalytics();
  }
}

// Orders Pipeline
let activeOrderStatus = 'all';

document.querySelectorAll('#order-status-pills .cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#order-status-pills .cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeOrderStatus = btn.dataset.status;
    renderOrdersTable();
  });
});

function renderOrdersTable() {
  const orders = loadData(LS_KEYS.ORD, []);
  const table = document.getElementById('orders-table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Location</th>
        <th>Payment</th>
        <th>Items</th>
        <th>Placed Time</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector('tbody');

  const filtered = orders.filter(o => activeOrderStatus === 'all' || o.status === activeOrderStatus);

  filtered.reverse().forEach(o => {
    const itemsSummary = o.items.map(i => `${i.qty}x ${i.name}`).join(', ');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${o.id}</strong></td>
      <td>${o.location || 'Dine-In'}</td>
      <td><span class="badge-status" style="background: var(--bg-subtle);">${o.payMethod || 'UPI'}</span></td>
      <td>${itemsSummary}</td>
      <td>${new Date(o.created).toLocaleTimeString()}</td>
      <td><span class="badge-status status-${o.status}">${o.status.toUpperCase()}</span></td>
      <td>
        <button class="btn-add small" data-id="${o.id}" data-next="${getNextStatus(o.status)}">
          Mark ${getNextStatus(o.status).toUpperCase()}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      const id = b.dataset.id;
      const nextStatus = b.dataset.next;
      const orders = loadData(LS_KEYS.ORD, []);
      const ord = orders.find(x => x.id === id);
      if (ord) {
        ord.status = nextStatus;
        saveData(LS_KEYS.ORD, orders);
        showToast(`Order #${id} updated to ${nextStatus}!`, 'success');
        renderOrdersTable();
        renderAnalytics();
      }
    });
  });
}

function getNextStatus(curr) {
  if (curr === 'placed') return 'preparing';
  if (curr === 'preparing') return 'ready';
  if (curr === 'ready') return 'completed';
  return 'completed';
}

// Bills & Sales History
function renderBillsTable() {
  const bills = loadData(LS_KEYS.BILL, []);
  const table = document.getElementById('bills-table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Bill ID</th>
        <th>Order Ref</th>
        <th>Subtotal</th>
        <th>Tip / Discount</th>
        <th>Total Amount</th>
        <th>Date & Time</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector('tbody');

  bills.reverse().forEach(b => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${b.id}</strong></td>
      <td>#${b.orderId}</td>
      <td>₹${(b.subtotal || b.amount).toFixed(0)}</td>
      <td>+₹${(b.tip || 0).toFixed(0)} / -₹${(b.discount || 0).toFixed(0)}</td>
      <td><strong style="color: var(--primary);">₹${b.amount.toFixed(0)}</strong></td>
      <td>${new Date(b.created).toLocaleString()}</td>
      <td><span class="badge-status status-completed">PAID</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// Staff Team Management
function renderStaffTable() {
  const staff = loadData(LS_KEYS.STAFF, []);
  const table = document.getElementById('staff-table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Staff Name</th>
        <th>Role</th>
        <th>Shift Schedule</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector('tbody');

  staff.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${s.name}</strong></td>
      <td>${s.role}</td>
      <td>${s.shift || 'Morning'}</td>
      <td><span class="badge-status status-completed">Active</span></td>
      <td>
        <button class="btn-add small" style="background: var(--danger);" data-id="${s.id}">Remove</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      const id = b.dataset.id;
      let staff = loadData(LS_KEYS.STAFF, []);
      staff = staff.filter(x => x.id !== id);
      saveData(LS_KEYS.STAFF, staff);
      showToast('Staff member removed', 'info');
      renderStaffTable();
      renderAnalytics();
    });
  });
}

// Add Staff Modal
const staffModal = document.getElementById('staff-modal');
const staffForm = document.getElementById('staff-form');
const btnAddStaffModal = document.getElementById('btn-add-staff-modal');
const closeStaffModal = document.getElementById('close-staff-modal');
const cancelStaffModal = document.getElementById('cancel-staff-modal');

btnAddStaffModal.addEventListener('click', () => staffModal.classList.add('open'));
closeStaffModal.addEventListener('click', () => staffModal.classList.remove('open'));
cancelStaffModal.addEventListener('click', () => staffModal.classList.remove('open'));

staffForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('staff-name').value.trim();
  const role = document.getElementById('staff-role').value;
  const shift = document.getElementById('staff-shift').value;

  const staff = loadData(LS_KEYS.STAFF, []);
  staff.push({
    id: 'st_' + Math.random().toString(36).slice(2, 9),
    name, role, shift, status: 'Active'
  });

  saveData(LS_KEYS.STAFF, staff);
  staffModal.classList.remove('open');
  staffForm.reset();
  showToast(`Added ${name} to team!`, 'success');
  renderStaffTable();
  renderAnalytics();
});

// CSV Export
document.getElementById('btn-export-csv').addEventListener('click', () => {
  const orders = loadData(LS_KEYS.ORD, []);
  if (orders.length === 0) {
    showToast('No order data to export.', 'info');
    return;
  }
  let csvContent = 'data:text/csv;charset=utf-8,Order ID,Location,Payment Method,Created Time,Status,Items Count\n';
  orders.forEach(o => {
    csvContent += `${o.id},"${o.location}",${o.payMethod || 'UPI'},${new Date(o.created).toISOString()},${o.status},${o.items.length}\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `chai_kafe_orders_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast('Orders exported as CSV!', 'success');
});

// Reset Demo Data
document.getElementById('btn-reset-demo').addEventListener('click', () => {
  if (confirm('Reset system to default Indian Chai & Kafe demo state?')) {
    localStorage.removeItem(LS_KEYS.INV);
    localStorage.removeItem(LS_KEYS.ORD);
    localStorage.removeItem(LS_KEYS.BILL);
    localStorage.setItem(LS_KEYS.STAFF, JSON.stringify(getSampleStaff()));
    showToast('Indian demo dataset restored!', 'success');
    initDashboard();
  }
});

// Init Run
initAdminTheme();
checkAuth();
