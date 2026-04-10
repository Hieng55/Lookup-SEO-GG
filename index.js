


const normalizeText = (value = '') => value.toString().trim().toLowerCase().replace(/\s+/g, ' ');
const formatName = (value = '') => value
  .toString()
  .trim()
  .split(/\s+/)
  .filter(Boolean)
  .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
  .join(' ');

const cleanPhone = (value = '') => value.toString().replace(/[^\d]/g, '');

function buildLeaderboardData(stores) {
  const grouped = stores.reduce((acc, store) => {
    const rawName = store.sale_person || 'Chưa gán';
    const key = normalizeText(rawName);

    if (!acc[key]) {
      acc[key] = {
        key,
        name: formatName(rawName) || 'Chưa gán',
        totalStores: 0,
        categories: new Set(),
        latestUpdate: store.update || '',
      };
    }

    acc[key].totalStores += 1;
    if (store.category) acc[key].categories.add(store.category);
    if (store.update) acc[key].latestUpdate = store.update;

    return acc;
  }, {});

  return Object.values(grouped)
    .map(item => ({
      ...item,
      categories: item.categories.size,
    }))
    .sort((a, b) => {
      if (b.totalStores !== a.totalStores) return b.totalStores - a.totalStores;
      return a.name.localeCompare(b.name, 'vi');
    })
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
}

// 3. UI Elements
const searchInput = document.getElementById('searchInput');
const storeGrid = document.getElementById('storeGrid');
const resultsTitle = document.getElementById('resultsTitle');
const welcomePlaceholder = document.getElementById('welcomePlaceholder');
const emptyPlaceholder = document.getElementById('emptyPlaceholder');
const aiGlobalBtn = document.getElementById('aiGlobalBtn');
const aiInsightContainer = document.getElementById('aiInsightContainer');
const aiInsightText = document.getElementById('aiInsightText');
const globalLoading = document.getElementById('globalLoading');

const detailModal = document.getElementById('detailModal');
const modalContent = document.getElementById('modalContent');
const aiDetailText = document.getElementById('aiDetailText');

let selectedStore = null;

const leaderboardSection = document.createElement('section');
leaderboardSection.id = 'leaderboardSection';
leaderboardSection.className = 'mb-12 hidden';
leaderboardSection.innerHTML = `
  <div class="glass rounded-[28px] p-6 md:p-8 shadow-2xl overflow-hidden relative border border-white/10">
    <div class="absolute -top-12 right-0 w-56 h-56 bg-fuchsia-500/15 blur-[110px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/10 blur-[90px] rounded-full pointer-events-none"></div>

    <div class="relative flex flex-col gap-5">
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.24em] text-indigo-200 mb-3">
            Future Leaderboard
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-white">Bảng xếp hạng Sale</h2>
          <p id="leaderboardSubtitle" class="text-slate-400 mt-2 text-sm md:text-base">So sánh hiệu suất theo số lượng tiệm đang quản lý.</p>
        </div>
        <div id="leaderboardStats" class="grid grid-cols-2 md:grid-cols-3 gap-3 min-w-full lg:min-w-[420px]"></div>
      </div>

      <div id="podiumGrid" class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"></div>
      <div id="rankingList" class="grid grid-cols-1 xl:grid-cols-2 gap-4"></div>
    </div>
  </div>
`;
resultsTitle.parentNode.insertBefore(leaderboardSection, resultsTitle);

function createMetricCard(label, value, accent) {
  return `
    <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
      <p class="text-[11px] uppercase tracking-[0.22em] text-slate-400 mb-2">${label}</p>
      <p class="text-2xl font-bold ${accent}">${value}</p>
    </div>
  `;
}

