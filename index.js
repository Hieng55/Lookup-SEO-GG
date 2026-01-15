// 1. Dữ liệu mẫu (MOCK DATA)
const MOCK_STORES = [{
  id: 1,
  salon_name: "Lina Nails",
  customer_name: "Mr Mike",
  address: "8088 S 84th St, La Vista, NE 68128",
  phone: "+14029373372",
  sale_person: "Thuy Duyen",
  marketing_person: "Hung - Hien",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"

},
{
  id: 2,
  salon_name: "Vicky Nails Spa",
  customer_name: "Ms Thuy",
  address: "930 Old Monrovia Rd NW #8, Huntsville, AL 35806",
  phone: "+12563264181",
  sale_person: "Thuy Duyen",
  marketing_person: "Hung - Hien",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 3,
  salon_name: "Star Nails & Spa",
  customer_name: "Ms Kim Anh",
  address: "102 Rembert C Dennis Blvd, Moncks Corner, SC 29461",
  phone: "+18168019784",
  sale_person: "Thuy Duyen",
  assigned_to: "Hang - Hien",
  marketing_person: "Hang - Hien",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 4,
  salon_name: "Paris Nails",
  customer_name: "Ms Uyen",
  address: "1055 Mineral Wells Ave #9, Paris, TN 38242",
  phone: "+17313361714",
  sale_person: "Thuy Duyen",
  assigned_to: "Hang - Hien",
  marketing_person: "Hang - Hien",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 5,
  salon_name: "Canton Tic Tac Nails",
  customer_name: "Hai Pham",
  address: "42587 Ford Rd, Canton Township, MI 48187",
  phone: "+17349347947",
  sale_person: "Thuy Duyen",
  marketing_person: "Hung - Hien",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 6,
  salon_name: "Princess Nails & Head Spa",
  legal_name: "Blue J Nails & Head Spa",
  customer_name: "Thuy Nguyen",
  address: "1475 Bedford Hwy #2A, Bedford, NS B4A 3Z5, Canada",
  phone: "+19023994477",
  sale_person: "John Thai",
  assigned_to: "Tuan - Hien",
  marketing_person: "Tuan - Hien",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 7,
  salon_name: "U & Me Hair & Nails",
  customer_name: null,
  address: "2013 Tully Rd, San Jose, CA 95122",
  phone: "+14086031784",
  sale_person: "John Thai",
  assigned_to: "Tuan - Hien",
  marketing_person: "Tuan - Hien",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 8,
  salon_name: "V.V. Nails and Spa",
  customer_name: "Tung Le",
  address: "4330 Centerplace Dr #613, Greeley, CO 80635",
  phone: "+12398516850",
  sale_person: "Thuy Duyen",
  assigned_to: "Hang - Hien",
  marketing_person: "Hang - Hien",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 9,
  salon_name: "Sky Nails",
  customer_name: "Pham Thi Cuc",
  address: "1484 N State Rd 7, Lauderhill, FL 33313",
  phone: "+19542574710",
  sale_person: "Thuy Duyen",
  assigned_to: "Hang - Hien",
  marketing_person: "Hang - Hien",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 10,
  salon_name: "Classy Nails",
  customer_name: "Ms Dung",
  address: "5270 Babcock St NE #12, Palm Bay, FL 32905",
  phone: "+13214192245",
  sale_person: "Thuy Duyen",
  marketing_person: "Hung - Hien",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 11,
  salon_name: "Bamboo Nails & Spa",
  customer_name: "Tammy Dung Nguyen",
  address: "2711 La Frontera Blvd, Ste 205, Round Rock, TX 78681",
  phone: "+14056266508",
  sale_person: "Luci",
  assigned_to: "Tuan - Hien",
  marketing_person: "Tuan - Hien",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 12,
  salon_name: "Nail Bar",
  customer_name: "Nhung Le",
  address: "7038 Highway 70 South, Nashville, TN 37221",
  phone: "+16154238816",
  sale_person: "My Duyen",
  marketing_person: "Hung - Hien",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 13,
  salon_name: "Twinkle Nails & Spa",
  customer_name: "Thanh Duong",
  address: "3237 Yonge St, Toronto, ON M4N 2L5, Canada",
  phone: "+16477183296",
  sale_person: "John Thai",
  assigned_to: "Hien - Hang",
  marketing_person: "Hien - Hang",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 14,
  salon_name: "Salina Nail",
  customer_name: "Linh Ngoc Bui",
  address: "1489 County Rd 220 #150, Fleming Island, FL 32003",
  phone: "+19046516731",
  sale_person: "Thuy Duyen",
  assigned_to: "Hien - Tuan",
  marketing_person: "Hien - Tuan",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 15,
  salon_name: "King Nail Spa",
  customer_name: "Thinh Vu Dong",
  address: "7924 S Broadway Ave Ste 600, Tyler, TX 75703",
  phone: "+19039448456",
  sale_person: "Thuy Duyen",
  assigned_to: "Hien - Hang",
  marketing_person: "Hien - Hang",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 16,
  salon_name: "Helen Nails & Spa",
  customer_name: "Phong Hong Nguyen",
  address: "1321 Fulton Ave, Sacramento, CA 95825",
  phone: "+12099694203",
  sale_person: "Luci",
  assigned_to: "Hien - Tuan",
  marketing_person: "Hien - Tuan",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 17,
  salon_name: "Solar Deluxe Nails & Facial",
  customer_name: "Tri Huu Pham",
  address: "10400 S Post Oak, Suite B, Houston, TX 77035",
  phone: "+12817458379",
  sale_person: "Luci",
  assigned_to: "Hien - Hung",
  marketing_person: "Hien - Hung",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 18,
  salon_name: "Eagle Nails",
  customer_name: "Hua Y Pi",
  address: "1700 Park Ave, Ste 104B, Park City, UT 84060",
  phone: "+13852228122",
  sale_person: "Dao",
  assigned_to: "Hien - Hung",
  marketing_person: "Hien - Hung",
  category: "Nail Salon",
  notes: "",
  link: "",
  update: "12/31/2025"
},
{
  id: 19,
  salon_name: "Days Nails & Spa by XM",
  customer_name: "Thi Xuan Pham",
  address: "5140 Chattahoochee Ind Park, Cumming, GA 30041",
  phone: "+14049605418",
  sale_person: "Ruby",
  assigned_to: "Hien",
  marketing_person: "Hien",
  category: "Nail Salon",
  notes: "",
  link: "https://drive.usercontent.google.com/u/0/uc?id=1cJLV8i_XWdGi2m-BDSY3cJ5l55dbJLdl&export=download",
  update: "12/31/2025"
},
{
  id: 20,
  salon_name: "Star Nails & Spa",
  customer_name: "Luat Thanh Nguyen",
  address: "1416 Military Rd, Benton, AR 72015",
  phone: "+15012498440",
  sale_person: "Ngoc Anh",
  assigned_to: "Hang - Hien",
  marketing_person: "Hang - Hien",
  category: "Nail Salon",
  notes: "",
  link: "https://drive.usercontent.google.com/u/0/uc?id=1ZjAqRIlHe4zUrOeiPoGJBVLnlaSHkvgS&export=download",
  update: "12/31/2025"
},
{
  id: 21,
  salon_name: "Lumina Nails Lounge",
  customer_name: "Phuc Hong Do",
  address: "2526 S Campbell Ave, Springfield, MO 65807",
  phone: "+14173504798",
  sale_person: "Tuan - Minh Anh",
  assigned_to: "Hang - Hien",
  marketing_person: "Hang - Hien",
  category: "Nail Salon",
  notes: "",
  link: "https://drive.usercontent.google.com/u/0/uc?id=1laL18ChACmYBE71VYRXPmqrjnq813MmN&export=download",
  update: "12/31/2025"
},
{
  id: 22,
  salon_name: "Nails Colure & Spa",
  customer_name: "Nancy Le",
  address: "2008 S Main St #304, Wake Forest, NC 27587",
  phone: "+19194578719",
  sale_person: "Thuy Duyen",
  assigned_to: "Hang - Hien",
  marketing_person: "Hang - Hien",
  category: "Nail Salon",
  notes: "",
  link: "https://drive.usercontent.google.com/u/0/uc?id=1HIMrnGJ3R3lESj1_dtFawN7TuWEhSSIY&export=download",
  update: "12/31/2025"
},
{
  id: 23,
  salon_name: "J&M Nail Bar",
  customer_name: "Ai Duc Hoang",
  address: "11444 Hardin Valley Rd, Knoxville, TN 37932",
  phone: "+18652666160",
  sale_person: "Tuan - Luci",
  assigned_to: "Tuan - Hien",
  marketing_person: "Tuan - Hien",
  category: "Nail Salon",
  notes: "",
  link: "https://drive.usercontent.google.com/u/0/uc?id=1__xIpRthJ-g0Rrl_Z1soFd7ohgHnJl27&export=download",
  update: "12/31/2025"
},
{
  id: 24,
  salon_name: "Morrissey Nails and Spa",
  customer_name: "Vu Hoang Phung",
  address: "960 Morrissey Blvd Space #6 & #7, Dorchester, MA 02122",
  phone: "+16178881827",
  sale_person: "John Thai",
  assigned_to: "Hien - Tuan",
  marketing_person: "Hien - Tuan",
  category: "Nail Salon",
  notes: "",
  link: "https://drive.usercontent.google.com/u/0/uc?id=1CMfcIBZPzeqO445a_J1iWk-JENW4FqJV&export=download",
  update: "12/31/2025"
},
{
  id: 25,
  salon_name: "Image Nails",
  customer_name: "John",
  address: "139 N Belt Hwy Suite F, St Joseph, MO 64506",
  phone: "+17015413140",
  sale_person: "Truong",
  assigned_to: "Hien - Hung",
  marketing_person: "Hien - Hung",
  category: "Nail Salon",
  notes: "",
  link: "https://drive.usercontent.google.com/u/0/uc?id=1KRHIdsHcUTxkniNHtNZ_U5yb_sO5TBjD&export=download",
  update: "12/31/2025"
},
{
  id: 26,
  salon_name: "Fashion Nails and Spa",
  customer_name: "Lien My Thi Tran",
  address: "3441 E Causeway Approach Ste L, Mandeville, LA 70448",
  phone: "+15043889102",
  sale_person: "Thuy Duyen",
  assigned_to: "Hien - Tuan",
  marketing_person: "Hien - Tuan",
  category: "Nail Salon",
  notes: "",
  link: "https://drive.usercontent.google.com/u/0/uc?id=1zQ-Z7Td3d_YsuuxWcf291-CBXvlWrVta&export=download",
  update: "12/31/2025"
},
{
  id: 27,
  salon_name: "The Nail Place Coppell LLC",
  customer_name: "Le Thi Ngoc Oanh",
  address: "230 N Denton Tap Rd, Ste 105, Coppell, TX 75019",
  phone: "+12142284029",
  sale_person: "Thuy Duyen",
  assigned_to: "Hien - Tuan",
  marketing_person: "Hien - Tuan",
  category: "Nail Salon",
  notes: `Tiệm The Nail Placeđang phát triển tốt khi thứhạng Google Mapsđược cải thiện rõrệt(từTop 13→Top 10 vàtừTop 11→Top 9),
  cho thấy hiệu quảSEO tích cực.Reviewđạt chất lượng cao với 4.7⭐,
  sốreview mới tăng tốt vàtỷlệphản hồi 100 % ,
  giúp tăngđộtin cậy với Google.Hoạtđộngđăng bài vàhìnhảnhđược duy trìđềuđặn nên hồsơluôn active Tuy nhiên,
  tiệm vẫn cần cải thiệnđểtăng trưởng mạnh hơn bằng cáchđẩy thứhạng lên Top 3–5,
  tiếp tục tăng review thật mỗi tháng vàtập trung hơn vào nội dungđịa phương(ảnh thực tếtiệm, dịch vụnổi bật, trải nghiệm khách hàng)đểvượtđối thủtrong khu vực`,
  link: "https://drive.usercontent.google.com/u/0/uc?id=1z2iryPqKh0f8g0NnSbAbNaM6ZkcxY4ku&export=download",
  update: "12/31/2025"
},
{
  id: 28,
  salon_name: "Swan Nail",
  customer_name: "Hai Anh - Thanh Thi Pham",
  address: "4020 Hedgcoxe Rd #600, Plano, TX 75024",
  phone: "+17372882991",
  sale_person: "Yen Vuong",
  assigned_to: "Hien - Hung",
  marketing_person: "Hien - Hung",
  category: "Nail Salon",
  notes: `Tiệmđãlàm tốt khi thứhạng Google Maps cócải thiện,
  cho thấy SEOđangđiđúng hướng.Reviewổnđịnh vớiđiểm sốcao vàphản hồiđầyđủgiúp tăngđộuy tín với Google.Việcđăng bài vàhìnhảnhđềuđặn cũng giúp hồsơtiệm luôn hoạtđộng.Tuy nhiên,
  tiệm cần cải thiệnđểphát triển mạnh hơn.Thứhạng chưa vào Top 3–5 nên chưa thu hút nhiều khách walk - in.Review mới cònít vàcần tăngđều mỗi tháng.Ngoài ra,
  nênđẩy mạnh nội dungđịa phương nhưhìnhảnh tiệm,
  dịch vụnổi bật vàkhách thậtđểvượtđối thủxung quanh.`,
  link: "https://drive.usercontent.google.com/u/0/uc?id=1OTUDJIn-r5ArZxYQ1Zei6LqbUjSUjCNi&export=download",
  update: "12/31/2025"
},
{
  id: 29,
  salon_name: "Antony Nails Bar",
  customer_name: "Hien Nguyen",
  address: "3710 E Main St Ste H, Blytheville, AR 72315",
  phone: "+14697631113",
  sale_person: "Thuy Duyen",
  assigned_to: "Hien - Hung",
  marketing_person: "Hien - Hung",
  category: "Nail Salon",
  notes: "Chưa có Google nên chưa đánh giá được.",
  link: "",
  update: "12/31/2025"
}];

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
const runAiDetailBtn = document.getElementById('runAiDetailBtn');

