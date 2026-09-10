/* ==========================================================================
   KRISHIMITRA (कृषिमित्र) - "दूर की सोच" | FULL STACK FRONTEND & API CLIENT
   SIH 2026 PS 132 Submission Prototype - Full Multilingual & Dual Dashboard Engine
   ========================================================================== */

const API_BASE = 'http://localhost:5000/api';

// --- GLOBAL STATE & MOCK DATA ---
const state = {
    currentLang: 'hi',
    userRole: 'farmer',
    userName: 'Anjali Khandelwal',
    userLocation: 'Indore, Madhya Pradesh',
    userKyc: true,
    currentUser: null,
    currentTab: 'dashboard',
    activeAlerts: [
        { crop: 'Soybean', targetPrice: 5200, mandi: 'Indore APMC', status: 'Active' },
        { crop: 'Wheat', targetPrice: 2600, mandi: 'Ujjain APMC', status: 'Triggered' }
    ],
    ledger: [
        {
            id: 'KM-TXN-9941',
            date: '2026-09-04',
            buyer: 'ITC Ltd (Choupal Saagar)',
            buyerPhone: '+91 98222 11100',
            seller: 'Anjali Khandelwal',
            sellerPhone: '+91 98765 43210',
            crop: 'Soybean (Grade A)',
            qty: '30 Quintals',
            rate: 5120,
            total: 153600,
            status: 'Completed & Paid'
        }
    ],
    feedbacks: [
        { id: 1, user: 'Ramesh Patel (Farmer)', target: 'ITC Ltd', rating: 5, comment: 'Punctual payment and fair weighing at Choupal hub.' },
        { id: 2, user: 'Anjali Khandelwal (Farmer)', target: 'Malwa FPO', rating: 5, comment: 'Group transport saved me ₹1,200 in tractor fees!' }
    ],
    fpoPools: [
        { id: 'FPO-01', name: 'Malwa FPO Soybean Export Pool', crop: 'Soybean', targetQty: '500 Qtl', collectedQty: '365 Qtl', membersCount: 14, savings: '45% Freight Saved', status: 'Active' },
        { id: 'FPO-02', name: 'Ujjain Flour Mills Wheat Pool', crop: 'Wheat', targetQty: '800 Qtl', collectedQty: '620 Qtl', membersCount: 22, savings: '38% Freight Saved', status: 'Active' }
    ]
};

// Mandi Master Dataset
const mandiData = [
    { name: 'Indore APMC', state: 'MP', crop: 'Soybean', modalPrice: 5150, minPrice: 5000, maxPrice: 5220, arrival: 4500, truthScore: '98% High', distance: 12 },
    { name: 'Ujjain APMC', state: 'MP', crop: 'Soybean', modalPrice: 5280, minPrice: 5100, maxPrice: 5350, arrival: 3200, truthScore: '96% High', distance: 55 },
    { name: 'Bhopal APMC', state: 'MP', crop: 'Soybean', modalPrice: 5340, minPrice: 5200, maxPrice: 5400, arrival: 2800, truthScore: '92% Med', distance: 185 },
    { name: 'Neemuch APMC', state: 'MP', crop: 'Soybean', modalPrice: 5410, minPrice: 5300, maxPrice: 5480, arrival: 1900, truthScore: '95% High', distance: 260 },
    { name: 'Dewas APMC', state: 'MP', crop: 'Soybean', modalPrice: 5120, minPrice: 4950, maxPrice: 5180, arrival: 2100, truthScore: '94% High', distance: 38 },
    { name: 'Indore APMC', state: 'MP', crop: 'Wheat', modalPrice: 2450, minPrice: 2380, maxPrice: 2500, arrival: 8200, truthScore: '99% High', distance: 12 },
    { name: 'Ujjain APMC', state: 'MP', crop: 'Wheat', modalPrice: 2510, minPrice: 2450, maxPrice: 2560, arrival: 6400, truthScore: '97% High', distance: 55 },
    { name: 'Indore APMC', state: 'MP', crop: 'Chana', modalPrice: 5850, minPrice: 5700, maxPrice: 5950, arrival: 2100, truthScore: '97% High', distance: 12 },
    { name: 'Ujjain APMC', state: 'MP', crop: 'Mustard', modalPrice: 5600, minPrice: 5450, maxPrice: 5720, arrival: 1800, truthScore: '96% High', distance: 55 }
];

// Verified Buyers Dataset
const buyerData = [
    { id: 'BUY-101', name: 'ITC Ltd (Choupal Saagar)', phone: '+91 98222 11100', license: 'MP-IND-APMC-9912', rating: 4.9, cropNeeded: 'Soybean', gradePreferred: 'Grade A', offeredRate: 5250, minQty: '10 Quintals', location: 'Pithampur, Indore (22 km)', badge: 'Verified Agribusiness', aiFraudCheck: 'PASSED' },
    { id: 'BUY-102', name: 'Adani Wilmar Processing Factory', phone: '+91 98444 33322', license: 'MP-IND-APMC-4418', rating: 4.8, cropNeeded: 'Soybean', gradePreferred: 'Grade C', offeredRate: 4600, minQty: '100 Quintals', location: 'Sanwer Road, Indore (15 km)', badge: 'Oil Extraction Mill', aiFraudCheck: 'PASSED' },
    { id: 'BUY-103', name: 'Patanjali Agro Oils', phone: '+91 98777 66655', license: 'MP-UJN-APMC-7721', rating: 4.7, cropNeeded: 'Soybean', gradePreferred: 'Grade B', offeredRate: 5100, minQty: '50 Quintals', location: 'Ujjain Industrial Area (50 km)', badge: 'Verified Exporter', aiFraudCheck: 'PASSED' },
    { id: 'BUY-104', name: 'Malwa Farmer Producer Co.', phone: '+91 98999 88877', license: 'FPO-MP-2023-09', rating: 4.9, cropNeeded: 'Wheat', gradePreferred: 'Grade A', offeredRate: 2520, minQty: '5 Quintals', location: 'Indore Block (8 km)', badge: 'FPO Co-operative', aiFraudCheck: 'PASSED' },
    { id: 'BUY-FAKE-99', name: 'Fake Trader Offer (Blocked)', phone: '+91 90000 00000', license: 'UNVERIFIED-000', rating: 1.2, cropNeeded: 'Soybean', gradePreferred: 'Grade A', offeredRate: 12000, minQty: '50 Quintals', location: 'Unknown Location', badge: 'Blocked Fraud', aiFraudCheck: 'BLOCKED_FRAUD' }
];

// Warehouses Dataset
const warehouseData = [
    { id: 1, name: 'Indore Central Warehousing Corp (CWC)', distance: '10 km', capacity: '12,000 MT', rate: '₹15 / Qtl / Month', pledgeFinancing: '7% Interest Subvention Available', wdraId: 'WDRA-MP-IND-012' },
    { id: 2, name: 'MP State Logistics & Warehouse Hub', distance: '18 km', capacity: '25,000 MT', rate: '₹14 / Qtl / Month', pledgeFinancing: 'KCC Pledge Loan Eligible', wdraId: 'WDRA-MP-IND-088' }
];

// --- COMPREHENSIVE INDIAN CROP CATALOGUE (SEASON & CATEGORY TAGGED) ---
const cropCatalog = [
    // Top Priority Kharif Crop
    { id: 'o-1', name: 'Soybean', nameHi: 'सोयाबीन', nameMr: 'सोयाबीन', namePa: 'ਸੋਇਆਬੀਨ', nameGu: 'સોયાબીન', category: 'Oilseeds', season: 'Kharif', basePrice: 5150 },

    // Cereals
    { id: 'c-1', name: 'Wheat', nameHi: 'गेहूं', nameMr: 'गहू', namePa: 'ਕਣਕ', nameGu: 'ઘઉં', category: 'Cereals', season: 'Rabi', basePrice: 2450 },
    { id: 'c-2', name: 'Rice', nameHi: 'चावल/धान', nameMr: 'तांदूळ', namePa: 'ਚੌਲ/ਝੋਨਾ', nameGu: 'ચોખા', category: 'Cereals', season: 'Kharif', basePrice: 2200 },
    { id: 'c-3', name: 'Maize', nameHi: 'मक्का', nameMr: 'मका', namePa: 'ਮੱਕੀ', nameGu: 'મકાઈ', category: 'Cereals', season: 'Kharif', basePrice: 2150 },
    { id: 'c-4', name: 'Barley', nameHi: 'जौ', nameMr: 'सातू', namePa: 'ਜੌਂ', nameGu: 'જવ', category: 'Cereals', season: 'Rabi', basePrice: 1980 },
    { id: 'c-5', name: 'Sorghum/Jowar', nameHi: 'ज्वार', nameMr: 'ज्वारी', namePa: 'ਜੁਆਰ', nameGu: 'જુવાર', category: 'Cereals', season: 'Kharif', basePrice: 2980 },
    { id: 'c-6', name: 'Pearl Millet/Bajra', nameHi: 'बाजरा', nameMr: 'बाजरी', namePa: 'ਬਾਜਰਾ', nameGu: 'બાજરી', category: 'Cereals', season: 'Kharif', basePrice: 2350 },
    { id: 'c-7', name: 'Ragi', nameHi: 'रागी', nameMr: 'नाचणी', namePa: 'ਰਾਗੀ', nameGu: 'ਰਾਗੀ', category: 'Cereals', season: 'Kharif', basePrice: 3500 },

    // Pulses
    { id: 'p-1', name: 'Chickpea/Gram', nameHi: 'चना', nameMr: 'हरभरा', namePa: 'ਛੋਲੇ', nameGu: 'ચણા', category: 'Pulses', season: 'Rabi', basePrice: 5850 },
    { id: 'p-2', name: 'Pigeon Pea/Tur', nameHi: 'तुअर/अरहर', nameMr: 'तूर', namePa: 'ਅਰਹਰ', nameGu: 'તુવેર', category: 'Pulses', season: 'Kharif', basePrice: 7200 },
    { id: 'p-3', name: 'Green Gram/Moong', nameHi: 'मूंग', nameMr: 'मूग', namePa: 'ਮੂੰਗੀ', nameGu: 'મગ', category: 'Pulses', season: 'Zaid', basePrice: 7750 },
    { id: 'p-4', name: 'Black Gram/Urad', nameHi: 'उड़द', nameMr: 'उडीद', namePa: 'ਮਾਂਹ', nameGu: 'અડદ', category: 'Pulses', season: 'Kharif', basePrice: 6900 },
    { id: 'p-5', name: 'Lentil/Masoor', nameHi: 'मसूर', nameMr: 'मसूर', namePa: 'ਮਸੂਰ', nameGu: 'મਸૂર', category: 'Pulses', season: 'Rabi', basePrice: 6400 },
    { id: 'p-6', name: 'Peas', nameHi: 'मटर', nameMr: 'वाटाणा', namePa: 'ਮਟਰ', nameGu: 'ਵટાણા', category: 'Pulses', season: 'Rabi', basePrice: 4200 },
    { id: 'p-7', name: 'Cowpea', nameHi: 'लोबिया', nameMr: 'चवळी', namePa: 'ਰੌਂਗੀ', nameGu: 'ਚੋળી', category: 'Pulses', season: 'Kharif', basePrice: 5100 },

    // Oilseeds
    { id: 'o-2', name: 'Mustard', nameHi: 'सरसों', nameMr: 'मोहरी', namePa: 'ਸਰ੍ਹੋਂ', nameGu: 'રાયડો/રાઈ', category: 'Oilseeds', season: 'Rabi', basePrice: 5600 },
    { id: 'o-3', name: 'Groundnut', nameHi: 'मूंगफली', nameMr: 'भुईमूग', namePa: 'ਮੂੰਗਫਲੀ', nameGu: 'મગਫਲੀ', category: 'Oilseeds', season: 'Kharif', basePrice: 6300 },
    { id: 'o-4', name: 'Sesame', nameHi: 'तिल', nameMr: 'तीळ', namePa: 'ਤਿਲ', nameGu: 'તલ', category: 'Oilseeds', season: 'Kharif', basePrice: 12500 },
    { id: 'o-5', name: 'Sunflower', nameHi: 'सूरजमुखी', nameMr: 'सूर्यफूल', namePa: 'ਸੂਰਜਮੁਖੀ', nameGu: 'સૂરજમુખી', category: 'Oilseeds', season: 'Rabi', basePrice: 5400 },
    { id: 'o-6', name: 'Castor', nameHi: 'अरंडी', nameMr: 'एरंडी', namePa: 'ਅਰੰਡੀ', nameGu: 'દિવેલા/એરંડા', category: 'Oilseeds', season: 'Kharif', basePrice: 5900 },

    // Cash/Fibre Crops
    { id: 'f-1', name: 'Cotton', nameHi: 'कपास', nameMr: 'कापूस', namePa: 'ਕਪਾਹ', nameGu: 'કપાસ', category: 'Cash/Fibre Crops', season: 'Kharif', basePrice: 7100 },
    { id: 'f-2', name: 'Sugarcane', nameHi: 'गन्ना', nameMr: 'ऊस', namePa: 'ਗੰਨਾ', nameGu: 'શેરડી', category: 'Cash/Fibre Crops', season: 'Kharif', basePrice: 340 },
    { id: 'f-3', name: 'Jute', nameHi: 'पटसन/जूट', nameMr: 'ताग', namePa: 'ਪਟਸਨ', nameGu: 'શણ', category: 'Cash/Fibre Crops', season: 'Kharif', basePrice: 4800 },

    // Spices
    { id: 's-1', name: 'Coriander', nameHi: 'धनिया', nameMr: 'धने', namePa: 'ਧਨੀਆ', nameGu: 'ધાણા', category: 'Spices', season: 'Rabi', basePrice: 6800 },
    { id: 's-2', name: 'Cumin', nameHi: 'जीरा', nameMr: 'जिरे', namePa: 'ਜੀਰਾ', nameGu: 'જીરૂ', category: 'Spices', season: 'Rabi', basePrice: 24000 },
    { id: 's-3', name: 'Turmeric', nameHi: 'हल्दी', nameMr: 'हळद', namePa: 'ਹਲਦੀ', nameGu: 'હળદર', category: 'Spices', season: 'Kharif', basePrice: 13500 },
    { id: 's-4', name: 'Chilli', nameHi: 'लाल मिर्च', nameMr: 'मिरची', namePa: 'ਮਿਰਚ', nameGu: 'મરચું', category: 'Spices', season: 'Kharif', basePrice: 18000 },
    { id: 's-5', name: 'Garlic', nameHi: 'लहसुन', nameMr: 'लसूण', namePa: 'ਲਸਣ', nameGu: 'લસણ', category: 'Spices', season: 'Rabi', basePrice: 9500 },

    // Fruits & Vegetables
    { id: 'v-1', name: 'Watermelon', nameHi: 'तरबूज', nameMr: 'कलिंगड', namePa: 'ਹਦਵਾਣਾ', nameGu: 'તરબૂચ', category: 'Fruits & Vegetables', season: 'Zaid', basePrice: 1400 },
    { id: 'v-2', name: 'Muskmelon', nameHi: 'खरबूजा', nameMr: 'खरबूज', namePa: 'ਖਰਬੂਜਾ', nameGu: 'શક્કરટેટી', category: 'Fruits & Vegetables', season: 'Zaid', basePrice: 1800 },
    { id: 'v-3', name: 'Cucumber', nameHi: 'खीरा/ककड़ी', nameMr: 'काकडी', namePa: 'ਖੀਰਾ', nameGu: 'કાકડી', category: 'Fruits & Vegetables', season: 'Zaid', basePrice: 1200 },
    { id: 'v-4', name: 'Onion', nameHi: 'प्याज', nameMr: 'कांदा', namePa: 'ਗੰਢਾ/ਪਿਆਜ਼', nameGu: 'ડુંગળી', category: 'Fruits & Vegetables', season: 'Rabi', basePrice: 1950 },
    { id: 'v-5', name: 'Potato', nameHi: 'आलू', nameMr: 'बटाटा', namePa: 'ਆਲੂ', nameGu: 'બટાટા', category: 'Fruits & Vegetables', season: 'Rabi', basePrice: 1450 }
];

// DYNAMIC AGRICULTURAL SEASON CALCULATION BASED ON DATE
function getCurrentSeason() {
    const month = new Date().getMonth() + 1; // 1 to 12
    if (month >= 6 && month <= 10) {
        return { name: 'Kharif', icon: '🌾', labelHi: 'खरीफ 🌾', labelEn: 'Kharif 🌾', labelMr: 'खरीप 🌾', labelPa: 'ਖਰੀਫ 🌾', labelGu: 'ખરીફ 🌾' };
    } else if (month >= 11 || month <= 3) {
        return { name: 'Rabi', icon: '🌾', labelHi: 'रबी 🌾', labelEn: 'Rabi 🌾', labelMr: 'रब्बी 🌾', labelPa: 'ਰਬੀ 🌾', labelGu: 'ਰબી 🌾' };
    } else {
        return { name: 'Zaid', icon: '🍉', labelHi: 'जायद 🍉', labelEn: 'Zaid 🍉', labelMr: 'झैद 🍉', labelPa: 'ਜ਼ਾਇਦ 🍉', labelGu: 'ઝાયદ 🍉' };
    }
}