function getRankStyle(rank) {
  if (rank === 1) {
    return {
      badge: 'bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-500 text-slate-950 shadow-[0_0_45px_rgba(251,191,36,0.45)] border border-yellow-100/60',
      ring: 'border-yellow-300/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(251,191,36,0.08),rgba(255,255,255,0.06))] shadow-[0_25px_80px_rgba(251,191,36,0.2)]',
      text: 'text-yellow-100',
      subtext: 'text-amber-100/80',
      cap: 'bg-gradient-to-r from-yellow-100/85 via-amber-300/70 to-yellow-500/75',
      bar: 'from-yellow-200 via-amber-400 to-yellow-500',
      aura: 'bg-amber-300/18',
      height: 'md:min-h-[320px]',
      icon: '👑',
      label: 'Gold Champion'
    };
  }
  if (rank === 2) {
    return {
      badge: 'bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 text-slate-950 shadow-[0_0_34px_rgba(226,232,240,0.35)] border border-white/50',
      ring: 'border-slate-200/30 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(203,213,225,0.08),rgba(255,255,255,0.04))] shadow-[0_22px_70px_rgba(148,163,184,0.14)]',
      text: 'text-slate-50',
      subtext: 'text-slate-200/75',
      cap: 'bg-gradient-to-r from-slate-100/80 via-slate-300/70 to-slate-400/65',
      bar: 'from-slate-100 via-slate-300 to-slate-400',
      aura: 'bg-slate-200/12',
      height: 'md:min-h-[275px]',
      icon: '🥈',
      label: 'Silver Elite'
    };
  }
  return {
    badge: 'bg-gradient-to-r from-orange-200 via-amber-500 to-orange-700 text-slate-950 shadow-[0_0_32px_rgba(251,146,60,0.32)] border border-orange-100/35',
    ring: 'border-orange-300/25 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(251,146,60,0.09),rgba(120,53,15,0.08))] shadow-[0_18px_60px_rgba(251,146,60,0.13)]',
    text: 'text-orange-100',
    subtext: 'text-orange-100/70',
    cap: 'bg-gradient-to-r from-orange-100/70 via-amber-500/65 to-orange-700/70',
    bar: 'from-orange-200 via-amber-500 to-orange-700',
    aura: 'bg-orange-300/12',
    height: 'md:min-h-[245px]',
    icon: '🥉',
    label: 'Bronze Power'
  };
}

function createPodiumCard(person) {
  const style = getRankStyle(person.rank);
  const delayClass = person.rank === 2 ? 'podium-delay-2' : person.rank === 3 ? 'podium-delay-3' : '';
  const crownClass = person.rank === 1 ? 'crown-animated' : '';
  return `
    <div class="podium-card podium-animated ${delayClass} rounded-[28px] border ${style.ring} p-5 md:p-6 ${style.height} relative overflow-hidden flex flex-col justify-between">
      <div class="absolute -top-10 right-[-20px] w-32 h-32 ${style.aura} blur-3xl rounded-full pointer-events-none"></div>
      <div class="absolute inset-x-6 top-0 h-1 rounded-b-full ${style.cap}"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%)] pointer-events-none"></div>
      <div class="flex items-start justify-between gap-3 relative">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${style.badge}">
            <span class="${crownClass}">${style.icon}</span>
            <span>TOP ${person.rank}</span>
          </div>
          <p class="mt-3 text-[11px] uppercase tracking-[0.28em] ${style.subtext}">${style.label}</p>
        </div>
        <div class="text-right">
          <div class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Stores</div>
          <div class="text-4xl font-extrabold text-white leading-none">${person.totalStores}</div>
        </div>
      </div>
      <div class="relative">
        <h3 class="text-xl md:text-2xl font-bold ${style.text} leading-tight">${person.name}</h3>
        <p class="text-sm mt-2 ${style.subtext}">${person.categories} danh mục • Cập nhật ${person.latestUpdate || 'N/A'}</p>
      </div>
      <div class="relative mt-6">
        <div class="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
          <div class="h-full rounded-full bg-gradient-to-r ${style.bar}" style="width:${Math.min(100, Math.max(18, person.totalStores * 6))}%"></div>
        </div>
      </div>
    </div>
  `;
}

