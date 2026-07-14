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

// Deterministic Picsum images — seed keeps the same photo per product
function img(seed: string) {
  return `https://picsum.photos/seed/${seed}/400/500`;
}

export const PRODUCTS: Product[] = [
  // ── Electronics ──────────────────────────────────────────────────────────
  { id: 1,  name: "ProMax Wireless Earbuds X1", category: "Electronics", price: 49.99, originalPrice: 79.99, image: img("earbuds1"), rating: 4.7, reviews: 3241 },
  { id: 2,  name: "UltraView 4K Smart TV 55\"", category: "Electronics", price: 399.99, originalPrice: 549.99, image: img("tv-55"), rating: 4.5, reviews: 1872 },
  { id: 3,  name: "Snap Compact Digital Camera", category: "Electronics", price: 129.99, image: img("camera-compact"), rating: 4.3, reviews: 654 },
  { id: 4,  name: "PowerBank Slim 20000mAh", category: "Electronics", price: 34.99, originalPrice: 49.99, image: img("powerbank-slim"), rating: 4.6, reviews: 5102 },
  { id: 5,  name: "StreamPad 10\" Tablet", category: "Electronics", price: 179.99, image: img("tablet-10"), rating: 4.4, reviews: 921 },
  { id: 6,  name: "NoiseFree Over-Ear Headphones", category: "Electronics", price: 89.99, originalPrice: 129.99, image: img("headphones-over"), rating: 4.8, reviews: 2415 },
  { id: 7,  name: "MiniPro Bluetooth Speaker", category: "Electronics", price: 24.99, image: img("speaker-mini"), rating: 4.2, reviews: 789 },
  { id: 8,  name: "SwiftCharge Wireless Pad", category: "Electronics", price: 19.99, originalPrice: 29.99, image: img("charger-wireless"), rating: 4.5, reviews: 3310 },
  { id: 9,  name: "ViewFinder DSLR Camera", category: "Electronics", price: 549.99, image: img("dslr-camera"), rating: 4.9, reviews: 341 },
  { id: 10, name: "SmartBand Fitness Tracker", category: "Electronics", price: 39.99, originalPrice: 59.99, image: img("smartband-fit"), rating: 4.3, reviews: 1120 },
  { id: 11, name: "UltraBook 14\" Laptop", category: "Electronics", price: 699.99, image: img("laptop-14"), rating: 4.7, reviews: 215 },
  { id: 12, name: "GamingMouse Pro RGB", category: "Electronics", price: 44.99, originalPrice: 64.99, image: img("mouse-rgb"), rating: 4.6, reviews: 2090 },
  { id: 13, name: "MechKey Wireless Keyboard", category: "Electronics", price: 74.99, image: img("keyboard-mech"), rating: 4.5, reviews: 870 },
  { id: 14, name: "4K Webcam StreamPro", category: "Electronics", price: 59.99, originalPrice: 84.99, image: img("webcam-4k"), rating: 4.4, reviews: 430 },
  { id: 15, name: "SmartWatch Series 7", category: "Electronics", price: 199.99, image: img("smartwatch-s7"), rating: 4.8, reviews: 1560 },
  { id: 16, name: "Portable SSD 1TB NVMe", category: "Electronics", price: 84.99, originalPrice: 109.99, image: img("ssd-1tb"), rating: 4.7, reviews: 2340 },

  // ── Clothing ─────────────────────────────────────────────────────────────
  { id: 17, name: "Classic Slim-Fit Denim Jeans", category: "Clothing", price: 49.99, originalPrice: 69.99, image: img("jeans-slim"), rating: 4.5, reviews: 4821 },
  { id: 18, name: "Essential Cotton Tee – White", category: "Clothing", price: 14.99, image: img("tee-white"), rating: 4.3, reviews: 7203 },
  { id: 19, name: "Floral Summer Dress", category: "Clothing", price: 39.99, originalPrice: 59.99, image: img("dress-floral"), rating: 4.7, reviews: 2130 },
  { id: 20, name: "Cozy Hooded Sweatshirt", category: "Clothing", price: 34.99, image: img("hoodie-grey"), rating: 4.6, reviews: 3410 },
  { id: 21, name: "Slim Fit Chino Trousers", category: "Clothing", price: 44.99, originalPrice: 59.99, image: img("chino-beige"), rating: 4.4, reviews: 1890 },
  { id: 22, name: "Windbreaker Jacket – Navy", category: "Clothing", price: 69.99, image: img("jacket-navy"), rating: 4.5, reviews: 980 },
  { id: 23, name: "Striped Linen Shirt", category: "Clothing", price: 29.99, originalPrice: 44.99, image: img("shirt-linen"), rating: 4.3, reviews: 612 },
  { id: 24, name: "Graphic Print Oversized Tee", category: "Clothing", price: 19.99, image: img("tee-graphic"), rating: 4.6, reviews: 5670 },
  { id: 25, name: "Women Blazer – Camel", category: "Clothing", price: 79.99, originalPrice: 109.99, image: img("blazer-camel"), rating: 4.7, reviews: 834 },
  { id: 26, name: "Jogger Pants – Black", category: "Clothing", price: 27.99, image: img("joggers-black"), rating: 4.5, reviews: 2210 },
  { id: 27, name: "V-Neck Knit Sweater", category: "Clothing", price: 44.99, originalPrice: 64.99, image: img("sweater-vneck"), rating: 4.4, reviews: 1450 },
  { id: 28, name: "Pleated Mini Skirt – Pink", category: "Clothing", price: 24.99, image: img("skirt-pink"), rating: 4.3, reviews: 910 },
  { id: 29, name: "Denim Shorts – Ripped", category: "Clothing", price: 29.99, originalPrice: 39.99, image: img("shorts-denim"), rating: 4.5, reviews: 3102 },
  { id: 30, name: "Puffer Jacket – Olive Green", category: "Clothing", price: 89.99, image: img("puffer-olive"), rating: 4.8, reviews: 720 },
  { id: 31, name: "Athletic Running T-Shirt", category: "Clothing", price: 22.99, image: img("sport-tee"), rating: 4.4, reviews: 1870 },
  { id: 32, name: "High-Waist Flare Trousers", category: "Clothing", price: 39.99, originalPrice: 54.99, image: img("flare-trousers"), rating: 4.6, reviews: 640 },

  // ── Makeup & Beauty ───────────────────────────────────────────────────────
  { id: 33, name: "LuxeLip Matte Lipstick – Red", category: "Makeup & Beauty", price: 12.99, image: img("lipstick-red"), rating: 4.7, reviews: 6710 },
  { id: 34, name: "Full-Coverage Foundation SPF30", category: "Makeup & Beauty", price: 24.99, originalPrice: 34.99, image: img("foundation-spf"), rating: 4.5, reviews: 4230 },
  { id: 35, name: "12-Pan Eyeshadow Palette", category: "Makeup & Beauty", price: 19.99, image: img("eyeshadow-12"), rating: 4.8, reviews: 8902 },
  { id: 36, name: "Vitamin C Brightening Serum", category: "Makeup & Beauty", price: 22.99, originalPrice: 34.99, image: img("serum-vitc"), rating: 4.6, reviews: 3120 },
  { id: 37, name: "Waterproof Mascara Volume+", category: "Makeup & Beauty", price: 9.99, image: img("mascara-vol"), rating: 4.5, reviews: 9401 },
  { id: 38, name: "Hyaluronic Moisturizer 50ml", category: "Makeup & Beauty", price: 18.99, originalPrice: 27.99, image: img("moisturizer-ha"), rating: 4.7, reviews: 2340 },
  { id: 39, name: "Contour & Highlight Duo", category: "Makeup & Beauty", price: 15.99, image: img("contour-duo"), rating: 4.4, reviews: 1880 },
  { id: 40, name: "Rose Tinted Lip Gloss", category: "Makeup & Beauty", price: 8.99, image: img("lip-gloss-rose"), rating: 4.3, reviews: 4210 },
  { id: 41, name: "Retinol Night Repair Cream", category: "Makeup & Beauty", price: 29.99, originalPrice: 44.99, image: img("night-cream-ret"), rating: 4.8, reviews: 1540 },
  { id: 42, name: "Precision Liquid Eyeliner", category: "Makeup & Beauty", price: 7.99, image: img("eyeliner-liq"), rating: 4.6, reviews: 7610 },
  { id: 43, name: "Glow-Up Primer Stick", category: "Makeup & Beauty", price: 13.99, originalPrice: 19.99, image: img("primer-stick"), rating: 4.4, reviews: 2270 },
  { id: 44, name: "Niacinamide Pore Minimizer", category: "Makeup & Beauty", price: 16.99, image: img("niacinamide-pm"), rating: 4.7, reviews: 5030 },
  { id: 45, name: "Setting Powder – Translucent", category: "Makeup & Beauty", price: 11.99, image: img("setting-powder"), rating: 4.5, reviews: 3870 },
  { id: 46, name: "Blush Duo – Peachy Glow", category: "Makeup & Beauty", price: 14.99, originalPrice: 22.99, image: img("blush-duo"), rating: 4.6, reviews: 1920 },
  { id: 47, name: "Micellar Cleansing Water 400ml", category: "Makeup & Beauty", price: 9.99, image: img("micellar-water"), rating: 4.4, reviews: 6220 },
  { id: 48, name: "SPF 50 Sunscreen Fluid", category: "Makeup & Beauty", price: 17.99, originalPrice: 24.99, image: img("sunscreen-spf50"), rating: 4.8, reviews: 4110 },

  // ── Bags & Accessories ────────────────────────────────────────────────────
  { id: 49, name: "Leather Tote Bag – Tan", category: "Bags & Accessories", price: 59.99, originalPrice: 89.99, image: img("tote-tan"), rating: 4.6, reviews: 3210 },
  { id: 50, name: "Canvas Backpack – Black", category: "Bags & Accessories", price: 34.99, image: img("backpack-canvas"), rating: 4.5, reviews: 2180 },
  { id: 51, name: "Mini Crossbody Bag – Nude", category: "Bags & Accessories", price: 29.99, originalPrice: 44.99, image: img("crossbody-nude"), rating: 4.7, reviews: 4502 },
  { id: 52, name: "Aviator Sunglasses – Gold", category: "Bags & Accessories", price: 19.99, image: img("sunnies-aviator"), rating: 4.4, reviews: 1780 },
  { id: 53, name: "Slim Bifold Wallet – Brown", category: "Bags & Accessories", price: 24.99, originalPrice: 39.99, image: img("wallet-bifold"), rating: 4.6, reviews: 5130 },
  { id: 54, name: "Wide-Brim Sun Hat", category: "Bags & Accessories", price: 17.99, image: img("hat-brim"), rating: 4.3, reviews: 920 },
  { id: 55, name: "Laptop Sleeve 15\"– Grey", category: "Bags & Accessories", price: 14.99, image: img("sleeve-laptop"), rating: 4.5, reviews: 3410 },
  { id: 56, name: "Vintage Satchel Bag", category: "Bags & Accessories", price: 49.99, originalPrice: 74.99, image: img("satchel-vintage"), rating: 4.7, reviews: 1650 },
  { id: 57, name: "Cat-Eye Sunglasses – Tortoise", category: "Bags & Accessories", price: 22.99, image: img("sunnies-cateye"), rating: 4.4, reviews: 2240 },
  { id: 58, name: "Woven Straw Beach Bag", category: "Bags & Accessories", price: 27.99, originalPrice: 39.99, image: img("bag-straw"), rating: 4.5, reviews: 1030 },
  { id: 59, name: "Card Holder – Black Leather", category: "Bags & Accessories", price: 12.99, image: img("cardholder-blk"), rating: 4.6, reviews: 6780 },
  { id: 60, name: "Sports Duffel Bag – Navy", category: "Bags & Accessories", price: 42.99, image: img("duffel-navy"), rating: 4.5, reviews: 870 },
  { id: 61, name: "Clear Acrylic Clutch", category: "Bags & Accessories", price: 18.99, originalPrice: 28.99, image: img("clutch-acrylic"), rating: 4.3, reviews: 540 },
  { id: 62, name: "Silk Scarf – Floral Print", category: "Bags & Accessories", price: 15.99, image: img("scarf-silk"), rating: 4.6, reviews: 1340 },
  { id: 63, name: "Leather Belt – Classic Black", category: "Bags & Accessories", price: 19.99, originalPrice: 29.99, image: img("belt-classic"), rating: 4.7, reviews: 3920 },
  { id: 64, name: "Travel Passport Holder", category: "Bags & Accessories", price: 11.99, image: img("passport-holder"), rating: 4.5, reviews: 2760 },

  // ── Jewelry ───────────────────────────────────────────────────────────────
  { id: 65, name: "Gold Layered Necklace Set", category: "Jewelry", price: 24.99, originalPrice: 39.99, image: img("necklace-gold"), rating: 4.7, reviews: 5430 },
  { id: 66, name: "Silver Hoop Earrings – Large", category: "Jewelry", price: 14.99, image: img("hoops-silver"), rating: 4.5, reviews: 3820 },
  { id: 67, name: "Dainty Pearl Bracelet", category: "Jewelry", price: 19.99, originalPrice: 29.99, image: img("bracelet-pearl"), rating: 4.8, reviews: 2110 },
  { id: 68, name: "Stackable Midi Rings Set", category: "Jewelry", price: 16.99, image: img("rings-stack"), rating: 4.6, reviews: 4670 },
  { id: 69, name: "Rose Gold Tennis Bracelet", category: "Jewelry", price: 29.99, originalPrice: 44.99, image: img("bracelet-tennis"), rating: 4.7, reviews: 1890 },
  { id: 70, name: "Crystal Drop Earrings", category: "Jewelry", price: 12.99, image: img("earrings-crystal"), rating: 4.5, reviews: 3210 },
  { id: 71, name: "Minimalist Bar Necklace", category: "Jewelry", price: 18.99, image: img("necklace-bar"), rating: 4.4, reviews: 2450 },
  { id: 72, name: "Emerald Stud Earrings", category: "Jewelry", price: 34.99, originalPrice: 54.99, image: img("earrings-emerald"), rating: 4.8, reviews: 780 },
  { id: 73, name: "Charm Anklet – Gold", category: "Jewelry", price: 11.99, image: img("anklet-gold"), rating: 4.3, reviews: 1560 },
  { id: 74, name: "Vintage Brooch Pin – Butterfly", category: "Jewelry", price: 9.99, originalPrice: 15.99, image: img("brooch-butterfly"), rating: 4.4, reviews: 820 },
  { id: 75, name: "Diamond-Look Pendant Necklace", category: "Jewelry", price: 22.99, image: img("pendant-diamond"), rating: 4.7, reviews: 3340 },
  { id: 76, name: "Adjustable Cuff Bracelet", category: "Jewelry", price: 13.99, image: img("cuff-bracelet"), rating: 4.5, reviews: 2190 },
  { id: 77, name: "Initial Letter Necklace – Gold", category: "Jewelry", price: 17.99, originalPrice: 24.99, image: img("necklace-initial"), rating: 4.6, reviews: 6710 },
  { id: 78, name: "Geometric Drop Earrings", category: "Jewelry", price: 14.99, image: img("earrings-geo"), rating: 4.4, reviews: 1890 },
  { id: 79, name: "Birthstone Ring – Amethyst", category: "Jewelry", price: 28.99, originalPrice: 42.99, image: img("ring-birthstone"), rating: 4.8, reviews: 970 },
  { id: 80, name: "Multi-Strand Seed Bead Necklace", category: "Jewelry", price: 15.99, image: img("necklace-beads"), rating: 4.3, reviews: 1230 },

  // ── Innerwear ─────────────────────────────────────────────────────────────
  { id: 81, name: "Seamless Comfort Bra – Nude", category: "Innerwear", price: 17.99, originalPrice: 24.99, image: img("bra-seamless"), rating: 4.6, reviews: 7830 },
  { id: 82, name: "5-Pack Cotton Boxer Briefs", category: "Innerwear", price: 24.99, image: img("boxers-5pk"), rating: 4.7, reviews: 11204 },
  { id: 83, name: "Sports High-Impact Bra", category: "Innerwear", price: 22.99, originalPrice: 34.99, image: img("bra-sports"), rating: 4.8, reviews: 4520 },
  { id: 84, name: "Thermal Undershirt – White", category: "Innerwear", price: 14.99, image: img("thermal-shirt"), rating: 4.4, reviews: 2310 },
  { id: 85, name: "Lace Bikini Briefs – 3 Pack", category: "Innerwear", price: 19.99, originalPrice: 29.99, image: img("briefs-lace"), rating: 4.5, reviews: 5670 },
  { id: 86, name: "No-Show Ankle Socks – 6 Pack", category: "Innerwear", price: 12.99, image: img("socks-ankle"), rating: 4.6, reviews: 8901 },
  { id: 87, name: "Wireless Push-Up Bra", category: "Innerwear", price: 26.99, originalPrice: 39.99, image: img("bra-wireless"), rating: 4.7, reviews: 3210 },
  { id: 88, name: "Modal Boxer Shorts – 3 Pack", category: "Innerwear", price: 21.99, image: img("shorts-modal"), rating: 4.5, reviews: 4100 },
  { id: 89, name: "Compression Leggings – Black", category: "Innerwear", price: 29.99, originalPrice: 44.99, image: img("leggings-comp"), rating: 4.8, reviews: 6320 },
  { id: 90, name: "Cozy Bamboo Tank Top", category: "Innerwear", price: 16.99, image: img("tank-bamboo"), rating: 4.4, reviews: 2870 },
  { id: 91, name: "Thermal Long Johns – Grey", category: "Innerwear", price: 27.99, originalPrice: 39.99, image: img("longjohns-grey"), rating: 4.5, reviews: 1450 },
  { id: 92, name: "Organic Cotton Brief – Women", category: "Innerwear", price: 9.99, image: img("brief-organic"), rating: 4.6, reviews: 9870 },
  { id: 93, name: "Crew Neck Undershirt – 2 Pack", category: "Innerwear", price: 18.99, image: img("undershirt-crew"), rating: 4.3, reviews: 3210 },
  { id: 94, name: "Shaping Slip Bodysuit", category: "Innerwear", price: 32.99, originalPrice: 49.99, image: img("bodysuit-shape"), rating: 4.7, reviews: 2190 },
  { id: 95, name: "Merino Wool Knee-High Socks", category: "Innerwear", price: 14.99, image: img("socks-merino"), rating: 4.5, reviews: 1780 },
  { id: 96, name: "Sleep Shorts & Cami Set", category: "Innerwear", price: 22.99, originalPrice: 34.99, image: img("sleep-set"), rating: 4.6, reviews: 3450 },
];