// Multilingual Dictionary for ALL 5 Languages
const i18n = {
    "en": {
        "tagline": "\"Long-term Vision\"",
        "nav_home": "Farmer Home",
        "nav_mandi": "Live Mandi Prices",
        "nav_prediction": "Price Forecast & Advisory",
        "nav_demandmap": "High Demand Regions & Net Profit",
        "nav_find_buyers": "Find Verified Buyers",
        "nav_antifraud": "AI Price & Risk Detector",
        "nav_clustering": "Multi-Farmer Clustering",
        "nav_quicksell": "Need Cash? Quick Sell",
        "nav_transport": "Transport & Net Profit",
        "nav_fpo": "FPO / Group Pooling",
        "nav_quality": "AI Quality Scanner & Grade",
        "nav_sms": "SMS / Feature Phone Mode",
        "nav_storage": "Warehouse & Storage",
        "nav_alerts": "Smart Price Alerts",
        "nav_feedback": "Ratings & Support",
        "nav_ledger": "Digital Transaction Ledger",
        "nav_kyc": "Farmer ID & KYC",
        "bnav_home": "Buyer Home",
        "bnav_analytics": "Market Prices & Analytics",
        "bnav_find_farmers": "Find Farmers / Suppliers",
        "bnav_marketplace": "Crop Marketplace",
        "bnav_bidding": "Bidding & Offers",
        "bnav_demand_intel": "Demand Intelligence",
        "bnav_bulk": "Bulk Procurement",
        "bnav_fpo": "FPO & Farmer Groups",
        "bnav_quality": "AI Quality Verification",
        "bnav_antifraud": "AI Deal Risk Detector",
        "bnav_logistics": "Logistics & Delivery",
        "bnav_ledger": "Purchase Ledger",
        "bnav_feedback": "Farmer & FPO Ratings",
        "bnav_kyc": "Buyer Verification",
        "slogan": "Right Information & Right Price for Every Farmer",
        "welcome_greeting": "Namaste,",
        "hero_subtitle": "Smart farming. Better decisions. Higher yields & maximum net profit.",
        "search_placeholder": "Search crops, mandis, buyers, warehouses...",
        "voice_btn": "Voice Assistant",
        "verified": "Verified",
        "role_farmer": "Farmer (Madhya Pradesh)",
        "role_buyer": "APMC Verified Buyer",
        "switch_mode_title": "Account Management",
        "location_indore": "Indore, Madhya Pradesh",
        "hero_badge_text": "Healthy Fields • Happy Farmers • Prosperous India",
        "qa_prices": "Check Market Prices",
        "qa_prices_sub": "Compare live mandi rates",
        "qa_sell_wait": "Sell or Wait Advisor",
        "qa_sell_wait_sub": "AI price forecasting",
        "qa_high_demand": "High Demand Regions",
        "qa_high_demand_sub": "Find high deficit markets",
        "qa_quick_cash": "Need Urgent Cash?",
        "qa_quick_cash_sub": "Instant local buyer offers",
        "qa_net_profit": "Best Mandi Calculator",
        "qa_net_profit_sub": "Rank by net profit after transport",
        "mandi_snapshot_title": "Today's Mandi Prices",
        "view_all": "View All",
        "th_commodity": "Commodity",
        "th_price": "Price (₹/Quintal)",
        "th_mandi": "Best Mandi",
        "th_trend": "Trend",
        "my_farm_title": "My Farm & Crops",
        "label_total_land": "Total Land",
        "label_active_crop": "Active Crop",
        "label_harvest_est": "Harvest Est.",
        "val_harvest_days": "In 12 Days",
        "scan_crop_btn": "Scan Crop Quality with AI",
        "ai_crop_doctor_title": "AI Assistant & Guidance",
        "ai_advice_tag": "Smart Advice:",
        "ai_advice_msg": "Soybean arrivals in Indore are low today. Prices expected to rise by +8% by Friday!",
        "ai_ph": "Ask AI: e.g. What is today's soybean rate?",
        "weather_today": "Weather Today",
        "weather_partly_cloudy": "Partly Cloudy",
        "dm_header_title": "Regional High Demand & Inter-District Arbitrage Map",
        "dm_header_sub": "Identifies high deficit regions with high buyer demand so farmers/FPOs can transport produce from surplus areas for maximum profit!",
        "mandi_page_title": "Live Mandi Prices & Price Comparison",
        "mandi_page_sub": "Compare live rates across APMC Mandis, eNAM, and verified private buyers.",
        "th_mandi_name": "Mandi Name",
        "th_modal_price": "Modal Price",
        "th_range": "Min - Max Rate",
        "th_arrival": "Arrival (Quintals)",
        "th_truth_score": "Truth Score",
        "th_action": "Action",
        "pred_title": "AI Price Forecast & Storage Advisory",
        "pred_sub": "Machine learning price forecasting (Agmarknet + IMD Weather + Arrival trend models).",
        "adv_hold_title": "RECOMMENDATION: HOLD FOR 5 DAYS",
        "adv_hold_desc": "Expected price increase: +₹350/quintal (+7.2%).",
        "market_title": "Verified Buyer Marketplace & Live Bidding",
        "market_sub": "Direct connection with verified agribusinesses, oil extraction plants, and FPOs.",
        "btn_post_bidding": "Post Lot for Live Bidding",
        "qs_header_title": "Need Cash Urgently? Quick Sell Option",
        "qs_header_sub": "Instant buyer matches with immediate 100% payout within 2 hours.",
        "tc_header_title": "Best Mandi & Transport Cost Calculator",
        "tc_header_sub": "Don't look at gross mandi price alone — calculate your actual Net Profit!",
        "tc_inputs_title": "Calculator Inputs",
        "fpo_header_title": "FPO Virtual Group Selling & Shared Transport",
        "fpo_header_sub": "Small farmers pool produce together to save 45% on transport.",
        "qs_page_title": "AI Crop Quality & Grading Scanner",
        "qs_page_sub": "Grade A (Premium Export), Grade B (Standard Mandi), Grade C (Factory Processing).",
        "camera_scan_title": "Camera / Image Scan",
        "camera_instruct": "Click \"Start AI Scan\" or upload photo of crop sample",
        "btn_start_ai_scan": "Start AI Scan",
        "quality_result_title": "AI Quality Analysis Result",
        "wh_page_title": "Nearest Warehouse Locator & Storage Decision",
        "wh_page_sub": "Find WDRA-certified warehouses near you for safe storage.",
        "wh_wdra_title": "WDRA Approved Warehouses Near Indore",
        "alert_page_title": "Smart Price Alerts & Notifications",
        "alert_page_sub": "Get SMS, IVR call, or App alerts when mandi prices reach your target profit rate.",
        "create_alert_title": "Create New Price Alert",
        "active_alerts_title": "Your Active Alerts",
        "ledger_page_title": "Digital Transaction Ledger & Deals",
        "ledger_page_sub": "Tamper-evident record of all finalized buyer-farmer deals.",
        "th_txn_id": "Transaction ID",
        "th_date": "Date",
        "th_crop_qty": "Crop & Qty",
        "th_agreed_rate": "Agreed Rate",
        "th_total_amt": "Total Amount",
        "th_status": "Status",
        "kyc_page_title": "Government ID & KYC Verification",
        "kyc_page_sub": "Verify identity for Farmers (Aadhar & Land Records) and Buyers (APMC License & GSTIN).",
        "kyc_farmer_title": "Farmer KYC (Aadhar & Land Link)",
        "kyc_verified_status": "Status: KYC VERIFIED & LINKED",
        "notifications_title": "Price Rise & Fall Alerts",
        "clear_all": "Clear All",
        "switch_role_title": "Switch Role / Account",
        "switch_role_sub": "Login as Farmer or Verified Buyer",
        "bhome_tag": "Buyer Workspace",
        "bhome_sub": "Direct Crop Procurement Engine • Verified Farmers & FPO Suppliers",
        "bhome_procurement_title": "Current Procurement",
        "bhome_bids_title": "Active Bids",
        "bhome_spending_title": "Spending Summary",
        "bhome_avail_crops": "Available Crops for Procurement",
        "bana_title": "Market Prices & Procurement Analytics",
        "bana_sub": "Live mandi prices, historical trends, and price forecast for industrial buyers.",
        "bana_card_title": "Mandi Market Trends & Procurement Ceiling Rates",
        "bfind_title": "Find Farmers & FPO Suppliers",
        "bfind_sub": "Search verified farmer suppliers across all crops, districts, and required tonnage.",
        "bfind_btn": "Search Suppliers",
        "bmp_title": "Buyer Crop Marketplace",
        "bmp_sub": "Browse available crop lots directly from verified farmers and FPOs.",
        "bbid_title": "Bidding & Offer Management",
        "bbid_sub": "Send binding offers to farmers, negotiate prices, or submit bulk bids.",
        "bbid_card_title": "Send Offer to Farmer Lot",
        "bbid_label_target": "Target Farmer / FPO",
        "bbid_label_rate": "Your Offered Rate (₹/Quintal)",
        "bbid_btn": "Send Binding Offer",
        "bdem_title": "Demand Intelligence & Regional Procurement Insights",
        "bdem_sub": "AI-powered analysis identifying high industrial deficit zones, surplus Mandi supply clusters, and 30-day crop price movement forecasts.",
        "bbulk_title": "Bulk Quantity Procurement Engine",
        "bbulk_sub": "Create bulk requirements (e.g., Need 1000 Qtl) and auto-aggregate from multi-farmer clusters.",
        "bbulk_card_title": "Create Bulk Requirement Request",
        "bbulk_crop_label": "Crop Required",
        "bbulk_qty_label": "Bulk Quantity Needed (Quintals)",
        "bbulk_btn": "Post Bulk Requirement",
        "bfpo_title": "FPO & Farmer Group Suppliers",
        "bfpo_sub": "Direct bulk procurement contracts with FPO cooperatives.",
        "bfpo_card_title": "Verified FPO Partners",
        "bqual_title": "AI Crop Quality Verification",
        "bqual_sub": "Inspect farmer crop sample photos, official lab test reports, and AI quality scores before purchasing.",
        "brisk_title": "AI Price & Deal Risk Detector",
        "brisk_sub": "Highlights price risk indicators for buyers.",
        "brisk_card_title": "Test Seller Asking Rate Risk",
        "brisk_rate_label": "Seller Asking Rate (₹/Qtl)",
        "brisk_btn": "Evaluate Deal Risk",
        "blog_title": "Logistics & Delivery Tracking",
        "blog_sub": "Track pickup locations, freight dispatches, and shipment status.",
        "bled_title": "Buyer Purchase Ledger & Invoices",
        "bled_sub": "Complete history of completed purchases and pending payments.",
        "bled_th_supplier": "Supplier Name",
        "bled_th_payment": "Total Payment",
        "bfb_title": "Farmer & FPO Ratings",
        "bfb_sub": "Rate suppliers on quality compliance, punctuality, and trust score.",
        "bfb_card_title": "Submit Supplier Rating",
        "bfb_label_type": "Supplier Type",
        "bfb_label_name": "Target Supplier Name",
        "bfb_label_rating": "Rating (1 to 5 Stars)",
        "bfb_btn": "Publish Supplier Rating",
        "bkyc_title": "Buyer Business Verification & Licensing",
        "bkyc_sub": "Verify APMC Trade License, GSTIN, PAN, and Business Registration Proof.",
        "bkyc_card_title": "Verified Buyer Business Profile"
    },
    "hi": {
        "tagline": "\"दूर की सोच\"",
        "nav_home": "किसान होम",
        "nav_mandi": "लाइव मंडी भाव",
        "nav_prediction": "मूल्य पूर्वानुमान व सलाह",
        "nav_demandmap": "उच्च मांग क्षेत्र व शुद्ध मुनाफा",
        "nav_find_buyers": "सत्यापित खरीदार खोजें",
        "nav_antifraud": "AI मूल्य व रिस्क डिटेक्टर",
        "nav_clustering": "मल्टी-किसान क्लस्टरिंग",
        "nav_quicksell": "पैसों की जरूरत? तुरंत बेचें",
        "nav_transport": "परिवहन व शुद्ध मुनाफा",
        "nav_fpo": "FPO / समूह बिक्री",
        "nav_quality": "AI फसल गुणवत्ता व ग्रेड",
        "nav_sms": "SMS / साधारण फोन मोड",
        "nav_storage": "वेयरहाउस व भंडारण",
        "nav_alerts": "स्मार्ट भाव अलर्ट",
        "nav_feedback": "रेटिंग व सहायता",
        "nav_ledger": "डिजिटल सौदा खाता",
        "nav_kyc": "किसान ID व KYC",
        "bnav_home": "खरीदार होम",
        "bnav_analytics": "मंडी भाव व विश्लेषण",
        "bnav_find_farmers": "किसान व आपूर्तिकर्ता खोजें",
        "bnav_marketplace": "फसल बाज़ार",
        "bnav_bidding": "बोली व ऑफर",
        "bnav_demand_intel": "मांग विश्लेषण",
        "bnav_bulk": "थोक खरीद",
        "bnav_fpo": "FPO व किसान समूह",
        "bnav_quality": "AI गुणवत्ता सत्यापन",
        "bnav_antifraud": "AI सौदा जोखिम डिटेक्टर",
        "bnav_logistics": "परिवहन व डिलीवरी",
        "bnav_ledger": "खरीद बही-खाता",
        "bnav_feedback": "किसान रेटिंग व सहायता",
        "bnav_kyc": "खरीदार सत्यापन (KYC)",
        "slogan": "हर किसान को सही जानकारी और सही दाम",
        "welcome_greeting": "नमस्ते,",
        "hero_subtitle": "स्मार्ट खेती। सही निर्णय। अधिक उपज और अधिकतम शुद्ध लाभ।",
        "search_placeholder": "फसल, मंडी, खरीदार, वेयरहाउस खोजें...",
        "voice_btn": "वॉइस सहायक",
        "verified": "सत्यापित",
        "role_farmer": "किसान (मध्य प्रदेश)",
        "role_buyer": "APMC सत्यापित खरीदार",
        "switch_mode_title": "अकाउंट प्रबंधन",
        "location_indore": "इंदौर, मध्य प्रदेश",
        "hero_badge_text": "स्वस्थ खेत • खुशहाल किसान • समृद्ध भारत",
        "qa_prices": "मंडी भाव देखें",
        "qa_prices_sub": "लाइव दरों की तुलना करें",
        "qa_sell_wait": "बेचें या रुकें सलाह",
        "qa_sell_wait_sub": "AI भाव पूर्वानुमान",
        "qa_high_demand": "उच्च मांग वाले क्षेत्र",
        "qa_high_demand_sub": "ज्यादा मांग वाले बाजार खोजें",
        "qa_quick_cash": "तुरंत पैसा चाहिए?",
        "qa_quick_cash_sub": "स्थानीय खरीदार के त्वरित ऑफर",
        "qa_net_profit": "सर्वश्रेष्ठ मंडी कैलकुलेटर",
        "qa_net_profit_sub": "भाड़ा घटाकर शुद्ध लाभ रैंक",
        "mandi_snapshot_title": "आज के मंडी भाव",
        "view_all": "सभी देखें",
        "th_commodity": "फसल",
        "th_price": "भाव (₹/क्विंटल)",
        "th_mandi": "सर्वश्रेष्ठ मंडी",
        "th_trend": "ट्रेंड",
        "my_farm_title": "मेरी फसलें (My Farm & Crops)",
        "label_total_land": "कुल भूमि",
        "label_active_crop": "वर्तमान फसल",
        "label_harvest_est": "कटाई अनुमान",
        "val_harvest_days": "12 दिनों में",
        "scan_crop_btn": "AI से फसल गुणवत्ता जांचें",
        "ai_crop_doctor_title": "AI सहायक व सलाह",
        "ai_advice_tag": "स्मार्ट सलाह:",
        "ai_advice_msg": "आज इंदौर में सोयाबीन की आवक कम है। शुक्रवार तक भाव +8% बढ़ने की संभावना है!",
        "ai_ph": "AI से पूछें: जैसे आज सोयाबीन का क्या भाव है?",
        "weather_today": "आज का मौसम",
        "weather_partly_cloudy": "आंशिक रूप से बादल",
        "dm_header_title": "क्षेत्रीय उच्च मांग एवं अंतर-जिला सप्लाई मैप",
        "dm_header_sub": "जहां फसल की मांग ज्यादा है वहां माल भेजकर ज्यादा से ज्यादा मुनाफा कमाएं!",
        "mandi_page_title": "लाइव मंडी भाव व तुलना",
        "mandi_page_sub": "APMC मंडियों, eNAM और सत्यापित खरीदारों की दरों की तुलना करें।",
        "th_mandi_name": "मंडी का नाम",
        "th_modal_price": "मॉडल भाव",
        "th_range": "न्यूनतम - अधिकतम दर",
        "th_arrival": "आवक (क्विंटल)",
        "th_truth_score": "सत्यता स्कोर",
        "th_action": "कार्रवाई",
        "pred_title": "AI भाव पूर्वानुमान व भंडारण सलाह",
        "pred_sub": "मशीन लर्निंग मॉडल द्वारा भाव पूर्वानुमान।",
        "adv_hold_title": "सलाह: 5 दिन रुकें (HOLD)",
        "adv_hold_desc": "अनुमानित भाव वृद्धि: +₹350/क्विंटल (+7.2%)।",
        "market_title": "सत्यापित खरीदार बाज़ार व नीलामी",
        "market_sub": "बिचौलियों के बिना सीधे कंपनियों, प्रोसेसिंग प्लांट और FPO से जुड़ें।",
        "btn_post_bidding": "लाइव नीलामी के लिए लॉट दर्ज करें",
        "qs_header_title": "तुरंत पैसा चाहिए? त्वरित बिक्री विकल्प",
        "qs_header_sub": "2 घंटे में 100% तुरंत भुगतान।",
        "tc_header_title": "सर्वश्रेष्ठ मंडी व भाड़ा कैलकुलेटर",
        "tc_header_sub": "परिवहन और मंडी शुल्क घटाकर अपना शुद्ध लाभ निकालें!",
        "tc_inputs_title": "कैलकुलेटर इनपुट",
        "fpo_header_title": "FPO समूह बिक्री व साझा भाड़ा",
        "fpo_header_sub": "छोटे किसान मिलकर बड़ा लॉट बनाते हैं और भाड़ा 45% बचाते हैं।",
        "qs_page_title": "AI फसल गुणवत्ता व ग्रेडिंग स्कैनर",
        "qs_page_sub": "कैमरा से नमी व ग्रेड मापकर \"A\" ग्रेड का प्रीमियम भाव पाएं।",
        "camera_scan_title": "कैमरा / इमेज स्कैन",
        "camera_instruct": "\"AI स्कैन शुरू करें\" पर क्लिक करें या फोटो अपलोड करें",
        "btn_start_ai_scan": "AI स्कैन शुरू करें",
        "quality_result_title": "AI गुणवत्ता रिपोर्ट",
        "wh_page_title": "निकटतम वेयरहाउस व भंडारण सलाह",
        "wh_page_sub": "सुरक्षित भंडारण के लिए WDRA प्रमाणित वेयरहाउस खोजें।",
        "wh_wdra_title": "इंदौर के पास WDRA स्वीकृत वेयरहाउस",
        "alert_page_title": "स्मार्ट भाव अलर्ट व सूचनाएं",
        "alert_page_sub": "लक्ष्य भाव पहुंचते ही SMS, कॉल या ऐप पर सूचना पाएं।",
        "create_alert_title": "नया भाव अलर्ट बनाएं",
        "active_alerts_title": "आपके सक्रिय अलर्ट",
        "ledger_page_title": "डिजिटल रसीद व सौदा खाता",
        "ledger_page_sub": "किसानों और खरीदारों के सौदों का डिजिटल रिकॉर्ड।",
        "th_txn_id": "लेन-देन आईडी",
        "th_date": "दिनांक",
        "th_crop_qty": "फसल व मात्रा",
        "th_agreed_rate": "तय दर",
        "th_total_amt": "कुल राशि",
        "th_status": "स्थिति",
        "kyc_page_title": "सरकारी पहचान पत्र व KYC सत्यापन",
        "kyc_page_sub": "आधार या APMC लाइसेंस से सत्यापन करें।",
        "kyc_farmer_title": "किसान KYC",
        "kyc_verified_status": "स्थिति: KYC सत्यापित व लिंक",
        "notifications_title": "भाव बढ़ने व घटने के अलर्ट",
        "clear_all": "सभी हटाएँ",
        "switch_role_title": "रोल / खाता बदलें",
        "switch_role_sub": "किसान या सत्यापित खरीदार के रूप में लॉगिन करें",
        "bhome_tag": "खरीदार कार्यक्षेत्र",
        "bhome_sub": "प्रत्यक्ष फसल खरीद इंजन • सत्यापित किसान व FPO आपूर्तिकर्ता",
        "bhome_procurement_title": "वर्तमान कुल खरीद",
        "bhome_bids_title": "सक्रिय बोलियां",
        "bhome_spending_title": "कुल खर्च विवरण",
        "bhome_avail_crops": "खरीद के लिए उपलब्ध फसलें",
        "bana_title": "मंडी भाव व खरीद विश्लेषण",
        "bana_sub": "लाइव मंडी दरें, ऐतिहासिक रुझान और औद्योगिक खरीदारों के लिए मूल्य पूर्वानुमान।",
        "bana_card_title": "मंडी बाजार रुझान और खरीद सीमा दरें",
        "bfind_title": "किसान व FPO आपूर्तिकर्ता खोजें",
        "bfind_sub": "सभी फसलों, जिलों और आवश्यक मात्रा के अनुसार सत्यापित किसान आपूर्तिकर्ताओं को खोजें।",
        "bfind_btn": "आपूर्तिकर्ता खोजें",
        "bmp_title": "खरीदार फसल बाज़ार",
        "bmp_sub": "सत्यापित किसानों और FPO से सीधे उपलब्ध फसल लॉट ब्राउज़ करें।",
        "bbid_title": "बोली व ऑफर प्रबंधन",
        "bbid_sub": "किसानों को सीधे ऑफर भेजें, दरों पर बातचीत करें, या थोक बोलियां दर्ज करें।",
        "bbid_card_title": "किसान लॉट के लिए ऑफर भेजें",
        "bbid_label_target": "लक्ष्य किसान / FPO",
        "bbid_label_rate": "आपकी प्रस्तावित दर (₹/क्विंटल)",
        "bbid_btn": "बाध्यकारी ऑफर भेजें",
        "bdem_title": "मांग विश्लेषण और क्षेत्रीय खरीद अंतर्दृष्टि",
        "bdem_sub": "AI-संचालित विश्लेषण जो उच्च औद्योगिक कमी वाले क्षेत्रों और 30-दिवसीय फसल मूल्य पूर्वानुमानों की पहचान करता है।",
        "bbulk_title": "थोक मात्रा खरीद इंजन",
        "bbulk_sub": "थोक आवश्यकताएं बनाएं (जैसे, 1000 क्विंटल चाहिए) और बहु-किसान क्लस्टरों से स्वचालित रूप से जोड़ें।",
        "bbulk_card_title": "थोक आवश्यकता अनुरोध बनाएं",
        "bbulk_crop_label": "आवश्यक फसल",
        "bbulk_qty_label": "आवश्यक थोक मात्रा (क्विंटल)",
        "bbulk_btn": "थोक आवश्यकता दर्ज करें",
        "bfpo_title": "FPO व किसान समूह आपूर्तिकर्ता",
        "bfpo_sub": "FPO सहकारी समितियों के साथ सीधे थोक खरीद अनुबंध।",
        "bfpo_card_title": "सत्यापित FPO साझेदार",
        "bqual_title": "AI फसल गुणवत्ता सत्यापन",
        "bqual_sub": "खरीदने से पहले किसान के फसल फोटो, आधिकारिक लैब टेस्ट रिपोर्ट और AI गुणवत्ता स्कोर की जांच करें।",
        "brisk_title": "AI मूल्य व सौदा जोखिम डिटेक्टर",
        "brisk_sub": "खरीदारों के लिए मूल्य जोखिम संकेतकों को हाइलाइट करता है।",
        "brisk_card_title": "विक्रेता दर जोखिम का परीक्षण करें",
        "brisk_rate_label": "विक्रेता द्वारा मांगी गई दर (₹/क्विंटल)",
        "brisk_btn": "सौदा जोखिम का मूल्यांकन करें",
        "blog_title": "परिवहन व डिलीवरी ट्रैकिंग",
        "blog_sub": "पिकअप स्थानों, माल परिवहन और शिपमेंट स्थिति को ट्रैक करें।",
        "bled_title": "खरीदार खरीद बही-खाता व चालान",
        "bled_sub": "पूरे किए गए सौदों और लंबित भुगतानों का संपूर्ण इतिहास।",
        "bled_th_supplier": "आपूर्तिकर्ता का नाम",
        "bled_th_payment": "कुल भुगतान",
        "bfb_title": "किसान व FPO रेटिंग",
        "bfb_sub": "गुणवत्ता अनुपालन, समयबद्धता और विश्वास स्कोर पर आपूर्तिकर्ताओं को रेट करें।",
        "bfb_card_title": "आपूर्तिकर्ता रेटिंग सबमिट करें",
        "bfb_label_type": "आपूर्तिकर्ता का प्रकार",
        "bfb_label_name": "लक्ष्य आपूर्तिकर्ता का नाम",
        "bfb_label_rating": "रेटिंग (1 से 5 स्टार)",
        "bfb_btn": "आपूर्तिकर्ता रेटिंग प्रकाशित करें",
        "bkyc_title": "खरीदार व्यवसाय सत्यापन व लाइसेंसिंग",
        "bkyc_sub": "APMC व्यापार लाइसेंस, GSTIN, पैन और व्यवसाय पंजीकरण प्रमाण का सत्यापन करें।",
        "bkyc_card_title": "सत्यापित खरीदार व्यवसाय प्रोफ़ाइल"
    },
    "mr": {
        "tagline": "\"दूरदृष्टी\"",
        "nav_home": "शेतकरी मुख्यपृष्ठ",
        "nav_mandi": "थेट बाजार भाव",
        "nav_prediction": "दर अंदाज व सल्ला",
        "nav_demandmap": "उच्च मागणी क्षेत्रे व नफा",
        "nav_find_buyers": "प्रमाणित खरेदीदार शोधा",
        "nav_antifraud": "AI फसवणूक शोधक",
        "nav_clustering": "मल्टी-शेतकरी क्लस्टर",
        "nav_quicksell": "पैशांची गरज? त्वरित विका",
        "nav_transport": "वाहतूक व निव्वळ नफा",
        "nav_fpo": "FPO गट विक्री",
        "nav_quality": "AI गुणवत्ता स्कॅनर",
        "nav_sms": "SMS / साधा फोन मोड",
        "nav_storage": "गोदाम व साठवणूक",
        "nav_alerts": "स्मार्ट भाव अलर्ट",
        "nav_feedback": "रेटिंग व मदत",
        "nav_ledger": "डिजिटल व्यवहार खाते",
        "nav_kyc": "शेतकरी ओळख व KYC",
        "bnav_home": "खरेदीदार मुख्यपृष्ठ",
        "bnav_analytics": "बाजार भाव व विश्लेषण",
        "bnav_find_farmers": "शेतकरी व पुरवठादार शोधा",
        "bnav_marketplace": "पीक बाजारपेठ",
        "bnav_bidding": "बोली व ऑफर्स",
        "bnav_demand_intel": "मागणी विश्लेषण",
        "bnav_bulk": "घाऊक खरेदी",
        "bnav_fpo": "FPO व शेतकरी गट",
        "bnav_quality": "AI गुणवत्ता पडताळणी",
        "bnav_antifraud": "AI व्यवहार धोका शोधक",
        "bnav_logistics": "वाहतूक व डिलिव्हरी",
        "bnav_ledger": "खरेदी खाते",
        "bnav_feedback": "शेतकरी रेटिंग व मदत",
        "bnav_kyc": "खरेदीदार पडताळणी",
        "slogan": "प्रत्येक शेतकऱ्याला योग्य माहिती आणि योग्य भाव",
        "welcome_greeting": "नमस्कार,",
        "hero_subtitle": "स्मार्ट शेती. योग्य निर्णय. जास्त उत्पन्न आणि कमाल निव्वळ नफा.",
        "search_placeholder": "पिके, बाजार, खरेदीदार शोधा...",
        "voice_btn": "व्हॉइस सहाय्यक",
        "verified": "प्रमाणित",
        "role_farmer": "शेतकरी (मध्य प्रदेश/महाराष्ट्र)",
        "role_buyer": "APMC प्रमाणित खरेदीदार",
        "switch_mode_title": "खाते व्यवस्थापन",
        "location_indore": "इंदूर, मध्य प्रदेश",
        "hero_badge_text": "सुदृढ शेत • आनंदी शेतकरी • समृद्ध भारत",
        "qa_prices": "बाजार भाव पहा",
        "qa_prices_sub": "थेट दरांची तुलना करा",
        "qa_sell_wait": "विकायचे की थांबायचे",
        "qa_sell_wait_sub": "AI भाव अंदाज",
        "qa_high_demand": "उच्च मागणी क्षेत्रे",
        "qa_high_demand_sub": "अधिक मागणी असलेली बाजारपेठ शोधा",
        "qa_quick_cash": "तातडीने पैसे हवेत?",
        "qa_quick_cash_sub": "स्थानिक खरेदीदारांच्या त्वरित ऑफर्स",
        "qa_net_profit": "सर्वोत्तम बाजार कॅल्क्युलेटर",
        "qa_net_profit_sub": "वाहतूक खर्च वजा करून निव्वळ नफा",
        "mandi_snapshot_title": "आजचे बाजार भाव",
        "view_all": "सर्व पहा",
        "th_commodity": "पीक",
        "th_price": "दर (₹/क्विंटल)",
        "th_mandi": "सर्वोत्तम बाजार",
        "th_trend": "कल",
        "my_farm_title": "माझी पिके (My Farm & Crops)",
        "label_total_land": "एकूण जमीन",
        "label_active_crop": "सध्याचे पीक",
        "label_harvest_est": "कापणीचा अंदाज",
        "val_harvest_days": "१२ दिवसात",
        "scan_crop_btn": "AI द्वारे पिकाची गुणवत्ता तपासा",
        "ai_crop_doctor_title": "AI सहाय्यक व सल्ला",
        "ai_advice_tag": "स्मार्ट सल्ला:",
        "ai_advice_msg": "आज इंदूरमध्ये सोयाबीनची आवक कमी आहे. शुक्रवारपर्यंत भाव +८% वाढण्याची शक्यता आहे!",
        "ai_ph": "AI ला विचारा: जसे की आज सोयाबीनचा भाव काय आहे?",
        "weather_today": "आजचे हवामान",
        "weather_partly_cloudy": "अंशतः ढगाळ",
        "dm_header_title": "प्रादेशिक उच्च मागणी आणि अंतर-जिल्हा आर्बिट्रेज मॅप",
        "dm_header_sub": "जास्त मागणी असलेल्या भागात माल पाठवून कमाल नफा मिळवा!",
        "mandi_page_title": "थेट बाजार भाव व तुलना",
        "mandi_page_sub": "APMC बाजार समित्या व खरेदीदारांच्या दरांची तुलना करा.",
        "th_mandi_name": "बाजार समितीचे नाव",
        "th_modal_price": "सरासरी भाव",
        "th_range": "कमीत कमी - जास्तीत जास्त दर",
        "th_arrival": "आवक (क्विंटल)",
        "th_truth_score": "सत्यता स्कोअर",
        "th_action": "कृती",
        "pred_title": "AI भाव अंदाज व साठवणूक सल्ला",
        "pred_sub": "मशीन लर्निंग मॉडेलद्वारे भाव अंदाज.",
        "adv_hold_title": "सल्ला: ५ दिवस थांबा (HOLD)",
        "adv_hold_desc": "अंदाजित भाव वाढ: +₹३५०/क्विंटल (+७.२%).",
        "market_title": "प्रमाणित खरेदीदार बाजार व लिलाव",
        "market_sub": "मध्यस्थांशिवाय थेट कंपन्या आणि FPO शी जोडा.",
        "btn_post_bidding": "थेट लिलावासाठी लॉट नोंदवा",
        "qs_header_title": "तातडीने पैसे हवेत? त्वरित विक्री पर्याय",
        "qs_header_sub": "२ तासात १००% त्वरित पेमेंट.",
        "tc_header_title": "सर्वोत्तम बाजार व वाहतूक कॅल्क्युलेटर",
        "tc_header_sub": "वाहतूक खर्च वजा करून आपला निव्वळ नफा काढा!",
        "tc_inputs_title": "कॅल्क्युलेटर इनपुट",
        "fpo_header_title": "FPO गट विक्री व सामायिक वाहतूक",
        "fpo_header_sub": "लहान शेतकरी एकत्र येऊन वाहतूक खर्चात ४५% बचत करतात.",
        "qs_page_title": "AI पीक गुणवत्ता व ग्रेडिंग स्कॅनर",
        "qs_page_sub": "कॅमेऱ्याने ओलावा व ग्रेड मोजून प्रीमियम भाव मिळवा.",
        "camera_scan_title": "कॅमेरा / इमेज स्कॅन",
        "camera_instruct": "\"AI स्कॅन सुरू करा\" वर क्लिक करा किंवा फोटो अपलोड करा",
        "btn_start_ai_scan": "AI स्कॅन सुरू करा",
        "quality_result_title": "AI गुणवत्ता अहवाल",
        "wh_page_title": "जवळचे गोदाम आणि साठवणूक निर्णय",
        "wh_page_sub": "सुरक्षित साठवणुकीसाठी WDRA प्रमाणित गोदाम शोधा.",
        "wh_wdra_title": "इंदूरजवळ WDRA मंजूर गोदामे",
        "alert_page_title": "स्मार्ट भाव अलर्ट आणि सूचना",
        "alert_page_sub": "लक्ष्य भाव पोहोचताच SMS किंवा ॲपवर सूचना मिळवा.",
        "create_alert_title": "नवीन भाव अलर्ट तयार करा",
        "active_alerts_title": "तुमचे सक्रिय अलर्ट",
        "ledger_page_title": "डिजिटल व्यवहार खाते",
        "ledger_page_sub": "शेतकरी आणि खरेदीदारांच्या व्यवहारांची डिजिटल नोंद.",
        "th_txn_id": "व्यवहार आयडी",
        "th_date": "तारीख",
        "th_crop_qty": "पीक व प्रमाण",
        "th_agreed_rate": "ठरलेला दर",
        "th_total_amt": "एकूण रक्कम",
        "th_status": "स्थिती",
        "kyc_page_title": "शासकीय ओळख आणि KYC पडताळणी",
        "kyc_page_sub": "आधार किंवा APMC परवान्याद्वारे पडताळणी करा.",
        "kyc_farmer_title": "शेतकरी KYC",
        "kyc_verified_status": "स्थिती: KYC पडताळणी पूर्ण",
        "notifications_title": "दर वाढ आणि घट अलर्ट",
        "clear_all": "सर्व साफ करा",
        "switch_role_title": "भूमिका / खाते बदला",
        "switch_role_sub": "शेतकरी किंवा पडताळणीकृत खरेदीदार म्हणून लॉगिन करा",
        "bhome_tag": "खरेदीदार कार्यक्षेत्र",
        "bhome_sub": "थेट पीक खरेदी इंजिन • प्रमाणित शेतकरी व FPO",
        "bhome_procurement_title": "सध्याची एकूण खरेदी",
        "bhome_bids_title": "सक्रिय बोली",
        "bhome_spending_title": "एकूण खर्च तपशील",
        "bhome_avail_crops": "खरेदीसाठी उपलब्ध पिके",
        "bana_title": "बाजार भाव व खरेदी विश्लेषण",
        "bana_sub": "थेट बाजार दर, ऐतिहासिक कल आणि खरेदीदारांसाठी भाव अंदाज.",
        "bana_card_title": "बाजार कल आणि खरेदी कमाल दर",
        "bfind_title": "शेतकरी व FPO पुरवठादार शोधा",
        "bfind_sub": "सर्व पिके, जिल्हे आणि आवश्यक टनेजनुसार प्रमाणित शेतकरी पुरवठादार शोधा.",
        "bfind_btn": "पुरवठादार शोधा",
        "bmp_title": "खरेदीदार पीक बाजारपेठ",
        "bmp_sub": "प्रमाणित शेतकरी आणि FPO कडून थेट उपलब्ध पीक लॉट पहा.",
        "bbid_title": "बोली व ऑफर व्यवस्थापन",
        "bbid_sub": "शेतकऱ्यांना थेट ऑफर पाठवा, दरांवर चर्चा करा किंवा घाऊक बोली नोंदवा.",
        "bbid_card_title": "शेतकरी लॉटसाठी ऑफर पाठवा",
        "bbid_label_target": "लक्ष्य शेतकरी / FPO",
        "bbid_label_rate": "तुमचा प्रस्तावित दर (₹/क्विंटल)",
        "bbid_btn": "ऑफर पाठवा",
        "bdem_title": "मागणी विश्लेषण आणि प्रादेशिक खरेदी माहिती",
        "bdem_sub": "AI-आधारित विश्लेषण जे उच्च औद्योगिक तुटवड्याचे क्षेत्र आणि भाव अंदाज दर्शवते.",
        "bbulk_title": "घाऊक प्रमाण खरेदी इंजिन",
        "bbulk_sub": "घाऊक आवश्यकता तयार करा (उदा. १००० क्विंटल हवे) आणि शेतकरी क्लस्टरकडून खरेदी करा.",
        "bbulk_card_title": "घाऊक आवश्यकता विनंती तयार करा",
        "bbulk_crop_label": "आवश्यक पीक",
        "bbulk_qty_label": "आवश्यक घाऊक प्रमाण (क्विंटल)",
        "bbulk_btn": "घाऊक आवश्यकता नोंदवा",
        "bfpo_title": "FPO व शेतकरी गट पुरवठादार",
        "bfpo_sub": "FPO सहकारी संस्थांशी थेट घाऊक खरेदी करार.",
        "bfpo_card_title": "प्रमाणित FPO भागीदार",
        "bqual_title": "AI पीक गुणवत्ता पडताळणी",
        "bqual_sub": "खरेदी करण्यापूर्वी पिकाचे फोटो, लॅब रिपोर्ट आणि AI गुणवत्ता स्कोअर तपासा.",
        "brisk_title": "AI मूल्य व व्यवहार धोका शोधक",
        "brisk_sub": "खरेदीदारांसाठी भाव धोका दर्शक दाखवतो.",
        "brisk_card_title": "विक्रेता दर धोक्याची चाचणी करा",
        "brisk_rate_label": "विक्रेत्याने मागितलेला दर (₹/क्विंटल)",
        "brisk_btn": "व्यवहार धोक्याचे मूल्यमापन करा",
        "blog_title": "वाहतूक व डिलिव्हरी ट्रॅकिंग",
        "blog_sub": "पिकअप ठिकाणे आणि वाहतूक स्थिती ट्रॅक करा.",
        "bled_title": "खरेदीदार खरेदी खाते व पावत्या",
        "bled_sub": "पूर्ण झालेल्या खरेदी आणि प्रलंबित पेमेंटचा इतिहास.",
        "bled_th_supplier": "पुरवठादाराचे नाव",
        "bled_th_payment": "एकूण पेमेंट",
        "bfb_title": "शेतकरी व FPO रेटिंग",
        "bfb_sub": "गुणवत्ता आणि वेळेवर पुरवठ्यासाठी पुरवठादारांना रेटिंग द्या.",
        "bfb_card_title": "पुरवठादार रेटिंग सबमिट करा",
        "bfb_label_type": "पुरवठादाराचा प्रकार",
        "bfb_label_name": "पुरवठादाराचे नाव",
        "bfb_label_rating": "रेटिंग (१ ते ५ स्टार)",
        "bfb_btn": "रेटिंग प्रकाशित करा",
        "bkyc_title": "खरेदीदार व्यवसाय पडताळणी",
        "bkyc_sub": "APMC परवाना, GSTIN आणि PAN ची पडताळणी करा.",
        "bkyc_card_title": "प्रमाणित खरेदीदार प्रोफाइल"
    },
    "pa": {
        "tagline": "\"ਦੂਰਅੰਦੇਸ਼ੀ\"",
        "nav_home": "ਕਿਸਾਨ ਮੁੱਖ ਪੰਨਾ",
        "nav_mandi": "ਲਾਈਵ ਮੰਡੀ ਭਾਅ",
        "nav_prediction": "ਕੀਮਤ ਪੂਰਵ-ਅਨੁਮਾਨ",
        "nav_demandmap": "ਉੱਚ ਮੰਗ ਖੇਤਰ ਅਤੇ ਮੁਨਾਫਾ",
        "nav_find_buyers": "ਤਸਦੀਕਸ਼ੁਦਾ ਖਰੀਦਦਾਰ ਲੱਭੋ",
        "nav_antifraud": "AI ਧੋਖਾਧੜੀ ਡਿਟੈਕਟਰ",
        "nav_clustering": "ਮਲਟੀ-ਕਿਸਾਨ ਕਲਸਟਰਿੰਗ",
        "nav_quicksell": "ਪੈਸੇ ਦੀ ਲੋੜ? ਤੁਰੰਤ ਵੇਚੋ",
        "nav_transport": "ਟਰਾਂਸਪੋਰਟ ਅਤੇ ਸ਼ੁੱਧ ਮੁਨਾਫਾ",
        "nav_fpo": "FPO ਗਰੁੱਪ ਵੇਚ",
        "nav_quality": "AI ਗੁਣਵੱਤਾ ਸਕੈਨਰ",
        "nav_sms": "SMS / ਸਾਧਾਰਨ ਫੋਨ ਮੋਡ",
        "nav_storage": "ਗੋਦਾਮ ਅਤੇ ਸਟੋਰੇਜ",
        "nav_alerts": "ਸਮਾਰਟ ਭਾਅ ਅਲਰਟ",
        "nav_feedback": "ਰੇਟਿੰਗ ਅਤੇ ਸਹਾਇਤਾ",
        "nav_ledger": "ਡੀਜੀਟਲ ਲੈਣ-ਦੇਣ ਖਾਤਾ",
        "nav_kyc": "ਕਿਸਾਨ ਪਛਾਣ ਅਤੇ KYC",
        "bnav_home": "ਖਰੀਦਦਾਰ ਮੁੱਖ ਪੰਨਾ",
        "bnav_analytics": "ਮੰਡੀ ਭਾਅ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ",
        "bnav_find_farmers": "ਕਿਸਾਨ ਅਤੇ ਸਪਲਾਇਰ ਲੱਭੋ",
        "bnav_marketplace": "ਫਸਲ ਬਾਜ਼ਾਰ",
        "bnav_bidding": "ਬੋਲੀ ਅਤੇ ਆਫਰ",
        "bnav_demand_intel": "ਮੰਗ ਵਿਸ਼ਲੇਸ਼ਣ",
        "bnav_bulk": "ਥੋਕ ਖਰੀਦ",
        "bnav_fpo": "FPO ਅਤੇ ਕਿਸਾਨ ਗਰੁੱਪ",
        "bnav_quality": "AI ਗੁਣਵੱਤਾ ਤਸਦੀਕ",
        "bnav_antifraud": "AI ਸੌਦਾ ਜੋਖਮ ਡਿਟੈਕਟਰ",
        "bnav_logistics": "ਲੌਜਿਸਟਿਕਸ ਅਤੇ ਡਿਲੀਵਰੀ",
        "bnav_ledger": "ਖਰੀਦ ਖਾਤਾ",
        "bnav_feedback": "ਕਿਸਾਨ ਰੇਟਿੰਗ ਅਤੇ ਸਹਾਇਤਾ",
        "bnav_kyc": "ਖਰੀਦਦਾਰ ਤਸਦੀਕ",
        "slogan": "ਹਰ ਕਿਸਾਨ ਨੂੰ ਸਹੀ ਜਾਣਕਾਰੀ ਅਤੇ ਸਹੀ ਮੁੱਲ",
        "welcome_greeting": "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ,",
        "hero_subtitle": "ਸਮਾਰਟ ਖੇਤੀ। ਸਹੀ ਫੈਸਲਾ। ਵਧੇਰੇ ਝਾੜ ਅਤੇ ਵੱਧ ਤੋਂ ਵੱਧ ਮੁਨਾਫਾ।",
        "search_placeholder": "ਫਸਲਾਂ, ਮੰਡੀਆਂ, ਖਰੀਦਦਾਰ ਖੋਜੋ...",
        "voice_btn": "ਆਵਾਜ਼ ਸਹਾਇਕ",
        "verified": "ਤਸਦੀਕਸ਼ੁਦਾ",
        "role_farmer": "ਕਿਸਾਨ (ਪੰਜਾਬ/ਐਮ.ਪੀ.)",
        "role_buyer": "APMC ਤਸਦੀਕਸ਼ੁਦਾ ਖਰੀਦਦਾਰ",
        "switch_mode_title": "ਖਾਤਾ ਪ੍ਰਬੰਧਨ",
        "location_indore": "ਇੰਦੌਰ, ਮੱਧ ਪ੍ਰਦੇਸ਼",
        "hero_badge_text": "ਤੰਦਰੁਸਤ ਖੇਤ • ਖੁਸ਼ਹਾਲ ਕਿਸਾਨ • ਸਮ੍ਰਿੱਧ ਭਾਰਤ",
        "qa_prices": "ਮੰਡੀ ਭਾਅ ਵੇਖੋ",
        "qa_prices_sub": "ਲਾਈਵ ਦਰਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ",
        "qa_sell_wait": "ਵੇਚੋ ਜਾਂ ਇੰਤਜ਼ਾਰ ਕਰੋ",
        "qa_sell_wait_sub": "AI ਭਾਅ ਪੂਰਵ-ਅਨੁਮਾਨ",
        "qa_high_demand": "ਉੱਚ ਮੰਗ ਖੇਤਰ",
        "qa_high_demand_sub": "ਉੱਚ ਮੰਗ ਵਾਲੇ ਬਾਜ਼ਾਰ ਲੱਭੋ",
        "qa_quick_cash": "ਤੁਰੰਤ ਪੈਸੇ ਚਾਹੀਦੇ ਹਨ?",
        "qa_quick_cash_sub": "ਸਥਾਨਕ ਖਰੀਦਦਾਰਾਂ ਦੀਆਂ ਤੁਰੰਤ ਆਫਰਾਂ",
        "qa_net_profit": "ਸਭ ਤੋਂ ਵਧੀਆ ਮੰਡੀ ਕੈਲਕੁਲੇਟਰ",
        "qa_net_profit_sub": "ਕਿਰਾਇਆ ਘਟਾ ਕੇ ਸ਼ੁੱਧ ਮੁਨਾਫਾ",
        "mandi_snapshot_title": "ਅੱਜ ਦੇ ਮੰਡੀ ਭਾਅ",
        "view_all": "ਸਾਰੇ ਵੇਖੋ",
        "th_commodity": "ਫਸਲ",
        "th_price": "ਭਾਅ (₹/ਕੁੰਟਲ)",
        "th_mandi": "ਸਭ ਤੋਂ ਵਧੀਆ ਮੰਡੀ",
        "th_trend": "ਰੁਝਾਨ",
        "my_farm_title": "ਮੇਰੀਆਂ ਫਸਲਾਂ (My Farm & Crops)",
        "label_total_land": "ਕੁੱਲ ਜ਼ਮੀਨ",
        "label_active_crop": "ਮੌਜੂਦਾ ਫਸਲ",
        "label_harvest_est": "ਵਾਢੀ ਦਾ ਅਨੁਮਾਨ",
        "val_harvest_days": "12 ਦਿਨਾਂ ਵਿੱਚ",
        "scan_crop_btn": "AI ਨਾਲ ਫਸਲ ਦੀ ਗੁਣਵੱਤਾ ਦੀ ਜਾਂਚ ਕਰੋ",
        "ai_crop_doctor_title": "AI ਸਹਾਇਕ ਅਤੇ ਸਲਾਹ",
        "ai_advice_tag": "ਸਮਾਰਟ ਸਲਾਹ:",
        "ai_advice_msg": "ਅੱਜ ਇੰਦੌਰ ਵਿੱਚ ਸੋਇਆਬੀਨ ਦੀ ਆਮਦ ਘੱਟ ਹੈ। ਸ਼ੁੱਕਰਵਾਰ ਤੱਕ ਭਾਅ +8% ਵਧਣ ਦੀ ਸੰਭਾਵਨਾ ਹੈ!",
        "ai_ph": "AI ਨੂੰ ਪੁੱਛੋ: ਜਿਵੇਂ ਅੱਜ ਸੋਇਆਬੀਨ ਦਾ ਕੀ ਭਾਅ ਹੈ?",
        "weather_today": "ਅੱਜ ਦਾ ਮੌਸਮ",
        "weather_partly_cloudy": "ਅੰਸ਼ਕ ਤੌਰ ਛਾਂ",
        "dm_header_title": "ਖੇਤਰੀ ਉੱਚ ਮੰਗ ਅਤੇ ਅੰਤਰ-ਜ਼ਿਲ੍ਹਾ ਆਰਬਿਟਰੇਜ ਮੈਪ",
        "dm_header_sub": "ਜਿੱਥੇ ਮੰਗ ਜ਼ਿਆਦਾ ਹੈ ਉੱਥੇ ਮਾਲ ਭੇਜ ਕੇ ਵੱਧ ਤੋਂ ਵੱਧ ਮੁਨਾਫਾ ਕਮਾਓ!",
        "mandi_page_title": "ਲਾਈਵ ਮੰਡੀ ਭਾਅ ਅਤੇ ਤੁਲਨਾ",
        "mandi_page_sub": "APMC ਮੰਡੀਆਂ ਅਤੇ ਖਰੀਦਦਾਰਾਂ ਦੀਆਂ ਦਰਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ।",
        "th_mandi_name": "ਮੰਡੀ ਦਾ ਨਾਂ",
        "th_modal_price": "ਮਾਡਲ ਭਾਅ",
        "th_range": "ਘੱਟੋ-ਘੱਟ - ਵੱਧ ਤੋਂ ਵੱਧ ਦਰ",
        "th_arrival": "ਆਮਦ (ਕੁੰਟਲ)",
        "th_truth_score": "ਸੱਚਾਈ ਸਕੋਰ",
        "th_action": "ਕਾਰਵਾਈ",
        "pred_title": "AI ਕੀਮਤ ਪੂਰਵ-ਅਨੁਮਾਨ ਅਤੇ ਸਟੋਰੇਜ ਸਲਾਹ",
        "pred_sub": "ਮਸ਼ੀਨ ਲਰਨਿੰਗ ਮਾਡਲ ਦੁਆਰਾ ਕੀਮਤ ਪੂਰਵ-ਅਨੁਮਾਨ।",
        "adv_hold_title": "ਸਲਾਹ: 5 ਦਿਨ ਇੰਤਜ਼ਾਰ ਕਰੋ (HOLD)",
        "adv_hold_desc": "ਅਨੁਮਾਨਿਤ ਕੀਮਤ ਵਾਧਾ: +₹350/ਕੁੰਟਲ (+7.2%)।",
        "market_title": "ਤਸਦੀਕਸ਼ੁਦਾ ਖਰੀਦਦਾਰ ਬਾਜ਼ਾਰ ਅਤੇ ਨਿਲਾਮੀ",
        "market_sub": "ਵਿਚੋਲਿਆਂ ਤੋਂ ਬਿਨਾਂ ਸਿੱਧਾ ਕੰਪਨੀਆਂ ਅਤੇ FPO ਨਾਲ ਜੁੜੋ।",
        "btn_post_bidding": "ਲਾਈਵ ਨਿਲਾਮੀ ਲਈ ਲਾਟ ਦਰਜ ਕਰੋ",
        "qs_header_title": "ਤੁਰੰਤ ਪੈਸੇ ਚਾਹੀਦੇ ਹਨ? ਤੁਰੰਤ ਵੇਚ ਵਿਕਲਪ",
        "qs_header_sub": "2 ਘੰਟਿਆਂ ਵਿੱਚ 100% ਤੁਰੰਤ ਭੁਗਤਾਨ।",
        "tc_header_title": "ਸਭ ਤੋਂ ਵਧੀਆ ਮੰਡੀ ਅਤੇ ਕਿਰਾਇਆ ਕੈਲਕੁਲੇਟਰ",
        "tc_header_sub": "ਟਰਾਂਸਪੋਰਟ ਖਰਚਾ ਘਟਾ ਕੇ ਆਪਣਾ ਸ਼ੁੱਧ ਮੁਨਾਫਾ ਕੱਢੋ!",
        "tc_inputs_title": "ਕੈਲਕੁਲੇਟਰ ਇਨਪੁਟ",
        "fpo_header_title": "FPO ਗਰੁੱਪ ਵੇਚ ਅਤੇ ਸਾਂਝੀ ਟਰਾਂਸਪੋਰਟ",
        "fpo_header_sub": "ਛੋਟੇ ਕਿਸਾਨ ਮਿਲ ਕੇ ਟਰਾਂਸਪੋਰਟ ਖਰਚੇ ਵਿੱਚ 45% ਬਚਾਉਂਦੇ ਹਨ।",
        "qs_page_title": "AI ਫਸਲ ਗੁਣਵੱਤਾ ਅਤੇ ਗ੍ਰੇਡਿੰਗ ਸਕੈਨਰ",
        "qs_page_sub": "ਕੈਮਰੇ ਨਾਲ ਨਮੀ ਅਤੇ ਗ੍ਰੇਡ ਮਾਪ ਕੇ ਪ੍ਰੀਮੀਅਮ ਭਾਅ ਪ੍ਰਾਪਤ ਕਰੋ।",
        "camera_scan_title": "ਕੈਮਰਾ / ਇਮੇਜ ਸਕੈਨ",
        "camera_instruct": "\"AI ਸਕੈਨ ਸ਼ੁਰੂ ਕਰੋ\" 'ਤੇ ਕਲਿੱਕ ਕਰੋ ਜਾਂ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ",
        "btn_start_ai_scan": "AI ਸਕੈਨ ਸ਼ੁਰੂ ਕਰੋ",
        "quality_result_title": "AI ਗੁਣਵੱਤਾ ਰਿਪੋਰਟ",
        "wh_page_title": "ਨੇੜਲਾ ਗੋਦਾਮ ਅਤੇ ਸਟੋਰੇਜ ਫੈਸਲਾ",
        "wh_page_sub": "ਸੁਰੱਖਿਅਤ ਸਟੋਰੇਜ ਲਈ WDRA ਤਸਦੀਕਸ਼ੁਦਾ ਗੋਦਾਮ ਲੱਭੋ।",
        "wh_wdra_title": "ਇੰਦੌਰ ਦੇ ਨੇੜੇ WDRA ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਗੋਦਾਮ",
        "alert_page_title": "ਸਮਾਰਟ ਭਾਅ ਅਲਰਟ ਅਤੇ ਸੂਚਨਾਵਾਂ",
        "alert_page_sub": "ਟਾਰਗੇਟ ਭਾਅ ਪਹੁੰਚਦੇ ਹੀ SMS ਜਾਂ ਐਪ 'ਤੇ ਅਲਰਟ ਪ੍ਰਾਪਤ ਕਰੋ।",
        "create_alert_title": "ਨਵਾਂ ਭਾਅ ਅਲਰਟ ਬਣਾਓ",
        "active_alerts_title": "ਤੁਹਾਡੇ ਸਰਗਰਮ ਅਲਰਟ",
        "ledger_page_title": "ਡੀਜੀਟਲ ਲੈਣ-ਦੇਣ ਖਾਤਾ",
        "ledger_page_sub": "ਕਿਸਾਨਾਂ ਅਤੇ ਖਰੀਦਦਾਰਾਂ ਦੇ ਸੌਦਿਆਂ ਦਾ ਡਿਜੀਟਲ ਰਿਕਾਰਡ।",
        "th_txn_id": "ਲੈਣ-ਦੇਣ ਆਈਡੀ",
        "th_date": "ਮਿਤੀ",
        "th_crop_qty": "ਫਸਲ ਅਤੇ ਮਾਤਰਾ",
        "th_agreed_rate": "ਤੈਅ ਦਰ",
        "th_total_amt": "ਕੁੱਲ ਰਕਮ",
        "th_status": "ਸਥਿਤੀ",
        "kyc_page_title": "ਸਰਕਾਰੀ ਪਛਾਣ ਅਤੇ KYC ਤਸਦੀਕ",
        "kyc_page_sub": "ਆਧਾਰ ਜਾਂ APMC ਲਾਇਸੈਂਸ ਨਾਲ ਤਸਦੀਕ ਕਰੋ।",
        "kyc_farmer_title": "ਕਿਸਾਨ KYC",
        "kyc_verified_status": "ਸਥਿਤੀ: KYC ਤਸਦੀਕਸ਼ੁਦਾ",
        "notifications_title": "ਭਾਅ ਵਧਣ ਅਤੇ ਘਟਣ ਦੇ ਅਲਰਟ",
        "clear_all": "ਸਭ ਹਟਾਓ",
        "switch_role_title": "ਰੋਲ / ਖਾਤਾ ਬਦਲੋ",
        "switch_role_sub": "ਕਿਸਾਨ ਜਾਂ ਤਸਦੀਕਸ਼ੁਦਾ ਖਰੀਦਦਾਰ ਵਜੋਂ ਲੌਗਇਨ ਕਰੋ",
        "bhome_tag": "ਖਰੀਦਦਾਰ ਵਰਕਸਪੇਸ",
        "bhome_sub": "ਸਿੱਧੀ ਫਸਲ ਖਰੀਦ ਇੰਜਣ • ਤਸਦੀਕਸ਼ੁਦਾ ਕਿਸਾਨ ਅਤੇ FPO ਸਪਲਾਇਰ",
        "bhome_procurement_title": "ਮੌਜੂਦਾ ਕੁੱਲ ਖਰੀਦ",
        "bhome_bids_title": "ਸਰਗਰਮ ਬੋਲੀਆਂ",
        "bhome_spending_title": "ਕੁੱਲ ਖਰਚਾ ਵੇਰਵਾ",
        "bhome_avail_crops": "ਖਰੀਦ ਲਈ ਉਪਲਬਧ ਫਸਲਾਂ",
        "bana_title": "ਮੰਡੀ ਭਾਅ ਅਤੇ ਖਰੀਦ ਵਿਸ਼ਲੇਸ਼ਣ",
        "bana_sub": "ਲਾਈਵ ਮੰਡੀ ਦਰਾਂ, ਇਤਿਹਾਸਕ ਰੁਝਾਨ ਅਤੇ ਖਰੀਦਦਾਰਾਂ ਲਈ ਭਾਅ ਪੂਰਵ-ਅਨੁਮਾਨ।",
        "bana_card_title": "ਮੰਡੀ ਬਾਜ਼ਾਰ ਰੁਝਾਨ ਅਤੇ ਖਰੀਦ ਸੀਮਾ ਦਰਾਂ",
        "bfind_title": "ਕਿਸਾਨ ਅਤੇ FPO ਸਪਲਾਇਰ ਲੱਭੋ",
        "bfind_sub": "ਸਾਰੀਆਂ ਫਸਲਾਂ, ਜ਼ਿਲ੍ਹਿਆਂ ਅਤੇ ਲੋੜੀਂਦੀ ਮਾਤਰਾ ਅਨੁਸਾਰ ਤਸਦੀਕਸ਼ੁਦਾ ਕਿਸਾਨ ਸਪਲਾਇਰ ਖੋਜੋ।",
        "bfind_btn": "ਸਪਲਾਇਰ ਲੱਭੋ",
        "bmp_title": "ਖਰੀਦਦਾਰ ਫਸਲ ਬਾਜ਼ਾਰ",
        "bmp_sub": "ਤਸਦੀਕਸ਼ੁਦਾ ਕਿਸਾਨਾਂ ਅਤੇ FPO ਤੋਂ ਸਿੱਧੇ ਉਪਲਬਧ ਫਸਲ ਲਾਟ ਦੇਖੋ।",
        "bbid_title": "ਬੋਲੀ ਅਤੇ ਆਫਰ ਪ੍ਰਬੰਧਨ",
        "bbid_sub": "ਕਿਸਾਨਾਂ ਨੂੰ ਸਿੱਧੀਆਂ ਆਫਰਾਂ ਭੇਜੋ, ਦਰਾਂ 'ਤੇ ਗੱਲਬਾਤ ਕਰੋ ਜਾਂ ਥੋਕ ਬੋਲੀਆਂ ਦਰਜ ਕਰੋ।",
        "bbid_card_title": "ਕਿਸਾਨ ਲਾਟ ਲਈ ਆਫਰ ਭੇਜੋ",
        "bbid_label_target": "ਟਾਰਗੇਟ ਕਿਸਾਨ / FPO",
        "bbid_label_rate": "ਤੁਹਾਡੀ ਪ੍ਰਸਤਾਵਿਤ ਦਰ (₹/ਕੁੰਟਲ)",
        "bbid_btn": "ਆਫਰ ਭੇਜੋ",
        "bdem_title": "ਮੰਗ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਖੇਤਰੀ ਖਰੀਦ ਜਾਣਕਾਰੀ",
        "bdem_sub": "AI-ਅਧਾਰਿਤ ਵਿਸ਼ਲੇਸ਼ਣ ਜੋ ਉੱਚ ਉਦਯੋਗਿਕ ਘਾਟ ਵਾਲੇ ਖੇਤਰਾਂ ਅਤੇ ਭਾਅ ਪੂਰਵ-ਅਨੁਮਾਨਾਂ ਦੀ ਪਛਾਣ ਕਰਦਾ ਹੈ।",
        "bbulk_title": "ਥੋਕ ਮਾਤਰਾ ਖਰੀਦ ਇੰਜਣ",
        "bbulk_sub": "ਥੋਕ ਲੋੜਾਂ ਬਣਾਓ (ਜਿਵੇਂ 1000 ਕੁੰਟਲ ਚਾਹੀਦਾ ਹੈ) ਅਤੇ ਕਿਸਾਨ ਕਲਸਟਰਾਂ ਤੋਂ ਖਰੀਦੋ।",
        "bbulk_card_title": "ਥੋਕ ਲੋੜ ਬੇਨਤੀ ਬਣਾਓ",
        "bbulk_crop_label": "ਲੋੜੀਂਦੀ ਫਸਲ",
        "bbulk_qty_label": "ਲੋੜੀਂਦੀ ਥੋਕ ਮਾਤਰਾ (ਕੁੰਟਲ)",
        "bbulk_btn": "ਥੋਕ ਲੋੜ ਦਰਜ ਕਰੋ",
        "bfpo_title": "FPO ਅਤੇ ਕਿਸਾਨ ਗਰੁੱਪ ਸਪਲਾਇਰ",
        "bfpo_sub": "FPO ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ ਨਾਲ ਸਿੱਧੇ ਥੋਕ ਖਰੀਦ ਠੇਕੇ।",
        "bfpo_card_title": "ਤਸਦੀਕਸ਼ੁਦਾ FPO ਭਾਈਵਾਲ",
        "bqual_title": "AI ਫਸਲ ਗੁਣਵੱਤਾ ਤਸਦੀਕ",
        "bqual_sub": "ਖਰੀਦਣ ਤੋਂ ਪਹਿਲਾਂ ਕਿਸਾਨ ਦੇ ਫਸਲ ਫੋਟੋ, ਲੈਬ ਰਿਪੋਰਟ ਅਤੇ AI ਗੁਣਵੱਤਾ ਸਕੋਰ ਦੀ ਜਾਂਚ ਕਰੋ।",
        "brisk_title": "AI ਕੀਮਤ ਅਤੇ ਸੌਦਾ ਜੋਖਮ ਡਿਟੈਕਟਰ",
        "brisk_sub": "ਖਰੀਦਦਾਰਾਂ ਲਈ ਕੀਮਤ ਜੋਖਮ ਸੂਚਕ ਦਿਖਾਉਂਦਾ ਹੈ।",
        "brisk_card_title": "ਵੀਕਰੇਤਾ ਦਰ ਜੋਖਮ ਦੀ ਜਾਂਚ ਕਰੋ",
        "brisk_rate_label": "ਵਿਕਰੇਤਾ ਦੁਆਰਾ ਮੰਗੀ ਗਈ ਦਰ (₹/ਕੁੰਟਲ)",
        "brisk_btn": "ਸੌਦਾ ਜੋਖਮ ਦਾ ਮੁਲਾਂਕਣ ਕਰੋ",
        "blog_title": "ਲੌਜਿਸਟਿਕਸ ਅਤੇ ਡਿਲੀਵਰੀ ਟ੍ਰੈਕਿੰਗ",
        "blog_sub": "ਪਿਕਅੱਪ ਸਥਾਨ ਅਤੇ ਖੇਪ ਦੀ ਸਥਿਤੀ ਟ੍ਰੈਕ ਕਰੋ।",
        "bled_title": "ਖਰੀਦਦਾਰ ਖਰੀਦ ਖਾਤਾ ਅਤੇ ਇਨਵੌਇਸ",
        "bled_sub": "ਪੂਰੀਆਂ ਹੋਈਆਂ ਖਰੀਦਾਂ ਅਤੇ ਬਕਾਇਆ ਭੁਗਤਾਨਾਂ ਦਾ ਇਤਿਹਾਸ।",
        "bled_th_supplier": "ਸਪਲਾਇਰ ਦਾ ਨਾਂ",
        "bled_th_payment": "ਕੁੱਲ ਭੁਗਤਾਨ",
        "bfb_title": "ਕਿਸਾਨ ਅਤੇ FPO ਰੇਟਿੰਗ",
        "bfb_sub": "ਗੁਣਵੱਤਾ ਅਤੇ ਸਮੇਂ ਦੀ ਪਾਬੰਦੀ 'ਤੇ ਸਪਲਾਇਰਾਂ ਨੂੰ ਰੇਟ ਕਰੋ।",
        "bfb_card_title": "ਸਪਲਾਇਰ ਰੇਟਿੰਗ ਸਬਮਿਟ ਕਰੋ",
        "bfb_label_type": "ਸਪਲਾਇਰ ਦੀ ਕਿਸਮ",
        "bfb_label_name": "ਸਪਲਾਇਰ ਦਾ ਨਾਂ",
        "bfb_label_rating": "ਰੇਟਿੰਗ (1 ਤੋਂ 5 ਸਟਾਰ)",
        "bfb_btn": "ਰੇਟਿੰਗ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰੋ",
        "bkyc_title": "ਖਰੀਦਦਾਰ ਵਪਾਰ ਤਸਦੀਕ",
        "bkyc_sub": "APMC ਲਾਇਸੈਂਸ, GSTIN ਅਤੇ PAN ਦੀ ਤਸਦੀਕ ਕਰੋ।",
        "bkyc_card_title": "ਤਸਦੀਕਸ਼ੁਦਾ ਖਰੀਦਦਾਰ ਪ੍ਰੋਫਾਈਲ"
    },
    "gu": {
        "tagline": "\"દૂરની સોચ\"",
        "nav_home": "ખેડૂત હોમ",
        "nav_mandi": "લાઇવ મંડી ભાવ",
        "nav_prediction": "કિંમત પૂર્વાનુમાન અને સલાહ",
        "nav_demandmap": "ઉચ્ચ માંગ વિસ્તારો અને ચોખ્ખો નફો",
        "nav_find_buyers": "ચકાસાયેલ ખરીદદાર શોધો",
        "nav_antifraud": "AI છેતરપિંડી ડિટેક્ટર",
        "nav_clustering": "મલ્ટિ-ખેડૂત જૂથ ક્લસ્ટરિંગ",
        "nav_quicksell": "પૈસાની જરૂર? તુરંત વેચો",
        "nav_transport": "પરિવહન અને ચોખ્ખો નફો",
        "nav_fpo": "FPO જૂથ વેચાણ",
        "nav_quality": "AI ગુણવત્તા સ્કેનર",
        "nav_sms": "SMS / સાદો ફોન મોડ",
        "nav_storage": "ગોડાઉન અને સંગ્રહ",
        "nav_alerts": "સ્માર્ટ ભાવ એલર્ટ",
        "nav_feedback": "રેટિંગ અને સહાયતા",
        "nav_ledger": "ડિજિટલ વ્યવહાર ખાતું",
        "nav_kyc": "ખેડૂત ઓળખ અને KYC",
        "bnav_home": "ખરીદદાર હોમ",
        "bnav_analytics": "બજાર ભાવ અને વિશ્લેષણ",
        "bnav_find_farmers": "ખેડૂતો અને સપ્લાયર્સ શોધો",
        "bnav_marketplace": "પાક બજાર",
        "bnav_bidding": "બોલી અને ઓફર્સ",
        "bnav_demand_intel": "માગ વિશ્લેષણ",
        "bnav_bulk": "બલ્ક ખરીદી",
        "bnav_fpo": "FPO અને ખેડૂત જૂથો",
        "bnav_quality": "AI ગુણવત્તા ચકાસણી",
        "bnav_antifraud": "AI સોદા જોખમ ડિટેક્ટર",
        "bnav_logistics": "લોજિસ્ટિક્સ અને ડિલિવરી",
        "bnav_ledger": "ખરીદી ચોપડો",
        "bnav_feedback": "ખેડૂત રેટિંગ અને સહાય",
        "bnav_kyc": "ખરીદદાર ચકાસણી",
        "slogan": "દરેક ખેડૂતને સાચી માહિતી અને સાચો ભાવ",
        "welcome_greeting": "નમસ્તે,",
        "hero_subtitle": "સ્માર્ટ ખેતી. સાચો નિર્ણય. વધુ ઉપજ અને મહત્તમ ચોખ્ખો નફો.",
        "search_placeholder": "પાક, મંડી, ખરીદદાર શોધો...",
        "voice_btn": "વોઇસ સહાયક",
        "verified": "ચકાસાયેલ",
        "role_farmer": "ખેડૂત (ગુજરાત/એમ.પી.)",
        "role_buyer": "APMC ચકાસાયેલ ખરીદદાર",
        "switch_mode_title": "ખાતા વ્યવસ્થાપન",
        "location_indore": "ઇન્દોર, મધ્ય પ્રદેશ",
        "hero_badge_text": "તંદુરસ્ત ખેતર • ખુશહાલ ખેડૂત • સમૃદ્ધ ભારત",
        "qa_prices": "મંડી ભાવ જુઓ",
        "qa_prices_sub": "લાઇવ દરોની સરખામણી કરો",
        "qa_sell_wait": "વેચવું કે રાહ જોવી",
        "qa_sell_wait_sub": "AI ભાવ પૂર્વાનુમાન",
        "qa_high_demand": "ઉચ્ચ માંગ ક્ષેત્રો",
        "qa_high_demand_sub": "વધારે માંગ વાળા બજારો શોધો",
        "qa_quick_cash": "તાત્કાલિક પૈસા જોઈએ છે?",
        "qa_quick_cash_sub": "સ્થાનિક ખરીદદારોના તાત્કાલિક ઓફર્સ",
        "qa_net_profit": "શ્રેષ્ઠ મંડી કેલ્ક્યુલેટર",
        "qa_net_profit_sub": "ભાડું બાદ કરીને ચોખ્ખો નફો",
        "mandi_snapshot_title": "આજના મંડી ભાવ",
        "view_all": "બધા જુઓ",
        "th_commodity": "પાક",
        "th_price": "ભાવ (₹/ક્વિન્ટલ)",
        "th_mandi": "શ્રેષ્ઠ મંડી",
        "th_trend": "ટ્રેન્ડ",
        "my_farm_title": "મારા પાક (My Farm & Crops)",
        "label_total_land": "કુલ જમીન",
        "label_active_crop": "વર્તમાન પાક",
        "label_harvest_est": "લણણીનો અંદાજ",
        "val_harvest_days": "12 દિવસમાં",
        "scan_crop_btn": "AI વડે પાકની ગુણવત્તા ચકાસો",
        "ai_crop_doctor_title": "AI સહાયક અને સલાહ",
        "ai_advice_tag": "સ્માર્ટ સલાહ:",
        "ai_advice_msg": "આજે ઈન્દોરમાં સોયાબીનની આવક ઓછી છે. શુક્રવાર સુધીમાં ભાવ +8% વધવાની શક્યતા છે!",
        "ai_ph": "AI ને પૂછો: જેમ કે આજે સોયાબીનનો ભાવ શું છે?",
        "weather_today": "આજનો હવામાન",
        "weather_partly_cloudy": "અંશતઃ વાદળછાયું",
        "dm_header_title": "પ્રાદેશિક ઉચ્ચ માંગ અને આંતર-જિલ્લા આર્બિટ્રેજ મેપ",
        "dm_header_sub": "જ્યાં પાકની માંગ વધુ છે ત્યાં માલ મોકલીને મહત્તમ નફો કમાઓ!",
        "mandi_page_title": "લાઇવ મંડી ભાવ અને સરખામણી",
        "mandi_page_sub": "APMC મંડીઓ અને ખરીદદારોના દરોની સરખામણી કરો.",
        "th_mandi_name": "મંડીનું નામ",
        "th_modal_price": "મોડલ ભાવ",
        "th_range": "ન્યૂનતમ - મહત્તમ દર",
        "th_arrival": "આવક (ક્વિન્ટલ)",
        "th_truth_score": "સત્યતા સ્કોર",
        "th_action": "પગલાં",
        "pred_title": "AI ભાવ પૂર્વાનુમાન અને સંગ્રહ સલાહ",
        "pred_sub": "મશીન લર્નિંગ મોડલ દ્વારા ભાવ પૂર્વાનુમાન.",
        "adv_hold_title": "સલાહ: 5 દિવસ રાહ જુઓ (HOLD)",
        "adv_hold_desc": "અંદાજિત ભાવ વધારો: +₹350/ક્વિન્ટલ (+7.2%).",
        "market_title": "ચકાસાયેલ ખરીદદાર બજાર અને હરાજી",
        "market_sub": "વચેટિયાઓ વિના સીધા કંપનીઓ અને FPO સાથે જોડાઓ.",
        "btn_post_bidding": "લાઇવ હરાજી માટે લોટ નોંધાવો",
        "qs_header_title": "તાત્કાલિક પૈસા જોઈએ છે? ઝડપી વેચાણ વિકલ્પ",
        "qs_header_sub": "2 કલાકમાં 100% તાત્કાલિક ચુકવણી.",
        "tc_header_title": "શ્રેષ્ઠ મંડી અને ભાડું કેલ્ક્યુલેટર",
        "tc_header_sub": "વાહનવ્યવહાર ખર્ચ બાદ કરીને તમારો ચોખ્ખો નફો ગણો!",
        "tc_inputs_title": "કેલ્ક્યુલેટર ઇનપુટ",
        "fpo_header_title": "FPO જૂથ વેચાણ અને સહિયારું ભાડું",
        "fpo_header_sub": "નાના ખેડૂતો મળીને ટ્રાન્સપોર્ટ ખર્ચમાં 45% બચત કરે છે.",
        "qs_page_title": "AI પાક ગુણવત્તા અને ગ્રેડિંગ સ્કેનર",
        "qs_page_sub": "કેમેરા વડે ભેજ અને ગ્રેડ માપીને પ્રીમિયમ ભાવ મેળવો.",
        "camera_scan_title": "કેમેરા / ઇમેજ સ્કેન",
        "camera_instruct": "\"AI સ્કેન શરૂ કરો\" પર ક્લિક કરો અથવા ફોટો અપલોડ કરો",
        "btn_start_ai_scan": "AI સ્કેન શરૂ કરો",
        "quality_result_title": "AI ગુણવત્તા રિપોર્ટ",
        "wh_page_title": "નજીકનું ગોડાઉન અને સંગ્રહ નિર્ણય",
        "wh_page_sub": "સુરક્ષિત સંગ્રહ માટે WDRA પ્રમાણિત ગોડાઉન શોધો.",
        "wh_wdra_title": "ઇન્દોર નજીક WDRA માન્ય ગોડાઉન",
        "alert_page_title": "સ્માર્ટ ભાવ એલર્ટ અને સૂચનાઓ",
        "alert_page_sub": "ટાર્ગેટ ભાવ પહોંચતા જ SMS અથવા એપ પર એલર્ટ મેળવો.",
        "create_alert_title": "નવો ભાવ એલર્ટ બનાવો",
        "active_alerts_title": "તમારા સક્રિય એલર્ટ",
        "ledger_page_title": "ડિજિટલ વ્યવહાર ખાતું",
        "ledger_page_sub": "ખેડૂતો અને ખરીદદારોના સોદાઓનો ડિજિટલ રેકોર્ડ.",
        "th_txn_id": "લવ-દેવ આઈડી",
        "th_date": "તારીખ",
        "th_crop_qty": "પાક અને જથ્થો",
        "th_agreed_rate": "નક્કી કરેલ દર",
        "th_total_amt": "કુલ રકમ",
        "th_status": "સ્થિતિ",
        "kyc_page_title": "સરકારી ઓળખ અને KYC ચકાસણી",
        "kyc_page_sub": "આધાર અથવા APMC લાયસન્સ વડે ચકાસણી કરો.",
        "kyc_farmer_title": "ખેડૂત KYC",
        "kyc_verified_status": "સ્થિતિ: KYC ચકાસાયેલ",
        "notifications_title": "ભાવ વધારા અને ઘટાડાના એલર્ટ",
        "clear_all": "બધા દૂર કરો",
        "switch_role_title": "રોલ / ખાતું બદલો",
        "switch_role_sub": "ખેડૂત અથવા ચકાસાયેલ ખરીદદાર તરીકે લૉગિન કરો",
        "bhome_tag": "ખરીદદાર વર્કસ્પેસ",
        "bhome_sub": "સીધી પાક ખરીદી એન્જિન • ચકાસાયેલ ખેડૂતો અને FPO",
        "bhome_procurement_title": "વર્તમાન કુલ ખરીદી",
        "bhome_bids_title": "સક્રિય બોલીઓ",
        "bhome_spending_title": "કુલ ખર્ચ વિગત",
        "bhome_avail_crops": "ખરીદી માટે ઉપલબ્ધ પાક",
        "bana_title": "બજાર ભાવ અને ખરીદી વિશ્લેષણ",
        "bana_sub": "લાઇવ મંડી દરો, ઐતિહાસિક ટ્રેન્ડ અને ખરીદદારો માટે ભાવ પૂર્વાનુમાન.",
        "bana_card_title": "મંડી બજાર ટ્રેન્ડ અને ખરીદી મર્યાદા દરો",
        "bfind_title": "ખેડૂતો અને FPO સપ્લાયર્સ શોધો",
        "bfind_sub": "તમામ પાક, જિલ્લાઓ અને જરૂરી જથ્થા અનુસાર ચકાસાયેલ ખેડૂત સપ્લાયર્સ શોધો.",
        "bfind_btn": "સપ્લાયર્સ શોધો",
        "bmp_title": "ખરીદદાર પાક બજાર",
        "bmp_sub": "ચકાસાયેલ ખેડૂતો અને FPO પાસેથી સીધા ઉપલબ્ધ પાક લોટ જુઓ.",
        "bbid_title": "બોલી અને ઓફર વ્યવસ્થાપન",
        "bbid_sub": "ખેડૂતોને સીધા ઓફર મોકલો, દરો પર વાટાઘાટો કરો અથવા બલ્ક બોલીઓ નોંધાવો.",
        "bbid_card_title": "ખેડૂત લોટ માટે ઓફર મોકલો",
        "bbid_label_target": "ટાર્ગેટ ખેડૂત / FPO",
        "bbid_label_rate": "તમારો પ્રસ્તાવિત દર (₹/ક્વિન્ટલ)",
        "bbid_btn": "ઓફર મોકલો",
        "bdem_title": "માગ વિશ્લેષણ અને પ્રાદેશિક ખરીદી આંતરદ્રષ્ટિ",
        "bdem_sub": "AI-આધારિત વિશ્લેષણ જે ઉચ્ચ ઔદ્યોગિક અછત વાળા વિસ્તારો અને ભાવ પૂર્વાનુમાન દર્શાવે છે.",
        "bbulk_title": "બલ્ક જથ્થા ખરીદી એન્જિન",
        "bbulk_sub": "બલ્ક જરૂરિયાતો બનાવો (જેમ કે 1000 ક્વિન્ટલ જોઈએ છે) અને ખેડૂત ક્લસ્ટરો પાસેથી ખરીદો.",
        "bbulk_card_title": "બલ્ક જરૂરિયાત વિનંતી બનાવો",
        "bbulk_crop_label": "જરૂરી પાક",
        "bbulk_qty_label": "જરૂરી બલ્ક જથ્થો (ક્વિન્ટલ)",
        "bbulk_btn": "બલ્ક જરૂરિયાત નોંધાવો",
        "bfpo_title": "FPO અને ખેડૂત જૂથ સપ્લાયર્સ",
        "bfpo_sub": "FPO સહકારી મંડળીઓ સાથે સીધા બલ્ક ખરીદી કરારો.",
        "bfpo_card_title": "ચકાસાયેલ FPO ભાગીદારો",
        "bqual_title": "AI પાક ગુણવત્તા ચકાસણી",
        "bqual_sub": "ખરીદતા પહેલા પાકના ફોટા, લેબ રિપોર્ટ અને AI ગુણવત્તા સ્કોર તપાસો.",
        "brisk_title": "AI ભાવ અને સોદા જોખમ ડિટેક્ટર",
        "brisk_sub": "ખરીદદારો માટે ભાવ જોખમ સૂચકાંકો દર્શાવે છે.",
        "brisk_card_title": "વિક્રેતા દર જોખમની ચકાસણી કરો",
        "brisk_rate_label": "વિક્રેતા દ્વારા માગેલ દર (₹/ક્વિન્ટલ)",
        "brisk_btn": "સોદા જોખમનું મૂલ્યાંકન કરો",
        "blog_title": "લોજિસ્ટિક્સ અને ડિલિવરી ટ્રેકિંગ",
        "blog_sub": "પિકઅપ સ્થાનો અને માલસામાન ટ્રેક કરો.",
        "bled_title": "ખરીદદાર ખરીદી ચોપડો અને બિલ",
        "bled_sub": "પૂર્ણ થયેલ ખરીદી અને બાકી ચુકવણીઓનો ઇતિહાસ.",
        "bled_th_supplier": "સપ્લાયરનું નામ",
        "bled_th_payment": "કુલ ચુકવણી",
        "bfb_title": "ખેડૂત અને FPO રેટિંગ",
        "bfb_sub": "ગુણવત્તા અને સમયપાલન પર સપ્લાયર્સને રેટ કરો.",
        "bfb_card_title": "સપ્લાયર રેટિંગ સબમિટ કરો",
        "bfb_label_type": "સપ્લાયરનો પ્રકાર",
        "bfb_label_name": "ਸપ્ਲਾયરનું નામ",
        "bfb_label_rating": "રેટિંગ (1 થી 5 સ્ટાર)",
        "bfb_btn": "ਰੇਟਿੰਗ પ્રકાશિત કરો",
        "bkyc_title": "ખરીદદાર વ્યવસાય ચકાસણી",
        "bkyc_sub": "APMC લાયસન્સ, GSTIN અને PAN ની ચકાસણી કરો.",
        "bkyc_card_title": "ચકાસાયેલ ખરીદદાર પ્રોફાઇલ"
    }
};