let selectedStore = null;

// Render Card tiệm
function createStoreCard(store) {
  const div = document.createElement('div');
  div.className = 'glass-card rounded-2xl p-6 flex flex-col h-full group cursor-pointer shadow-lg shadow-black/20';
  div.innerHTML = ` < div class = "flex justify-between items-start mb-4" > <h3 class = "text-xl font-bold text-white group-hover:text-indigo-300 transition-colors" > $ {
    store.salon_name
  } < /h3>
            <span class="px-2 py-1 text-[10px] font-semibold bg-indigo-500/20 text - indigo - 300 rounded - lg border border - indigo - 500 / 30 uppercase tracking - wider ">${store.category}</span>
        </div>
        <div class="space - y - 3 flex - grow ">
            <div class="flex items - center gap - 3 ">
                <div class="p - 2 rounded - lg bg - emerald - 500 / 10 text - emerald - 400 ">
                    <svg xmlns="http: //www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  < path stroke - linecap = "round"stroke - linejoin = "round"stroke - width = "2"d = "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" / ></svg>
                </div > <div > <p class = "text-[10px] uppercase text-slate-500 font-bold" > Sốđiện thoại < /p><p class="text-sm text-slate-200">${store.phone}</p > </div>
            </div > <div class = "flex items-center gap-3" > <div class = "p-2 rounded-lg bg-blue-500/10 text-blue-400" > <svg xmlns = "http://www.w3.org/2000/svg"class = "h-4 w-4"fill = "none"viewBox = "0 0 24 24"stroke = "currentColor" > <path stroke - linecap = "round"stroke - linejoin = "round"stroke - width = "2"d = "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" / ></svg>
                </div > <div > <p class = "text-[10px] uppercase text-slate-500 font-bold" > Nhân viên Sale < /p><p class="text-sm text-slate-200">${store.sale_person}</p > </div>
            </div > </div>
        <button class="mt-6 w-full py-2.5 px-4 rounded-xl bg-indigo-600/20 text - indigo - 400 border border - indigo - 500 / 30 group - hover: bg - indigo - 600 group - hover: text - white transition - all text - sm font - semibold ">
            Xem Chi Tiết
        </button>
    `;
    div.onclick = () => openDetail(store);
    return div;
}

