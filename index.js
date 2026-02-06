


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
    notes: "thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
    
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
    notes: "thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
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
    notes: "thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
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
    notes: "thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
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
    notes: "thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
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
    notes: "thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
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
    notes: "khách tạo google mới nên chưa có đánh giá chưa có cơ sở rank làm report",
    link:"",
    update:"02/07/2026"
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
    notes: "thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
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
    notes: "nhắc khách xin thêm review tháng này không có review nào hết nguy cơ rank không tăng",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1KjAQ9efKhvN6vakj5PHTVoOnY-7iRqv3&export=download",
    update:"02/07/2026"
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
    notes: "mọi thứ ổn nhắc khách xin thêm review cải thiện rating và thứ hạng",
    link:"https://drive.usercontent.google.com/u/0/uc?id=16ZV5pLxbBEZFoewc2FWYLLRw6JsUyzWt&export=download",
    update:"02/07/2026"
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
    notes: "khách xin thêm review để duy trì và tăng thứ hạng tháng này không có review, top cao cạnh tranh cao cần thêm review mới",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1TtYPGeuxrW-DeZtI1dW1svJg8Ysrqoro&export=download",
    update:"02/07/2026"
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
    notes: "khách xin thêm review để duy trì và tăng thứ hạng tháng này không có review, top cao cạnh tranh cao cần thêm review mới",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1V9W3bnsT71XMmltuFsBInX6v6WaH-4_U&export=download",
    update:"02/07/2026"
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
    notes: "Nhắc khách xin thêm review",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1hqk7YxtPPgmbMFlGkXUcxQmBau1RxFvj&export=download",
    update:"02/07/2026"
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
    notes: "nhắc khách xin thêm review tháng này không có review nào hết nguy cơ tháng sau rank không tăng",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1O_E_JwU5m8z2Zr28G7NmIjTRzq2K_Fhh&export=download",
    update:"02/07/2026"
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
    notes: "tháng này xin review khá tốt , duy trì để có thứ hạng rank tốt hơn",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1NYnBB0C1WoYMZ2sG_97HSVzVri52Yv4l&export=download",
    update:"02/07/2026"
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
    notes: "thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
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
    notes: "xin khách xin review thêm tháng này không có review nguy cơ tháng sau rank ko tăng nếu không có review mới",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1LuUhITkWCug2daDM3H1VI1S2oui-aex9&export=download",
    update:"02/07/2026"
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
    notes: "khách vào top đúng như cam kết, nhưng duy trì thứ hạng này lâu cần khách xin thêm review ",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1cLgFn3BGSw8YqlKlszZwxLY3C4TQ7zqC&export=download",
    update:"02/07/2026"
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
    notes: "duy trì top 5 cho khách nhưng nhờ khách xin thêm review để duy trì thứ hạng",
    link:"https://drive.usercontent.google.com/u/0/uc?id=19c4JGTn-a2sFuAjCYIPhc2M-RnHqXvAD&export=download",
    update:"02/07/2026"
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
    notes: "Nhắc khách xin thêm review ",
    link:"https://drive.usercontent.google.com/u/0/uc?id=10HAEJyQ-fR1yKsR_vJkMP3BbvGAp-hYe&export=download",
    update:"02/07/2026"
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
    notes: "ổn xin thêm review để duy trì rank",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1KWIr6SZrYU81eR4g_Y6ZvhSIvH-NPCl4&export=download",
    update:"02/07/2026"
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
    notes: "mọi thứ ổn đã đạt đúng kpi xin thêm review để lấy rank 1 và 2",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1EbyXyfystzONTjVI4TZhIUsA7vBN4vLM&export=download",
    update:"02/07/2026"
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
    notes: "tiệm chưa mở cửa nên không có đánh giá",
    link:"https://drive.usercontent.google.com/u/0/uc?id=129MgzoeFLMl2mabIYF0Ko60xDhjOCzcv&export=download",
    update:"02/07/2026"
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
    notes: "nhắc khách cố gắng xin thêm review tháng này quá ít review",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1ulp-f0UiYOPN9dPQJp16X9AJ6PPPgsRr&export=download",
    update:"02/07/2026"
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
    notes: "Tiệm ở khu cạnh tranh cao nhưng không có review mới tiệm bị đứng rank nhắc khách xin thêm review",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1-DQlnH_JmfFTHxnbpq60awReVOVV-TUT&export=download",
    update:"02/07/2026"
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
    notes: "không có review mới nhờ khách xin thêm nguy cơ tháng sau rank bị đứng",
    link:"https://drive.usercontent.google.com/u/0/uc?id=1X7ueIhiV02JXgoIH_Yz2XQMQhgBfc9yh&export=download",
    update:"02/07/2026"
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
    notes: `Tập trung xin thêm review là đã đạt kpi rank như cam kết`,
    link:"https://drive.usercontent.google.com/u/0/uc?id=1qjsBI84WD7ET64EzvdY7lSt5bdHo7nAU&export=download",
    update:"02/07/2026"
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
    notes: `Tập trung xin thêm review sắp đạt được kpi như cam kết`,
    link:"https://drive.usercontent.google.com/u/0/uc?id=1grG8N8J8VdOJrD6TogjvathWd8p5JL2U&export=download",
    update:"02/07/2026"
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
    notes: "Thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
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
    notes: "Thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
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
    notes: "Thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
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
    notes: "Thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
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
    notes: "Thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
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
    notes: "Thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
  },
   {
    id: 35,
    salon_name: "Ann Nails",
    customer_name: "Ms Ngoan",
    address: "1523 N Texas Blvd, Weslaco, TX 78596",
    phone: "",
    sale_person: "Thuy Duyen",
    assigned_to: "Hien",
    marketing_person: "Hằng - Hiển",
    category: "Nail Salon",
    notes: "Thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
  },
   {
    id: 34,
    salon_name: "Nail Spa Plus",
    customer_name: "Nghĩa",
    address: "764 Dennery Rd Ste 103, San Diego, CA 92154",
    phone: "(858) 357-4941",
    sale_person: "john thai",
    assigned_to: "Hien",
    marketing_person: "Hùng - Hiển",
    category: "Nail Salon",
    notes: "Thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
  },
  {
    id: 35,
    salon_name: "Elegant Nails & Alterations",
    customer_name: "Mr Tuấn",
    address: "847 Park Rd C, Pleasant Grove, AL 35127",
    phone: "(205) 370-4340",
    sale_person: "thuy duyen",
    assigned_to: "Hien",
    marketing_person: "Hằng - Hiển",
    category: "Nail Salon",
    notes: "Thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
  },
   {
    id: 36,
    salon_name: "Apple nails and spa",
    customer_name: "Mai Huynh",
    address: "2340 SE Ocean Blvd, Stuart, FL 34996",
    phone: "(772) 200-1227",
    sale_person: "john thai",
    assigned_to: "Hien",
    marketing_person: "Hùng - Hiển",
    category: "Nail Salon",
    notes: "Thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
  },
   {
    id: 37,
    salon_name: "Cutiecures Nail Bar",
    customer_name: "Vy Nguyen",
    address: "958 W El Camino Real, Sunnyvale, CA 94087",
    phone: "408-649-1109",
    sale_person: "Ngan",
    assigned_to: "Hien",
    marketing_person: "Hùng - Hiển",
    category: "Nail Salon",
    notes: "Thời gian lấy google chưa đủ 1 tháng để làm report , report sẽ gửi vào lần làm report tiếp theo.",
    link:"",
    update:"02/07/2026"
  }
];


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
// const aiDetailText = document.getElementById('aiDetailText');
const runAiDetailBtn = document.getElementById('runAiDetailBtn');