// --- REUSABLE CUSTOM POPUP ALERT HELPER ---
function showCustomPopup(title, message, isSuccess = true) {
    const modal = document.getElementById('customPopupModal');
    const icon = document.getElementById('popupIcon');
    const titleEl = document.getElementById('popupTitle');
    const msgEl = document.getElementById('popupMessage');
    const closeBtn = document.getElementById('closeCustomPopupBtn');
    const okBtn = document.getElementById('btnPopupOk');

    if (!modal) return;
    if (titleEl) titleEl.innerText = title;
    if (msgEl) msgEl.innerHTML = message;

    if (icon) {
        if (isSuccess) {
            icon.className = 'fa-solid fa-circle-check text-green popup-icon-large';
        } else {
            icon.className = 'fa-solid fa-triangle-exclamation text-amber popup-icon-large';
        }
    }

    modal.classList.remove('hidden');

    const hide = () => modal.classList.add('hidden');
    if (closeBtn) closeBtn.onclick = hide;
    if (okBtn) okBtn.onclick = hide;
}

function validateMobile(mobile) {
    if (!mobile) return false;
    const clean = mobile.replace(/[\s\+\-]/g, '');
    return /^\d{10}$/.test(clean);
}

function validateName(name) {
    if (!name) return false;
    return name.trim().length >= 3;
}