function createRankingRow(person, topCount, matchedTerm) {
  const isTop3 = person.rank <= 3;
  const isMatched = matchedTerm && normalizeText(person.name).includes(matchedTerm);
  return `
    <div class="rounded-2xl border ${isMatched ? 'border-cyan-300/45 bg-cyan-400/10' : 'border-white/10 bg-white/5'} p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-white/10">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-4 min-w-0">
          <div class="w-12 h-12 rounded-2xl ${isTop3 ? 'bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-cyan-300 text-slate-950' : 'bg-white/10 text-white'} flex items-center justify-center font-extrabold text-lg shadow-lg shrink-0">${person.rank}</div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="text-base md:text-lg font-bold text-white truncate">${person.name}</h4>
              ${isMatched ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] bg-cyan-400/15 text-cyan-200 border border-cyan-300/20">đang tìm</span>' : ''}
            </div>
            <p class="text-sm text-slate-400">${person.categories} danh mục • ${person.latestUpdate || 'Chưa có ngày update'}</p>
          </div>
        </div>
        <div class="text-right shrink-0">
          <p class="text-[11px] uppercase tracking-[0.2em] text-slate-500">Tiệm</p>
          <p class="text-2xl font-extrabold text-white">${person.totalStores}</p>
        </div>
      </div>
      <div class="mt-4 bg-white/5 rounded-full h-2 overflow-hidden">
        <div class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-400 to-cyan-300" style="width:${(person.totalStores / Math.max(topCount, 1)) * 100}%"></div>
      </div>
    </div>
  `;
}

function renderLeaderboard(filteredStores = [], options = {}) {
  const { mode = 'overall', matchedTerm = '' } = options;
  const leaderboardData = buildLeaderboardData(MOCK_STORES);
  const activeData = mode === 'sale-search' && filteredStores.length
    ? buildLeaderboardData(filteredStores)
    : leaderboardData;

  if (!activeData.length || mode === 'phone-search') {
    leaderboardSection.classList.add('hidden');
    return;
  }

  leaderboardSection.classList.remove('hidden');

  const subtitle = document.getElementById('leaderboardSubtitle');
  const stats = document.getElementById('leaderboardStats');
  const podiumGrid = document.getElementById('podiumGrid');
  const rankingList = document.getElementById('rankingList');

  const champion = activeData[0];
  const podium = activeData.slice(0, 3);
  const rest = activeData.slice(3);
  const displayList = [...podium, ...rest];

  subtitle.textContent = mode === 'sale-search'
    ? `Kết quả so sánh cho nhóm sale đang khớp với từ khóa “${searchInput.value.trim()}”.`
    : 'Toàn bộ hệ thống được sắp xếp theo số lượng tiệm từ cao xuống thấp.';

  stats.innerHTML = [
    createMetricCard('Top Leader', champion?.name || 'N/A', 'text-cyan-200'),
    createMetricCard('Tổng sale', activeData.length, 'text-white'),
    createMetricCard('Tổng tiệm', mode === 'sale-search' ? filteredStores.length : MOCK_STORES.length, 'text-fuchsia-200'),
  ].join('');

  const orderedPodium = [podium[1], podium[0], podium[2]].filter(Boolean);
  podiumGrid.innerHTML = orderedPodium.map(createPodiumCard).join('');

  rankingList.innerHTML = displayList.map(person => createRankingRow(person, champion?.totalStores || 1, matchedTerm)).join('');
}

