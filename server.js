/* ==========================================================================
   KRISHIMITRA (कृषिमित्र) - EXPRESS & SQLITE BACKEND API SERVER
   SIH 2026 PS 132 - Enhanced with Regional High Demand Map, Direct Contacts,
   Price Increase/Decrease Alerts Engine & Language Role Sync
   ========================================================================== */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DB_FILE = path.join(__dirname, 'database.json');

// Initial Seed Database
const initialDatabase = {
    users: [
        {
            id: 'USR-FARMER-01',
            role: 'farmer',
            name: 'Anjali Khandelwal',
            mobile: '9876543210',
            location: 'Indore, Madhya Pradesh',
            aadhar: 'XXXX-XXXX-8821',
            landSize: '2.5 Hectares',
            crop: 'Soybean (JS-335)',
            language: 'hi',
            kycVerified: true
        },
        {
            id: 'USR-BUYER-01',
            role: 'buyer',
            name: 'Rajesh Agrotech Ltd',
            mobile: '9123456789',
            location: 'Pithampur, Indore',
            apmcLicense: 'MP-IND-APMC-88219',
            gstin: '23AAACK8819Q1ZP',
            language: 'hi',
            kycVerified: true
        }
    ],
    mandis: [
        { id: 1, name: 'Indore APMC', state: 'MP', crop: 'Soybean', modalPrice: 5150, minPrice: 5000, maxPrice: 5220, arrival: 4500, truthScore: '98% High', distance: 12 },
        { id: 2, name: 'Ujjain APMC', state: 'MP', crop: 'Soybean', modalPrice: 5280, minPrice: 5100, maxPrice: 5350, arrival: 3200, truthScore: '96% High', distance: 55 },
        { id: 3, name: 'Bhopal APMC', state: 'MP', crop: 'Soybean', modalPrice: 5340, minPrice: 5200, maxPrice: 5400, arrival: 2800, truthScore: '92% Med', distance: 185 },
        { id: 4, name: 'Neemuch APMC', state: 'MP', crop: 'Soybean', modalPrice: 5410, minPrice: 5300, maxPrice: 5480, arrival: 1900, truthScore: '95% High', distance: 260 },
        { id: 5, name: 'Dewas APMC', state: 'MP', crop: 'Soybean', modalPrice: 5120, minPrice: 4950, maxPrice: 5180, arrival: 2100, truthScore: '94% High', distance: 38 },
        { id: 6, name: 'Indore APMC', state: 'MP', crop: 'Wheat', modalPrice: 2450, minPrice: 2380, maxPrice: 2500, arrival: 8200, truthScore: '99% High', distance: 12 },
        { id: 7, name: 'Ujjain APMC', state: 'MP', crop: 'Wheat', modalPrice: 2510, minPrice: 2450, maxPrice: 2560, arrival: 6400, truthScore: '97% High', distance: 55 }
    ],
    regionalDemand: [
        { id: 'REG-01', region: 'Indore Processing Zone', crop: 'Soybean', demandQty: '800 MT', deficitLevel: 'HIGH DEFICIT', rateOffered: 5410, surplusRegion: 'Ratlam Rural (Rate ₹4,900)', arbitrageGain: '₹510 / Qtl (+₹10,200 Net)' },
        { id: 'REG-02', region: 'Pithampur Exporter Hub', crop: 'Soybean', demandQty: '500 MT', deficitLevel: 'HIGH DEFICIT', rateOffered: 5380, surplusRegion: 'Dewas Block (Rate ₹5,120)', arbitrageGain: '₹260 / Qtl (+₹5,200 Net)' },
        { id: 'REG-03', region: 'Bhopal Feed Factory Hub', crop: 'Maize', demandQty: '1,200 MT', deficitLevel: 'VERY HIGH NEED', rateOffered: 2150, surplusRegion: 'Chhindwara (Rate ₹1,850)', arbitrageGain: '₹300 / Qtl (+₹6,000 Net)' },
        { id: 'REG-04', region: 'Ujjain Flour Mills Zone', crop: 'Wheat', demandQty: '600 MT', deficitLevel: 'MODERATE NEED', rateOffered: 2580, surplusRegion: 'Dhar Mandi (Rate ₹2,350)', arbitrageGain: '₹230 / Qtl (+₹4,600 Net)' }
    ],
    priceFluctuations: [
        { id: 1, type: 'RISE', crop: 'Soybean', mandi: 'Indore APMC', change: '+₹150/Qtl', newRate: 5300, time: '10 mins ago' },
        { id: 2, type: 'DROP', crop: 'Wheat', mandi: 'Dewas APMC', change: '-₹50/Qtl', newRate: 2400, time: '35 mins ago' },
        { id: 3, type: 'RISE', crop: 'Onion', mandi: 'Ujjain APMC', change: '+₹210/Qtl', newRate: 1950, time: '1 hour ago' }
    ],
    buyers: [
        { id: 'BUY-101', name: 'ITC Ltd (Choupal Saagar)', phone: '+91 98222 11100', license: 'MP-IND-APMC-9912', rating: 4.9, cropNeeded: 'Soybean', gradePreferred: 'Grade A', offeredRate: 5250, minQty: '10 Quintals', location: 'Pithampur, Indore (22 km)', badge: 'Verified Agribusiness', aiFraudCheck: 'PASSED' },
        { id: 'BUY-102', name: 'Adani Wilmar Processing Factory', phone: '+91 98444 33322', license: 'MP-IND-APMC-4418', rating: 4.8, cropNeeded: 'Soybean', gradePreferred: 'Grade C', offeredRate: 4600, minQty: '100 Quintals', location: 'Sanwer Road, Indore (15 km)', badge: 'Oil Extraction Mill', aiFraudCheck: 'PASSED' },
        { id: 'BUY-103', name: 'Patanjali Agro Oils', phone: '+91 98777 66655', license: 'MP-UJN-APMC-7721', rating: 4.7, cropNeeded: 'Soybean', gradePreferred: 'Grade B', offeredRate: 5100, minQty: '50 Quintals', location: 'Ujjain Industrial Area (50 km)', badge: 'Verified Exporter', aiFraudCheck: 'PASSED' },
        { id: 'BUY-104', name: 'Malwa Farmer Producer Co.', phone: '+91 98999 88877', license: 'FPO-MP-2023-09', rating: 4.9, cropNeeded: 'Wheat', gradePreferred: 'Grade A', offeredRate: 2520, minQty: '5 Quintals', location: 'Indore Block (8 km)', badge: 'FPO Co-operative', aiFraudCheck: 'PASSED' }
    ],
    ledger: [
        { id: 'KM-TXN-9941', date: '2026-09-04', buyer: 'ITC Ltd (Choupal Saagar)', buyerPhone: '+91 98222 11100', seller: 'Anjali Khandelwal', sellerPhone: '+91 98765 43210', crop: 'Soybean (Grade A)', qty: '30 Quintals', rate: 5120, total: 153600, status: 'Completed & Paid' }
    ]
};