function validateAadhaar(aadhar) {
    if (!aadhar) return false;
    const clean = aadhar.replace(/[\s-]/g, '');
    return /^\d{12}$/.test(clean);
}

function validateDistrict(district) {
    if (!district) return false;
    return district.trim().length >= 2;
}

function validateLand(land) {
    if (!land) return false;
    return land.trim().length >= 1;
}

function validateLicense(license) {
    if (!license) return false;
    return license.trim().length >= 6;
}

function validateGST(gstin) {
    if (!gstin) return false;
    const clean = gstin.trim();
    return clean.length === 15;
}

function renderSeasonBadges() {
    const season = getCurrentSeason();
    const lang = state.currentLang || 'hi';

    let titleText = 'Current Agricultural Season';
    let subText = 'Season-Aware Crop Recommendation & Market Advisory Active';
    let seasonLabel = season.labelEn;
    
    if (lang === 'hi') {
        titleText = 'वर्तमान कृषि सीज़न (Current Agricultural Season)';
        subText = 'मौसम-आधारित फसल मांग व बाजार भाव विश्लेषण सक्रिय';
        seasonLabel = season.labelHi;
    } else if (lang === 'mr') {
        titleText = 'सध्याचा कृषी हंगाम (Current Agricultural Season)';
        subText = 'हंगामावर आधारित पीक मागणी आणि बाजार भाव विश्लेषण सक्रिय';
        seasonLabel = season.labelMr;
    } else if (lang === 'pa') {
        titleText = 'ਮੌਜੂਦਾ ਖੇਤੀਬਾੜੀ ਸੀਜ਼ਨ (Current Agricultural Season)';
        subText = 'ਸੀਜ਼ਨ-ਅਧਾਰਿਤ ਫਸਲ ਮੰਗ ਅਤੇ ਮੰਡੀ ਭਾਅ ਵਿਸ਼ਲੇਸ਼ਣ';
        seasonLabel = season.labelPa;
    } else if (lang === 'gu') {
        titleText = 'વર્તમાન કૃષિ સીઝન (Current Agricultural Season)';
        subText = 'સીઝન આધારિત પાક માંગ અને બજાર ભાવ વિશ્લેષણ';
        seasonLabel = season.labelGu;
    }

    const fContainer = document.getElementById('seasonBadgeContainer');
    if (fContainer) {
        fContainer.innerHTML = `
            <div class="season-badge-hero-card" style="
                background: linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%);
                border-radius: 20px;
                padding: 20px 28px;
                color: #FFFFFF;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-shadow: 0 8px 25px rgba(4, 120, 87, 0.25);
                border: 2.5px solid #34D399;
                margin: 20px 0 24px;
            ">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="background: rgba(255, 255, 255, 0.2); width: 64px; height: 64px; border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 38px; backdrop-filter: blur(4px); box-shadow: inset 0 0 10px rgba(255,255,255,0.2);">
                        ${season.icon}
                    </div>
                    <div>
                        <span style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #A7F3D0; font-weight: 700; display: block;">${titleText}</span>
                        <div style="font-size: 32px; font-weight: 900; color: #FFFFFF; text-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 12px; margin: 2px 0;">
                            ${seasonLabel} <span style="background: #34D399; color: #064E3B; font-size: 13px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">ACTIVE 2026</span>
                        </div>
                        <small style="color: #D1FAE5; font-size: 14px; font-weight: 500;">${subText}</small>
                    </div>
                </div>
                <div style="background: rgba(255,255,255,0.15); padding: 12px 22px; border-radius: 16px; text-align: right; backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.25);">
                    <span style="font-size: 11px; color: #A7F3D0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Key Crops / मुख्य फसलें</span>
                    <div style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin-top: 2px;">🌱 Soybean, Paddy, Maize, Cotton</div>
                </div>
            </div>
        `;
    }
}

// --- GLOBAL LIVE SEARCH ENGINE ---
function initGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    const resultsBox = document.getElementById('globalSearchResults');
    if (!searchInput || !resultsBox) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 2) {
            resultsBox.classList.add('hidden');
            return;
        }

        const matches = [];

        // Search Crops
        cropCatalog.forEach(c => {
            if (c.name.toLowerCase().includes(query) || (c.nameHi && c.nameHi.toLowerCase().includes(query))) {
                matches.push({ type: 'Crop', title: c.name + (c.nameHi ? ` (${c.nameHi})` : ''), sub: `Category: ${c.category} | Season: ${c.season}`, tab: 'prediction', crop: c.name });
            }
        });

        // Search Buyers
        buyerData.forEach(b => {
            if (b.name.toLowerCase().includes(query) || b.cropNeeded.toLowerCase().includes(query)) {
                matches.push({ type: 'Buyer', title: b.name, sub: `Buys ${b.cropNeeded} | Rate: ₹${b.offeredRate}/Qtl`, tab: 'marketplace' });
            }
        });

        // Search Warehouses
        warehouseData.forEach(w => {
            if (w.name.toLowerCase().includes(query)) {
                matches.push({ type: 'Warehouse', title: w.name, sub: `Capacity: ${w.capacity} | ${w.distance}`, tab: 'storage' });
            }
        });

        if (matches.length === 0) {
            resultsBox.innerHTML = '<div style="padding:12px; font-size:13px; color:#6B7C75; text-align:center;">No matching crops, buyers, or warehouses found.</div>';
        } else {
            resultsBox.innerHTML = matches.slice(0, 6).map(m => `
                <div class="search-item" onclick="selectSearchResult('${m.tab}', '${m.crop || ''}')">
                    <div>
                        <strong style="font-size:13px; color:#1B4D3E;">[${m.type}] ${m.title}</strong>
                        <div style="font-size:11px; color:#6B7C75;">${m.sub}</div>
                    </div>
                    <i class="fa-solid fa-chevron-right" style="font-size:11px; color:#9CA3AF;"></i>
                </div>
            `).join('');
        }

        resultsBox.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
            resultsBox.classList.add('hidden');
        }
    });
}