// Render Card tiệm
function createStoreCard(store, index = 0) {
  const div = document.createElement('div');
  const accentRing = index === 0 ? 'border-cyan-300/35 shadow-[0_12px_35px_rgba(34,211,238,0.18)]' : 'border-white/10';
  div.className = `glass-card rounded-2xl p-6 flex flex-col h-full group cursor-pointer shadow-lg shadow-black/20 ${accentRing}`;
  div.innerHTML = `
        <div class="flex justify-between items-start gap-3 mb-4">
            <div>
              <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] ${index < 3 ? 'bg-cyan-400/10 text-cyan-200 border border-cyan-300/20' : 'bg-white/5 text-slate-300 border border-white/10'}">${`Thứ tự #${index + 1}`}</div>
              <h3 class="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">${store.salon_name}</h3>
            </div>
            <span class="px-2 py-1 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 rounded-lg border border-indigo-500/30 uppercase tracking-wider">${store.category}</span>
        </div>
        <div class="space-y-3 flex-grow">
            <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </div>
                <div><p class="text-[10px] uppercase text-slate-500 font-bold">Số điện thoại</p><p class="text-sm text-slate-200">${store.phone || 'Chưa có dữ liệu'}</p></div>
            </div>
            <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div><p class="text-[10px] uppercase text-slate-500 font-bold">Nhân viên Sale</p><p class="text-sm text-slate-200">${formatName(store.sale_person) || 'Chưa gán'}</p></div>
            </div>
        </div>
        <button class="mt-6 w-full py-2.5 px-4 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white transition-all text-sm font-semibold">
            Xem Chi Tiết
        </button>
    `;
  div.onclick = () => openDetail(store);
  return div;
}

function renderStoreResults(results, titleText = 'Kết quả tìm kiếm') {
  storeGrid.innerHTML = '';
  document.querySelector('#resultsTitle h2').textContent = titleText;

  if (results.length > 0) {
    results.forEach((store, index) => storeGrid.appendChild(createStoreCard(store, index)));
    emptyPlaceholder.classList.add('hidden');
  } else {
    emptyPlaceholder.classList.remove('hidden');
  }
}

function resetView() {
  storeGrid.innerHTML = '';
  resultsTitle.classList.add('hidden');
  emptyPlaceholder.classList.add('hidden');
  aiGlobalBtn.classList.add('hidden');
  leaderboardSection.classList.remove('hidden');
  welcomePlaceholder.classList.remove('hidden');
  renderLeaderboard(MOCK_STORES, { mode: 'overall' });
}

// Xử lý tìm kiếm
searchInput.oninput = (e) => {
  const term = e.target.value.toLowerCase().trim();

  if (!term) {
    resetView();
    return;
  }

  welcomePlaceholder.classList.add('hidden');
  resultsTitle.classList.remove('hidden');
  leaderboardSection.classList.add('hidden');

  const cleanedTerm = cleanPhone(term);
  const isNumeric = /^\d+$/.test(cleanedTerm);
  let results = [];

  if (isNumeric) {
    results = MOCK_STORES.filter(s => cleanPhone(s.phone).includes(cleanedTerm));
    renderStoreResults(results, results.length ? 'Kết quả theo số điện thoại' : 'Không có kết quả theo số điện thoại');
  } else {
    const normalizedTerm = normalizeText(term);
    results = MOCK_STORES
      .filter(s => normalizeText(s.sale_person).includes(normalizedTerm))
      .sort((a, b) => formatName(a.salon_name).localeCompare(formatName(b.salon_name), 'vi'));

    renderStoreResults(results, results.length ? `Danh sách tiệm của sale: ${searchInput.value.trim()}` : 'Không tìm thấy sale phù hợp');
  }
};

// Popup chi tiết
function openDetail(store) {
  selectedStore = store;
  modalContent.innerHTML = `
        <div><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Tên Tiệm</label><p class="text-xl text-white font-bold">${store.salon_name}</p></div>
        <div><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Chủ Tiệm</label><p class="text-xl text-white font-bold">${store.customer_name}</p></div>
        <div><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Số Điện Thoại</label><p class="text-lg text-slate-200">${store.phone || 'Chưa có dữ liệu'}</p></div>
        <div><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Nhân Viên Marketing</label><p class="text-lg text-slate-200">${store.marketing_person || 'Chưa có dữ liệu'}</p></div>
        <div><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Nhân Viên Sale</label><p class="text-lg text-slate-200">${formatName(store.sale_person) || 'Chưa gán'}</p></div>
        <div><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Thời Gian Report</label><p class="text-lg text-slate-200">${store.update || 'Chưa có dữ liệu'}</p></div>
        <div class="md:col-span-2"><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Địa Chỉ</label><p class="text-lg text-slate-200">${store.address}</p></div>
    `;
  aiDetailText.innerText = store.notes || 'Không có ghi chú thêm.';
  aiDetailText.className = 'text-slate-300 text-center text-sm italic';
  detailModal.classList.remove('hidden');
  detailModal.classList.add('flex');
}

function closeModal() {
  detailModal.classList.add('hidden');
  detailModal.classList.remove('flex');
  selectedStore = null;
}

document.getElementById('closeModal').onclick = closeModal;
document.getElementById('closeModalBtn').onclick = closeModal;

document.getElementById('closeAiInsight').onclick = () => {
  aiInsightContainer.classList.add('hidden');
};

document.getElementById('downloadPdfBtn').onclick = () => {
  if (!selectedStore?.link) return;

  const a = document.createElement('a');
  a.href = selectedStore.link;
  a.setAttribute('download', '');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

resetView();