function getDB() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify(initialDatabase, null, 2));
        return initialDatabase;
    }
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return initialDatabase;
    }
}

function saveDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// GET Regional Demand Heatmap Data
app.get('/api/demand-map', (req, res) => {
    const db = getDB();
    res.json(db.regionalDemand);
});

// GET Price Increase / Decrease Fluctuations
app.get('/api/price-fluctuations', (req, res) => {
    const db = getDB();
    res.json(db.priceFluctuations);
});

// AUTH REGISTRATION & LOGIN APIS
app.post('/api/auth/register', (req, res) => {
    const { role, name, mobile, location, aadhar, apmcLicense, gstin, landSize, crop, language } = req.body;
    const db = getDB();

    const newUser = {
        id: `USR-${role.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        role: role || 'farmer',
        name: name || 'Kisan User',
        mobile: mobile || '9800000000',
        location: location || 'Indore, MP',
        aadhar: aadhar || 'XXXX-XXXX-0000',
        apmcLicense: apmcLicense || '',
        gstin: gstin || '',
        landSize: landSize || '2.5 Hectares',
        crop: crop || 'Soybean',
        language: language || 'hi',
        kycVerified: true
    };

    db.users.unshift(newUser);
    saveDB(db);

    res.json({ success: true, user: newUser, message: 'Registration & KYC Verification Successful!' });
});

app.post('/api/auth/login', (req, res) => {
    const { role, mobile } = req.body;
    const db = getDB();

    let user = db.users.find(u => u.mobile === mobile && u.role === role);
    if (!user) {
        user = {
            id: `USR-${role.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
            role: role || 'farmer',
            name: role === 'farmer' ? 'Ramprasad Patel' : 'Agri Trade Co.',
            mobile: mobile,
            location: 'Indore, MP',
            language: 'hi',
            kycVerified: true
        };
        db.users.push(user);
        saveDB(db);
    }

    res.json({ success: true, user });
});

app.get('/api/mandi', (req, res) => {
    const db = getDB();
    res.json(db.mandis);
});

app.get('/api/buyers', (req, res) => {
    const db = getDB();
    res.json(db.buyers);
});

app.get('/api/ledger', (req, res) => {
    const db = getDB();
    res.json(db.ledger);
});

app.post('/api/ledger/accept', (req, res) => {
    const { buyerName, buyerPhone, sellerName, sellerPhone, crop, qty, rate, total } = req.body;
    const db = getDB();

    const newDeal = {
        id: `KM-TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        buyer: buyerName || 'ITC Choupal',
        buyerPhone: buyerPhone || '+91 98222 11100',
        seller: sellerName || 'Anjali Khandelwal',
        sellerPhone: sellerPhone || '+91 98765 43210',
        crop: crop || 'Soybean (Grade A)',
        qty: `${qty || 20} Quintals`,
        rate: rate,
        total: total,
        status: 'Completed & Paid'
    };

    db.ledger.unshift(newDeal);
    saveDB(db);

    res.json({ success: true, deal: newDeal });
});

app.listen(PORT, () => {
    console.log(`✅ KrishiMitra Express Backend Server running on http://localhost:${PORT}`);
});