function selectSearchResult(tab, cropName) {
    const resultsBox = document.getElementById('globalSearchResults');
    if (resultsBox) resultsBox.classList.add('hidden');
    switchTab(tab);
    if (cropName && tab === 'prediction') {
        const sel = document.getElementById('forecastCropSelect');
        if (sel) {
            sel.value = cropName;
            sel.dispatchEvent(new Event('change'));
        }
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initAuthOverlay();
    initNavigation();
    initLanguageSwitcher();
    initUserProfile();
    renderMiniMandiTable();
    renderFullMandiTable();
    renderBuyersGrid();
    renderRankedMandis();
    renderWarehouseList();
    renderActiveAlerts();
    renderLedgerTable();
    renderDemandMap();
    renderPriceFluctuations();
    renderFeedbackList();
    renderFpoGroups();
    initPredictionChart();
    initForecastEngine();
    initGlobalSearch();
    initVoiceAssistant();
    initEventListeners();
    initNewFeatureListeners();
    renderSeasonBadges();
    renderBuyerViews();

    const savedLang = localStorage.getItem('km_lang');
    if (savedLang) {
        setLanguage(savedLang);
    }

    const savedUser = localStorage.getItem('km_user');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            applyUserSession(user);
            document.getElementById('authOverlay').classList.add('hidden');
        } catch (e) { }
    } else {
        applyUserRoleUI('farmer');
    }
});

// --- ROLE SWITCHING & DUAL DASHBOARD UI CONTROL ---
function applyUserRoleUI(role) {
    state.userRole = role || 'farmer';
    const farmerNav = document.getElementById('farmerNavMenu');
    const buyerNav = document.getElementById('buyerNavMenu');
    const kycBadgeText = document.getElementById('kycBadgeText');
    const uRole = document.getElementById('userRole');

    const dict = i18n[state.currentLang] || i18n['hi'];

    if (state.userRole === 'buyer') {
        if (farmerNav) farmerNav.classList.add('hidden');
        if (buyerNav) buyerNav.classList.remove('hidden');
        if (kycBadgeText) kycBadgeText.innerText = '🟢 Verified Buyer';
        if (uRole) uRole.innerText = dict.role_buyer || 'APMC Verified Buyer';
        
        if (!state.currentTab || !state.currentTab.startsWith('buyer-')) {
            switchTab('buyer-home');
        }
        renderBuyerViews();
    } else {
        if (buyerNav) buyerNav.classList.add('hidden');
        if (farmerNav) farmerNav.classList.remove('hidden');
        if (kycBadgeText) kycBadgeText.innerText = 'Verified Farmer ✓';
        if (uRole) uRole.innerText = dict.role_farmer || 'Farmer (Madhya Pradesh)';
        
        if (!state.currentTab || state.currentTab.startsWith('buyer-')) {
            switchTab('dashboard');
        }
    }
}

function switchRole(newRole) {
    state.userRole = newRole;
    if (newRole === 'farmer') {
        state.userName = 'Anjali Khandelwal';
    } else {
        state.userName = 'Rajesh Agrotech Ltd';
    }
    const uName = document.getElementById('userName');
    const hName = document.getElementById('heroName');
    const bHeroName = document.getElementById('buyerHeroName');
    if (uName) uName.innerText = state.userName;
    if (hName) hName.innerText = state.userName;
    if (bHeroName) bHeroName.innerText = state.userName;

    updateUiLanguage();
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) dropdown.classList.add('hidden');
}

