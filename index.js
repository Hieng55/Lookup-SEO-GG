const removeVietnameseTones = (str = '') => {
    return str
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };
  
  const normalizeText = (value = '') => removeVietnameseTones(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  const formatName = (value = '') => removeVietnameseTones(value)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
  
  const cleanPhone = (value = '') => value.toString().replace(/[^\d]/g, '');
  
  const escapeHTML = (value = '') => value
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  
  const rawStores = typeof MOCK_STORES !== 'undefined' && Array.isArray(MOCK_STORES)
    ? MOCK_STORES
    : [];
  
  // data.js hiện có thể chứa các mảng lồng nhau. Luôn làm phẳng toàn bộ để không bỏ sót lần cập nhật.
  const stores = rawStores
    .flat(Infinity)
    .filter((item) => item && typeof item === 'object' && !Array.isArray(item));
  
  const NOTIFICATION_STORAGE_KEY = 'td-feature-notifications-v4';
  const UNASSIGNED_SALE_KEYS = new Set([
    '',
    'chua gan',
    'chua co du lieu',
    'none',
    'null',
    'undefined',
    'n a',
    'na',
  ]);
  
  const SALE_ALIASES = new Map([
    ['tai', 'Thanh Tai'],
    ['thanh tai', 'Thanh Tai'],
    ['john', 'John Thai'],
    ['john thai', 'John Thai'],
  ]);
  
  function canonicalizeSaleName(value = '') {
    const key = normalizeText(value);
    if (UNASSIGNED_SALE_KEYS.has(key)) return 'Chưa gán';
    return SALE_ALIASES.get(key) || formatName(value) || 'Chưa gán';
  }
  
  function hasAssignedSale(value = '') {
    return canonicalizeSaleName(value) !== 'Chưa gán';
  }
  
  function canonicalizeStoreStatus(value = '') {
    const key = normalizeText(value);
    return ['cancel', 'cancelled', 'canceled', 'huy', 'da huy'].includes(key) ? 'cancel' : 'active';
  }
  
  function isCancelledStore(store) {
    return canonicalizeStoreStatus(store?.status) === 'cancel';
  }
  
  function parseDateValue(value = '') {
    const input = value.toString().trim();
    if (!input) return 0;
  
    const numericDate = input.match(/^(\d{1,4})[\/-](\d{1,2})[\/-](\d{1,4})$/);
    if (numericDate) {
      const [, first, second, third] = numericDate;
      let year;
      let month;
      let day;
  
      if (first.length === 4) {
        year = Number(first);
        month = Number(second);
        day = Number(third);
      } else {
        // Dữ liệu tiệm đang dùng định dạng Mỹ MM/DD/YYYY.
        month = Number(first);
        day = Number(second);
        year = Number(third.length === 2 ? `20${third}` : third);
      }
  
      const timestamp = new Date(year, month - 1, day).getTime();
      return Number.isNaN(timestamp) ? 0 : timestamp;
    }
  
    const timestamp = Date.parse(input);
    return Number.isNaN(timestamp) ? 0 : timestamp;
  }
  
  function compareUpdateDates(a = '', b = '') {
    return parseDateValue(b) - parseDateValue(a);
  }
  
  function getSalonKey(name = '') {
    return normalizeText(name);
  }
  
  function getAddressKey(address = '') {
    return normalizeText(address);
  }
  
  function getStoreIdentityKey(store, index = 0) {
    const salonKey = getSalonKey(store?.salon_name);
    const addressKey = getAddressKey(store?.address);
  
    // Chỉ xác nhận cùng một tiệm khi cả tên và địa chỉ đều trùng.
    // Nếu thiếu địa chỉ, giữ lần cập nhật riêng để tránh tính renew nhầm với các tên phổ biến.
    if (salonKey && addressKey) return `salon:${salonKey}|address:${addressKey}`;
    return `record:${store?.id ?? index}|salon:${salonKey || 'unknown'}`;
  }
  
  function stableHash(value = '') {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }
  
  function sortEntriesByOldest(entries) {
    return [...entries].sort((a, b) => {
      const dateDifference = parseDateValue(a.store.update) - parseDateValue(b.store.update);
      return dateDifference || a.index - b.index;
    });
  }
  
  function sortEntriesByLatest(entries) {
    return [...entries].sort((a, b) => {
      const dateDifference = compareUpdateDates(a.store.update, b.store.update);
      return dateDifference || b.index - a.index;
    });
  }
  
  function buildStoreMetadata(storeList) {
    const groups = new Map();
  
    storeList.forEach((store, index) => {
      const identityKey = getStoreIdentityKey(store, index);
      if (!groups.has(identityKey)) groups.set(identityKey, []);
      groups.get(identityKey).push({ store, index });
    });
  
    const metadata = new WeakMap();
    const renewGroups = [];
    const entities = [];
  
    groups.forEach((entries, identityKey) => {
      const sortedEntries = sortEntriesByOldest(entries);
      const latestEntries = sortEntriesByLatest(entries);
      const latestEntry = latestEntries[0];
      const latestAssignedEntry = latestEntries.find(({ store }) => hasAssignedSale(store.sale_person));
      const canonicalSale = canonicalizeSaleName(latestAssignedEntry?.store.sale_person || '');
      const addressKey = getAddressKey(latestEntry?.store.address);
      const isCancelled = latestEntries.some(({ store }) => isCancelledStore(store));
      const isRenew = entries.length > 1 && Boolean(addressKey);
      const renewCount = isRenew ? entries.length - 1 : 0;
  
      const entity = {
        identityKey,
        salonKey: getSalonKey(latestEntry?.store.salon_name),
        salonName: latestEntry?.store.salon_name || entries[0]?.store.salon_name || 'Chưa có tên tiệm',
        address: latestEntry?.store.address || entries[0]?.store.address || '',
        canonicalSale,
        status: isCancelled ? 'cancel' : 'active',
        isCancelled,
        totalRecords: entries.length,
        renewCount,
        latestUpdate: latestEntry?.store.update || '',
        representative: latestEntry?.store || entries[0]?.store,
        entries: entries.map(({ store }) => store),
      };
  
      entities.push(entity);
  
      sortedEntries.forEach((entry, sequenceIndex) => {
        metadata.set(entry.store, {
          identityKey,
          salonKey: entity.salonKey,
          addressKey,
          canonicalSale,
          status: isCancelled ? 'cancel' : 'active',
          isCancelled,
          isRenew,
          renewCount,
          totalRecords: entries.length,
          sequence: sequenceIndex + 1,
          isOriginalRecord: sequenceIndex === 0,
          isLatestRecord: entry === latestEntry,
        });
      });
  
      if (isRenew) {
        renewGroups.push({
          ...entity,
          salePeople: [...new Set(entries
            .map(({ store }) => canonicalizeSaleName(store.sale_person))
            .filter((name) => name !== 'Chưa gán'))],
        });
      }
    });
  
    renewGroups.sort((a, b) => {
      const dateDifference = compareUpdateDates(a.latestUpdate, b.latestUpdate);
      if (dateDifference) return dateDifference;
      if (b.renewCount !== a.renewCount) return b.renewCount - a.renewCount;
      return a.salonName.localeCompare(b.salonName, 'vi');
    });
  
    entities.sort((a, b) => {
      const dateDifference = compareUpdateDates(a.latestUpdate, b.latestUpdate);
      if (dateDifference) return dateDifference;
      return a.salonName.localeCompare(b.salonName, 'vi');
    });
  
    return {
      metadata,
      renewGroups,
      entities,
      uniqueStoreCount: groups.size,
      unassignedEntities: entities.filter((entity) => entity.canonicalSale === 'Chưa gán'),
    };
  }
  
  const storeAnalysis = buildStoreMetadata(stores);
  const storeMetadata = storeAnalysis.metadata;
  const renewGroups = storeAnalysis.renewGroups;
  const storeEntities = storeAnalysis.entities;
  const unassignedEntities = storeAnalysis.unassignedEntities;
  
  function getRenewSummary() {
    const renewTransactions = renewGroups.reduce((total, group) => total + group.renewCount, 0);
    const renewRecords = renewGroups.reduce((total, group) => total + group.totalRecords, 0);
    const renewRate = storeAnalysis.uniqueStoreCount
      ? Math.round((renewGroups.length / storeAnalysis.uniqueStoreCount) * 100)
      : 0;
  
    return {
      renewTransactions,
      renewRecords,
      renewSalons: renewGroups.length,
      renewRate,
      latestRenew: renewGroups[0] || null,
    };
  }
  
  const renewSummary = getRenewSummary();
  
  function getEntitiesForStores(storeList) {
    const selectedStores = new Set(storeList);
    return storeEntities.filter((entity) => entity.entries.some((store) => selectedStores.has(store)));
  }
  
  function buildLeaderboardData(storeList) {
    const entities = getEntitiesForStores(storeList);
    const grouped = entities.reduce((accumulator, entity) => {
      const name = entity.canonicalSale;
      if (name === 'Chưa gán') return accumulator;
  
      const key = normalizeText(name);
      if (!accumulator[key]) {
        accumulator[key] = {
          key,
          name,
          totalStores: 0,
          renewCount: 0,
          categories: new Set(),
          latestUpdate: '',
        };
      }
  
      accumulator[key].totalStores += 1;
      accumulator[key].renewCount += entity.renewCount;
      entity.entries.forEach((store) => {
        if (store.category) accumulator[key].categories.add(store.category);
      });
  
      if (entity.latestUpdate && compareUpdateDates(accumulator[key].latestUpdate, entity.latestUpdate) > 0) {
        accumulator[key].latestUpdate = entity.latestUpdate;
      } else if (!accumulator[key].latestUpdate && entity.latestUpdate) {
        accumulator[key].latestUpdate = entity.latestUpdate;
      }
  
      return accumulator;
    }, {});
  
    return Object.values(grouped)
      .map((item) => ({ ...item, categories: item.categories.size }))
      .sort((a, b) => {
        if (b.totalStores !== a.totalStores) return b.totalStores - a.totalStores;
        if (b.renewCount !== a.renewCount) return b.renewCount - a.renewCount;
        return a.name.localeCompare(b.name, 'vi');
      })
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }
  
  // UI elements
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const searchSubmitBtn = document.getElementById('aiGlobalBtn');
  const storeGrid = document.getElementById('storeGrid');
  const resultsTitle = document.getElementById('resultsTitle');
  const resultsCount = document.getElementById('resultsCount');
  const welcomePlaceholder = document.getElementById('welcomePlaceholder');
  const emptyPlaceholder = document.getElementById('emptyPlaceholder');
  const emptyMessage = document.getElementById('emptyMessage');
  const aiInsightContainer = document.getElementById('aiInsightContainer');
  const leaderboardSection = document.getElementById('leaderboardSection');
  const renewSection = document.getElementById('renewSection');
  const unassignedSection = document.getElementById('unassignedSection');
  const detailModal = document.getElementById('detailModal');
  const modalContent = document.getElementById('modalContent');
  const aiDetailText = document.getElementById('aiDetailText');
  const notificationBell = document.getElementById('notificationBell');
  const notificationDot = document.getElementById('notificationDot');
  const notificationPanel = document.getElementById('notificationPanel');
  const notificationList = document.getElementById('notificationList');
  const notificationCount = document.getElementById('notificationCount');
  const latestUpdateLabel = document.getElementById('latestUpdateLabel');
  const saleFilterBar = document.getElementById('saleFilterBar');
  const selectedSaleFilterName = document.getElementById('selectedSaleFilterName');
  const saleStatusFilters = document.getElementById('saleStatusFilters');
  
  let selectedStore = null;
  let searchTimer = null;
  let selectedRankingSale = '';
  let selectedSaleStatus = 'all';
  
  function createMetricCard(label, value, accent, note = '') {
    return `
      <div class="metric-card rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
        <p class="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">${escapeHTML(label)}</p>
        <p class="text-2xl font-bold ${accent}">${escapeHTML(value)}</p>
        ${note ? `<p class="mt-1 text-xs text-slate-500">${escapeHTML(note)}</p>` : ''}
      </div>
    `;
  }
  
  function renderRenewSummary() {
    const stats = document.getElementById('renewStats');
    const list = document.getElementById('renewList');
    const latest = document.getElementById('latestRenewText');
  
    if (!stats || !list || !latest) return;
  
    stats.innerHTML = [
      createMetricCard('Lượt renew', renewSummary.renewTransactions, 'text-emerald-300', 'Không tính lần đăng ký đầu tiên'),
      createMetricCard('Tiệm đã renew', renewSummary.renewSalons, 'text-cyan-200', `${renewSummary.renewRecords} lần cập nhật liên quan`),
      createMetricCard('Tỷ lệ renew', `${renewSummary.renewRate}%`, 'text-fuchsia-200', 'Trên tổng số tiệm đang quản lý'),
      createMetricCard('Tổng lượt cập nhật', stores.length, 'text-white', `${storeAnalysis.uniqueStoreCount} tiệm thực tế đang được theo dõi`),
    ].join('');
  
    latest.textContent = renewSummary.latestRenew
      ? `${renewSummary.latestRenew.salonName} • ${renewSummary.latestRenew.latestUpdate || 'Chưa có ngày cập nhật'}`
      : 'Chưa có tiệm nào được ghi nhận Renew';
  
    if (!renewGroups.length) {
      list.innerHTML = `
        <div class="col-span-full rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-6 text-center text-sm text-slate-400">
          Chưa có tiệm nào được ghi nhận Renew.
        </div>
      `;
      return;
    }
  
    list.innerHTML = renewGroups.slice(0, 6).map((group, index) => `
      <button type="button" class="renew-list-item text-left rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-emerald-300/30 hover:bg-emerald-400/[0.07]" data-renew-key="${escapeHTML(group.identityKey)}">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="flex items-center gap-2 mb-2">
              <span class="renew-pill">Renew</span>
              <span class="text-[10px] uppercase tracking-[0.18em] text-slate-500">#${index + 1}</span>
            </div>
            <h3 class="truncate font-semibold text-white">${escapeHTML(group.salonName)}</h3>
            <p class="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">${escapeHTML(group.address || 'Chưa có địa chỉ')}</p>
            <p class="mt-1 truncate text-xs text-emerald-200/75">Sale: ${escapeHTML(group.canonicalSale)}</p>
          </div>
          <div class="shrink-0 text-right">
            <strong class="block text-xl text-emerald-300">${group.renewCount}</strong>
            <span class="text-[10px] uppercase tracking-[0.16em] text-slate-500">lượt</span>
          </div>
        </div>
        <div class="mt-3 flex items-center justify-between gap-3 border-t border-white/5 pt-3 text-xs text-slate-500">
          <span>${group.totalRecords} lần cập nhật</span>
          <span>${escapeHTML(group.latestUpdate || 'Chưa có ngày')}</span>
        </div>
      </button>
    `).join('');
  
    list.querySelectorAll('[data-renew-key]').forEach((button) => {
      button.addEventListener('click', () => {
        const group = renewGroups.find((item) => item.identityKey === button.dataset.renewKey);
        if (!group) return;
        searchInput.value = `${group.salonName} ${group.address}`.trim();
        runSearch();
        document.getElementById('resultsTitle')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
  
  function renderUnassignedSummary() {
    const count = document.getElementById('unassignedCount');
    const list = document.getElementById('unassignedList');
    const subtitle = document.getElementById('unassignedSubtitle');
  
    if (!count || !list || !subtitle) return;
  
    count.textContent = `${unassignedEntities.length} tiệm`;
    subtitle.textContent = unassignedEntities.length
      ? `Có ${unassignedEntities.length} tiệm chưa được phân công sale.`
      : `Đã kiểm tra ${storeAnalysis.uniqueStoreCount} tiệm. Hiện tất cả tiệm đều đã được phân công sale.`;
  
    if (!unassignedEntities.length) {
      list.innerHTML = `
        <div class="col-span-full flex items-center gap-3 rounded-2xl border border-emerald-300/15 bg-emerald-400/[0.06] p-4 text-sm text-emerald-100/80">
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </span>
          <span>Tất cả tiệm hiện tại đều đã có sale phụ trách. Khi có tiệm chưa được phân công, thông tin sẽ tự động xuất hiện tại đây.</span>
        </div>
      `;
      return;
    }
  
    list.innerHTML = unassignedEntities.map((entity) => {
      const store = entity.representative;
      return `
        <button type="button" class="unassigned-store text-left rounded-2xl border border-amber-300/15 bg-amber-400/[0.05] p-4 transition-all hover:border-amber-300/35 hover:bg-amber-400/[0.09]" data-store-id="${escapeHTML(store?.id ?? '')}">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <h3 class="font-semibold text-white">${escapeHTML(entity.salonName)}</h3>
              <p class="mt-1 text-xs leading-5 text-slate-400">${escapeHTML(entity.address || 'Chưa có địa chỉ')}</p>
            </div>
            <span class="standard-tab border-amber-300/20 bg-amber-400/10 text-amber-200">Chưa gắn</span>
          </div>
          <div class="mt-3 grid grid-cols-1 gap-1 border-t border-white/5 pt-3 text-xs text-slate-500 sm:grid-cols-2">
            <span>Chủ: ${escapeHTML(store?.customer_name || 'Chưa có dữ liệu')}</span>
            <span>SĐT: ${escapeHTML(store?.phone || 'Chưa có dữ liệu')}</span>
            <span>Cập nhật: ${escapeHTML(store?.update || 'Chưa có dữ liệu')}</span>
            <span>ID: ${escapeHTML(store?.id ?? 'N/A')}</span>
          </div>
        </button>
      `;
    }).join('');
  
    list.querySelectorAll('[data-store-id]').forEach((button) => {
      button.addEventListener('click', () => {
        const entity = unassignedEntities.find((item) => String(item.representative?.id ?? '') === button.dataset.storeId);
        if (entity?.representative) openDetail(entity.representative);
      });
    });
  }
  
  function getRankStyle(rank) {
    if (rank === 1) {
      return {
        badge: 'bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-500 text-slate-950 shadow-[0_0_45px_rgba(251,191,36,0.35)] border border-yellow-100/60',
        ring: 'border-yellow-300/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(251,191,36,0.08),rgba(255,255,255,0.06))] shadow-[0_25px_80px_rgba(251,191,36,0.15)]',
        text: 'text-yellow-100',
        subtext: 'text-amber-100/80',
        cap: 'bg-gradient-to-r from-yellow-100/85 via-amber-300/70 to-yellow-500/75',
        bar: 'from-yellow-200 via-amber-400 to-yellow-500',
        aura: 'bg-amber-300/20',
        height: 'md:min-h-[320px]',
        icon: '👑',
        label: 'Gold Champion',
      };
    }
  
    if (rank === 2) {
      return {
        badge: 'bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 text-slate-950 border border-white/50',
        ring: 'border-slate-200/30 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(203,213,225,0.08),rgba(255,255,255,0.04))] shadow-[0_22px_70px_rgba(148,163,184,0.12)]',
        text: 'text-slate-50',
        subtext: 'text-slate-200/75',
        cap: 'bg-gradient-to-r from-slate-100/80 via-slate-300/70 to-slate-400/65',
        bar: 'from-slate-100 via-slate-300 to-slate-400',
        aura: 'bg-slate-200/15',
        height: 'md:min-h-[275px]',
        icon: '🥈',
        label: 'Silver Elite',
      };
    }
  
    return {
      badge: 'bg-gradient-to-r from-orange-200 via-amber-500 to-orange-700 text-slate-950 border border-orange-100/35',
      ring: 'border-orange-300/25 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(251,146,60,0.09),rgba(120,53,15,0.08))] shadow-[0_18px_60px_rgba(251,146,60,0.11)]',
      text: 'text-orange-100',
      subtext: 'text-orange-100/70',
      cap: 'bg-gradient-to-r from-orange-100/70 via-amber-500/65 to-orange-700/70',
      bar: 'from-orange-200 via-amber-500 to-orange-700',
      aura: 'bg-orange-300/15',
      height: 'md:min-h-[245px]',
      icon: '🥉',
      label: 'Bronze Power',
    };
  }
  
  function getSaleTrendClass(name) {
    if (name === 'Thuy Duyen' || name === 'Ngan') return 'sale-trend-up';
    if (name === 'John Thai') return 'sale-trend-down';
    return '';
  }
  
  function getSaleTrendIcon(name) {
    const trend = getSaleTrendClass(name);
    if (!trend) return '';
  
    const isUp = trend === 'sale-trend-up';
    return `
      <div class="sale-trend-icon" title="${isUp ? 'Tăng trưởng' : 'Đi xuống'}">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="${isUp ? 'M10 46 L25 31 L36 38 L54 18' : 'M10 18 L25 33 L36 26 L54 46'}"></path>
          <path d="${isUp ? 'M43 18 H54 V29' : 'M43 46 H54 V35'}"></path>
        </svg>
      </div>
    `;
  }
  
  function createPodiumCard(person) {
    const style = getRankStyle(person.rank);
    const delayClass = person.rank === 2 ? 'podium-delay-2' : person.rank === 3 ? 'podium-delay-3' : '';
    const crownClass = person.rank === 1 ? 'crown-animated' : '';
  
    return `
      <article class="podium-card podium-animated ${getSaleTrendClass(person.name)} ${delayClass} rounded-[28px] border ${style.ring} p-5 md:p-6 ${style.height} relative overflow-hidden flex flex-col justify-between">
        <div class="absolute -top-10 right-[-20px] w-32 h-32 ${style.aura} blur-3xl rounded-full pointer-events-none"></div>
        <div class="absolute inset-x-6 top-0 h-1 rounded-b-full ${style.cap}"></div>
        <div class="flex items-start justify-between gap-3 relative">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${style.badge}">
              <span class="${crownClass}">${style.icon}</span><span>TOP ${person.rank}</span>
            </div>
            <p class="mt-3 text-[11px] uppercase tracking-[0.28em] ${style.subtext}">${style.label}</p>
          </div>
          <div class="text-right">
            <div class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Stores</div>
            <div class="text-4xl font-extrabold text-white leading-none">${person.totalStores}</div>
          </div>
        </div>
        <div class="relative mt-8">
          <h3 class="text-xl md:text-2xl font-bold ${style.text} leading-tight">${escapeHTML(person.name)}</h3>
          ${getSaleTrendIcon(person.name)}
          <p class="text-sm mt-2 ${style.subtext}">${person.categories} danh mục • ${person.renewCount} renew</p>
          <p class="text-xs mt-1 text-slate-500">Cập nhật ${escapeHTML(person.latestUpdate || 'N/A')}</p>
        </div>
        <div class="relative mt-6">
          <div class="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
            <div class="h-full rounded-full bg-gradient-to-r ${style.bar}" style="width:${Math.min(100, Math.max(18, person.totalStores * 6))}%"></div>
          </div>
        </div>
      </article>
    `;
  }
  
  function createRankingRow(person, topCount, matchedTerm = '') {
    const isTop3 = person.rank <= 3;
    const isMatched = matchedTerm && normalizeText(person.name).includes(matchedTerm);
    const isSelected = selectedRankingSale === person.key;
    const rowStyle = isSelected
      ? 'border-cyan-300/55 bg-gradient-to-r from-cyan-400/15 via-indigo-400/10 to-fuchsia-400/10 shadow-[0_16px_45px_rgba(34,211,238,0.12)]'
      : isMatched
        ? 'border-cyan-300/45 bg-cyan-400/10'
        : 'border-white/10 bg-white/5';
  
    return `
      <article
        class="ranking-sale-item group cursor-pointer rounded-2xl border ${rowStyle} p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
        data-sale-key="${escapeHTML(person.key)}"
        role="button"
        tabindex="0"
        aria-label="Xem ${person.totalStores} tiệm do sale ${escapeHTML(person.name)} quản lý"
        aria-pressed="${isSelected ? 'true' : 'false'}">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-4 min-w-0">
            <div class="w-12 h-12 rounded-2xl ${isTop3 ? 'bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-cyan-300 text-slate-950' : 'bg-white/10 text-white'} flex items-center justify-center font-extrabold text-lg shadow-lg shrink-0">${person.rank}</div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="text-base md:text-lg font-bold text-white truncate">${escapeHTML(person.name)}</h4>
                ${isSelected ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] bg-cyan-400/15 text-cyan-100 border border-cyan-300/30">đang xem</span>' : ''}
                ${isMatched && !isSelected ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] bg-cyan-400/15 text-cyan-200 border border-cyan-300/20">đang tìm</span>' : ''}
                ${person.renewCount ? `<span class="renew-pill">${person.renewCount} renew</span>` : ''}
              </div>
              <p class="text-sm text-slate-400">${person.categories} danh mục • ${escapeHTML(person.latestUpdate || 'Chưa có ngày update')}</p>
              <p class="mt-1 flex items-center gap-1 text-xs font-medium ${isSelected ? 'text-cyan-200' : 'text-slate-500 group-hover:text-cyan-200'} transition-colors">
                <span>Bấm để xem danh sách tiệm</span>
                <svg class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6-6 6 6-6 6"/></svg>
              </p>
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
      </article>
    `;
  }
  
  function renderLeaderboard(filteredStores = stores, options = {}) {
    const { mode = 'overall', matchedTerm = '' } = options;
    const activeData = buildLeaderboardData(filteredStores);
  
    if (!activeData.length || mode === 'hidden') {
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
  
    const selectedPerson = activeData.find((person) => person.key === selectedRankingSale);
    subtitle.textContent = selectedPerson
      ? `Đang hiển thị ${selectedPerson.totalStores} tiệm do ${selectedPerson.name} quản lý. Bấm sale khác để chuyển nhanh.`
      : mode === 'sale-search'
        ? `Bảng xếp hạng thu gọn theo kết quả “${searchInput.value.trim()}”.`
        : 'Toàn bộ hệ thống được sắp xếp theo số lượng tiệm từ cao xuống thấp. Bấm vào một sale để xem danh sách tiệm.';
  
    stats.innerHTML = [
      createMetricCard('Dẫn đầu', champion?.name || 'N/A', 'text-cyan-200'),
      createMetricCard('Tổng sale', activeData.length, 'text-white'),
      createMetricCard('Tổng tiệm', getEntitiesForStores(filteredStores).length, 'text-fuchsia-200'),
    ].join('');
  
    const orderedPodium = [podium[1], podium[0], podium[2]].filter(Boolean);
    podiumGrid.innerHTML = orderedPodium.map(createPodiumCard).join('');
    rankingList.innerHTML = activeData
      .map((person) => createRankingRow(person, champion?.totalStores || 1, matchedTerm))
      .join('');
  }
  
  function getEntitySearchDocument(entity) {
    const canonicalSale = entity.canonicalSale || 'Chưa gán';
    const isUnassigned = canonicalSale === 'Chưa gán';
    const joinNormalized = (field) => normalizeText(entity.entries
      .map((store) => store?.[field] || '')
      .filter(Boolean)
      .join(' '));
    const joinPhones = () => entity.entries
      .map((store) => cleanPhone(store?.phone || ''))
      .filter(Boolean)
      .join(' ');
  
    // Tìm trên toàn bộ lịch sử lần cập nhật của một tiệm, nhưng chỉ trả về một card đại diện.
    return {
      salon: joinNormalized('salon_name'),
      sale: normalizeText(canonicalSale),
      rawSale: joinNormalized('sale_person'),
      phone: joinPhones(),
      customer: joinNormalized('customer_name'),
      marketing: joinNormalized('marketing_person'),
      address: joinNormalized('address'),
      category: joinNormalized('category'),
      update: joinNormalized('update'),
      notes: joinNormalized('notes'),
      renew: entity.renewCount > 0 ? 'renew gia han' : '',
      cancel: entity.isCancelled ? 'cancel cancelled canceled huy da huy' : '',
      unassigned: isUnassigned ? 'chua gan sale chua co sale unassigned' : '',
    };
  }
  
  const searchableStores = storeEntities.map((entity, originalIndex) => ({
    store: entity.representative,
    entity,
    originalIndex,
    document: getEntitySearchDocument(entity),
  }));
  
  // Danh sách sale hợp lệ dùng để nhận biết khi người dùng đang tìm đúng tên một sale.
  // Khi đã khớp tên sale, chỉ trả về đúng nhóm đó thay vì tìm gần đúng theo từng từ.
  const exactSaleKeys = new Set(
    storeEntities
      .map((entity) => normalizeText(entity.canonicalSale))
      .filter((key) => key && key !== normalizeText('Chưa gán')),
  );
  
  function resolveExactSaleKey(value = '') {
    const rawKey = normalizeText(value);
    if (!rawKey) return '';
  
    const aliasName = SALE_ALIASES.get(rawKey);
    const canonicalKey = normalizeText(aliasName || canonicalizeSaleName(value));
    return exactSaleKeys.has(canonicalKey) ? canonicalKey : '';
  }
  
  function calculateSearchScore(item, rawTerm) {
    const term = normalizeText(rawTerm);
    const phoneTerm = cleanPhone(rawTerm);
    const tokens = term.split(' ').filter(Boolean);
    const fields = item.document;
    let score = 0;
  
    if (!term && !phoneTerm) return -1;
  
    if (phoneTerm && fields.phone.includes(phoneTerm)) {
      score += fields.phone === phoneTerm ? 180 : 100;
    }
  
    if (term === 'renew' || term === 'gia han') {
      return fields.renew ? 220 : -1;
    }
  
    if (['cancel', 'cancelled', 'canceled', 'huy', 'da huy'].includes(term)) {
      return fields.cancel ? 225 : -1;
    }
  
    if (['chua gan sale', 'chua gan', 'unassigned', 'chua co sale'].includes(term)) {
      return fields.unassigned ? 230 : -1;
    }
  
    const weightedFields = [
      ['salon', 90],
      ['sale', 75],
      ['rawSale', 48],
      ['customer', 58],
      ['marketing', 45],
      ['category', 38],
      ['address', 32],
      ['update', 25],
      ['notes', 20],
      ['renew', 65],
      ['cancel', 72],
      ['unassigned', 70],
    ];
  
    weightedFields.forEach(([fieldName, weight]) => {
      const fieldValue = fields[fieldName];
      if (!fieldValue) return;
  
      if (fieldValue === term) score += weight + 80;
      else if (fieldValue.startsWith(term)) score += weight + 45;
      else if (fieldValue.includes(term)) score += weight;
  
      tokens.forEach((token) => {
        if (fieldValue.includes(token)) score += Math.max(5, Math.round(weight / 4));
      });
    });
  
    const allTokensMatched = tokens.length > 0 && tokens.every((token) => (
      Object.values(fields).some((fieldValue) => fieldValue.includes(token))
    ));
  
    if (allTokensMatched) score += 35;
    return score > 0 ? score : -1;
  }
  
  function searchStores(term) {
    const exactSaleKey = resolveExactSaleKey(term);
  
    if (exactSaleKey) {
      return searchableStores
        .filter((item) => normalizeText(item.entity.canonicalSale) === exactSaleKey)
        .sort((a, b) => {
          const updateDifference = compareUpdateDates(a.store.update, b.store.update);
          if (updateDifference) return updateDifference;
          return (a.store.salon_name || '').localeCompare(b.store.salon_name || '', 'vi');
        })
        .map((item) => item.store);
    }
  
    return searchableStores
      .map((item) => ({ ...item, score: calculateSearchScore(item, term) }))
      .filter((item) => item.score >= 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const updateDifference = compareUpdateDates(a.store.update, b.store.update);
        if (updateDifference) return updateDifference;
        return (a.store.salon_name || '').localeCompare(b.store.salon_name || '', 'vi');
      })
      .map((item) => item.store);
  }
  
  function createStoreCard(store, index = 0) {
    const div = document.createElement('article');
    const metadata = storeMetadata.get(store);
    const accentRing = metadata?.isCancelled
      ? 'border-rose-400/35 shadow-[0_16px_45px_rgba(244,63,94,0.12)]'
      : index === 0
        ? 'border-cyan-300/35 shadow-[0_16px_45px_rgba(34,211,238,0.13)]'
        : 'border-white/10';
  
    div.className = `glass-card store-card rounded-2xl p-6 flex flex-col h-full group cursor-pointer ${accentRing}`;
    div.tabIndex = 0;
    div.setAttribute('role', 'button');
    div.setAttribute('aria-label', `Xem chi tiết ${store.salon_name || 'tiệm'}`);
  
    div.innerHTML = `
      <div class="flex justify-between items-start gap-3 mb-5">
        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-2 mb-3">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em] ${index < 3 ? 'bg-cyan-400/10 text-cyan-200 border border-cyan-300/20' : 'bg-white/5 text-slate-300 border border-white/10'}">#${index + 1}</span>
            ${metadata?.isCancelled
              ? '<span class="cancel-tab">Cancel</span>'
              : metadata?.isRenew
                ? `<span class="renew-tab" title="Tiệm này xuất hiện ${metadata.totalRecords} lần với cùng tên và địa chỉ">Renew <strong>${metadata.renewCount}</strong></span>`
                : ''}
            ${!metadata?.isCancelled && metadata?.isLatestRecord && metadata?.isRenew ? '<span class="latest-tab">Mới nhất</span>' : ''}
          </div>
          <h3 class="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors line-clamp-2">${escapeHTML(store.salon_name || 'Chưa có tên tiệm')}</h3>
        </div>
        <span class="shrink-0 px-2 py-1 text-[10px] font-semibold bg-indigo-500/20 text-indigo-200 rounded-lg border border-indigo-500/30 uppercase tracking-wider">${escapeHTML(store.category || 'N/A')}</span>
      </div>
  
      <div class="space-y-4 flex-grow">
        <div class="flex items-center gap-3">
          <div class="icon-box bg-emerald-500/10 text-emerald-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.04 11.04 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          </div>
          <div class="min-w-0"><p class="field-label">Số điện thoại</p><p class="truncate text-sm text-slate-200">${escapeHTML(store.phone || 'Chưa có dữ liệu')}</p></div>
        </div>
        <div class="flex items-center gap-3">
          <div class="icon-box bg-blue-500/10 text-blue-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </div>
          <div class="min-w-0"><p class="field-label">Nhân viên Sale</p><p class="truncate text-sm text-slate-200">${escapeHTML(metadata?.canonicalSale || canonicalizeSaleName(store.sale_person))}</p></div>
        </div>
        <div class="flex items-center gap-3">
          <div class="icon-box bg-fuchsia-500/10 text-fuchsia-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3M5 11h14M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>
          </div>
          <div class="min-w-0"><p class="field-label">Cập nhật</p><p class="truncate text-sm text-slate-200">${escapeHTML(store.update || 'Chưa có dữ liệu')}</p></div>
        </div>
      </div>
  
      ${metadata?.isCancelled ? `
        <div class="mt-5 rounded-xl border border-rose-300/15 bg-rose-400/[0.07] px-3 py-2.5 text-xs text-rose-100/85">
          Tiệm này đã ngừng sử dụng dịch vụ và được đánh dấu <strong class="text-rose-200">Cancel</strong>.
        </div>
      ` : metadata?.isRenew ? `
        <div class="mt-5 rounded-xl border border-emerald-300/10 bg-emerald-400/[0.06] px-3 py-2.5 text-xs text-emerald-100/80">
          Tiệm này đã quay lại gia hạn <strong class="text-emerald-200">${metadata.renewCount} lần</strong>.
        </div>
      ` : ''}
  
      <button type="button" class="mt-5 w-full py-2.5 px-4 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white transition-all text-sm font-semibold">
        Xem Chi Tiết
      </button>
    `;
  
    const open = () => openDetail(store);
    div.addEventListener('click', open);
    div.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  
    return div;
  }
  
  function renderStoreResults(results, titleText = 'Kết quả tìm kiếm') {
    storeGrid.innerHTML = '';
    resultsTitle.classList.remove('hidden');
    resultsTitle.classList.add('flex');
    document.querySelector('#resultsTitle h2').textContent = titleText;
  
    // Lớp bảo vệ cuối: dù nơi khác truyền vào các lần cập nhật thô bị trùng,
    // mỗi identityKey vẫn chỉ được render đúng một card.
    const uniqueResults = [...new Map(results.map((store, index) => {
      const key = storeMetadata.get(store)?.identityKey || getStoreIdentityKey(store, index);
      return [key, store];
    })).values()];
  
    resultsCount.textContent = `${uniqueResults.length} tiệm`;
  
    if (uniqueResults.length) {
      const fragment = document.createDocumentFragment();
      uniqueResults.forEach((store, index) => fragment.appendChild(createStoreCard(store, index)));
      storeGrid.appendChild(fragment);
      emptyPlaceholder.classList.add('hidden');
    } else {
      emptyMessage.textContent = 'Không tìm thấy tiệm phù hợp. Hãy thử tên tiệm, sale, số điện thoại, chủ tiệm, địa chỉ hoặc trạng thái Renew/Cancel.';
      emptyPlaceholder.classList.remove('hidden');
    }
  }
  
  function getSaleStatusCounts(entities) {
    return entities.reduce((counts, entity) => {
      counts.all += 1;
      if (entity.isCancelled) counts.cancel += 1;
      else if (entity.renewCount > 0) counts.renew += 1;
      else counts.new += 1;
      return counts;
    }, { all: 0, new: 0, renew: 0, cancel: 0 });
  }
  
  function filterSaleEntities(entities, status) {
    if (status === 'cancel') return entities.filter((entity) => entity.isCancelled);
    if (status === 'renew') return entities.filter((entity) => !entity.isCancelled && entity.renewCount > 0);
    if (status === 'new') return entities.filter((entity) => !entity.isCancelled && entity.renewCount === 0);
    return entities;
  }
  
  function getSaleFilterTitle(saleName, status) {
    if (status === 'renew') return `Tiệm Renew của ${saleName}`;
    if (status === 'cancel') return `Tiệm Cancel của ${saleName}`;
    if (status === 'new') return `Tiệm mới do ${saleName} quản lý`;
    return `Các tiệm do ${saleName} quản lý`;
  }
  
  function renderSaleFilterBar(saleName, entities) {
    if (!saleFilterBar || !saleStatusFilters) return;
  
    const counts = getSaleStatusCounts(entities);
    saleFilterBar.classList.remove('hidden');
    if (selectedSaleFilterName) selectedSaleFilterName.textContent = saleName;
  
    saleStatusFilters.querySelectorAll('[data-sale-filter]').forEach((button) => {
      const filter = button.dataset.saleFilter || 'all';
      const isActive = filter === selectedSaleStatus;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', isActive ? 'true' : 'false');
      const countElement = button.querySelector(`[data-filter-count="${filter}"]`);
      if (countElement) countElement.textContent = counts[filter] ?? 0;
    });
  }
  
  function getSaleEntitiesByKey(saleKey) {
    return storeEntities
      .filter((entity) => normalizeText(entity.canonicalSale) === saleKey)
      .sort((a, b) => {
        const dateDifference = compareUpdateDates(a.latestUpdate, b.latestUpdate);
        if (dateDifference) return dateDifference;
        return a.salonName.localeCompare(b.salonName, 'vi');
      });
  }
  
  function showStoresByRankingSale(saleKey, status = selectedSaleStatus) {
    const saleEntities = getSaleEntitiesByKey(saleKey);
    if (!saleEntities.length) return;
  
    const saleName = saleEntities[0].canonicalSale;
    selectedRankingSale = saleKey;
    selectedSaleStatus = ['all', 'new', 'renew', 'cancel'].includes(status) ? status : 'all';
  
    searchInput.value = saleName;
    searchClearBtn.classList.remove('hidden');
    welcomePlaceholder.classList.add('hidden');
    emptyPlaceholder.classList.add('hidden');
    renewSection.classList.add('hidden');
    unassignedSection?.classList.add('hidden');
  
    renderLeaderboard(stores, { mode: 'overall' });
    renderSaleFilterBar(saleName, saleEntities);
  
    const filteredEntities = filterSaleEntities(saleEntities, selectedSaleStatus);
    renderStoreResults(
      filteredEntities.map((entity) => entity.representative),
      getSaleFilterTitle(saleName, selectedSaleStatus),
    );
  
    if (!filteredEntities.length) {
      const statusLabel = selectedSaleStatus === 'renew'
        ? 'Renew'
        : selectedSaleStatus === 'cancel'
          ? 'Cancel'
          : selectedSaleStatus === 'new'
            ? 'Tiệm mới'
            : 'đã chọn';
      emptyMessage.textContent = `${saleName} hiện không có tiệm thuộc nhóm ${statusLabel}.`;
    }
  
    resultsTitle?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  const rankingListElement = document.getElementById('rankingList');
  rankingListElement?.addEventListener('click', (event) => {
    const item = event.target.closest('[data-sale-key]');
    if (!item || !rankingListElement.contains(item)) return;
    showStoresByRankingSale(item.dataset.saleKey || '', 'all');
  });
  
  rankingListElement?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const item = event.target.closest('[data-sale-key]');
    if (!item || !rankingListElement.contains(item)) return;
    event.preventDefault();
    showStoresByRankingSale(item.dataset.saleKey || '', 'all');
  });
  
  saleStatusFilters?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-sale-filter]');
    if (!button || !selectedRankingSale) return;
    showStoresByRankingSale(selectedRankingSale, button.dataset.saleFilter || 'all');
  });
  
  function resetView() {
    selectedRankingSale = '';
    selectedSaleStatus = 'all';
    saleFilterBar?.classList.add('hidden');
    storeGrid.innerHTML = '';
    resultsTitle.classList.add('hidden');
    resultsTitle.classList.remove('flex');
    emptyPlaceholder.classList.add('hidden');
    welcomePlaceholder.classList.add('hidden');
    searchClearBtn.classList.add('hidden');
    renewSection.classList.remove('hidden');
    unassignedSection?.classList.remove('hidden');
    renderLeaderboard(stores, { mode: 'overall' });
  }
  
  function runSearch() {
    selectedRankingSale = '';
    selectedSaleStatus = 'all';
    saleFilterBar?.classList.add('hidden');
    const term = searchInput.value.trim();
    searchClearBtn.classList.toggle('hidden', !term);
  
    if (!term) {
      resetView();
      return;
    }
  
    welcomePlaceholder.classList.add('hidden');
    renewSection.classList.add('hidden');
    unassignedSection?.classList.add('hidden');
  
    // Nếu người dùng nhập đúng tên sale (hoặc alias như John/Tai), mở thẳng
    // nhóm sale đó và bộ lọc Tất cả / Tiệm mới / Renew / Cancel.
    const exactSaleKey = resolveExactSaleKey(term);
    if (exactSaleKey) {
      showStoresByRankingSale(exactSaleKey, 'all');
      return;
    }
  
    const results = searchStores(term);
    const rawNormalizedTerm = normalizeText(term);
    const normalizedTerm = normalizeText(SALE_ALIASES.get(rawNormalizedTerm) || term);
    const saleMatches = results.filter((store) => {
      const saleName = storeMetadata.get(store)?.canonicalSale || canonicalizeSaleName(store.sale_person);
      return normalizeText(saleName).includes(normalizedTerm);
    });
    const isSaleFocused = saleMatches.length > 0 && saleMatches.length === results.length && !cleanPhone(term);
  
    if (isSaleFocused) {
      renderLeaderboard(results, { mode: 'sale-search', matchedTerm: normalizedTerm });
    } else {
      leaderboardSection.classList.add('hidden');
    }
  
    renderStoreResults(results, results.length
      ? `Kết quả cho “${term}”`
      : 'Không tìm thấy dữ liệu phù hợp');
  }
  
  searchInput.addEventListener('input', () => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(runSearch, 120);
  });
  
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      window.clearTimeout(searchTimer);
      runSearch();
    }
  
    if (event.key === 'Escape' && searchInput.value) {
      searchInput.value = '';
      resetView();
    }
  });
  
  searchSubmitBtn.addEventListener('click', runSearch);
  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    resetView();
  });
  
  document.addEventListener('keydown', (event) => {
    const targetTag = document.activeElement?.tagName?.toLowerCase();
    const isTyping = targetTag === 'input' || targetTag === 'textarea';
  
    if (event.key === '/' && !isTyping) {
      event.preventDefault();
      searchInput.focus();
    }
  
    if (event.key === 'Escape') {
      closeNotificationPanel();
      if (!detailModal.classList.contains('hidden')) closeModal();
    }
  });
  
  function openDetail(store) {
    selectedStore = store;
    const metadata = storeMetadata.get(store);
  
    modalContent.innerHTML = `
      <div class="md:col-span-2 flex flex-wrap items-center gap-2">
        ${metadata?.isCancelled
          ? '<span class="cancel-tab">Cancel</span>'
          : metadata?.isRenew
            ? `<span class="renew-tab">Renew <strong>${metadata.renewCount}</strong></span>`
            : '<span class="standard-tab">Mới</span>'}
        ${!metadata?.isCancelled && metadata?.isLatestRecord && metadata?.isRenew ? '<span class="latest-tab">Lần Renew mới nhất</span>' : ''}
      </div>
      <div><label class="modal-label">Tên Tiệm</label><p class="text-xl text-white font-bold">${escapeHTML(store.salon_name || 'Chưa có dữ liệu')}</p></div>
      <div><label class="modal-label">Chủ Tiệm</label><p class="text-xl text-white font-bold">${escapeHTML(store.customer_name || 'Chưa có dữ liệu')}</p></div>
      <div><label class="modal-label">Số Điện Thoại</label><p class="text-lg text-slate-200">${escapeHTML(store.phone || 'Chưa có dữ liệu')}</p></div>
      <div><label class="modal-label">Nhân Viên Marketing</label><p class="text-lg text-slate-200">${escapeHTML(store.marketing_person || 'Chưa có dữ liệu')}</p></div>
      <div><label class="modal-label">Nhân Viên Sale</label><p class="text-lg text-slate-200">${escapeHTML(metadata?.canonicalSale || canonicalizeSaleName(store.sale_person))}</p></div>
      <div><label class="modal-label">Ngày cập nhật</label><p class="text-lg text-slate-200">${escapeHTML(store.update || 'Chưa có dữ liệu')}</p></div>
      <div class="md:col-span-2"><label class="modal-label">Địa Chỉ</label><p class="text-lg text-slate-200">${escapeHTML(store.address || 'Chưa có dữ liệu')}</p></div>
      ${metadata?.isCancelled ? `
        <div class="md:col-span-2 rounded-2xl border border-rose-300/15 bg-rose-400/[0.07] p-4">
          <p class="text-sm font-semibold text-rose-200">Trạng thái Cancel</p>
          <p class="mt-1 text-sm leading-6 text-rose-100/75">Tiệm này đã ngừng sử dụng dịch vụ và hiện được xếp vào nhóm Cancel.</p>
        </div>
      ` : metadata?.isRenew ? `
        <div class="md:col-span-2 rounded-2xl border border-emerald-300/15 bg-emerald-400/[0.06] p-4">
          <p class="text-sm font-semibold text-emerald-200">Thông tin renew</p>
          <p class="mt-1 text-sm leading-6 text-emerald-100/70">Tiệm này xuất hiện ${metadata.totalRecords} lần với cùng tên và địa chỉ, tương ứng ${metadata.renewCount} lượt Renew. Đây là lần cập nhật thứ ${metadata.sequence}. Sale phụ trách: ${escapeHTML(metadata.canonicalSale)}.</p>
        </div>
      ` : ''}
    `;
  
    aiDetailText.textContent = store.notes || 'Không có ghi chú thêm.';
    aiDetailText.className = 'text-slate-300 text-center text-sm italic';
    detailModal.classList.remove('hidden');
    detailModal.classList.add('flex');
    document.body.classList.add('modal-open');
  }
  
  function closeModal() {
    detailModal.classList.add('hidden');
    detailModal.classList.remove('flex');
    document.body.classList.remove('modal-open');
    selectedStore = null;
  }
  
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  detailModal.addEventListener('click', (event) => {
    if (event.target === detailModal) closeModal();
  });
  
  document.getElementById('closeAiInsight')?.addEventListener('click', () => {
    aiInsightContainer.classList.add('hidden');
  });
  
  document.getElementById('downloadPdfBtn').addEventListener('click', () => {
    if (!selectedStore?.link) return;
  
    const anchor = document.createElement('a');
    anchor.href = selectedStore.link;
    anchor.setAttribute('download', '');
    anchor.rel = 'noopener';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  });
  
  const featureNotifications = [
    {
      id: 'feature-sale-status-filter-v1',
      date: '04/08/2026',
      title: 'Lọc tiệm theo trạng thái của từng sale',
      description: 'Sau khi chọn một sale trong bảng xếp hạng, bạn có thể lọc nhanh Tất cả, Tiệm mới, Renew hoặc Cancel.',
      tags: ['Bộ lọc', 'Sale'],
    },
    {
      id: 'feature-cancel-list-20260804',
      date: '04/08/2026',
      title: 'Cập nhật danh sách tiệm Cancel',
      description: 'Helen Nails & Spa cùng các tiệm đã ngừng dịch vụ được hiển thị rõ bằng nhãn Cancel.',
      tags: ['Cancel'],
    },
    {
      id: 'feature-renew-identity-v2',
      date: '04/08/2026',
      title: 'Nhận diện Renew chính xác hơn',
      description: 'Chỉ tính Renew khi cùng tên tiệm và cùng địa chỉ. Một tiệm chỉ hiển thị một card dù có nhiều lần cập nhật.',
      tags: ['Renew'],
    },
    {
      id: 'feature-ranking-click-v1',
      date: '04/08/2026',
      title: 'Bấm vào sale để xem danh sách tiệm',
      description: 'Mỗi item trong bảng xếp hạng giờ có thể mở trực tiếp các tiệm do sale đó quản lý.',
      tags: ['Bảng xếp hạng'],
    },
    {
      id: 'feature-search-alias-v1',
      date: '04/08/2026',
      title: 'Tìm kiếm dễ hơn',
      description: 'Hỗ trợ tìm không dấu, tìm theo nhiều thông tin và tự gộp Tai thành Thanh Tai, John thành John Thai.',
      tags: ['Tìm kiếm'],
    },
  ];
  
  try {
    localStorage.removeItem('td-sale-update-notifications-v3');
  } catch (error) {
    // Trình duyệt có thể chặn localStorage ở chế độ riêng tư.
  }
  
  function loadNotificationState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(NOTIFICATION_STORAGE_KEY) || '{}');
      return {
        readIds: Array.isArray(parsed.readIds) ? parsed.readIds : [],
      };
    } catch (error) {
      return { readIds: [] };
    }
  }
  
  function saveNotificationState(state) {
    const validIds = new Set(featureNotifications.map((item) => item.id));
    const compactReadIds = [...new Set(state.readIds)]
      .filter((id) => validIds.has(id))
      .slice(-200);
  
    try {
      localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify({
        version: 4,
        readIds: compactReadIds,
        savedAt: new Date().toISOString(),
      }));
    } catch (error) {
      // Một số trình duyệt có thể chặn localStorage ở chế độ riêng tư.
    }
  }
  
  function renderNotifications() {
    const state = loadNotificationState();
    const readSet = new Set(state.readIds);
    const unread = featureNotifications.filter((item) => !readSet.has(item.id));
  
    notificationDot.classList.toggle('hidden', unread.length === 0);
    notificationCount.textContent = unread.length ? `${unread.length} mới` : 'Đã xem tất cả';
    latestUpdateLabel.textContent = featureNotifications[0]?.date
      ? `Cập nhật tính năng: ${featureNotifications[0].date}`
      : 'Chưa có tính năng mới';
  
    if (!featureNotifications.length) {
      notificationList.innerHTML = '<p class="p-5 text-center text-sm text-slate-500">Chưa có tính năng mới.</p>';
      return;
    }
  
    notificationList.innerHTML = featureNotifications.map((notification) => {
      const isUnread = !readSet.has(notification.id);
      return `
        <div class="notification-item ${isUnread ? 'is-unread' : ''}">
          <div class="notification-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3l1.9 4.1L18 9l-4.1 1.9L12 15l-1.9-4.1L6 9l4.1-1.9L12 3zm6 11l1 2.2L21 17l-2 .8L18 20l-1-2.2-2-.8 2-.8L18 14zM5 14l1.3 2.7L9 18l-2.7 1.3L5 22l-1.3-2.7L1 18l2.7-1.3L5 14z"/></svg>
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="font-semibold leading-5 text-white">${escapeHTML(notification.title)}</p>
                <p class="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-slate-500">${escapeHTML(notification.date)}</p>
              </div>
              ${isUnread ? '<span class="unread-label">Mới</span>' : ''}
            </div>
            <p class="mt-2 text-xs leading-5 text-slate-400">${escapeHTML(notification.description)}</p>
            <div class="mt-2 flex flex-wrap gap-2">
              ${notification.tags.map((tag) => `<span class="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">${escapeHTML(tag)}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
  
  function markCurrentNotificationsAsRead() {
    const state = loadNotificationState();
    state.readIds = [...new Set([...state.readIds, ...featureNotifications.map((item) => item.id)])];
    saveNotificationState(state);
    renderNotifications();
  }
  
  function openNotificationPanel() {
    notificationPanel.classList.remove('hidden');
    notificationBell.setAttribute('aria-expanded', 'true');
    markCurrentNotificationsAsRead();
  }
  
  function closeNotificationPanel() {
    notificationPanel.classList.add('hidden');
    notificationBell.setAttribute('aria-expanded', 'false');
  }
  
  notificationBell.addEventListener('click', (event) => {
    event.stopPropagation();
    if (notificationPanel.classList.contains('hidden')) openNotificationPanel();
    else closeNotificationPanel();
  });
  
  notificationPanel.addEventListener('click', (event) => event.stopPropagation());
  document.addEventListener('click', closeNotificationPanel);
  
  renderRenewSummary();
  renderUnassignedSummary();
  renderNotifications();
  resetView();
  