
// 1. Dữ liệu mẫu (MOCK DATA)
const MOCK_STORES = [
  {
    id: 1,
    salon_name: "Lina Nails",
    customer_name: "Mr Mike",
    address: "8088 S 84th St, La Vista, NE 68128",
    phone: "+14029373372",
    sale_person: "Thuy Duyen",
    marketing_person: "Hung - Hien",
    category: "Nail Salon",
    notes: "",
    link:"https://drive.usercontent.google.com/u/0/uc?id=14vC7V6jA-8zo4NOSQyXteRj2Xbswg3Lq&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1oQngHhcZC60UdjsbHG1Nlhv6F0n9Ouv7&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1BAAJ8z6Aqx1ZZ5MoQaBlDkVjhig787mf&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1e0k9z4wV2DwuXrGGoLFiBBcIQWA552iX&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=10gbl10lycPVUu4wompiScj2rJ97Wv00D&export=download",
    update:"03/07/2026"
  },
  {
    id: 6,
    salon_name: "Blue J Nails & Head Spa",
    legal_name: "Blue J Nails & Head Spa",
    customer_name: "Thuy Nguyen",
    address: "1475 Bedford Hwy #2A, Bedford, NS B4A 3Z5, Canada",
    phone: "+19023994477",
    sale_person: "John Thai",
    assigned_to: "Tuan - Hien",
    marketing_person: "Tuan - Hien",
    category: "Nail Salon",
    notes: "",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1iUWmnmakHykOge0OjUnHk7ABCBZcE70g&export=download",
    update:"03/07/2026"
  },
  {
    id: 7,
    salon_name: "U & Me Hair & Nails",
    customer_name: "chưa có dữ liệu",
    address: "2013 Tully Rd, San Jose, CA 95122",
    phone: "+14086031784",
    sale_person: "John Thai",
    assigned_to: "Tuan - Hien",
    marketing_person: "Tuan - Hien",
    category: "Nail Salon",
    notes: "mới tạo google nên không xuất report",
    link:"",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=18nhYKVnwtbHzcgQ_QCqBixLWF2Wb0f-w&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1rwk3i8xNW_DnBfVoxcBOHQXpNQV-o9Y5&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1L8hNo_OMwtUJOLndTHI2ZXbgf9_wFfMk&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1kfN8zHPpvDn8wB-RXR4Rq5KsrZ4EClGW&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1nXVEA9neccHeu4euBiUGn3Q1u5oZ5Qoq&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1rdMv8E6bAqqUHU_aIQIBa0IbC8y1Oabh&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1Smtm2kHP04ghqspEZLUAL0pk52jI2f1B&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1LbbXT6eSuemHr37oPllrguSpJq1QMbPw&export=download",
    update:"03/07/2026"
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
    link:"",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1ySHEs1s0xznCooPMelm98i1EP8w51JjR&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1lKoYMC3h9YnFnBH8qG8NcpHBYadg6SwK&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1EdU6pOxxyru4eO8k91ustHdvz6xAHY-G&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1b7Dpp4VuvKnZwmuNtpiLg3K_8eU8zt6-&export=download",
    update:"03/07/2026"
  },
  {
    id: 21,
    salon_name: "Lumina Nails Lounge",
    customer_name: "Phuc Hong Do",
    address: "2526 S Campbell Ave, Springfield, MO 65807",
    phone: "+14173504798",
    sale_person: "Minh Anh",
    assigned_to: "Hang - Hien",
    marketing_person: "Hang - Hien",
    category: "Nail Salon",
    notes: "",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1fD5D6dQo4ku3DGrmsuhcWG1NE340YU_f&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1UeiLhjoSv_AOL1-XUkx5PPhC2iq3rPjv&export=download",
    update:"03/07/2026"
  },
  {
    id: 23,
    salon_name: "J&M Nail Bar",
    customer_name: "Ai Duc Hoang",
    address: "11444 Hardin Valley Rd, Knoxville, TN 37932",
    phone: "+18652666160",
    sale_person: "Luci",
    assigned_to: "Tuan - Hien",
    marketing_person: "Tuan - Hien",
    category: "Nail Salon",
    notes: "",
    link:"",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=18RVGkhcovCY2adAovegaUVhZjQLsFRxD&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1rnm-vL7prLfPWbvG8c_yGqg75hc7pFoc&export=download",
    update:"03/07/2026"
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
    link:"https://drive.usercontent.google.com/u/0/uc?id=1X0lVzTW-7YQIG6wqRCc4XilAK3xM5eQj&export=download",
    update:"03/07/2026"
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
    notes: ``,
    link:"https://drive.usercontent.google.com/u/0/uc?id=1LqtCeajvrT8CmxjfauJcG-AUdvyU7KZj&export=download",
    update:"03/07/2026"
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
    notes: ``,
    link:"https://drive.usercontent.google.com/u/0/uc?id=1gq7XfId18X3VNWC0ZDLgax57Behxs3bY&export=download",
    update:"03/07/2026"
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
    notes: "",
    link:"",
    update:"03/07/2026"
  },
  {
    id: 30,
    salon_name: "Vip Nails Baytown",
    customer_name: "Johnny Nguyen",
    address: "508 Garth Rd F, Baytown, TX 77521, United States",
    phone: "+18329082050",
    sale_person: "John Thai",
    assigned_to: "hằng - Hiển",
    marketing_person: "Hang - Hien",
    category: "Nail Salon",
    notes: "",
    link:"",
    update:"03/07/2026"
  },
  {
    id: 31,
    salon_name: "IRIS NAILS FACIAL LLC",
    customer_name: "ANH THI DUYEN NGUYEN ",
    address: "3435 RAINTREE VILLAGE DR, KATY, TX 77449-7026",
    phone: "+18322874690",
    sale_person: "Thuy Duyen",
    assigned_to: "Hien",
    marketing_person: "Hien",
    category: "Nail Salon",
    notes: "",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1Zq-0MwWq3SerGgUgC-wXEvGGAO15ZS5W&export=download",
    update:"03/07/2026"
  },
   {
    id: 32,
    salon_name: "Village Nails & Spa",
    customer_name: "Mr Thương ",
    address: "5618 Newbury St, Baltimore, MD 21209",
    phone: "(443) 248-6082",
    sale_person: "Thuy Duyen",
    assigned_to: "Hien",
    marketing_person: "hằng - Hiển",
    category: "Nail Salon",
    notes: "",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1FydscoyY41LAcNjM_fphPN8RePYh9I5i&export=download",
    update:"03/07/2026"
  },
   {
    id: 33,
    salon_name: "Lucy Nails & Spa",
    customer_name: "Mr Toản",
    address: "973 East Ave, Chico, CA 95926",
    phone: "(916) 837-7135",
    sale_person: "Thuy Duyen",
    assigned_to: "Hien",
    marketing_person: "Hùng - Hiển",
    category: "Nail Salon",
    notes: "",
    link:"",
    update:"03/07/2026"
  },
  {
    id: 34,
    salon_name: "Ann Nails",
    customer_name: "Ms Ngoan",
    address: "1523 N Texas Blvd, Weslaco, TX 78596",
    phone: "",
    sale_person: "Thuy Duyen",
    assigned_to: "Hien",
    marketing_person: "Hằng - Hiển",
    category: "Nail Salon",
    notes: "",
    link:"",
    update:"03/07/2026"
  },
   {
    id: 35,
    salon_name: "Nail Spa Plus",
    customer_name: "Nghĩa",
    address: "764 Dennery Rd Ste 103, San Diego, CA 92154",
    phone: "(858) 357-4941",
    sale_person: "john thai",
    assigned_to: "Hien",
    marketing_person: "Hùng - Hiển",
    category: "Nail Salon",
    notes: "",
    link:"",
    update:"03/07/2026"
  },
  {
    id: 36,
    salon_name: "Elegant Nails & Alterations",
    customer_name: "Mr Tuấn",
    address: "847 Park Rd C, Pleasant Grove, AL 35127",
    phone: "(205) 370-4340",
    sale_person: "thuy duyen",
    assigned_to: "Hien",
    marketing_person: "Hằng - Hiển",
    category: "Nail Salon",
    notes: "",
    link:"",
    update:"03/07/2026"
  },
   {
    id: 37,
    salon_name: "Apple nails and spa",
    customer_name: "Mai Huynh",
    address: "2340 SE Ocean Blvd, Stuart, FL 34996",
    phone: "(772) 200-1227",
    sale_person: "john thai",
    assigned_to: "Hien",
    marketing_person: "Hùng - Hiển",
    category: "Nail Salon",
    notes: "",
    link:"",
    update:"03/07/2026"
  },
   {
    id: 38,
    salon_name: "Cutiecures Nail Bar",
    customer_name: "Vy Nguyen",
    address: "958 W El Camino Real, Sunnyvale, CA 94087",
    phone: "408-649-1109",
    sale_person: "Ngan",
    assigned_to: "Hien",
    marketing_person: "Hùng - Hiển",
    category: "Nail Salon",
    notes: "",
    link:"",
    update:"03/07/2026"
  },
  {
    id: 39,
    salon_name: "Happy Nails",
    customer_name: "Mrs Hương",
    address: "613 Philadelphia Pike, Wilmington, DE 19809",
    phone: "302 357 8628",
    sale_person: "John Thai",
    assigned_to: "Hien",
    marketing_person: "Hùng - Hiển",
    category: "Nail Salon",
    notes: "",
    link:"",
    update:"03/07/2026"
  },
  {
    id: 40,
    salon_name: "Tulip Nails",
    customer_name: "Mr David",
    address: "13864 Old Columbia Pike, Silver Spring, MD 20904",
    phone: "(240) 708-5904",
    sale_person: "Thuy Duyen",
    assigned_to: "Hien",
    marketing_person: "Hằng - Hiển",
    category: "Nail Salon",
    notes: "",
    link:"",
    update:"03/07/2026"
  },
  {
    id: 41,
    salon_name: "Jenny's Nails",
    customer_name: "NGOC EM",
    address: "2617 Moses Grandy Trail #108, Chesapeake, VA 23323",
    phone: "929-240-8855",
    sale_person: "Thanh Tai",
    assigned_to: "Hien",
    marketing_person: "Hùng - Hiển",
    category: "Nail Salon",
    notes: "",
    link:"",
    update:"03/07/2026"
  },
  {
    id: 42,
    salon_name: "Noodles N Boba",
    customer_name: "Phúc Đặng",
    address: "1975 Wells Rd, Orange Park, FL 32073, United States",
    phone: "(407) 309-1423",
    sale_person: "John Thai",
    assigned_to: "Hien",
    marketing_person: "Hùng - Hiển",
    category: "Restaurant",
    notes: "",
    link:"",
    update:"03/07/2026"
  },
  {
    id: 43,
    salon_name: "ELIZ'S NAILS",
    customer_name: "MAI NGA NGUYEN T",
    address: "7340 FOREST HILL AVE #D, RICHMOND VA 23225",
    phone: "804-475-8151",
    sale_person: "My Duyen",
    assigned_to: "Hien",
    marketing_person: "Hằng - Hiển",
    category: "Nail Salon",
    notes: "",
    link:"",
    update:"03/07/2026"
  },
  {
    id: 44,
    salon_name: "Star nails and spa",
    customer_name: "Thien Nguyen",
    address: "1404 Berlin Tpke Wethersfield CT 06109",
    phone: "(843) 301-1033",
    sale_person: "Ngan",
    assigned_to: "Hien",
    marketing_person: "Hùng - Hiển",
    category: "Nail Salon",
    notes: "",
    link:"",
    update:"03/07/2026"
  },
];

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