function switchTab(targetTab) {
    const navItems = document.querySelectorAll('.nav-item');
    const tabViews = document.querySelectorAll('.tab-view');

    navItems.forEach(n => {
        if (n.getAttribute('data-tab') === targetTab) {
            n.classList.add('active');
        } else {
            n.classList.remove('active');
        }
    });

    tabViews.forEach(view => {
        if (view.id === `tab-${targetTab}`) {
            view.classList.add('active');
        } else {
            view.classList.remove('active');
        }
    });

    state.currentTab = targetTab;

    if (targetTab.startsWith('buyer-') || state.userRole === 'buyer') {
        renderBuyerViews();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- BUYER DASHBOARD SPECIFIC RENDERERS ---
function renderBuyerViews() {
    renderBuyerMarketplace();
    renderBuyerLedger();
    renderBuyerAnalytics();
    renderBuyerFpoList();
    renderBuyerDemandIntel();
    renderBuyerQualityVerification();
    renderBuyerFeedbackList();
}

function renderBuyerMarketplace() {
    const grid = document.getElementById('buyerMarketplaceGrid');
    if (!grid) return;

    const items = [
        { farmer: 'Anjali Khandelwal (Indore)', crop: 'Soybean (Grade A)', qty: '30 Quintals', askingRate: 5250, distance: '12 km', status: '🟢 Fair Price', moisture: '10.2%' },
        { farmer: 'Ramesh Patel (Depalpur)', crop: 'Soybean (Grade A)', qty: '35 Quintals', askingRate: 5280, distance: '22 km', status: '🟢 Fair Price', moisture: '10.5%' },
        { farmer: 'Suresh Verma (Sanwer)', crop: 'Wheat (Sharbati Grade A+)', qty: '50 Quintals', askingRate: 2510, distance: '18 km', status: '🟢 Fair Price', moisture: '9.8%' },
        { farmer: 'Malwa FPO Cooperative', crop: 'Soybean (Bulk Pool)', qty: '365 Quintals', askingRate: 5320, distance: '15 km', status: '🟢 Fair Price', moisture: '10.0%' },
        { farmer: 'Vikram Singh (Vidisha FPO)', crop: 'Wheat (Lokwan 1)', qty: '120 Quintals', askingRate: 2380, distance: '45 km', status: '🟢 Fair Price', moisture: '10.1%' },
        { farmer: 'Deepak Sharma (Mandsaur)', crop: 'Mustard (Yellow Seed)', qty: '80 Quintals', askingRate: 5300, distance: '65 km', status: '🟢 Fair Price', moisture: '8.5%' },
        { farmer: 'Narsinghpur Pulses Group', crop: 'Chickpea / Desi Chana', qty: '150 Quintals', askingRate: 5050, distance: '80 km', status: '🟢 Fair Price', moisture: '10.0%' },
        { farmer: 'Kailash Joshi (Ratlam)', crop: 'Black Urad / Lentil', qty: '40 Quintals', askingRate: 6100, distance: '35 km', status: '🟢 Fair Price', moisture: '10.3%' }
    ];

    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(320px, 1fr))';
    grid.style.gap = '16px';

    grid.innerHTML = items.map(item => `
        <div class="card buyer-card" style="background:#FFFFFF; border:1px solid #E2E8E4; border-radius:12px; padding:18px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                        <span class="tag tag-emerald mb-1"><i class="fa-solid fa-user-check"></i> ${item.farmer}</span>
                        <h3 class="buyer-name" style="margin-top:6px; font-size:16px; font-weight:700; color:#1E293B;">${item.crop}</h3>
                        <div style="font-size:12px; color:#64748B; margin-top:2px;">
                            <strong>Quantity:</strong> ${item.qty} &bull; <strong>Moisture:</strong> ${item.moisture}
                        </div>
                        <small class="text-muted" style="display:block; margin-top:4px;"><i class="fa-solid fa-location-dot"></i> Distance: ${item.distance}</small>
                    </div>
                    <div style="text-align:right;">
                        <div class="buyer-offer" style="font-size:20px; font-weight:800; color:#10B981;">₹${item.askingRate.toLocaleString()} <small style="font-size:11px; font-weight:normal; color:#64748B;">/ Qtl</small></div>
                        <span style="font-size:11px; background:#ECFDF5; color:#065F46; padding:2px 8px; border-radius:10px; font-weight:700; display:inline-block; margin-top:4px;">${item.status}</span>
                    </div>
                </div>
            </div>
            <div style="display:flex; gap:8px; margin-top:16px;">
                <button class="btn btn-primary flex-1 btn-sm" onclick="triggerDealAccept('${item.farmer}', ${item.askingRate})">
                    <i class="fa-solid fa-cart-shopping"></i> Buy Now / Accept Price
                </button>
                <button class="btn btn-outline btn-sm" onclick="alert('Negotiation offer sent to ${item.farmer}')">
                    <i class="fa-solid fa-comments"></i> Counter Offer
                </button>
            </div>
        </div>
    `).join('');
}

function renderBuyerLedger() {
    const tbody = document.getElementById('buyerLedgerTableBody');
    if (!tbody) return;

    tbody.innerHTML = [
        { id: 'KM-BUY-901', date: '2026-09-05', seller: 'Malwa FPO Cooperative', crop: 'Soybean (Grade A)', qty: '100 Quintals', total: 528000, status: 'Payment Completed' },
        { id: 'KM-BUY-902', date: '2026-09-03', seller: 'Anjali Khandelwal', crop: 'Soybean (Grade A)', qty: '30 Quintals', total: 153600, status: 'In Transit / Dispatched' }
    ].map(item => `
        <tr>
            <td><strong>${item.id}</strong></td>
            <td>${item.date}</td>
            <td><strong>${item.seller}</strong></td>
            <td>${item.crop} (${item.qty})</td>
            <td><strong class="text-green">₹${item.total.toLocaleString()}</strong></td>
            <td><span class="tag tag-emerald">${item.status}</span></td>
        </tr>
    `).join('');
}

function renderBuyerAnalytics() {
    const container = document.getElementById('buyerAnalyticsList');
    if (!container) return;

    const cardsHtml = cropCatalog.map(c => {
        const minP = Math.round(c.basePrice * 0.96);
        const maxP = Math.round(c.basePrice * 1.04);
        const cropDisp = state.currentLang === 'hi' ? (c.nameHi || c.name) : c.name;
        
        let tagColor = '#10B981';
        let bgStyle = '#F0FDF4';
        let borderStyle = '#86EFAC';
        if (c.category === 'Pulses') {
            tagColor = '#D97706';
            bgStyle = '#FEF3C7';
            borderStyle = '#FDE68A';
        } else if (c.category === 'Cereals') {
            tagColor = '#2563EB';
            bgStyle = '#EFF6FF';
            borderStyle = '#93C5FD';
        } else if (c.category === 'Commercial') {
            tagColor = '#9333EA';
            bgStyle = '#FAF5FF';
            borderStyle = '#E9D5FF';
        }

        return `
            <div class="card crop-analytics-card" onclick="openCropTrendAnalyticsModal('${c.name}')" style="background:#FFFFFF; border:1.5px solid #E2E8E4; border-radius:12px; padding:16px; cursor:pointer; transition: all 0.2s ease;" onmouseover="this.style.borderColor='#10B981'; this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='#E2E8E4'; this.style.transform='none';">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                        <span class="tag" style="background:${bgStyle}; color:${tagColor}; border:1px solid ${borderStyle}; font-weight:700; font-size:11px; margin-bottom:6px; display:inline-block;">${c.category} • ${c.season}</span>
                        <h3 style="font-size:16px; color:#1E293B; margin:4px 0; font-weight:700;">${cropDisp} <small style="font-size:12px; color:#64748B;">(${c.name})</small></h3>
                    </div>
                    <span style="color:${tagColor}; font-size:16px;"><i class="fa-solid fa-chart-line"></i></span>
                </div>
                <div style="margin-top:10px;">
                    <div style="font-size:20px; font-weight:800; color:${tagColor};">₹${minP.toLocaleString()} - ₹${maxP.toLocaleString()} <small style="font-size:11px; color:#64748B;">/ Qtl</small></div>
                    <div style="font-size:12px; color:#475569; margin-top:6px; display:flex; justify-content:space-between; align-items:center;">
                        <span><i class="fa-solid fa-location-dot"></i> Mandi Benchmark</span>
                        <span style="font-weight:700; color:#059669;"><i class="fa-solid fa-arrow-right"></i> Details</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:16px;">
            ${cardsHtml}
        </div>
    `;
}

function openCropTrendAnalyticsModal(cropName) {
    const crop = cropCatalog.find(c => c.name.toLowerCase() === cropName.toLowerCase()) || cropCatalog[0];
    const cropDisp = state.currentLang === 'hi' ? (crop.nameHi || crop.name) : crop.name;
    const base = crop.basePrice || 5000;
    const minP = Math.round(base * 0.96);
    const maxP = Math.round(base * 1.04);

    showCustomPopup(
        `📈 Mandi Price Trend & Ceiling Rates — ${cropDisp} (${crop.name})`,
        `
        <div style="text-align:left; font-family:Inter, sans-serif;">
            <div style="background:#ECFDF5; border:1px solid #10B981; padding:14px; border-radius:10px; margin-bottom:12px;">
                <div style="font-size:12px; color:#065F46; font-weight:700;">State APMC Mandi Benchmark Range (${crop.season} Season):</div>
                <div style="font-size:24px; font-weight:800; color:#059669;">₹${minP.toLocaleString()} - ₹${maxP.toLocaleString()} / Quintal</div>
                <p style="font-size:12px; color:#047857; margin-top:4px;">Procurement Ceiling Rate: <strong>₹${maxP.toLocaleString()}/Qtl</strong> (Industrial Max Buying Rate)</p>
            </div>
            
            <h4 style="font-size:14px; color:#1E293B; margin-bottom:8px;">📊 Live APMC Mandi Rates & Arrival Breakdown:</h4>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:12px; margin-bottom:14px;">
                <div style="padding:10px; background:#F8FAFC; border-radius:8px; border:1px solid #CBD5E1;">
                    <strong>Indore APMC:</strong> ₹${base.toLocaleString()}/Qtl<br>
                    <small style="color:#059669;">Arrival: 4,500 Qtl (High)</small>
                </div>
                <div style="padding:10px; background:#F8FAFC; border-radius:8px; border:1px solid #CBD5E1;">
                    <strong>Ujjain APMC:</strong> ₹${Math.round(base * 1.02).toLocaleString()}/Qtl<br>
                    <small style="color:#059669;">Arrival: 3,200 Qtl (Moderate)</small>
                </div>
                <div style="padding:10px; background:#F8FAFC; border-radius:8px; border:1px solid #CBD5E1;">
                    <strong>Bhopal APMC:</strong> ₹${Math.round(base * 1.03).toLocaleString()}/Qtl<br>
                    <small style="color:#D97706;">Arrival: 2,100 Qtl (High Deficit)</small>
                </div>
                <div style="padding:10px; background:#F8FAFC; border-radius:8px; border:1px solid #CBD5E1;">
                    <strong>Neemuch APMC:</strong> ₹${Math.round(base * 1.04).toLocaleString()}/Qtl<br>
                    <small style="color:#059669;">Arrival: 1,900 Qtl (Peak Grade)</small>
                </div>
            </div>

            <div style="margin-top:12px; display:flex; gap:8px;">
                <button class="btn btn-primary btn-full" onclick="
                    document.getElementById('customPopupModal').classList.add('hidden');
                    openBiddingForVerifiedLot('${crop.name} Verified Farmer Lots', ${base});
                ">
                    <i class="fa-solid fa-paper-plane"></i> Send Purchase Offer for ${cropDisp} (₹${base}/Qtl)
                </button>
            </div>
        </div>
        `,
        true
    );
}

function renderBuyerFpo() {
    const container = document.getElementById('buyerFpoList');
    if (!container) return;

    container.innerHTML = `
        <div style="padding:14px; border:1px solid #E2E8E4; border-radius:10px; background:#F9FBF9; margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h4>Malwa Farmer Producer Co.</h4>
                <span class="tag tag-emerald">365 Qtl Soybean Available</span>
            </div>
            <p style="font-size:12px; color:#4B5563; margin-top:4px;">14 Member Farmers | Location: Indore Block (15 km) | Contact: +91 98999 88877</p>
            <button class="btn btn-primary btn-sm mt-2" onclick="alert('Direct procurement contract initiated with Malwa FPO!')">Contract Direct Tonnage</button>
        </div>
    `;
}

function renderBuyerDemandIntel(filterCategory = 'all') {
    const oppContainer = document.getElementById('demandOpportunitiesContainer');
    const tableBody = document.getElementById('demandSurplusTableBody');
    if (!oppContainer || !tableBody) return;

    const opportunities = [
        {
            zone: 'Indore Industrial Zone',
            crop: 'Soybean (JS 335 / Grade A)',
            category: 'Oilseeds',
            deficit: '800 MT Deficit',
            severity: 'high',
            plantRate: 5350,
            sourcingCluster: 'Ratlam Rural APMC Hub',
            clusterRate: 4890,
            savings: '+₹460/Qtl',
            batchSavings: '₹3,68,000 / 800 Qtl',
            surplusQty: '1,200 MT Available'
        },
        {
            zone: 'Bhopal Processing & Flour Mills',
            crop: 'Wheat (Sharbati / Lokwan 1)',
            category: 'Cereals',
            deficit: '1,400 MT Deficit',
            severity: 'moderate',
            plantRate: 2580,
            sourcingCluster: 'Vidisha FPO Producer Cluster',
            clusterRate: 2350,
            savings: '+₹230/Qtl',
            batchSavings: '₹2,30,000 / 1000 Qtl',
            surplusQty: '2,500 MT Available'
        },
        {
            zone: 'Ujjain Solvent & Oil Extraction Mills',
            crop: 'Mustard Seed (Yellow / High Oil 42%)',
            category: 'Oilseeds',
            deficit: '650 MT Deficit',
            severity: 'high',
            plantRate: 5750,
            sourcingCluster: 'Morena-Mandsaur APMC Belt',
            clusterRate: 5280,
            savings: '+₹470/Qtl',
            batchSavings: '₹2,35,000 / 500 Qtl',
            surplusQty: '950 MT Available'
        },
        {
            zone: 'Jabalpur Pulses & Milling Hub',
            crop: 'Chickpea / Chana (Desi & Kabuli)',
            category: 'Pulses',
            deficit: '900 MT Deficit',
            severity: 'moderate',
            plantRate: 5450,
            sourcingCluster: 'Narsinghpur Farmer Group Pool',
            clusterRate: 5020,
            savings: '+₹430/Qtl',
            batchSavings: '₹2,15,000 / 500 Qtl',
            surplusQty: '1,800 MT Available'
        }
    ];

    const filteredOpps = filterCategory === 'all'
        ? opportunities
        : opportunities.filter(o => o.category.toLowerCase() === filterCategory.toLowerCase());

    oppContainer.innerHTML = filteredOpps.map(opp => {
        const isHigh = opp.severity === 'high';
        const badgeBg = isHigh ? '#FEF2F2' : '#FEF3C7';
        const badgeColor = isHigh ? '#991B1B' : '#92400E';
        const badgeBorder = isHigh ? '#FECACA' : '#FDE68A';

        return `
            <div class="card" style="background:#FFFFFF; border:1px solid #E2E8E4; border-radius:12px; padding:18px; position:relative;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                    <div>
                        <span class="tag" style="background:${badgeBg}; color:${badgeColor}; border:1px solid ${badgeBorder}; font-size:11px; font-weight:700;">
                            <i class="fa-solid fa-triangle-exclamation"></i> ${opp.deficit}
                        </span>
                        <h4 style="font-size:16px; font-weight:700; color:#1E293B; margin:6px 0 2px 0;">${opp.zone}</h4>
                        <div style="font-size:13px; color:#475569; font-weight:600;"><i class="fa-solid fa-wheat-awn" style="color:#10B981;"></i> ${opp.crop}</div>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:11px; color:#64748B; display:block;">Target Margin Benefit</span>
                        <span style="font-size:18px; font-weight:800; color:#059669;">${opp.savings}</span>
                    </div>
                </div>

                <div style="background:#F8FAFC; border:1px solid #E2E8E4; border-radius:8px; padding:12px; margin:12px 0; font-size:12px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span style="color:#64748B;">Industrial Plant Buying Rate:</span>
                        <strong style="color:#1E293B;">₹${opp.plantRate.toLocaleString()}/Qtl</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span style="color:#64748B;">Recommended Sourcing Cluster:</span>
                        <strong style="color:#2563EB;">${opp.sourcingCluster}</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span style="color:#64748B;">Cluster Mandi Procurement Rate:</span>
                        <strong style="color:#059669;">₹${opp.clusterRate.toLocaleString()}/Qtl</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between; border-top:1px dashed #CBD5E1; padding-top:4px; margin-top:4px;">
                        <span style="color:#475569; font-weight:600;">Net Batch Profit Benefit:</span>
                        <strong style="color:#059669;">${opp.batchSavings}</strong>
                    </div>
                </div>

                <div style="display:flex; gap:8px;">
                    <button class="btn btn-primary btn-sm flex-1" onclick="openBiddingForVerifiedLot('${opp.sourcingCluster} (${opp.crop})', ${opp.clusterRate})">
                        <i class="fa-solid fa-paper-plane"></i> Send Direct Offer (₹${opp.clusterRate}/Qtl)
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="connectFpoDirect()">
                        <i class="fa-solid fa-handshake"></i> FPO Direct
                    </button>
                </div>
            </div>
        `;
    }).join('');

    const surplusList = [
        { mandi: 'Ratlam APMC Mandi Hub', crop: 'Soybean (JS 335)', category: 'Oilseeds', qty: '1,200 MT', rate: 4890, grade: 'Grade A+ (Moisture 10.1%)', forecast: '📈 +3.5% (Buy Now)', forecastType: 'bullish' },
        { mandi: 'Dewas Mandi Yard', crop: 'Soybean (JS 9560)', category: 'Oilseeds', qty: '850 MT', rate: 5150, grade: 'Grade A (Moisture 10.4%)', forecast: '➡️ Stable', forecastType: 'neutral' },
        { mandi: 'Vidisha Mandi Hub', crop: 'Wheat (Sharbati)', category: 'Cereals', qty: '2,500 MT', rate: 2350, grade: 'Grade A+ (Moisture 9.8%)', forecast: '📈 +2.8% (Rising)', forecastType: 'bullish' },
        { mandi: 'Narsinghpur Mandi', crop: 'Chana / Desi Gram', category: 'Pulses', qty: '1,800 MT', rate: 5020, grade: 'Grade A (Moisture 10.0%)', forecast: '📈 +4.0% (Demand Peak)', forecastType: 'bullish' },
        { mandi: 'Morena APMC Hub', crop: 'Mustard (High Oil)', category: 'Oilseeds', qty: '950 MT', rate: 5280, grade: 'Grade A+ (Oil 42%)', forecast: '➡️ Stable', forecastType: 'neutral' },
        { mandi: 'Harda Mandi Hub', crop: 'Maize / Corn', category: 'Cereals', qty: '1,600 MT', rate: 2050, grade: 'Grade A (Moisture 11.2%)', forecast: '📉 -1.5% (Cooling)', forecastType: 'bearish' }
    ];

    const filteredSurplus = filterCategory === 'all'
        ? surplusList
        : surplusList.filter(s => s.category.toLowerCase() === filterCategory.toLowerCase());

    tableBody.innerHTML = filteredSurplus.map(s => {
        let forecastBg = '#ECFDF5';
        let forecastColor = '#065F46';
        if (s.forecastType === 'neutral') {
            forecastBg = '#FEF3C7';
            forecastColor = '#92400E';
        } else if (s.forecastType === 'bearish') {
            forecastBg = '#FEF2F2';
            forecastColor = '#991B1B';
        }

        return `
            <tr style="border-bottom:1px solid #F1F5F9;">
                <td style="padding:12px 10px;"><strong><i class="fa-solid fa-location-dot" style="color:#059669;"></i> ${s.mandi}</strong></td>
                <td style="padding:12px 10px;">${s.crop}</td>
                <td style="padding:12px 10px;"><span class="tag" style="background:#F1F5F9; color:#334155; font-weight:700;">${s.qty}</span></td>
                <td style="padding:12px 10px; font-weight:800; color:#059669;">₹${s.rate.toLocaleString()}/Qtl</td>
                <td style="padding:12px 10px; font-size:12px; color:#475569;">${s.grade}</td>
                <td style="padding:12px 10px;"><span style="background:${forecastBg}; color:${forecastColor}; padding:4px 8px; border-radius:6px; font-size:11px; font-weight:700;">${s.forecast}</span></td>
                <td style="padding:12px 10px; text-align:right;">
                    <button class="btn btn-sm btn-outline" style="font-size:11px; padding:4px 10px;" onclick="openBiddingForVerifiedLot('${s.mandi} - ${s.crop}', ${s.rate})">
                        Procure Lot
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function filterDemandIntel(category, btnEl) {
    const buttons = document.querySelectorAll('.demand-filter-btn');
    buttons.forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
    });
    if (btnEl) {
        btnEl.classList.remove('btn-outline');
        btnEl.classList.add('btn-primary');
    }
    renderBuyerDemandIntel(category);
}

// --- PRICE FORECAST & ADVISORY ENGINE ---
function initForecastEngine() {
    const sel = document.getElementById('forecastCropSelect');
    if (!sel) return;

    sel.innerHTML = cropCatalog.map(c => `<option value="${c.name}">${c.name} / ${c.nameHi || c.name} (${c.season} - ₹${c.basePrice}/Qtl)</option>`).join('');

    sel.addEventListener('change', () => {
        const cropName = sel.value;
        const crop = cropCatalog.find(c => c.name === cropName) || cropCatalog[0];
        renderForecastForCrop(crop);
    });

    renderForecastForCrop(cropCatalog[0]);
}

function renderForecastForCrop(crop) {
    const metricsCards = document.getElementById('forecastMetricsCards');
    const advisoryTitle = document.getElementById('advisoryTitle');
    const advisoryText = document.getElementById('advisoryText');
    const lang = state.currentLang || 'hi';

    const base = crop.basePrice;
    const day7 = Math.round(base * 1.07);
    const day15 = Math.round(base * 1.12);
    const day30 = Math.round(base * 1.16);

    let cropDisplayName = crop.name;
    if (lang === 'hi' && crop.nameHi) cropDisplayName = crop.nameHi;
    else if (lang === 'mr' && crop.nameMr) cropDisplayName = crop.nameMr;
    else if (lang === 'pa' && crop.namePa) cropDisplayName = crop.namePa;
    else if (lang === 'gu' && crop.nameGu) cropDisplayName = crop.nameGu;

    if (metricsCards) {
        metricsCards.innerHTML = `
            <div style="background:#F0FDF4; border:1px solid #86EFAC; padding:12px; border-radius:10px; text-align:center;">
                <span style="font-size:11px; color:#166534; font-weight:700;">${lang === 'hi' ? 'वर्तमान भाव' : 'Current Price'}</span>
                <div style="font-size:18px; font-weight:800; color:#15803D;">₹${base.toLocaleString()} <small>/ Qtl</small></div>
                <small style="color:#166534;">${cropDisplayName} Baseline</small>
            </div>
            <div style="background:#EFF6FF; border:1px solid #93C5FD; padding:12px; border-radius:10px; text-align:center;">
                <span style="font-size:11px; color:#1E40AF; font-weight:700;">${lang === 'hi' ? '7 दिनों का पूर्वानुमान' : '7-Day Forecast'}</span>
                <div style="font-size:18px; font-weight:800; color:#1D4ED8;">₹${day7.toLocaleString()}</div>
                <small style="color:#1E40AF; font-weight:700;">📈 +7.0% Expected</small>
            </div>
            <div style="background:#FEF3C7; border:1px solid #FDE68A; padding:12px; border-radius:10px; text-align:center;">
                <span style="font-size:11px; color:#92400E; font-weight:700;">${lang === 'hi' ? '15 दिनों का पूर्वानुमान' : '15-Day Forecast'}</span>
                <div style="font-size:18px; font-weight:800; color:#B45309;">₹${day15.toLocaleString()}</div>
                <small style="color:#92400E; font-weight:700;">📈 +12.0% Expected</small>
            </div>
            <div style="background:#FAF5FF; border:1px solid #E9D5FF; padding:12px; border-radius:10px; text-align:center;">
                <span style="font-size:11px; color:#6B21A8; font-weight:700;">${lang === 'hi' ? '30 दिनों का पूर्वानुमान' : '30-Day Forecast'}</span>
                <div style="font-size:18px; font-weight:800; color:#7E22CE;">₹${day30.toLocaleString()}</div>
                <small style="color:#6B21A8; font-weight:700;">📈 +16.0% Expected</small>
            </div>
        `;
    }

    if (advisoryTitle && advisoryText) {
        if (lang === 'hi') {
            advisoryTitle.innerText = `${cropDisplayName.toUpperCase()} के लिए AI सलाह: 7-10 दिनों तक रुकें (HOLD)`;
            advisoryText.innerHTML = `${cropDisplayName} के भाव में अगले 7 दिनों में <strong>+₹${day7 - base}/क्विंटल (+7.0%)</strong> की बढ़ोतरी का अनुमान है। AI सलाह: उच्च मांग आने तक रुकना बेहतर है।`;
        } else {
            advisoryTitle.innerText = `RECOMMENDATION FOR ${cropDisplayName.toUpperCase()}: HOLD FOR 7-10 DAYS`;
            advisoryText.innerHTML = `Expected price increase for ${cropDisplayName}: <strong>+₹${day7 - base}/quintal (+7.0%)</strong> within next 7 days. AI timing advisory: Consider waiting for peak demand.`;
        }
    }

    if (predChartInstance) {
        predChartInstance.data.datasets[0].label = `${cropDisplayName} Rate (₹/Qtl)`;
        predChartInstance.data.datasets[0].data = [Math.round(base * 0.94), Math.round(base * 0.96), Math.round(base * 0.98), Math.round(base * 0.99), base, null, null, null];
        predChartInstance.data.datasets[1].data = [null, null, null, null, base, Math.round(base * 1.03), Math.round(base * 1.05), day7];
        predChartInstance.update();
    }
}

// --- AI QUALITY SCANNER & FINAL GRADE WORKFLOW ---
const labState = { step: 1, labReportUploaded: false };

function initLabFirstQualityWorkflow() {
    const btnUpLab = document.getElementById('btnUploadLabReport');
    const btnCamLab = document.getElementById('btnScanLabReportCam');
    const fileInLab = document.getElementById('labReportFileInput');
    const camInLab = document.getElementById('labReportCameraInput');

    const btnCamCrop = document.getElementById('btnOpenCamera');
    const btnUpCrop = document.getElementById('btnUploadQualityPhoto');
    const fileInCrop = document.getElementById('qualityFileInput');
    const btnScan = document.getElementById('startScanBtn');

    if (btnUpLab && fileInLab) btnUpLab.addEventListener('click', () => fileInLab.click());
    if (btnCamLab && camInLab) btnCamLab.addEventListener('click', () => camInLab.click());

    const handleLabUpload = () => {
        const notice = document.getElementById('labStatusNotice');
        if (notice) {
            notice.innerHTML = `
                <div style="color:#047857; font-weight:700;"><i class="fa-solid fa-spinner fa-spin text-green"></i> Scanning & Extracting Lab Report Data via AI OCR...</div>
                <p style="font-size:12px; color:#065F46; margin-top:2px;">Analyzing document parameters, NABL barcode, moisture %, and protein/oil grade...</p>
            `;
        }
        setTimeout(() => {
            labState.labReportUploaded = true;
            setLabStep(1.5); // Lab Report Loaded
        }, 700);
    };

    if (fileInLab) fileInLab.addEventListener('change', handleLabUpload);
    if (camInLab) camInLab.addEventListener('change', handleLabUpload);

    if (btnCamCrop && fileInCrop) btnCamCrop.addEventListener('click', () => fileInCrop.click());
    if (btnUpCrop && fileInCrop) btnUpCrop.addEventListener('click', () => fileInCrop.click());

    if (fileInCrop) {
        fileInCrop.addEventListener('change', () => {
            if (fileInCrop.files && fileInCrop.files[0]) {
                setLabStep(2); // Crop Photo Captured
            }
        });
    }

    if (btnScan) {
        btnScan.addEventListener('click', () => {
            btnScan.disabled = true;
            btnScan.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Running AI Quality Analysis...';
            setTimeout(() => {
                setLabStep(3); // Final Grade Output
                btnScan.disabled = false;
                btnScan.innerHTML = '<i class="fa-solid fa-microchip"></i> Step 3: Run AI Quality & Grade Scanner';
            }, 800);
        });
    }
}

function setLabStep(stepNum) {
    labState.step = stepNum;
    
    const notice = document.getElementById('labStatusNotice');
    const photoWrapper = document.getElementById('photoStageWrapper');
    const btnCamCrop = document.getElementById('btnOpenCamera');
    const btnUpCrop = document.getElementById('btnUploadQualityPhoto');
    const btnScan = document.getElementById('startScanBtn');
    const resBox = document.getElementById('qualityResultBox');

    if (stepNum === 1.5 || stepNum >= 2) {
        for (let i = 1; i <= 3; i++) {
            const stepEl = document.getElementById(`labStep${i}`);
            if (stepEl) {
                stepEl.classList.remove('active', 'completed');
                if (i < Math.floor(stepNum)) stepEl.classList.add('completed');
                if (i === Math.floor(stepNum)) stepEl.classList.add('active');
            }
        }

        if (notice) {
            notice.style.background = '#ECFDF5';
            notice.style.border = '1px solid #10B981';
            notice.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="color:#065F46;"><i class="fa-solid fa-circle-check"></i> Lab Report Uploaded & Verified: NABL-MP-LAB-9921 ✅</strong>
                    <span class="tag tag-emerald">Official Report</span>
                </div>
                <p style="font-size:12px; color:#047857; margin-top:4px;">
                    • Moisture Content: <strong>10.2% (Lab Verified)</strong><br>
                    • Oil/Protein Content: <strong>19.5%</strong> | Foreign Matter: <strong>0.8%</strong>
                </p>
                <small style="color:#065F46; font-style:italic;">Unlocked: Step 2 (Crop Photo) & Step 3 (AI Quality Scan)</small>
            `;
        }

        if (photoWrapper) {
            photoWrapper.style.opacity = '1';
            photoWrapper.style.pointerEvents = 'auto';
        }
        if (btnCamCrop) btnCamCrop.disabled = false;
        if (btnUpCrop) btnUpCrop.disabled = false;
        if (btnScan) btnScan.disabled = false;
    }

    if (stepNum === 2) {
        if (resBox) {
            resBox.innerHTML = `
                <div style="background:#EFF6FF; border:1px solid #93C5FD; border-radius:12px; padding:16px;">
                    <h4 style="color:#1E40AF;"><i class="fa-solid fa-camera"></i> Crop Photo Captured Successfully!</h4>
                    <p style="font-size:12px; color:#1D4ED8; margin-top:4px;">Crop batch image attached. Click <strong>"Step 3: Run AI Quality & Grade Scanner"</strong> to analyze quality metrics against Lab Report NABL-MP-LAB-9921.</p>
                </div>
            `;
        }
    } else if (stepNum === 3) {
        state.farmerQualityReport = {
            farmerName: state.userName || 'Anjali Khandelwal',
            farmerLocation: state.userLocation || 'Indore, MP',
            crop: 'Soybean (JS 335, Lot #LOT-9921)',
            labReportId: 'NABL-MP-LAB-9921',
            grade: 'GRADE A+ (Export Quality)',
            truthScore: '99%',
            moisture: '10.2%',
            proteinOil: '19.5%',
            impurities: '0.8%',
            uniformity: '96%',
            recommendedRate: 5350,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        try {
            localStorage.setItem('km_quality_report', JSON.stringify(state.farmerQualityReport));
        } catch (e) { }
        renderBuyerQualityVerification();

        if (resBox) {
            resBox.innerHTML = `
                <div style="background:#ECFDF5; border:1px solid #10B981; border-radius:12px; padding:16px; animation: fadeIn 0.3s ease;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h4 style="color:#065F46;"><i class="fa-solid fa-circle-check text-green"></i> Final Quality Grade: GRADE A+ (Export Quality)</h4>
                        <span class="tag tag-emerald">99% Truth Verified</span>
                    </div>
                    <p style="font-size:12px; color:#047857; margin-top:4px;">Calculated from: <strong>Official Lab Report NABL-MP-LAB-9921 + Crop Photo AI Analysis</strong></p>
                    <hr style="border:0; border-top:1px dashed #A7F3D0; margin:10px 0;">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:12px;">
                        <div>• Moisture Content: <strong>10.2%</strong> (Lab Verified)</div>
                        <div>• Oil/Protein: <strong>19.5%</strong></div>
                        <div>• Foreign Matter: <strong>0.8%</strong></div>
                        <div>• Grain Uniformity: <strong>96%</strong></div>
                    </div>
                    <div style="margin-top:12px; padding:12px; background:#FFFFFF; border-radius:8px; border:1.5px solid #10B981;">
                        <div style="font-size:12px; color:#047857; font-weight:700;">Recommended Market Selling Price:</div>
                        <div style="font-size:22px; font-weight:800; color:#059669;">₹5,350 / Quintal <small style="font-size:11px; color:#047857;">(+₹200/Qtl Grade A+ Premium Gain)</small></div>
                    </div>
                </div>
            `;
        }
    }
}

// --- NEW FEATURES LISTENERS ---
function initNewFeatureListeners() {
    initLabFirstQualityWorkflow();

    // Populate anti-fraud crop dropdown from catalog
    const afCropSelect = document.getElementById('afCrop');
    if (afCropSelect) {
        afCropSelect.innerHTML = cropCatalog.map(c => `<option value="${c.name}">${c.name} / ${c.nameHi || c.name} (Benchmark: ₹${c.basePrice}/Qtl)</option>`).join('');
    }

    // Populate clustering crop dropdown from catalog
    const clCropSelect = document.getElementById('clCrop');
    if (clCropSelect) {
        clCropSelect.innerHTML = cropCatalog.map(c => `<option value="${c.name}">${c.name} / ${c.nameHi || c.name}</option>`).join('');
    }

    // 1. AI Anti-Fraud Price Verification
    const afBtn = document.getElementById('runAntiFraudBtn');
    const afPriceInput = document.getElementById('afPrice');
    const btnTestGenuine = document.getElementById('btnTestGenuine');
    const btnTestFraud = document.getElementById('btnTestFraud');
    const btnTestLow = document.getElementById('btnTestLow');

    const updateAntiFraudResult = () => {
        const cropName = afCropSelect ? afCropSelect.value : 'Soybean';
        const cropObj = cropCatalog.find(c => c.name === cropName) || cropCatalog[0];
        const price = parseFloat(afPriceInput ? afPriceInput.value : 0) || 0;
        const resBox = document.getElementById('afResultBox');
        if (!resBox) return;

        const benchmark = cropObj.basePrice || 5000;

        if (price > benchmark * 1.25) {
            resBox.style.background = '#FEF2F2';
            resBox.style.borderColor = '#EF4444';
            resBox.innerHTML = `
                <i class="fa-solid fa-triangle-exclamation text-amber" style="font-size:32px; color:#DC2626;"></i>
                <h4 style="color:#DC2626; margin-top:8px;">🔴 HIGH RISK PRICE ALERT - ${cropObj.name.toUpperCase()}</h4>
                <p style="font-size:13px; color:#991B1B; margin-top:4px;">
                    Off-market price anomaly detected! Offered rate ₹${price.toLocaleString()}/Qtl is <strong>${Math.round(Math.abs(price - benchmark) / benchmark * 100)}% ABOVE</strong> the standard Agmarknet benchmark (₹${benchmark.toLocaleString()}/Qtl). High Risk Alert: Proceed with extra caution or verify buyer credentials.
                </p>
                <div style="margin-top:10px; background:#FFF; padding:10px; border-radius:8px; border:1px solid #FECACA;">
                    <strong style="color:#991B1B; font-size:12px;"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Timing Advisory:</strong>
                    <p style="font-size:12px; color:#7F1D1D; margin-top:2px;">Expected market price for ${cropObj.name} may reach ₹${Math.round(benchmark * 1.07)}/quintal within 7-10 days, subject to market conditions.</p>
                </div>
            `;
        } else if (price < benchmark * 0.75) {
            resBox.style.background = '#FFFBEB';
            resBox.style.borderColor = '#F59E0B';
            resBox.innerHTML = `
                <i class="fa-solid fa-triangle-exclamation text-amber" style="font-size:32px; color:#D97706;"></i>
                <h4 style="color:#B45309; margin-top:8px;">🟡 UNUSUAL PRICE ADVISORY - ${cropObj.name.toUpperCase()}</h4>
                <p style="font-size:13px; color:#92400E; margin-top:4px;">
                    Offered rate ₹${price.toLocaleString()}/Qtl is <strong>${Math.round(Math.abs(benchmark - price) / benchmark * 100)}% BELOW</strong> current Agmarknet modal price (₹${benchmark.toLocaleString()}/Qtl). Low price advisory: Consider holding or selling to alternative verified buyers.
                </p>
                <div style="margin-top:10px; background:#FFF; padding:10px; border-radius:8px; border:1px solid #FDE68A;">
                    <strong style="color:#92400E; font-size:12px;"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Timing Advisory:</strong>
                    <p style="font-size:12px; color:#78350F; margin-top:2px;">Current price is below expected market range. Consider waiting for better prices if market conditions remain favorable.</p>
                </div>
            `;
        } else {
            resBox.style.background = '#ECFDF5';
            resBox.style.borderColor = '#10B981';
            resBox.innerHTML = `
                <i class="fa-solid fa-circle-check text-green" style="font-size:32px;"></i>
                <h4 style="color:#065F46; margin-top:8px;">🟢 FAIR PRICE RISK SCORE: LOW RISK - ${cropObj.name.toUpperCase()}</h4>
                <p style="font-size:13px; color:#065F46; margin-top:4px;">
                    Offered rate ₹${price.toLocaleString()}/Qtl verified within ±5% of Agmarknet modal price (₹${benchmark.toLocaleString()}/Qtl). Safe transaction.
                </p>
                <div style="margin-top:10px; background:#FFF; padding:10px; border-radius:8px; border:1px solid #A7F3D0;">
                    <strong style="color:#065F46; font-size:12px;"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Timing Advisory:</strong>
                    <p style="font-size:12px; color:#047857; margin-top:2px;">The current offer is within expected fair-price range and deal risk is low.</p>
                </div>
            `;
        }
    };

    if (afCropSelect) {
        afCropSelect.addEventListener('change', () => {
            const cropName = afCropSelect.value;
            const cropObj = cropCatalog.find(c => c.name === cropName) || cropCatalog[0];
            if (afPriceInput) afPriceInput.value = Math.round(cropObj.basePrice * 1.02);
            updateAntiFraudResult();
        });
    }

    if (btnTestGenuine) {
        btnTestGenuine.addEventListener('click', () => {
            const cropName = afCropSelect ? afCropSelect.value : 'Soybean';
            const cropObj = cropCatalog.find(c => c.name === cropName) || cropCatalog[0];
            if (afPriceInput) afPriceInput.value = Math.round(cropObj.basePrice * 1.02);
            updateAntiFraudResult();
        });
    }

    if (btnTestFraud) {
        btnTestFraud.addEventListener('click', () => {
            if (afPriceInput) afPriceInput.value = 12000;
            updateAntiFraudResult();
        });
    }

    if (btnTestLow) {
        btnTestLow.addEventListener('click', () => {
            const cropName = afCropSelect ? afCropSelect.value : 'Soybean';
            const cropObj = cropCatalog.find(c => c.name === cropName) || cropCatalog[0];
            if (afPriceInput) afPriceInput.value = Math.round(cropObj.basePrice * 0.7);
            updateAntiFraudResult();
        });
    }

    if (afBtn) afBtn.addEventListener('click', updateAntiFraudResult);

    // 2. Multi-Farmer Cluster Aggregation
    const clBtn = document.getElementById('runClusteringBtn');
    if (clBtn) {
        clBtn.addEventListener('click', () => {
            const crop = document.getElementById('clCrop').value;
            const qty = parseFloat(document.getElementById('clQty').value) || 120;
            const resList = document.getElementById('clResultList');

            resList.innerHTML = `
                <div style="background:#E8F5E9; padding:12px; border-radius:10px; margin-bottom:12px; border:1px solid #81C784;">
                    <div style="font-size:12px; color:#1B4D3E; font-weight:700;"><i class="fa-solid fa-location-crosshairs text-green"></i> 📍 Location Tracked: Indore Block (22.7196° N, 75.8577° E)</div>
                    <h4 style="color:#2E7D32; margin-top:4px;">Cluster Goal Met: ${qty} Quintals Aggregated</h4>
                    <p style="font-size:12px; color:#1B4D3E;">Combined produce from 3 smallholder farmers into 1 unified bulk shipment.</p>
                </div>
                <div style="padding:10px; border:1px solid #E2E8E4; border-radius:8px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <strong>Ramesh Patel</strong> (Depalpur - 12 km)
                        <small style="display:block; color:#6B7C75;">Grade A • Phone: +91 98111 22233</small>
                    </div>
                    <strong class="text-green">+35 Qtl</strong>
                </div>
                <div style="padding:10px; border:1px solid #E2E8E4; border-radius:8px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <strong>Suresh Verma</strong> (Sanwer - 18 km)
                        <small style="display:block; color:#6B7C75;">Grade B • Phone: +91 98444 55566</small>
                    </div>
                    <strong class="text-green">+50 Qtl</strong>
                </div>
                <div style="padding:10px; border:1px solid #E2E8E4; border-radius:8px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <strong>Anjali Khandelwal</strong> (Rau - 8 km)
                        <small style="display:block; color:#6B7C75;">Grade A • Phone: +91 98765 43210</small>
                    </div>
                    <strong class="text-green">+35 Qtl</strong>
                </div>
                <button class="btn btn-primary btn-full mt-2" onclick="alert('Bulk Multi-Farmer Cluster Order Locked! All 3 farmers notified via SMS.')">
                    Lock Combined Cluster Order (${qty} Qtl Total)
                </button>
            `;
        });
    }

    // 3. Notifications Bell Icon Toggle
    const notifBtn = document.getElementById('notifBtn');
    const notifDropdown = document.getElementById('notifDropdown');
    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('hidden');
        });
    }

    const clearNotifsBtn = document.getElementById('clearNotifsBtn');
    if (clearNotifsBtn) {
        clearNotifsBtn.addEventListener('click', () => {
            const list = document.getElementById('notifList');
            if (list) list.innerHTML = '<li style="padding:12px; text-align:center; color:#6B7C75;">All notifications cleared!</li>';
        });
    }

    // 4. SMS Gateway Simulator
    const smsBtn = document.getElementById('sendSmsBtn');
    if (smsBtn) {
        smsBtn.addEventListener('click', () => {
            const input = document.getElementById('smsInput').value;
            sendSmsCommand(input);
        });
    }

    // 5. Submit Rating & Feedback
    const fbBtn = document.getElementById('submitFeedbackBtn');
    if (fbBtn) {
        fbBtn.addEventListener('click', () => {
            const target = document.getElementById('fbTarget') ? document.getElementById('fbTarget').value : 'ITC Ltd';
            const rating = parseInt(document.getElementById('fbRating').value) || 5;

            state.feedbacks.unshift({
                id: state.feedbacks.length + 1,
                user: `${state.userName} (${state.userRole === 'farmer' ? 'Farmer' : 'Buyer'})`,
                target,
                rating
            });

            showCustomPopup(
                state.currentLang === 'hi' ? 'रेटिंग सबमिट हुई' : 'Rating Submitted',
                state.currentLang === 'hi' ? `${target} के लिए आपकी ${rating}-स्टार रेटिंग सफलतापूर्वक सबमिट हो गई है।` : `Your ${rating}-star rating for ${target} has been submitted successfully!`,
                true
            );
        });
    }

    // 6. Photo Upload & Quality Scan Validation
    initQualityScanValidation();

    // 7. AI Assistant Chat Box
    initAiGuidanceChat();

    // 8. Create Price Alert Form
    const alertForm = document.getElementById('createAlertForm');
    if (alertForm) {
        alertForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const crop = document.getElementById('alertCrop').value;
            const price = document.getElementById('alertPrice').value;
            const mandi = document.getElementById('alertMandi').value;

            state.activeAlerts.unshift({
                crop,
                targetPrice: parseFloat(price),
                mandi,
                status: 'Active'
            });

            renderActiveAlerts();
            alert(`🔔 Smart Price Alert Created for ${crop} >= ₹${price}/Qtl at ${mandi}!`);
        });
    }

    // 9. Buyer KYC Verification Form
    const kycBuyerForm = document.getElementById('kycBuyerForm');
    if (kycBuyerForm) {
        kycBuyerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const bName = document.getElementById('kycBName').value;
            const bLicense = document.getElementById('kycBLicense').value;
            const bGstin = document.getElementById('kycBGstin').value;

            alert(`✅ APMC Buyer Trade License [${bLicense}] for ${bName} updated and verified with MP APMC Board!`);
        });
    }

    // 10. Buyer Dashboard Bidding, Rating, Supplier Search & Bulk Procurement Listeners
    initBiddingOfferHandler();
    initBuyerRatingHandler();
    initSupplierSearchHandlers();
    initBulkProcurementHandler();
}