let selectedStore = null;

// Render Card tiệm
function createStoreCard(store) {
    const div = document.createElement('div');
    div.className = 'glass-card rounded-2xl p-6 flex flex-col h-full group cursor-pointer shadow-lg shadow-black/20';
    div.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">${store.salon_name}</h3>
            <span class="px-2 py-1 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 rounded-lg border border-indigo-500/30 uppercase tracking-wider">${store.category}</span>
        </div>
        <div class="space-y-3 flex-grow">
            <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </div>
                <div><p class="text-[10px] uppercase text-slate-500 font-bold">Số điện thoại</p><p class="text-sm text-slate-200">${store.phone}</p></div>
            </div>
            <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div><p class="text-[10px] uppercase text-slate-500 font-bold">Nhân viên Sale</p><p class="text-sm text-slate-200">${store.sale_person}</p></div>
            </div>
        </div>
        <button class="mt-6 w-full py-2.5 px-4 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white transition-all text-sm font-semibold">
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
        <div><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Tên Tiệm</label><p class="text-xl text-white font-bold">${store.salon_name}</p></div>
        <div><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Chủ Tiệm</label><p class="text-xl text-white font-bold">${store.customer_name}</p></div>
        <div><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Số Điện Thoại</label><p class="text-lg text-slate-200">${store.phone}</p></div>
                <div><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Nhân Viên Marketing</label><p class="text-lg text-slate-200">${store.marketing_person}</p></div>
        <div><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Nhân Viên Sale</label><p class="text-lg text-slate-200">${store.sale_person}</p></div>
                <div><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Thời Gian Report</label><p class="text-lg text-slate-200">${store.update}</p></div>
        <div class="md:col-span-2"><label class="text-[10px] uppercase text-indigo-400 font-bold mb-1 block tracking-widest">Địa Chỉ</label><p class="text-lg text-slate-200">${store.address}</p></div>
     
         </p>
    `;
    aiDetailText.innerText = `${store.notes}`;
    aiDetailText.className = 'text-white-500 text-center text-sm italic';
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