// Xử lý tìm kiếm
searchInput.oninput = (e) => {
    const term = e.target.value.toLowerCase().trim();
    storeGrid.innerHTML = '';
    
    if (!term) {
    
        resultsTitle.classList.add('hidden');
        emptyPlaceholder.classList.add('hidden');
        aiGlobalBtn.classList.add('hidden');
        return;
    }

    welcomePlaceholder.classList.add('hidden');
    resultsTitle.classList.remove('hidden');


    const isNumeric = /^\d+$/.test(term.replace(/[\s.-]/g, ''));
    let results = [];

    if (isNumeric) {
        // Tìm đúng tiệm theo số phone
        const cleanTerm = term.replace(/[\s.-]/g, '');
        results = MOCK_STORES.filter(s => s.phone.replace(/[\s.-]/g, '').includes(cleanTerm));
    } else {
        // Tìm danh sách tiệm theo tên Sale
        results = MOCK_STORES.filter(s => s.sale_person.toLowerCase().includes(term));
    }

    if (results.length > 0) {
        results.forEach(store => storeGrid.appendChild(createStoreCard(store)));
        emptyPlaceholder.classList.add('hidden');
    } else {
        emptyPlaceholder.classList.remove('hidden');
    }
};

// Popup chi tiết
function openDetail(store) {
    selectedStore = store;
    modalContent.innerHTML = `
        <div><label class="text - [10px] uppercase text - indigo - 400 font - bold mb - 1 block tracking - widest ">Tên Tiệm</label><p class="text - xl text - white font - bold ">${store.salon_name}</p></div>
        <div><label class="text - [10px] uppercase text - indigo - 400 font - bold mb - 1 block tracking - widest ">Chủ Tiệm</label><p class="text - xl text - white font - bold ">${store.customer_name}</p></div>
        <div><label class="text - [10px] uppercase text - indigo - 400 font - bold mb - 1 block tracking - widest ">Số Điện Thoại</label><p class="text - lg text - slate - 200 ">${store.phone}</p></div>
                <div><label class="text - [10px] uppercase text - indigo - 400 font - bold mb - 1 block tracking - widest ">Nhân Viên Marketing</label><p class="text - lg text - slate - 200 ">${store.marketing_person}</p></div>
        <div><label class="text - [10px] uppercase text - indigo - 400 font - bold mb - 1 block tracking - widest ">Nhân Viên Sale</label><p class="text - lg text - slate - 200 ">${store.sale_person}</p></div>
                <div><label class="text - [10px] uppercase text - indigo - 400 font - bold mb - 1 block tracking - widest ">Thời Gian Report</label><p class="text - lg text - slate - 200 ">${store.update}</p></div>
        <div class="md: col - span - 2 "><label class="text - [10px] uppercase text - indigo - 400 font - bold mb - 1 block tracking - widest ">Địa Chỉ</label><p class="text - lg text - slate - 200 ">${store.address}</p></div>
    `;
    // aiDetailText.innerText = 'Bấm nút để AI đưa ra nhận định.';
    // aiDetailText.className = 'text-slate-500 text-center text-sm italic';
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