function renderBuyerQualityVerification() {
    const container = document.getElementById('buyerQualityContainer');
    if (!container) return;

    let rep = state.farmerQualityReport;
    if (!rep) {
        try {
            const saved = localStorage.getItem('km_quality_report');
            if (saved) rep = JSON.parse(saved);
        } catch (e) { }
    }

    if (!rep) {
        rep = {
            farmerName: 'Anjali Khandelwal',
            farmerLocation: 'Indore, Madhya Pradesh',
            crop: 'Soybean (JS 335, Lot #LOT-9921)',
            labReportId: 'NABL-MP-LAB-9921',
            grade: 'GRADE A+ (Export Quality)',
            truthScore: '99%',
            moisture: '10.2%',
            proteinOil: '19.5%',
            impurities: '0.8%',
            uniformity: '96%',
            recommendedRate: 5350,
            timestamp: 'Verified Farmer Submission'
        };
    }

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>
                <span class="tag tag-emerald mb-1"><i class="fa-solid fa-circle-check"></i> Farmer Verified Lab & AI Sample</span>
                <h3 style="font-size:18px; color:#065F46;">${rep.crop} — Submitted by ${rep.farmerName}</h3>
                <small style="color:#4B5563;"><i class="fa-solid fa-location-dot"></i> Location: ${rep.farmerLocation} | Submitted: ${rep.timestamp}</small>
            </div>
            <span class="tag tag-emerald" style="font-size:13px; font-weight:700; padding:6px 14px;"><i class="fa-solid fa-shield-check"></i> ${rep.truthScore} Truth Score Verified</span>
        </div>
        <div style="background:#ECFDF5; padding:18px; border-radius:12px; border:1.5px solid #10B981; margin-top:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <h4 style="color:#065F46; font-size:18px;"><i class="fa-solid fa-award text-green"></i> ${rep.grade}</h4>
                <span style="background:#10B981; color:white; padding:4px 12px; border-radius:12px; font-size:12px; font-weight:700;">NABL Accredited Test: ${rep.labReportId}</span>
            </div>
            <hr style="border:0; border-top:1px dashed #A7F3D0; margin:12px 0;">
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px; font-size:13px; color:#047857;">
                <div style="background:#FFFFFF; padding:10px; border-radius:8px; border:1px solid #A7F3D0;">
                    <strong>Moisture Content:</strong><br><span style="font-size:16px; font-weight:700; color:#065F46;">${rep.moisture}</span> (Lab Test)
                </div>
                <div style="background:#FFFFFF; padding:10px; border-radius:8px; border:1px solid #A7F3D0;">
                    <strong>Oil / Protein %:</strong><br><span style="font-size:16px; font-weight:700; color:#065F46;">${rep.proteinOil}</span> (Lab Test)
                </div>
                <div style="background:#FFFFFF; padding:10px; border-radius:8px; border:1px solid #A7F3D0;">
                    <strong>Foreign Impurities:</strong><br><span style="font-size:16px; font-weight:700; color:#065F46;">${rep.impurities}</span> (Minimal)
                </div>
                <div style="background:#FFFFFF; padding:10px; border-radius:8px; border:1px solid #A7F3D0;">
                    <strong>Grain Uniformity:</strong><br><span style="font-size:16px; font-weight:700; color:#065F46;">${rep.uniformity}</span> (AI Vision)
                </div>
            </div>
            <div style="margin-top:14px; background:#FFFFFF; padding:14px; border-radius:10px; border:1.5px solid #10B981; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div>
                    <span style="font-size:12px; color:#4B5563; font-weight:600;">Recommended Benchmark Offered Rate:</span>
                    <div style="font-size:22px; font-weight:800; color:#059669;">₹${rep.recommendedRate.toLocaleString()} / Qtl</div>
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="btn btn-primary" onclick="openBiddingForVerifiedLot('${rep.farmerName}', ${rep.recommendedRate})">
                        <i class="fa-solid fa-paper-plane"></i> Send Binding Offer on Lot
                    </button>
                    <button class="btn btn-outline" onclick="openReceiptModal('KM-QUAL-9921', '${rep.farmerName}', ${rep.recommendedRate * 30}, '+91 98765 43210', '+91 91234 56789')">
                        <i class="fa-solid fa-phone"></i> Contact Farmer Directly
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderBuyerFpoList() {
    const list = document.getElementById('buyerFpoList');
    if (!list) return;

    const fpos = [
        { id: 'FPO-MP-101', name: 'Malwa Farmer Producer Co. (Indore Block)', members: 140, crop: 'Soybean & Wheat', totalAvailable: '1,200 MT', phone: '+91 98999 88877', leader: 'Vikram Singh (FPO Manager)', location: 'Depalpur, Indore', trustScore: '99% Verified FPO' },
        { id: 'FPO-MP-102', name: 'Ujjain Flour Mills Wheat Farmers Co-op', members: 210, crop: 'Sharbati Wheat', totalAvailable: '2,500 MT', phone: '+91 98444 77766', leader: 'Sunil Joshi (Co-op Director)', location: 'Sanwer Road, Ujjain', trustScore: '98% Verified FPO' },
        { id: 'FPO-MP-103', name: 'Narmada Valley Organic Producers Group', members: 95, crop: 'Organic Chana & Soy', totalAvailable: '600 MT', phone: '+91 98777 44433', leader: 'Rajeshwar Patel', location: 'Dhar Mandi District', trustScore: '96% Verified FPO' }
    ];

    list.innerHTML = fpos.map(f => `
        <div style="padding:16px; border:1px solid #E2E8E4; border-radius:12px; margin-bottom:12px; background:#F9FBF9; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
                <span class="tag tag-emerald mb-1"><i class="fa-solid fa-users text-green"></i> ${f.trustScore}</span>
                <h4 style="color:#065F46; font-size:16px; margin:2px 0;">${f.name}</h4>
                <p style="font-size:13px; color:#4B5563; margin-top:2px;">
                    Crops: <strong>${f.crop}</strong> | Available Bulk Qty: <strong style="color:#059669;">${f.totalAvailable}</strong> | Members: ${f.members} Farmers<br>
                    <small style="color:#6B7C75;"><i class="fa-solid fa-user-tie"></i> Leader: ${f.leader} | Location: ${f.location}</small>
                </p>
            </div>
            <div style="display:flex; flex-direction:column; gap:8px;">
                <button class="btn btn-primary btn-sm" onclick="connectFpoDirect('${f.name}', '${f.phone}', '${f.crop}')">
                    <i class="fa-solid fa-file-contract"></i> Connect Direct & Initiate Contract
                </button>
                <button class="btn btn-outline btn-sm" onclick="openReceiptModal('KM-FPO-CONTRACT', '${f.name}', 250000, '${f.phone}', '+91 91234 56789')">
                    <i class="fa-solid fa-phone"></i> Call FPO Manager (${f.phone})
                </button>
            </div>
        </div>
    `).join('');
}

function connectFpoDirect(fpoName, phone, crop) {
    showCustomPopup(
        state.currentLang === 'hi' ? 'FPO प्रत्यक्ष अनुबंध आरंभ' : 'Direct FPO Contract Initiated',
        state.currentLang === 'hi'
            ? `${crop} की मांग के लिए ${fpoName} के साथ direct procurement contract का प्रस्ताव भेजा गया है! FPO मैनेजर (${phone}) आपसे संपर्क करेंगे।`
            : `Direct procurement contract request for ${crop} sent to ${fpoName}! FPO Manager (${phone}) will connect shortly.`,
        true
    );
    openReceiptModal('KM-FPO-' + Math.floor(1000 + Math.random() * 9000), fpoName, 500000, phone, '+91 91234 56789');
}

function initBiddingOfferHandler() {
    const btnSend = document.getElementById('btnSendBiddingOffer');
    if (!btnSend) return;

    btnSend.addEventListener('click', () => {
        const target = document.getElementById('biddingTargetFarmer') ? document.getElementById('biddingTargetFarmer').value : 'Anjali Khandelwal';
        const rate = parseFloat(document.getElementById('buyerOfferRate') ? document.getElementById('buyerOfferRate').value : 5300) || 5300;

        const offerId = `BID-${Math.floor(1000 + Math.random() * 9000)}`;
        showCustomPopup(
            state.currentLang === 'hi' ? 'बिडिंग ऑफर सफलतापूर्वक भेजा गया!' : 'Binding Offer Dispatched!',
            state.currentLang === 'hi'
                ? `आपका ₹${rate.toLocaleString()}/क्विंटल का binding offer [${target}] को सफलतापूर्वक भेज दिया गया है (ऑफर ID: #${offerId})। किसान को SMS नोटिफिकेशन प्राप्त हो गया है।`
                : `Your binding offer of ₹${rate.toLocaleString()}/Quintal sent to [${target}] successfully (Offer ID: #${offerId}). Instant SMS dispatched to farmer.`,
            true
        );

        triggerQuickDeal(target, rate, 30);
    });
}

function evaluateBuyerDealRisk() {
    const priceInput = document.getElementById('buyerRiskPrice');
    const p = parseFloat(priceInput ? priceInput.value : 0) || 0;
    const res = document.getElementById('buyerRiskBox');
    const benchmark = 5250;

    if (!res) return;

    if (p > 6000) {
        res.style.background = '#FEF2F2';
        res.style.borderColor = '#EF4444';
        res.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <i class="fa-solid fa-triangle-exclamation text-amber" style="font-size:28px; color:#DC2626;"></i>
                <div>
                    <h4 style="color:#DC2626;">⚠️ HIGH ASKING PRICE RISK</h4>
                    <p style="font-size:13px; color:#991B1B; margin-top:2px;">Asking rate ₹${p.toLocaleString()}/Qtl is <strong>+${Math.round((p - benchmark) / benchmark * 100)}% ABOVE</strong> benchmark (₹${benchmark.toLocaleString()}/Qtl). High procurement cost risk!</p>
                </div>
            </div>
        `;
        showCustomPopup(
            state.currentLang === 'hi' ? 'उच्च मूल्य जोखिम (High Risk)' : 'High Asking Price Risk',
            state.currentLang === 'hi'
                ? `पूछी गई दर ₹${p.toLocaleString()}/क्विंटल बाज़ार औसत से ${Math.round((p - benchmark) / benchmark * 100)}% अधिक है। कृपया बातचीत करें या AI सजेस्टेड बेंचमार्क ₹5,250 चुनें।`
                : `Asking price of ₹${p.toLocaleString()}/Qtl is ${Math.round((p - benchmark) / benchmark * 100)}% above market benchmark. Consider negotiating rate.`,
            false
        );
    } else {
        res.style.background = '#ECFDF5';
        res.style.borderColor = '#10B981';
        res.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <i class="fa-solid fa-circle-check text-green" style="font-size:28px;"></i>
                <div>
                    <h4 style="color:#065F46;">🟢 FAIR DEAL PRICE</h4>
                    <p style="font-size:13px; color:#065F46; margin-top:2px;">Asking rate ₹${p.toLocaleString()}/Qtl is aligned within expected market range (₹5,200 - ₹5,400/Qtl). Low risk deal!</p>
                </div>
            </div>
        `;
        showCustomPopup(
            state.currentLang === 'hi' ? 'उचित सौदा (Fair Deal)' : 'Fair Deal Price Verified',
            state.currentLang === 'hi'
                ? `दर ₹${p.toLocaleString()}/क्विंटल बाज़ार बेंचमार्क के अनुकूल है। सुरक्षित और लाभदायक सौदा!`
                : `Asking rate ₹${p.toLocaleString()}/Qtl is fair and aligned with Agmarknet benchmark.`,
            true
        );
    }
}

function initBuyerRatingHandler() {
    const btnSubmit = document.getElementById('btnSubmitBuyerRating');
    if (!btnSubmit) return;

    btnSubmit.addEventListener('click', () => {
        const type = document.getElementById('buyerFbType') ? document.getElementById('buyerFbType').value : 'Farmer';
        const target = document.getElementById('buyerFbTarget') ? document.getElementById('buyerFbTarget').value : 'Anjali Khandelwal';
        const rating = parseInt(document.getElementById('buyerFbRating') ? document.getElementById('buyerFbRating').value : 5) || 5;

        state.feedbacks.unshift({
            id: state.feedbacks.length + 1,
            user: `${state.userName} (Buyer)`,
            target: `${target} (${type})`,
            rating: rating
        });

        renderBuyerFeedbackList();

        showCustomPopup(
            state.currentLang === 'hi' ? 'सप्लायर रेटिंग प्रकाशित!' : 'Supplier Rating Published!',
            state.currentLang === 'hi'
                ? `${target} के लिए आपकी ${rating}-स्टार रेटिंग सफलतापूर्वक सबमिट कर दी गई है।`
                : `Your ${rating}-star rating for ${target} has been submitted successfully!`,
            true
        );
    });
}

function renderBuyerFeedbackList() {
    const list = document.getElementById('buyerFeedbackList');
    if (!list) return;

    list.innerHTML = state.feedbacks.map(f => `
        <div style="padding:12px; border-bottom:1px solid #F0F4F2; background:#F9FBF9; border-radius:8px; margin-bottom:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="color:#065F46;">${f.user} &rarr; ${f.target}</strong>
                <span class="text-gold">${'⭐'.repeat(f.rating)}</span>
            </div>
        </div>
    `).join('');
}

function initSupplierSearchHandlers() {
    const btnSearch = document.getElementById('btnSearchFarmers');
    const offer1 = document.getElementById('btnSendPurchaseOffer1');
    const offer2 = document.getElementById('btnSendPurchaseOffer2');

    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            const crop = document.getElementById('bFindCrop') ? document.getElementById('bFindCrop').value : 'Soybean';
            const loc = document.getElementById('bFindLocation') ? document.getElementById('bFindLocation').value : 'Indore';
            const qty = document.getElementById('bFindQty') ? document.getElementById('bFindQty').value : 500;

            showCustomPopup(
                state.currentLang === 'hi' ? 'सप्लायर खोज परिणाम' : 'Suppliers Found',
                state.currentLang === 'hi'
                    ? `${loc} क्षेत्र में ${crop} (${qty} Qtl) के लिए 4 सत्यापित किसान व FPO पाए गए!`
                    : `Found 4 verified farmers & FPOs for ${crop} (${qty} Qtl) near ${loc}!`,
                true
            );
        });
    }

    if (offer1) {
        offer1.addEventListener('click', () => {
            openBiddingForVerifiedLot('Malwa Farmer Producer Co.', 5280);
        });
    }

    if (offer2) {
        offer2.addEventListener('click', () => {
            openBiddingForVerifiedLot('Anjali Khandelwal (Indore, MP)', 5350);
        });
    }
}

function initBulkProcurementHandler() {
    const btnBulk = document.getElementById('btnPostBulkRequirement');
    if (!btnBulk) return;

    btnBulk.addEventListener('click', () => {
        const crop = document.getElementById('bulkCrop') ? document.getElementById('bulkCrop').value : 'Soybean';
        const qty = document.getElementById('bulkQty') ? document.getElementById('bulkQty').value : 1000;

        showCustomPopup(
            state.currentLang === 'hi' ? 'थोक आवश्यकता पोस्ट की गई!' : 'Bulk Requirement Posted!',
            state.currentLang === 'hi'
                ? `${crop} (${qty} quintals) की थोक आवश्यकता दर्ज कर ली गई है! निकटतम किसान समूहों (FPO Clusters) को अलर्ट भेज दिया गया है।`
                : `Bulk requirement for ${crop} (${qty} quintals) posted! Multi-farmer FPO clusters notified.`,
            true
        );
    });
}

function openBiddingForVerifiedLot(targetName, rate) {
    switchTab('buyer-bidding');
    const targetInput = document.getElementById('biddingTargetFarmer');
    const rateInput = document.getElementById('buyerOfferRate');
    if (targetInput) targetInput.value = targetName;
    if (rateInput) rateInput.value = rate;
}

// --- AI QUALITY SCAN & FILE UPLOAD VALIDATION ENGINE ---
function initQualityScanValidation() {
    const fileInput1 = document.getElementById('cropFileInput');
    const fileInput2 = document.getElementById('qualityFileInput');
    const btnUpload1 = document.getElementById('btnUploadCropPhoto');
    const btnUpload2 = document.getElementById('btnUploadQualityPhoto');
    const startScanBtn = document.getElementById('startScanBtn');
    const scanCropBtn = document.getElementById('scanCropBtn');

    if (btnUpload1 && fileInput1) btnUpload1.addEventListener('click', () => fileInput1.click());
    if (btnUpload2 && fileInput2) btnUpload2.addEventListener('click', () => fileInput2.click());

    const handleFileUpload = (file) => {
        if (!file) return;
        const fileName = file.name.toLowerCase();

        if (fileName.includes('person') || fileName.includes('car') || fileName.includes('logo') || fileName.includes('avatar') || fileName.includes('doc')) {
            showInvalidCropAlert();
        } else {
            showQualityScanResult(file.name);
        }
    };

    if (fileInput1) fileInput1.addEventListener('change', (e) => handleFileUpload(e.target.files[0]));
    if (fileInput2) fileInput2.addEventListener('change', (e) => handleFileUpload(e.target.files[0]));

    if (startScanBtn) {
        startScanBtn.addEventListener('click', () => {
            showQualityScanResult('Camera Capture Sample');
        });
    }

    if (scanCropBtn) {
        scanCropBtn.addEventListener('click', () => {
            switchTab('quality');
            showQualityScanResult('Dashboard Crop Sample');
        });
    }
}

function showInvalidCropAlert() {
    const preview = document.getElementById('cameraPreview');
    const resBox = document.getElementById('qualityResultBox');

    const warningHtml = `
        <div style="text-align:center; padding:16px; background:#FEF2F2; border:1px solid #EF4444; border-radius:10px;">
            <i class="fa-solid fa-triangle-exclamation text-amber" style="font-size:36px; color:#DC2626;"></i>
            <h4 style="color:#DC2626; margin-top:8px;">⚠️ INVALID SAMPLE DETECTED</h4>
            <p style="font-size:13px; color:#991B1B; margin-top:4px;">
                Image does not appear to be an agricultural crop produce. Please upload a clear photo of grain/crop sample (Soybean, Wheat, Chana, etc.).
            </p>
        </div>
    `;

    if (preview) preview.innerHTML = warningHtml;
    if (resBox) resBox.innerHTML = warningHtml;
}

function showQualityScanResult(sampleName) {
    const preview = document.getElementById('cameraPreview');
    const resBox = document.getElementById('qualityResultBox');

    const resultHtml = `
        <div style="background:#ECFDF5; border:1px solid #10B981; border-radius:12px; padding:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h4 style="color:#065F46;"><i class="fa-solid fa-circle-check text-green"></i> AI Quality Score: Grade A (Export Quality)</h4>
                <span class="tag tag-emerald">99% Confidence</span>
            </div>
            <p style="font-size:12px; color:#047857; margin-top:4px;">Sample Verified: <strong>${sampleName}</strong></p>
            <hr style="border:0; border-top:1px dashed #A7F3D0; margin:10px 0;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:13px;">
                <div><strong>Moisture Content:</strong> 10.2% (Optimal)</div>
                <div><strong>Discoloration:</strong> 0.4% (Minimal)</div>
                <div><strong>Foreign Impurities:</strong> 0.8% (Clean)</div>
                <div><strong>Grain Uniformity:</strong> 96%</div>
            </div>
            <div style="background:#FFFFFF; padding:10px; border-radius:8px; margin-top:12px; text-align:center;">
                <span style="font-size:12px; color:#4B5563;">Suggested Premium Offered Rate:</span>
                <div style="font-size:20px; font-weight:800; color:#10B981;">₹5,350 / Quintal (+₹200 Premium)</div>
            </div>
        </div>
    `;

    if (preview) preview.innerHTML = `<div style="text-align:center;"><i class="fa-solid fa-circle-check text-green" style="font-size:42px;"></i><h4>AI Scan Completed</h4></div>`;
    if (resBox) resBox.innerHTML = resultHtml;
}

// --- AI GUIDANCE CHAT ENGINE ---
function initAiGuidanceChat() {
    const input = document.getElementById('aiAssistantInput');
    const btn = document.getElementById('sendAiAssistantBtn');
    const chatBox = document.getElementById('aiGuidanceBox');

    if (!input || !btn || !chatBox) return;

    const sendMessage = () => {
        const query = input.value.trim();
        if (!query) return;

        chatBox.innerHTML += `<p style="font-size:13px; color:#1B4D3E; margin-top:8px;"><strong>You:</strong> ${query}</p>`;
        input.value = '';

        setTimeout(() => {
            let aiReply = "Indore mandi soybean rate is currently ₹5,150/Qtl. Forecast shows +7.2% gain if held for 5 days.";
            if (query.includes('गेहूं') || query.toLowerCase().includes('wheat')) {
                aiReply = "Wheat modal price in Indore is ₹2,450/Qtl and Ujjain is ₹2,510/Qtl. High demand from Flour Mills!";
            } else if (query.includes('चना') || query.toLowerCase().includes('chana')) {
                aiReply = "Chana rates in Indore APMC are strong at ₹5,850/Qtl. Excellent sell opportunity!";
            }

            chatBox.innerHTML += `
                <p style="font-size:13px; color:#92400E; margin-top:6px; background:#FEF3C7; padding:8px; border-radius:6px;">
                    <strong>AI Doctor:</strong> ${aiReply}
                </p>
            `;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);
    };

    btn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function sendSmsCommand(cmd) {
    const screen = document.getElementById('smsPhoneScreen');
    if (document.getElementById('smsInput')) document.getElementById('smsInput').value = cmd;

    let replyText = "[KrishiMitra Gateway]\nLive Rate Soybean Indore: Rs 5,150/Qtl. Send KM HELP to 56767.";
    if (cmd.includes('SELL')) {
        replyText = "[KrishiMitra Gateway]\nSell Order Received! Buyer ITC Choupal matched at Rs 5,250/Qtl. Total: Rs 1,05,000. Deal ID: KM-SMS-9912. SMS confirmation sent.";
    } else if (cmd.includes('CHANA')) {
        replyText = "[KrishiMitra Gateway]\nLive Rate Chana Indore: Rs 5,850/Qtl. Trend: +2.1% RISE.";
    } else if (cmd.includes('HELP')) {
        replyText = "[KrishiMitra Commands]\nKM RATE [CROP]\nKM SELL [CROP] [QTY]\nKM STATUS\nKM ADVISE";
    }

    if (screen) {
        screen.innerHTML = `
            <p style="color:#FFF;">&gt; SMS Sent: "${cmd}"</p>
            <p style="color:#00FF66; margin-top:10px; white-space:pre-wrap;">${replyText}</p>
        `;
    }
}

function renderFeedbackList() {
    const list = document.getElementById('feedbackList');
    if (!list) return;

    list.innerHTML = state.feedbacks.map(f => `
        <div style="padding:12px; border-bottom:1px solid #F0F4F2;">
            <div style="display:flex; justify-content:space-between;">
                <strong>${f.user} &rarr; ${f.target}</strong>
                <span class="text-gold">${'⭐'.repeat(f.rating)}</span>
            </div>
            <p style="font-size:13px; color:#4B5563; margin-top:4px;">"${f.comment}"</p>
        </div>
    `).join('');
}

function renderFpoGroups() {
    const list = document.getElementById('fpoGroupList');
    if (!list) return;

    list.innerHTML = state.fpoPools.map(p => `
        <div style="padding:12px; border:1px solid #E2E8E4; border-radius:10px; margin-bottom:10px; background:#F9FBF9;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h4 style="color:#1B4D3E; font-size:15px;">${p.name}</h4>
                <span class="tag tag-emerald">${p.savings}</span>
            </div>
            <p style="font-size:12px; color:#4B5563; margin-top:4px;">
                Collected: <strong>${p.collectedQty} / ${p.targetQty}</strong> | Members: ${p.membersCount} Farmers
            </p>
        </div>
    `).join('');
}

// --- AUTHENTICATION OVERLAY CONTROLLER ---
function initAuthOverlay() {
    const overlay = document.getElementById('authOverlay');
    const stepLang = document.getElementById('authStepLang');
    const stepRole = document.getElementById('authStepRole');
    const btnNext = document.getElementById('btnNextToRole');

    document.querySelectorAll('.lang-card-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-card-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selectedLang = btn.getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            stepLang.classList.add('hidden');
            stepRole.classList.remove('hidden');
        });
    }

    const tabFarmer = document.getElementById('tabFarmer');
    const tabBuyer = document.getElementById('tabBuyer');
    const farmerForm = document.getElementById('farmerAuthForm');
    const buyerForm = document.getElementById('buyerAuthForm');

    if (tabFarmer && tabBuyer) {
        tabFarmer.addEventListener('click', () => {
            tabFarmer.classList.add('active');
            tabBuyer.classList.remove('active');
            farmerForm.classList.remove('hidden');
            buyerForm.classList.add('hidden');
        });

        tabBuyer.addEventListener('click', () => {
            tabBuyer.classList.add('active');
            tabFarmer.classList.remove('active');
            buyerForm.classList.remove('hidden');
            farmerForm.classList.add('hidden');
        });
    }

    if (farmerForm) {
        farmerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const mobileVal = document.getElementById('fMobile') ? document.getElementById('fMobile').value : '';
            const nameVal = document.getElementById('fName') ? document.getElementById('fName').value : '';
            const aadharVal = document.getElementById('fAadhar') ? document.getElementById('fAadhar').value : '';
            const districtVal = document.getElementById('fDistrict') ? document.getElementById('fDistrict').value : '';
            const landVal = document.getElementById('fLand') ? document.getElementById('fLand').value : '';

            if (!validateMobile(mobileVal)) {
                showCustomPopup(
                    state.currentLang === 'hi' ? 'अमान्य मोबाइल नंबर' : 'Invalid Mobile Number',
                    state.currentLang === 'hi'
                        ? 'अमान्य मोबाइल नंबर! कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें (Invalid Mobile Number. Please enter a valid 10-digit mobile number).'
                        : 'Invalid Mobile Number. Please enter a valid 10-digit mobile number.',
                    false
                );
                return;
            }

            if (!validateName(nameVal)) {
                showCustomPopup(
                    state.currentLang === 'hi' ? 'अमान्य नाम' : 'Invalid Name',
                    state.currentLang === 'hi'
                        ? 'अमान्य नाम! कृपया अपना पूरा नाम दर्ज करें - न्यूनतम 3 अक्षर (Please enter your full name - min 3 characters).'
                        : 'Invalid Name. Please enter your full name (at least 3 characters).',
                    false
                );
                return;
            }

            if (!validateAadhaar(aadharVal)) {
                showCustomPopup(
                    state.currentLang === 'hi' ? 'अमान्य आधार संख्या' : 'Invalid Aadhaar Number',
                    state.currentLang === 'hi'
                        ? 'अमान्य आधार संख्या! कृपया 12 अंकों की सही आधार संख्या दर्ज करें (Invalid Aadhaar Number. Please enter a valid 12-digit Aadhaar number).'
                        : 'Invalid Aadhaar Number. Please enter a valid 12-digit Aadhaar number.',
                    false
                );
                return;
            }

            if (!validateDistrict(districtVal)) {
                showCustomPopup(
                    state.currentLang === 'hi' ? 'अमान्य जिला' : 'Invalid District',
                    state.currentLang === 'hi'
                        ? 'अमान्य जिला! कृपया अपना जिला व राज्य दर्ज करें (Please enter your district and state).'
                        : 'Invalid District. Please enter your district and state.',
                    false
                );
                return;
            }

            if (!validateLand(landVal)) {
                showCustomPopup(
                    state.currentLang === 'hi' ? 'अमान्य भूमि आकार' : 'Invalid Land Size',
                    state.currentLang === 'hi'
                        ? 'अमान्य भूमि! कृपया भूमि हेक्टेयर/एकड़ में दर्ज करें (Please enter land size in hectares/acres).'
                        : 'Invalid Land Size. Please enter land size.',
                    false
                );
                return;
            }

            // Valid Mobile, Name, Aadhaar, District & Land
            showCustomPopup(
                state.currentLang === 'hi' ? 'केवाईसी सत्यापन सफल' : 'Verification Successful',
                state.currentLang === 'hi' ? 'मोबाइल नंबर, नाम व आधार/केवाईसी सत्यापन सफल रहा (Mobile, Name & Aadhaar/KYC verification successful).' : 'Mobile, Name & Aadhaar/KYC verification successful.',
                true
            );

            const userObj = {
                role: 'farmer',
                name: nameVal,
                mobile: mobileVal,
                aadhar: aadharVal,
                location: districtVal,
                landSize: landVal,
                crop: 'Soybean (JS 335)',
                language: state.currentLang
            };

            setTimeout(async () => {
                await completeLogin(userObj);
            }, 1000);
        });
    }

    if (buyerForm) {
        buyerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const mobileVal = document.getElementById('bMobile') ? document.getElementById('bMobile').value : '';
            const nameVal = document.getElementById('bName') ? document.getElementById('bName').value : '';
            const licenseVal = document.getElementById('bLicense') ? document.getElementById('bLicense').value : '';
            const gstinVal = document.getElementById('bGstin') ? document.getElementById('bGstin').value : '';

            if (!validateMobile(mobileVal)) {
                showCustomPopup(
                    state.currentLang === 'hi' ? 'अमान्य मोबाइल नंबर' : 'Invalid Mobile Number',
                    state.currentLang === 'hi'
                        ? 'अमान्य मोबाइल नंबर! कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें (Invalid Mobile Number. Please enter a valid 10-digit mobile number).'
                        : 'Invalid Mobile Number. Please enter a valid 10-digit mobile number.',
                    false
                );
                return;
            }

            if (!validateName(nameVal)) {
                showCustomPopup(
                    state.currentLang === 'hi' ? 'अमान्य व्यापार का नाम' : 'Invalid Firm Name',
                    state.currentLang === 'hi'
                        ? 'अमान्य व्यापार का नाम! कृपया कंपनी या फर्म का पूरा नाम दर्ज करें - न्यूनतम 3 अक्षर (Please enter business/firm name - min 3 chars).'
                        : 'Invalid Firm Name. Please enter business/firm name (at least 3 characters).',
                    false
                );
                return;
            }

            if (!validateLicense(licenseVal)) {
                showCustomPopup(
                    state.currentLang === 'hi' ? 'अमान्य लाइसेंस' : 'Invalid License ID',
                    state.currentLang === 'hi'
                        ? 'अमान्य लाइसेंस आईडी! कृपया सही एपीएमसी लाइसेंस आईडी दर्ज करें - न्यूनतम 6 अक्षर (Invalid License ID. Please enter a valid APMC license number).'
                        : 'Invalid License ID. Please enter a valid APMC license number (at least 6 characters).',
                    false
                );
                return;
            }

            if (!validateGST(gstinVal)) {
                showCustomPopup(
                    state.currentLang === 'hi' ? 'अमान्य जीएसटीIN' : 'Invalid GST Number',
                    state.currentLang === 'hi'
                        ? 'अमान्य जीएसटी नंबर! कृपया 15 अंकों/अक्षरों का सही GSTIN दर्ज करें (Invalid GST Number. Please enter a valid 15-character GSTIN).'
                        : 'Invalid GST Number. Please enter a valid 15-character GSTIN.',
                    false
                );
                return;
            }

            // Valid Mobile, Company Name, License & GST
            showCustomPopup(
                state.currentLang === 'hi' ? 'व्यापारी सत्यापन सफल' : 'Verification Successful',
                state.currentLang === 'hi'
                    ? 'मोबाइल नंबर, कंपनी नाम, लाइसेंस आईडी और जीएसटी नंबर सफलतापूर्वक सत्यापित हो गए हैं (Mobile, Firm Name, License ID & GST Number verified successfully).'
                    : 'Mobile, Firm Name, License ID & GST Number verified successfully.',
                true
            );

            const userObj = {
                role: 'buyer',
                name: document.getElementById('bName').value || 'Rajesh Agrotech Ltd',
                mobile: document.getElementById('bMobile').value || '9123456789',
                apmcLicense: licenseVal,
                gstin: gstinVal,
                location: 'Indore APMC Yard',
                language: state.currentLang
            };

            setTimeout(async () => {
                await completeLogin(userObj);
            }, 1000);
        });
    }

    const openAuthBtn = document.getElementById('openAuthModalBtn');
    if (openAuthBtn) {
        openAuthBtn.addEventListener('click', () => {
            overlay.classList.remove('hidden');
            stepLang.classList.remove('hidden');
            stepRole.classList.add('hidden');
        });
    }
}

