export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  description?: string;
}

/** Pexels CDN – verified 200 status, stable URLs, no API key needed */
function pex(id: number) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop`;
}
/** Unsplash CDN – verified 200 status direct-photo URLs (no redirect) */
function uns(id: string) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&h=500&q=80`;
}

export const PRODUCTS: Product[] = [

  // ── Electronics (15) ─────────────────────────────────────────────────────
  { id: 1,  name: "Galaxy Wireless Earbuds Pro",          category: "Electronics", price: 49.99,  originalPrice: 79.99,  image: pex(3394650), rating: 4.7, reviews: 3241 },
  { id: 2,  name: "UltraView 55\" 4K Smart TV",            category: "Electronics", price: 399.99, originalPrice: 549.99, image: pex(1444416), rating: 4.5, reviews: 1872 },
  { id: 3,  name: "NoiseFree Over-Ear Headphones",        category: "Electronics", price: 89.99,  originalPrice: 129.99, image: pex(205926),  rating: 4.8, reviews: 2415 },
  { id: 4,  name: "ViewFinder DSLR Camera Kit",           category: "Electronics", price: 549.99,                        image: pex(90946),   rating: 4.9, reviews: 341  },
  { id: 5,  name: "StreamPad 10\" Android Tablet",         category: "Electronics", price: 179.99,                        image: pex(1334597), rating: 4.4, reviews: 921  },
  { id: 6,  name: "UltraBook 14\" Slim Laptop",            category: "Electronics", price: 699.99,                        image: pex(1229861), rating: 4.7, reviews: 215  },
  { id: 7,  name: "SmartWatch Series 8",                  category: "Electronics", price: 199.99,                        image: pex(437037),  rating: 4.8, reviews: 1560 },
  { id: 8,  name: "MiniPro Bluetooth Speaker",            category: "Electronics", price: 24.99,                         image: pex(1706694), rating: 4.2, reviews: 789  },
  { id: 9,  name: "PowerBank Slim 20000mAh",              category: "Electronics", price: 34.99,  originalPrice: 49.99,  image: pex(1337753), rating: 4.6, reviews: 5102 },
  { id: 10, name: "GamingMouse Pro RGB 12000 DPI",        category: "Electronics", price: 44.99,  originalPrice: 64.99,  image: pex(2115256), rating: 4.6, reviews: 2090 },
  { id: 11, name: "MechKey TKL Wireless Keyboard",        category: "Electronics", price: 74.99,                         image: pex(1772123), rating: 4.5, reviews: 870  },
  { id: 12, name: "Drone FPV Racing Edition",             category: "Electronics", price: 299.99, originalPrice: 399.99, image: pex(336232),  rating: 4.5, reviews: 430  },
  { id: 13, name: "E-Reader 6\" Ink Display",             category: "Electronics", price: 119.99,                        image: pex(1261820), rating: 4.7, reviews: 2110 },
  { id: 14, name: "4K Webcam StreamPro",                  category: "Electronics", price: 59.99,  originalPrice: 84.99,  image: pex(699122),  rating: 4.4, reviews: 430  },
  { id: 15, name: "Portable SSD 1TB Ultra-Fast",          category: "Electronics", price: 84.99,  originalPrice: 109.99, image: pex(574071),  rating: 4.7, reviews: 2340 },

  // ── Clothing (15) ─────────────────────────────────────────────────────────
  { id: 16, name: "Classic Slim-Fit Denim Jeans",         category: "Clothing", price: 49.99,  originalPrice: 69.99,  image: pex(1598507), rating: 4.5, reviews: 4821 },
  { id: 17, name: "Essential Cotton Crew Tee – White",    category: "Clothing", price: 14.99,                         image: pex(996329),  rating: 4.3, reviews: 7203 },
  { id: 18, name: "Floral Wrap Summer Dress",             category: "Clothing", price: 39.99,  originalPrice: 59.99,  image: pex(1536619), rating: 4.7, reviews: 2130 },
  { id: 19, name: "Cozy Oversized Hoodie – Grey",         category: "Clothing", price: 34.99,                         image: pex(1183266), rating: 4.6, reviews: 3410 },
  { id: 20, name: "Tailored Slim Chino Trousers",         category: "Clothing", price: 44.99,  originalPrice: 59.99,  image: pex(4060578), rating: 4.4, reviews: 1890 },
  { id: 21, name: "Women Power Blazer – Camel",           category: "Clothing", price: 79.99,  originalPrice: 109.99, image: pex(1043474), rating: 4.7, reviews: 834  },
  { id: 22, name: "Graphic Print Oversized Tee",          category: "Clothing", price: 19.99,                         image: pex(428338),  rating: 4.6, reviews: 5670 },
  { id: 23, name: "Windbreaker Jacket – Navy Blue",       category: "Clothing", price: 69.99,                         image: pex(3622608), rating: 4.5, reviews: 980  },
  { id: 24, name: "Puffer Jacket – Olive Green",          category: "Clothing", price: 89.99,                         image: pex(1126993), rating: 4.8, reviews: 720  },
  { id: 25, name: "V-Neck Knit Wool Sweater",             category: "Clothing", price: 44.99,  originalPrice: 64.99,  image: pex(3622631), rating: 4.4, reviews: 1450 },
  { id: 26, name: "Pleated Satin Mini Skirt – Pink",      category: "Clothing", price: 24.99,                         image: pex(2306281), rating: 4.3, reviews: 910  },
  { id: 27, name: "Ripped Denim Shorts",                  category: "Clothing", price: 29.99,  originalPrice: 39.99,  image: pex(2897531), rating: 4.5, reviews: 3102 },
  { id: 28, name: "Athletic Running T-Shirt – Black",     category: "Clothing", price: 22.99,                         image: pex(4498481), rating: 4.4, reviews: 1870 },
  { id: 29, name: "Cropped Bomber Jacket – Sage",         category: "Clothing", price: 64.99,  originalPrice: 84.99,  image: pex(3768021), rating: 4.4, reviews: 890  },
  { id: 30, name: "Wide-Leg Linen Palazzo Pants",         category: "Clothing", price: 34.99,                         image: pex(3768005), rating: 4.3, reviews: 720  },

  // ── Makeup & Beauty (15) ──────────────────────────────────────────────────
  { id: 31, name: "LuxeLip Velvet Matte Lipstick – Red",          category: "Makeup & Beauty", price: 12.99,                        image: pex(3373714), rating: 4.7, reviews: 6710 },
  { id: 32, name: "Full-Coverage Serum Foundation",               category: "Makeup & Beauty", price: 24.99, originalPrice: 34.99,  image: pex(2537930), rating: 4.5, reviews: 4230 },
  { id: 33, name: "20-Pan Pro Eyeshadow Palette",                 category: "Makeup & Beauty", price: 19.99,                        image: pex(2827400), rating: 4.8, reviews: 8902 },
  { id: 34, name: "Vitamin C Brightening Face Serum",             category: "Makeup & Beauty", price: 22.99, originalPrice: 34.99,  image: pex(4041392), rating: 4.6, reviews: 3120 },
  { id: 35, name: "Lash Luxe Waterproof Mascara",                 category: "Makeup & Beauty", price: 9.99,                         image: pex(1375736), rating: 4.5, reviews: 9401 },
  { id: 36, name: "Hyaluronic Acid Moisturizer 50ml",             category: "Makeup & Beauty", price: 18.99, originalPrice: 27.99,  image: pex(3735791), rating: 4.7, reviews: 2340 },
  { id: 37, name: "Sculpt & Glow Contour Palette",               category: "Makeup & Beauty", price: 15.99,                        image: pex(4202931), rating: 4.4, reviews: 1880 },
  { id: 38, name: "Retinol Overnight Repair Cream",               category: "Makeup & Beauty", price: 29.99, originalPrice: 44.99,  image: pex(2533266), rating: 4.8, reviews: 1540 },
  { id: 39, name: "Precise Wing Liquid Eyeliner",                 category: "Makeup & Beauty", price: 7.99,                         image: pex(5069432), rating: 4.6, reviews: 7610 },
  { id: 40, name: "Niacinamide 10% Pore Serum",                   category: "Makeup & Beauty", price: 16.99,                        image: pex(3785147), rating: 4.7, reviews: 5030 },
  { id: 41, name: "SPF 50 Invisible Sunscreen 50ml",              category: "Makeup & Beauty", price: 17.99, originalPrice: 24.99,  image: pex(4162491), rating: 4.8, reviews: 4110 },
  { id: 42, name: "Jade Roller & Gua Sha Face Set",               category: "Makeup & Beauty", price: 19.99,                        image: pex(7256899), rating: 4.5, reviews: 3210 },
  { id: 43, name: "Rose Lip Gloss Plumping Formula",              category: "Makeup & Beauty", price: 8.99,                         image: pex(4959889), rating: 4.3, reviews: 4210 },
  { id: 44, name: "Silk Translucent Setting Powder",              category: "Makeup & Beauty", price: 11.99,                        image: pex(3373716), rating: 4.5, reviews: 3870 },
  { id: 45, name: "Micellar Cleansing Water 400ml",               category: "Makeup & Beauty", price: 9.99,                         image: pex(1020585), rating: 4.4, reviews: 6220 },

  // ── Bags & Accessories (15) ───────────────────────────────────────────────
  { id: 46, name: "Genuine Leather Tote Bag – Tan",       category: "Bags & Accessories", price: 59.99,  originalPrice: 89.99,  image: pex(1152077), rating: 4.6, reviews: 3210 },
  { id: 47, name: "Canvas Commuter Backpack – Black",     category: "Bags & Accessories", price: 34.99,                         image: pex(2905238), rating: 4.5, reviews: 2180 },
  { id: 48, name: "Mini Quilted Crossbody – Nude",        category: "Bags & Accessories", price: 29.99,  originalPrice: 44.99,  image: pex(7319101), rating: 4.7, reviews: 4502 },
  { id: 49, name: "Vintage Leather Satchel Bag",          category: "Bags & Accessories", price: 49.99,  originalPrice: 74.99,  image: pex(5650026), rating: 4.7, reviews: 1650 },
  { id: 50, name: "Woven Rattan Beach Tote",              category: "Bags & Accessories", price: 27.99,  originalPrice: 39.99,  image: pex(3685175), rating: 4.5, reviews: 1030 },
  { id: 51, name: "Aviator Polarized Sunglasses",         category: "Bags & Accessories", price: 19.99,                         image: pex(1078958), rating: 4.4, reviews: 1780 },
  { id: 52, name: "Cat-Eye Fashion Sunglasses",           category: "Bags & Accessories", price: 22.99,                         image: uns("1543163521-1bf539c55dd2"), rating: 4.4, reviews: 2240 },
  { id: 53, name: "Slim Bifold Leather Wallet – Brown",   category: "Bags & Accessories", price: 24.99,  originalPrice: 39.99,  image: uns("1517841905240-472988babdf9"), rating: 4.6, reviews: 5130 },
  { id: 54, name: "Silk Floral Print Neck Scarf",         category: "Bags & Accessories", price: 15.99,                         image: pex(9594960), rating: 4.6, reviews: 1340 },
  { id: 55, name: "Classic Braided Leather Belt",         category: "Bags & Accessories", price: 19.99,  originalPrice: 29.99,  image: pex(3622607), rating: 4.7, reviews: 3920 },
  { id: 56, name: "Wide Brim Raffia Sun Hat",             category: "Bags & Accessories", price: 17.99,                         image: pex(1124468), rating: 4.3, reviews: 920  },
  { id: 57, name: "Embroidered Baseball Cap",             category: "Bags & Accessories", price: 18.99,                         image: pex(2071882), rating: 4.5, reviews: 2640 },
  { id: 58, name: "Laptop Sleeve 15\" – Charcoal",        category: "Bags & Accessories", price: 14.99,                         image: pex(3861969), rating: 4.5, reviews: 3410 },
  { id: 59, name: "Travel Passport Wallet Holder",        category: "Bags & Accessories", price: 11.99,                         image: pex(4132007), rating: 4.5, reviews: 2760 },
  { id: 60, name: "Neon Retro Bum Bag / Fanny Pack",      category: "Bags & Accessories", price: 21.99,  originalPrice: 31.99,  image: pex(3825517), rating: 4.3, reviews: 1230 },

  // ── Jewelry (15) ─────────────────────────────────────────────────────────
  { id: 61, name: "18K Gold Layered Necklace Set",            category: "Jewelry", price: 24.99,  originalPrice: 39.99,  image: pex(691046),  rating: 4.7, reviews: 5430 },
  { id: 62, name: "Sterling Silver Hoop Earrings",            category: "Jewelry", price: 14.99,                         image: pex(2735970), rating: 4.5, reviews: 3820 },
  { id: 63, name: "Freshwater Pearl Bracelet",                category: "Jewelry", price: 19.99,  originalPrice: 29.99,  image: pex(5405258), rating: 4.8, reviews: 2110 },
  { id: 64, name: "Gold Stackable Midi Rings Set",            category: "Jewelry", price: 16.99,                         image: pex(3266904), rating: 4.6, reviews: 4670 },
  { id: 65, name: "Rose Gold Tennis Bracelet CZ",             category: "Jewelry", price: 29.99,  originalPrice: 44.99,  image: pex(1457801), rating: 4.7, reviews: 1890 },
  { id: 66, name: "Swarovski Crystal Drop Earrings",          category: "Jewelry", price: 12.99,                         image: pex(6624357), rating: 4.5, reviews: 3210 },
  { id: 67, name: "Dainty Minimalist Bar Necklace",           category: "Jewelry", price: 18.99,                         image: pex(5469668), rating: 4.4, reviews: 2450 },
  { id: 68, name: "Emerald Gemstone Stud Earrings",           category: "Jewelry", price: 34.99,  originalPrice: 54.99,  image: pex(1024993), rating: 4.8, reviews: 780  },
  { id: 69, name: "Gold Charm Anklet – Delicate",             category: "Jewelry", price: 11.99,                         image: pex(6624367), rating: 4.3, reviews: 1560 },
  { id: 70, name: "Evil Eye Protection Bracelet",             category: "Jewelry", price: 14.99,  originalPrice: 21.99,  image: uns("1611591437281-460bfbe1220a"), rating: 4.6, reviews: 4210 },
  { id: 71, name: "Diamond-Look Pendant Necklace",            category: "Jewelry", price: 22.99,                         image: pex(393047),  rating: 4.7, reviews: 3340 },
  { id: 72, name: "Personalised Initial Letter Necklace",     category: "Jewelry", price: 17.99,  originalPrice: 24.99,  image: pex(4397295), rating: 4.6, reviews: 6710 },
  { id: 73, name: "Moonstone Teardrop Pendant",               category: "Jewelry", price: 32.99,  originalPrice: 48.99,  image: pex(3945667), rating: 4.7, reviews: 1540 },
  { id: 74, name: "Twisted Gold Hammered Bangle",             category: "Jewelry", price: 19.99,                         image: pex(577769),  rating: 4.5, reviews: 2380 },
  { id: 75, name: "Butterfly Vintage Brooch Pin",             category: "Jewelry", price: 9.99,   originalPrice: 15.99,  image: pex(788946),  rating: 4.4, reviews: 820  },

  // ── Innerwear (15) ────────────────────────────────────────────────────────
  { id: 76, name: "Seamless Wireless Comfort Bra",      category: "Innerwear", price: 17.99,  originalPrice: 24.99, image: pex(7200120),  rating: 4.6, reviews: 7830  },
  { id: 77, name: "5-Pack Premium Cotton Boxer Briefs", category: "Innerwear", price: 24.99,                        image: pex(7200210),  rating: 4.7, reviews: 11204 },
  { id: 78, name: "High-Impact Sports Crop Bra",        category: "Innerwear", price: 22.99,  originalPrice: 34.99, image: pex(1092644),  rating: 4.8, reviews: 4520  },
  { id: 79, name: "Compression Running Leggings",       category: "Innerwear", price: 29.99,  originalPrice: 44.99, image: pex(607812),   rating: 4.8, reviews: 6320  },
  { id: 80, name: "Lace Bikini Briefs – 3 Pack",        category: "Innerwear", price: 19.99,  originalPrice: 29.99, image: pex(1038916),  rating: 4.5, reviews: 5670  },
  { id: 81, name: "Merino Wool Knee-High Socks",        category: "Innerwear", price: 14.99,                        image: pex(1456735),  rating: 4.5, reviews: 1780  },
  { id: 82, name: "Thermal Long Johns Base Layer",      category: "Innerwear", price: 27.99,  originalPrice: 39.99, image: pex(2529148),  rating: 4.5, reviews: 1450  },
  { id: 83, name: "Bamboo Modal Lounge Shorts 2 Pack",  category: "Innerwear", price: 23.99,  originalPrice: 33.99, image: pex(366640),   rating: 4.4, reviews: 2640  },
  { id: 84, name: "No-Show Ankle Socks 6 Pack",         category: "Innerwear", price: 12.99,                        image: pex(2148221),  rating: 4.6, reviews: 8901  },
  { id: 85, name: "Wireless Push-Up Padded Bra",        category: "Innerwear", price: 26.99,  originalPrice: 39.99, image: pex(169573),   rating: 4.7, reviews: 3210  },
  { id: 86, name: "Full-Body Shaper Bodysuit",          category: "Innerwear", price: 36.99,  originalPrice: 54.99, image: pex(1787235),  rating: 4.7, reviews: 1980  },
  { id: 87, name: "Organic Cotton Hipster Brief",       category: "Innerwear", price: 9.99,                         image: pex(1203808),  rating: 4.6, reviews: 9870  },
  { id: 88, name: "Satin Sleep Shorts & Cami Set",      category: "Innerwear", price: 22.99,  originalPrice: 34.99, image: pex(442589),   rating: 4.6, reviews: 3450  },
  { id: 89, name: "Padded Triangle Ribbed Bralette",    category: "Innerwear", price: 18.99,                        image: uns("1509631179647-0177331693ae"), rating: 4.5, reviews: 4210  },
  { id: 90, name: "Anti-Slip Yoga Grip Socks",          category: "Innerwear", price: 11.99,                        image: uns("1551488831-00ddcb6c6bd3"), rating: 4.6, reviews: 5890  },

  // ── Home & Kitchen (15) ───────────────────────────────────────────────────
  { id: 91,  name: "Ceramic Artisan Pour-Over Set",     category: "Home & Kitchen", price: 39.99,  originalPrice: 54.99, image: pex(312418),  rating: 4.8, reviews: 3210 },
  { id: 92,  name: "Pro Non-Stick Frying Pan 28cm",     category: "Home & Kitchen", price: 29.99,                        image: pex(2097090), rating: 4.6, reviews: 5430 },
  { id: 93,  name: "Vanilla Soy Scented Candle",        category: "Home & Kitchen", price: 14.99,  originalPrice: 22.99, image: pex(3059737), rating: 4.7, reviews: 8920 },
  { id: 94,  name: "Air Fryer XL Compact 3.5L",         category: "Home & Kitchen", price: 69.99,  originalPrice: 99.99, image: pex(6294475), rating: 4.7, reviews: 2890 },
  { id: 95,  name: "French Press Bodum 1L – Black",     category: "Home & Kitchen", price: 32.99,  originalPrice: 44.99, image: pex(302899),  rating: 4.6, reviews: 3870 },
  { id: 96,  name: "Bamboo 3-Piece Cutting Board Set",  category: "Home & Kitchen", price: 24.99,                        image: pex(2280549), rating: 4.5, reviews: 4120 },
  { id: 97,  name: "Stainless Insulated Water Bottle",  category: "Home & Kitchen", price: 21.99,  originalPrice: 31.99, image: pex(3738673), rating: 4.8, reviews: 9210 },
  { id: 98,  name: "Cast Iron Deep Skillet 10\"",        category: "Home & Kitchen", price: 44.99,                        image: pex(5718035), rating: 4.9, reviews: 1230 },
  { id: 99,  name: "Smart Electric Kettle Temperature", category: "Home & Kitchen", price: 49.99,                        image: pex(1775043), rating: 4.6, reviews: 3450 },
  { id: 100, name: "Rattan Woven Laundry Basket",       category: "Home & Kitchen", price: 27.99,                        image: pex(1640769), rating: 4.4, reviews: 1980 },
  { id: 101, name: "Macramé Boho Wall Hanging Art",     category: "Home & Kitchen", price: 22.99,                        image: pex(6996498), rating: 4.4, reviews: 1760 },
  { id: 102, name: "Aroma Essential Oil Diffuser LED",  category: "Home & Kitchen", price: 32.99,  originalPrice: 44.99, image: pex(2253643), rating: 4.6, reviews: 5610 },
  { id: 103, name: "Boho Speckled Ceramic Vase Set",    category: "Home & Kitchen", price: 26.99,  originalPrice: 39.99, image: pex(4065896), rating: 4.7, reviews: 1870 },
  { id: 104, name: "Burr Coffee Grinder Manual",        category: "Home & Kitchen", price: 38.99,  originalPrice: 54.99, image: pex(6347905), rating: 4.7, reviews: 1650 },
  { id: 105, name: "Digital Precision Kitchen Scale",   category: "Home & Kitchen", price: 17.99,  originalPrice: 24.99, image: pex(1109197), rating: 4.7, reviews: 6780 },

  // ── Sports & Fitness (15) ─────────────────────────────────────────────────
  { id: 106, name: "Resistance Bands Set 5-Level",       category: "Sports & Fitness", price: 19.99,  originalPrice: 29.99, image: uns("1583454110551-21f2fa2afe61"), rating: 4.7, reviews: 8920 },
  { id: 107, name: "Eco-Friendly Yoga Mat 6mm",          category: "Sports & Fitness", price: 34.99,                        image: pex(4498206), rating: 4.8, reviews: 6710 },
  { id: 108, name: "Adjustable Dumbbell Set 20kg",       category: "Sports & Fitness", price: 89.99,                        image: pex(1552252), rating: 4.6, reviews: 1780 },
  { id: 109, name: "Speed Cable Jump Rope Pro",          category: "Sports & Fitness", price: 12.99,  originalPrice: 19.99, image: pex(4749908), rating: 4.5, reviews: 4230 },
  { id: 110, name: "Foam Roller Deep Tissue Massage",    category: "Sports & Fitness", price: 24.99,                        image: pex(3822906), rating: 4.6, reviews: 5430 },
  { id: 111, name: "Pro Percussion Massage Gun",         category: "Sports & Fitness", price: 59.99,                        image: uns("1571019613454-1cb2f99b2d8b"), rating: 4.8, reviews: 2140 },
  { id: 112, name: "Cast Iron Kettlebell 16kg",          category: "Sports & Fitness", price: 44.99,  originalPrice: 64.99, image: pex(2261477), rating: 4.7, reviews: 1340 },
  { id: 113, name: "LiteStride V3 Running Shoes",        category: "Sports & Fitness", price: 79.99,  originalPrice: 109.99,image: pex(4162577), rating: 4.7, reviews: 3210 },
  { id: 114, name: "Pull-Up Door Bar Adjustable",        category: "Sports & Fitness", price: 29.99,  originalPrice: 44.99, image: pex(4164766), rating: 4.5, reviews: 2870 },
  { id: 115, name: "Anti-Grip Gym Lifting Gloves",       category: "Sports & Fitness", price: 14.99,  originalPrice: 21.99, image: pex(3775564), rating: 4.3, reviews: 3980 },
  { id: 116, name: "Protein Shaker Bottle 700ml",        category: "Sports & Fitness", price: 11.99,  originalPrice: 17.99, image: pex(1552106), rating: 4.5, reviews: 9870 },
  { id: 117, name: "Anti-Fog Competition Swim Goggles",  category: "Sports & Fitness", price: 14.99,  originalPrice: 21.99, image: pex(1263348), rating: 4.4, reviews: 3120 },
  { id: 118, name: "Rotating Push-Up Handles",           category: "Sports & Fitness", price: 18.99,  originalPrice: 26.99, image: pex(863977),  rating: 4.7, reviews: 5430 },
  { id: 119, name: "Yoga Block & Stretch Strap Kit",     category: "Sports & Fitness", price: 21.99,                        image: uns("1517836357463-d25dfeac3438"), rating: 4.5, reviews: 3870 },
  { id: 120, name: "Pair Ankle Weights 2kg",             category: "Sports & Fitness", price: 17.99,                        image: uns("1571019614242-c5c5dee9f50b"), rating: 4.5, reviews: 4210 },

  // ── Health & Wellness (15) ────────────────────────────────────────────────
  { id: 121, name: "Sonic Pro Electric Toothbrush",              category: "Health & Wellness", price: 39.99,  originalPrice: 59.99, image: pex(5699516),  rating: 4.8, reviews: 6780 },
  { id: 122, name: "Hot & Cold USB Eye Mask",                    category: "Health & Wellness", price: 24.99,  originalPrice: 36.99, image: pex(3873183),  rating: 4.7, reviews: 3210 },
  { id: 123, name: "Digital Wrist Blood Pressure Cuff",          category: "Health & Wellness", price: 34.99,                        image: pex(5699517),  rating: 4.6, reviews: 2870 },
  { id: 124, name: "Melatonin Sleep Gummies 60ct",               category: "Health & Wellness", price: 14.99,  originalPrice: 21.99, image: uns("1527814050087-3793815479db"), rating: 4.5, reviews: 7890 },
  { id: 125, name: "Collagen Peptide Powder 300g",               category: "Health & Wellness", price: 29.99,  originalPrice: 44.99, image: pex(7422440),  rating: 4.7, reviews: 3870 },
  { id: 126, name: "Acupressure Mat & Pillow Set",               category: "Health & Wellness", price: 27.99,                        image: uns("1576091160399-112ba8d25d1d"), rating: 4.6, reviews: 2640 },
  { id: 127, name: "Fingertip Pulse Oximeter",                   category: "Health & Wellness", price: 19.99,  originalPrice: 28.99, image: uns("1556742049-0cfed4f6a45d"), rating: 4.5, reviews: 9870 },
  { id: 128, name: "Herbal Tea Collection Gift Box",             category: "Health & Wellness", price: 18.99,                        image: pex(1417945),  rating: 4.8, reviews: 4560 },
  { id: 129, name: "Omega-3 Fish Oil Softgels 90ct",             category: "Health & Wellness", price: 17.99,                        image: uns("1585771724684-38269d6639fd"), rating: 4.5, reviews: 6780 },
  { id: 130, name: "Posture Corrector Back Brace",               category: "Health & Wellness", price: 22.99,                        image: uns("1505740420928-5e560c06d30e"), rating: 4.4, reviews: 5430 },
  { id: 131, name: "TENS Unit Pain Relief Device",               category: "Health & Wellness", price: 44.99,  originalPrice: 64.99, image: uns("1546868871-7041f2a55e12"), rating: 4.7, reviews: 1340 },
  { id: 132, name: "Activated Charcoal Whitening Toothpaste",    category: "Health & Wellness", price: 11.99,                        image: uns("1544716278-ca5e3f4abd8c"), rating: 4.3, reviews: 5430 },
  { id: 133, name: "Shiatsu Heated Neck Massager",               category: "Health & Wellness", price: 49.99,  originalPrice: 74.99, image: uns("1601972599720-36938d4ecd31"), rating: 4.8, reviews: 2870 },
  { id: 134, name: "Silk Adjustable Sleep Eye Mask",             category: "Health & Wellness", price: 13.99,                        image: uns("1496181133206-80ce9b88a853"), rating: 4.6, reviews: 8910 },
  { id: 135, name: "Infrared No-Touch Thermometer",              category: "Health & Wellness", price: 21.99,  originalPrice: 31.99, image: uns("1608043152269-423dbba4e7e1"), rating: 4.6, reviews: 4320 },

  // ── Toys & Kids (15) ──────────────────────────────────────────────────────
  { id: 136, name: "LEGO Technic Building Kit 500pc",    category: "Toys & Kids", price: 54.99,  originalPrice: 74.99, image: pex(1148399),  rating: 4.9, reviews: 6720 },
  { id: 137, name: "Remote Control Off-Road Buggy",      category: "Toys & Kids", price: 29.99,                        image: pex(374918),   rating: 4.6, reviews: 4210 },
  { id: 138, name: "Magnetic Colourful Drawing Board",   category: "Toys & Kids", price: 14.99,  originalPrice: 22.99, image: pex(3049313),  rating: 4.7, reviews: 8910 },
  { id: 139, name: "Dinosaur Figurines Set 12-Pack",     category: "Toys & Kids", price: 17.99,  originalPrice: 26.99, image: pex(3662438),  rating: 4.8, reviews: 5670 },
  { id: 140, name: "Pop-It Mega Fidget Set",             category: "Toys & Kids", price: 9.99,   originalPrice: 14.99, image: pex(3673854),  rating: 4.3, reviews: 11200},
  { id: 141, name: "Slime Science Experiment Kit",       category: "Toys & Kids", price: 16.99,  originalPrice: 24.99, image: uns("1593642632559-0c6d3fc62b89"), rating: 4.5, reviews: 7890 },
  { id: 142, name: "Giant Plush Teddy Bear 60cm",        category: "Toys & Kids", price: 22.99,                        image: uns("1526170375885-4d8ecf77b99f"), rating: 4.8, reviews: 4560 },
  { id: 143, name: "200-Piece Rainbow Building Blocks",  category: "Toys & Kids", price: 27.99,  originalPrice: 39.99, image: uns("1511707171634-5f897ff02aa9"), rating: 4.7, reviews: 3210 },
  { id: 144, name: "Mini Wooden Kitchen Playset",        category: "Toys & Kids", price: 34.99,                        image: uns("1544244015-0df4b3ffc6b0"), rating: 4.6, reviews: 1980 },
  { id: 145, name: "Classic Family Board Games Pack",    category: "Toys & Kids", price: 29.99,  originalPrice: 44.99, image: uns("1503341504253-dff4815485f1"), rating: 4.5, reviews: 2640 },
  { id: 146, name: "Art & Craft Mega Supply Kit",        category: "Toys & Kids", price: 24.99,  originalPrice: 36.99, image: uns("1515886657613-9f3515b0c78f"), rating: 4.7, reviews: 5430 },
  { id: 147, name: "Wooden Train Track Set 35pcs",       category: "Toys & Kids", price: 39.99,                        image: uns("1595777457583-95e059d581b8"), rating: 4.8, reviews: 2190 },
  { id: 148, name: "Glow-in-Dark Stars Ceiling Kit",     category: "Toys & Kids", price: 7.99,   originalPrice: 12.99, image: uns("1591047139829-d91aecb6caea"), rating: 4.6, reviews: 6540 },
  { id: 149, name: "Electric Bubble Machine Kids",       category: "Toys & Kids", price: 16.99,  originalPrice: 23.99, image: uns("1542291026-7eec264c27ff"), rating: 4.5, reviews: 4320 },
  { id: 150, name: "Superhero Action Figures 5-Pack",    category: "Toys & Kids", price: 19.99,                        image: uns("1580418827493-f2b22c0a76cb"), rating: 4.7, reviews: 3980 },
];