async function completeLogin(userObj) {
    state.currentUser = userObj;
    state.userRole = userObj.role;
    state.userName = userObj.name;
    localStorage.setItem('km_user', JSON.stringify(userObj));

    try {
        await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userObj)
        });
    } catch (e) { }

    applyUserSession(userObj);
    document.getElementById('authOverlay').classList.add('hidden');
    updateUiLanguage();
}

function applyUserSession(user) {
    if (!user) return;

    state.userName = user.name;
    state.userRole = user.role;
    state.currentLang = localStorage.getItem('km_lang') || user.language || state.currentLang;

    const uName = document.getElementById('userName');
    const hName = document.getElementById('heroName');
    const bHeroName = document.getElementById('buyerHeroName');
    const kycFarmerName = document.getElementById('kycFarmerName');

    if (uName) uName.innerText = user.name;
    if (hName) hName.innerText = user.name;
    if (bHeroName) bHeroName.innerText = user.name;
    if (kycFarmerName) kycFarmerName.innerText = user.name;

    applyUserRoleUI(user.role);

    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = state.currentLang;
}

// --- NAVIGATION CONTROLLER ---
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = item.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    document.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            switchTab(action);
        });
    });

    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    }
}

// --- LANGUAGE SWITCHER ENGINE ---
function initLanguageSwitcher() {
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
    }
}

function setLanguage(lang) {
    state.currentLang = i18n[lang] ? lang : 'hi';
    localStorage.setItem('km_lang', state.currentLang);

    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = state.currentLang;

    document.querySelectorAll('.lang-card-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === state.currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    updateUiLanguage();
}

function updateUiLanguage() {
    const dict = i18n[state.currentLang] || i18n['hi'];
    const fallbackDict = i18n['en'] || i18n['hi'];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = dict[key] || fallbackDict[key];
        if (text) el.innerText = text;
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        const ph = dict[key] || fallbackDict[key];
        if (ph) el.setAttribute('placeholder', ph);
    });

    applyUserRoleUI(state.userRole);

    renderSeasonBadges();
    renderDemandMap();
    renderMiniMandiTable();
    renderFullMandiTable();
    renderBuyersGrid();
    renderRankedMandis();
    renderWarehouseList();
    renderActiveAlerts();
    renderLedgerTable();
    renderPriceFluctuations();
    renderFpoGroups();
    renderBuyerViews();
}

function initUserProfile() {
    const profileBtn = document.getElementById('userProfileBtn');
    const dropdown = document.getElementById('profileDropdown');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => dropdown.classList.toggle('hidden'));
    }
}

// --- MANDI DATA TABLES ---
function renderMiniMandiTable() {
    const tbody = document.getElementById('miniMandiBody');
    if (!tbody) return;

    const filtered = mandiData.filter(d => d.crop === 'Soybean').slice(0, 4);
    tbody.innerHTML = filtered.map(item => `
        <tr>
            <td><strong>${item.crop}</strong></td>
            <td><strong class="text-green">₹${item.modalPrice.toLocaleString()}</strong></td>
            <td>${item.name}</td>
            <td><span class="trend-badge up"><i class="fa-solid fa-arrow-up"></i> +1.8%</span></td>
        </tr>
    `).join('');
}

function renderFullMandiTable() {
    const tbody = document.getElementById('fullMandiTableBody');
    if (!tbody) return;

    tbody.innerHTML = mandiData.map(item => `
        <tr>
            <td><strong>${item.name}</strong></td>
            <td>${item.crop}</td>
            <td><strong class="text-green">₹${item.modalPrice.toLocaleString()}</strong></td>
            <td>₹${item.minPrice} - ₹${item.maxPrice}</td>
            <td>${item.arrival.toLocaleString()} Qtl</td>
            <td><span class="tag tag-emerald"><i class="fa-solid fa-shield-check"></i> ${item.truthScore}</span></td>
            <td><button class="btn btn-sm btn-outline" onclick="selectMandiForCalc('${item.name}')">Compare Net Profit</button></td>
        </tr>
    `).join('');
}

// --- REGIONAL HIGH DEMAND & INTER-DISTRICT ARBITRAGE MAP ---
function renderDemandMap() {
    const container = document.getElementById('demandMapList');
    if (!container) return;

    fetch(`${API_BASE}/demand-map`)
        .then(res => res.json())
        .then(data => {
            renderDemandMapCards(data);
        })
        .catch(e => {
            const fallback = [
                { id: 'REG-01', region: 'Indore Processing Zone', crop: 'Soybean', demandQty: '800 MT', deficitLevel: 'HIGH DEFICIT', rateOffered: 5410, surplusRegion: 'Ratlam Rural (Rate ₹4,900)', arbitrageGain: '₹510 / Qtl (+₹10,200 Net)' },
                { id: 'REG-02', region: 'Pithampur Exporter Hub', crop: 'Soybean', demandQty: '500 MT', deficitLevel: 'HIGH DEFICIT', rateOffered: 5380, surplusRegion: 'Dewas Block (Rate ₹5,120)', arbitrageGain: '₹260 / Qtl (+₹5,200 Net)' },
                { id: 'REG-03', region: 'Bhopal Feed Factory Hub', crop: 'Maize', demandQty: '1,200 MT', deficitLevel: 'VERY HIGH NEED', rateOffered: 2150, surplusRegion: 'Chhindwara (Rate ₹1,850)', arbitrageGain: '₹300 / Qtl (+₹6,000 Net)' },
                { id: 'REG-04', region: 'Ujjain Flour Mills Zone', crop: 'Wheat', demandQty: '600 MT', deficitLevel: 'MODERATE NEED', rateOffered: 2580, surplusRegion: 'Dhar Mandi (Rate ₹2,350)', arbitrageGain: '₹230 / Qtl (+₹4,600 Net)' }
            ];
            renderDemandMapCards(fallback);
        });
}

function renderDemandMapCards(data) {
    const container = document.getElementById('demandMapList');
    if (!container) return;

    container.innerHTML = data.map(item => `
        <div class="card demand-card" style="border-left: 5px solid #10B981; margin-bottom: 16px; background:#FFFFFF;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
                <div>
                    <span class="tag tag-amber mb-1" style="font-weight:700;"><i class="fa-solid fa-fire text-amber"></i> ${item.deficitLevel}</span>
                    <h3 style="font-size:18px; margin:4px 0; color:#1B4D3E;">🔥 ${item.region}</h3>
                    <p style="font-size:14px; color:#4B5563;">Crop Needed: <strong>${item.crop}</strong> | Deficit Quantity: <span class="text-green" style="font-weight:700;">${item.demandQty}</span></p>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:22px; font-weight:800; color:#10B981;">₹${item.rateOffered.toLocaleString()} <small style="font-size:12px; color:#6B7C75;">/ Qtl Offered</small></div>
                    <span style="font-size:11px; background:#ECFDF5; color:#065F46; padding:4px 10px; border-radius:12px; font-weight:700;"><i class="fa-solid fa-bolt"></i> High Demand Market</span>
                </div>
            </div>

            <div style="background:#F0FDF4; border:1px solid #BBF7D0; padding:14px; border-radius:10px; margin-top:14px;">
                <h4 style="color:#166534; font-size:14px; margin-bottom:6px;"><i class="fa-solid fa-truck-arrow-right"></i> Supply Arbitrage Strategy</h4>
                <p style="font-size:13px; color:#15803D;"><strong>Surplus Source Region:</strong> ${item.surplusRegion}</p>
                <p style="font-size:13px; color:#166534; font-weight:700; margin-top:4px;">💡 Inter-District Net Profit Gain: <span class="text-green" style="font-size:15px;">${item.arbitrageGain}</span></p>
            </div>

            <div style="display:flex; gap:10px; margin-top:14px; flex-wrap:wrap;">
                <button class="btn btn-primary" onclick="triggerArbitrageShipment('${item.region}', '${item.crop}', ${item.rateOffered})">
                    <i class="fa-solid fa-truck-fast"></i> Ship Produce & Match Freight
                </button>
                <button class="btn btn-outline" onclick="openReceiptModal('KM-DEMAND-${item.id}', '${item.region} Buyer Hub', ${item.rateOffered * 20}, '+91 91234 56789', '+91 98765 43210')">
                    <i class="fa-solid fa-phone"></i> Contact High Demand Buyer Directly
                </button>
            </div>
        </div>
    `).join('');
}

function triggerArbitrageShipment(region, crop, rate) {
    alert(`Arbitrage Freight Placed! Transporting ${crop} to ${region} at guaranteed rate of ₹${rate}/Qtl. Driver contact & buyer dispatch details unlocked!`);
    triggerDealAccept(`${region} High-Demand Buyer`, rate);
}

// --- PRICE FLUCTUATION ALERTS ENGINE ---
function renderPriceFluctuations() {
    const list = document.getElementById('notifList');
    if (!list) return;

    fetch(`${API_BASE}/price-fluctuations`)
        .then(res => res.json())
        .then(data => {
            renderNotifItems(data);
        })
        .catch(e => {
            const fallback = [
                { id: 1, type: 'RISE', crop: 'Soybean', mandi: 'Indore APMC', change: '+₹150/Qtl', newRate: 5300, time: '10 mins ago' },
                { id: 2, type: 'DROP', crop: 'Wheat', mandi: 'Dewas APMC', change: '-₹50/Qtl', newRate: 2400, time: '35 mins ago' },
                { id: 3, type: 'RISE', crop: 'Onion', mandi: 'Ujjain APMC', change: '+₹210/Qtl', newRate: 1950, time: '1 hour ago' }
            ];
            renderNotifItems(fallback);
        });
}

function renderNotifItems(data) {
    const list = document.getElementById('notifList');
    if (!list) return;

    list.innerHTML = data.map(item => `
        <li class="notif-item ${item.type === 'RISE' ? 'unread' : ''}" style="cursor:pointer; padding:10px; border-bottom:1px solid #F0F4F2;" onclick="openReceiptModal('KM-ALERT-${item.id}', '${item.mandi} Buyer', ${item.newRate * 20}, '+91 91234 56789', '+91 98765 43210')">
            <i class="fa-solid ${item.type === 'RISE' ? 'fa-arrow-trend-up green' : 'fa-arrow-trend-down amber'} notif-icon"></i>
            <div>
                <p style="font-size:13px; margin:0;"><strong>${item.type === 'RISE' ? '📈 Price Rise Alert!' : '📉 Price Drop Alert!'}</strong> ${item.crop} in ${item.mandi} changed by ${item.change} (Now ₹${item.newRate.toLocaleString()}/Qtl).</p>
                <small style="color:#6B7C75;">${item.time} • Tap to view Buyer Direct Contact</small>
            </div>
        </li>
    `).join('');
}

// --- BUYER MARKETPLACE VIEW ---
function renderBuyersGrid() {
    const grid = document.getElementById('buyersGrid');
    if (!grid) return;

    grid.innerHTML = buyerData.map(buyer => `
        <div class="buyer-card" style="${buyer.aiFraudCheck === 'BLOCKED_FRAUD' ? 'opacity:0.6; border-color:#EF4444;' : ''}">
            <div class="buyer-header">
                <div>
                    <span class="tag tag-emerald mb-1">${buyer.badge}</span>
                    <h3 class="buyer-name">${buyer.name}</h3>
                    <small class="text-muted"><i class="fa-solid fa-id-card"></i> License: ${buyer.license} | Phone: ${buyer.phone}</small>
                </div>
                <span class="rating-badge"><i class="fa-solid fa-star text-gold"></i> ${buyer.rating}</span>
            </div>
            <div class="buyer-body mt-2">
                <p>Buying: <strong>${buyer.cropNeeded}</strong> | Grade: <span class="tag tag-amber">${buyer.gradePreferred}</span></p>
                <div class="buyer-offer mt-1">₹${buyer.offeredRate.toLocaleString()} <small>/ quintal</small></div>
                <p class="text-muted"><i class="fa-solid fa-location-dot"></i> ${buyer.location}</p>
                <div class="mt-1">
                    ${buyer.aiFraudCheck === 'BLOCKED_FRAUD' 
                        ? '<span style="font-size:11px; background:#FEE2E2; color:#DC2626; padding:2px 8px; border-radius:10px; font-weight:700;"><i class="fa-solid fa-shield-virus"></i> AI BLOCKED: ABNORMAL FAKE RATE</span>' 
                        : '<span style="font-size:11px; background:#E8F5E9; color:#2E7D32; padding:2px 8px; border-radius:10px; font-weight:700;"><i class="fa-solid fa-shield-check"></i> AI Verified Fair Market Rate</span>'
                    }
                </div>
            </div>
            <button class="btn btn-primary btn-full mt-2" ${buyer.aiFraudCheck === 'BLOCKED_FRAUD' ? 'disabled' : ''} onclick="triggerDealAccept('${buyer.name}', ${buyer.offeredRate})">
                ${buyer.aiFraudCheck === 'BLOCKED_FRAUD' ? 'Rate Blocked by AI' : 'Accept Offer & Unlock Contact'}
            </button>
        </div>
    `).join('');
}

// --- TRANSPORT ENGINE ---
function renderRankedMandis() {
    const list = document.getElementById('rankedMandiList');
    const cropSelect = document.getElementById('tcCrop');
    const qtyInput = document.getElementById('tcQty');
    const vehicleSelect = document.getElementById('tcVehicle');

    if (!list) return;

    const crop = cropSelect ? cropSelect.value : 'Soybean';
    const qty = qtyInput ? parseFloat(qtyInput.value) || 15 : 15;
    const vehicle = vehicleSelect ? vehicleSelect.value : 'tractor';

    let ratePerKm = vehicle === 'minitruck' ? 20 : (vehicle === 'tempo' ? 15 : 25);
    const mandisForCrop = mandiData.filter(d => d.crop === crop);
    const validMandis = mandisForCrop.length > 0 ? mandisForCrop : mandiData.slice(0, 3);

    const calculated = validMandis.map(m => {
        const grossVal = m.modalPrice * qty;
        const transportCost = m.distance * ratePerKm;
        const mandiFee = grossVal * 0.02;
        const loadingFee = qty * 15;
        const netProfit = grossVal - transportCost - mandiFee - loadingFee;
        const netRatePerQtl = Math.round(netProfit / qty);

        return { ...m, grossVal, transportCost, mandiFee, loadingFee, netProfit, netRatePerQtl };
    });

    calculated.sort((a, b) => b.netProfit - a.netProfit);

    list.innerHTML = calculated.map((m, idx) => `
        <div class="ranked-item ${idx === 0 ? 'top-ranked' : ''}" style="padding:16px; border:1px solid #E2E8E4; border-radius:12px; margin-bottom:12px; background:${idx === 0 ? '#ECFDF5' : '#FFFFFF'};">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <span style="font-size:12px; font-weight:700; color:${idx === 0 ? '#10B981' : '#6B7C75'}">
                        ${idx === 0 ? '🏆 #1 HIGHEST NET PROFIT MANDI' : `#${idx + 1} MANDI OPTION`}
                    </span>
                    <h4 style="font-size:16px; margin:2px 0;">${m.name} (${m.distance} km)</h4>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:18px; font-weight:800; color:#1B4D3E;">₹${m.netProfit.toLocaleString()}</div>
                    <small style="color:#6B7C75;">(Net ₹${m.netRatePerQtl}/Qtl)</small>
                </div>
            </div>
        </div>
    `).join('');
}

let predChartInstance = null;
function initPredictionChart() {
    const ctx = document.getElementById('pricePredictionChart');
    if (!ctx) return;

    predChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['7 Days Ago', '5 Days Ago', '3 Days Ago', 'Yesterday', 'Today (Live)', '+2 Days (AI)', '+4 Days (AI)', '+7 Days (Peak)'],
            datasets: [
                {
                    label: 'Historical Mandi Rate (₹/Qtl)',
                    data: [4750, 4800, 4820, 4840, 4850, null, null, null],
                    borderColor: '#1B4D3E',
                    borderWidth: 3,
                    tension: 0.3
                },
                {
                    label: 'AI Forecast Band (7-Day Projection)',
                    data: [null, null, null, null, 4850, 4980, 5120, 5200],
                    borderColor: '#10B981',
                    borderDash: [6, 6],
                    borderWidth: 3,
                    tension: 0.3
                }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderWarehouseList() {
    const list = document.getElementById('warehouseList');
    if (!list) return;

    list.innerHTML = warehouseData.map(w => `
        <div style="padding:14px; border:1px solid #E2E8E4; border-radius:12px; margin-bottom:12px; background:#F9FBF9;">
            <h4 style="font-size:15px; font-weight:700;">${w.name}</h4>
            <p style="font-size:12px; color:#4B5563;">Capacity: ${w.capacity} | Storage Fee: <strong>${w.rate}</strong></p>
            <small style="color:#059669; font-weight:700;">${w.pledgeFinancing}</small>
        </div>
    `).join('');
}

function renderActiveAlerts() {
    const list = document.getElementById('activeAlertsList');
    if (!list) return;

    list.innerHTML = state.activeAlerts.map(a => `
        <li style="display:flex; justify-content:space-between; align-items:center; padding:12px; border-bottom:1px solid #F0F4F2;">
            <div><strong>${a.crop} &ge; ₹${a.targetPrice} / Qtl (${a.mandi})</strong></div>
            <span class="tag tag-emerald">${a.status}</span>
        </li>
    `).join('');
}

// --- DIGITAL TRANSACTION LEDGER WITH DIRECT VERIFIED CONTACTS ---
function renderLedgerTable() {
    const tbody = document.getElementById('ledgerTableBody');
    if (!tbody) return;

    tbody.innerHTML = state.ledger.map(item => `
        <tr>
            <td><strong>${item.id}</strong></td>
            <td>${item.date}</td>
            <td>
                <strong>${item.buyer}</strong><br>
                <small style="color:#059669;"><i class="fa-solid fa-phone"></i> ${item.buyerPhone || '+91 98222 11100'}</small>
            </td>
            <td>
                <strong>${item.seller || state.userName}</strong><br>
                <small style="color:#2563EB;"><i class="fa-solid fa-phone"></i> ${item.sellerPhone || '+91 98765 43210'}</small>
            </td>
            <td>${item.crop} (${item.qty})</td>
            <td>₹${item.rate}/Qtl</td>
            <td><strong class="text-green">₹${item.total.toLocaleString()}</strong></td>
            <td><span class="tag tag-emerald">${item.status}</span></td>
            <td><button class="btn btn-sm btn-outline" onclick="openReceiptModal('${item.id}', '${item.buyer}', ${item.total}, '${item.buyerPhone || '+91 98222 11100'}', '${item.sellerPhone || '+91 98765 43210'}')"><i class="fa-solid fa-receipt"></i> Direct Contact & Receipt</button></td>
        </tr>
    `).join('');
}

function initVoiceAssistant() {
    const voiceBtn = document.getElementById('voiceAssistantBtn');
    const modal = document.getElementById('voiceModal');
    const closeBtn = document.getElementById('closeVoiceModal');

    if (voiceBtn && modal) {
        voiceBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
            speakVoiceResponse("Namaste! Today Indore Soybean Mandi rate is 5150 rupees per quintal.");
        });
    }
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
}

function triggerVoiceQuery(query) {
    const transcript = document.getElementById('voiceTranscript');
    if (!query) query = 'सोयाबीन का भाव';

    if (transcript) {
        transcript.innerText = `Query: "${query}" -> Response: आज इंदौर मंडी में ${query.includes('गेहूं') ? 'गेहूं ₹2,450' : 'सोयाबीन ₹5,150'} प्रति क्विंटल है।`;
    }
    speakVoiceResponse(`Indore Mandi rate is 5150 rupees quintal.`);
}

function speakVoiceResponse(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
    }
}

function initEventListeners() {
    const calcBtn = document.getElementById('calcNetProfitBtn');
    if (calcBtn) calcBtn.addEventListener('click', renderRankedMandis);

    const openBidBtn = document.getElementById('openBiddingModalBtn');
    const bidModal = document.getElementById('biddingModal');
    const closeBidModal = document.getElementById('closeBiddingModal');
    const startBidBtn = document.getElementById('startLiveBiddingBtn');

    if (openBidBtn && bidModal) openBidBtn.addEventListener('click', () => bidModal.classList.remove('hidden'));
    if (closeBidModal) closeBidModal.addEventListener('click', () => bidModal.classList.add('hidden'));
    if (startBidBtn) {
        startBidBtn.addEventListener('click', () => {
            alert('Live 2-Hour Bidding session started! Nearby verified buyers notified.');
            bidModal.classList.add('hidden');
        });
    }
}

function triggerDealAccept(buyerName, rate) {
    const txnId = `KM-TXN-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalAmt = rate * 20;
    const buyerPhone = '+91 91234 56789';
    const sellerPhone = '+91 98765 43210';

    const newDeal = {
        id: txnId,
        date: new Date().toISOString().split('T')[0],
        buyer: buyerName,
        buyerPhone: buyerPhone,
        seller: state.userName,
        sellerPhone: sellerPhone,
        crop: 'Soybean (Grade A)',
        qty: '20 Quintals',
        rate: rate,
        total: totalAmt,
        status: 'Completed & Locked'
    };

    state.ledger.unshift(newDeal);
    renderLedgerTable();
    renderBuyerLedger();
    openReceiptModal(txnId, buyerName, totalAmt, buyerPhone, sellerPhone);

    fetch(`${API_BASE}/ledger/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buyerName, buyerPhone, sellerName: state.userName, sellerPhone, crop: 'Soybean (Grade A)', qty: 20, rate, total: totalAmt })
    }).catch(e => { });
}

function triggerQuickDeal(buyerName, rate, qty) {
    triggerDealAccept(buyerName, rate);
}

// RECEIPT & DIRECT CONTACT EXCHANGE MODAL
function openReceiptModal(txnId, buyerName, total, buyerPhone, sellerPhone) {
    const modal = document.getElementById('receiptModal');
    const recId = document.getElementById('recId');
    const details = document.getElementById('receiptDetails');
    const closeBtn = document.getElementById('closeReceiptBtn');
    const closeIcon = document.getElementById('closeReceiptModal');

    const bPhone = buyerPhone || '+91 91234 56789';
    const sPhone = sellerPhone || '+91 98765 43210';

    if (recId) recId.innerText = txnId.replace('KM-TXN-', '');
    if (details) {
        details.innerHTML = `
            <div style="background:#F9FBF9; padding:18px; border-radius:12px; margin-top:16px; border:1px solid #E2E8E4;">
                <p style="margin-bottom:6px;"><strong>Buyer Firm:</strong> ${buyerName}</p>
                <p style="margin-bottom:8px;"><strong>Buyer Direct Contact:</strong> <a href="tel:${bPhone}" style="color:#059669; font-weight:700;"><i class="fa-solid fa-phone"></i> ${bPhone}</a> &nbsp;|&nbsp; <a href="https://wa.me/${bPhone.replace(/[^0-9]/g, '')}" target="_blank" style="color:#25D366; font-weight:700;"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a></p>
                <hr style="border:0; border-top:1px dashed #CCC; margin:10px 0;">
                <p style="margin-bottom:6px;"><strong>Seller / Farmer:</strong> ${state.userName} (Aadhaar Verified)</p>
                <p style="margin-bottom:8px;"><strong>Seller Direct Contact:</strong> <a href="tel:${sPhone}" style="color:#2563EB; font-weight:700;"><i class="fa-solid fa-phone"></i> ${sPhone}</a> &nbsp;|&nbsp; <a href="https://wa.me/${sPhone.replace(/[^0-9]/g, '')}" target="_blank" style="color:#25D366; font-weight:700;"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a></p>
                <hr style="border:0; border-top:1px dashed #CCC; margin:10px 0;">
                <p style="margin-bottom:6px;"><strong>Crop & Quantity:</strong> Soybean Grade A (20 Quintals)</p>
                <p style="margin-bottom:6px;"><strong>Agreed Total Amount:</strong> <span class="text-green" style="font-size:20px; font-weight:800;">₹${total.toLocaleString()}</span></p>
                <p style="font-size:11px; color:#6B7C75; margin-top:10px;"><i class="fa-solid fa-shield-check text-green"></i> Direct Linkage Hash: 0x88f2a99182bca881726a1</p>
            </div>
        `;
    }

    if (modal) modal.classList.remove('hidden');
    if (closeBtn) closeBtn.onclick = () => modal.classList.add('hidden');
    if (closeIcon) closeIcon.onclick = () => modal.classList.add('hidden');
}

function selectMandiForCalc(mandiName) {
    switchTab('transport');
}
