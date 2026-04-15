const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');
const Category = require('../models/Category');

dotenv.config({ path: path.join(__dirname, '../.env') });

const smartPrices = [99, 129, 149, 179, 199, 249, 299, 349, 399, 449, 499, 549, 599, 699, 799, 899, 999, 1099, 1199, 1299, 1499, 1799, 1999];

// Array containing base items. We will generate 2-3 products per item.
const productTemplates = [
    // 1. Hair Accessories & Tools
    { name: "Fancy Hairband (Velvet)", category: "Hair Accessories & Tools", min: 100, max: 200, img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&q=80" },
    { name: "Pearl Bow Hairband", category: "Hair Accessories & Tools", min: 100, max: 200, img: "https://images.unsplash.com/photo-1605333333333-333333333333?w=500&q=80" },
    { name: "Metal Zig-zag Hairband", category: "Hair Accessories & Tools", min: 100, max: 200, img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&q=80" },
    { name: "Printed Silk Hair Scarf", category: "Hair Accessories & Tools", min: 100, max: 200, img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80" },
    { name: "Party Wear Crystal Tiara", category: "Hair Accessories & Tools", min: 100, max: 200, img: "https://plus.unsplash.com/premium_photo-1661628148805-3e2840c94f57?w=500&q=80" },
    { name: "Electric Hair Straightening Brush", category: "Hair Accessories & Tools", min: 300, max: 500, img: "https://images.unsplash.com/photo-1610411322080-692fcbd6c8a7?w=500&q=80" },
    { name: "Silicone Scalp Massager", category: "Hair Accessories & Tools", min: 300, max: 500, img: "https://images.unsplash.com/photo-1584347586504-20512fbd6d0c?w=500&q=80" },
    { name: "Anti-dandruff Neem Wood Comb", category: "Hair Accessories & Tools", min: 300, max: 500, img: "https://images.unsplash.com/photo-1563223552-30d01ba4afcd?w=500&q=80" },

    // 2. Skincare Devices
    { name: "Natural Jade Roller & Gua Sha Set", category: "Skincare Devices", min: 200, max: 400, img: "https://images.unsplash.com/photo-1615397323635-718cda1e17d6?w=500&q=80" },
    { name: "Cooling Ice Roller for Face", category: "Skincare Devices", min: 200, max: 400, img: "https://images.unsplash.com/photo-1615397323635-718cda1e17d6?w=500&q=80" },
    { name: "At-Home Spa Face Steamer", category: "Skincare Devices", min: 200, max: 400, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80" },
    { name: "Vibrating Electric Face Cleanser", category: "Skincare Devices", min: 800, max: 1500, img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80" },
    { name: "Vacuum Blackhead Remover", category: "Skincare Devices", min: 800, max: 1500, img: "https://images.unsplash.com/photo-1629198725835-9cd119c8f000?w=500&q=80" },

    // 3. Body Care & Aesthetics
    { name: "Colorful Exfoliating Body Loofah", category: "Body Care & Aesthetics", min: 150, max: 300, img: "https://images.unsplash.com/photo-1608248593309-80a56ed91d60?w=500&q=80" },
    { name: "Natural Pumice Stone & Foot Scrubber", category: "Body Care & Aesthetics", min: 150, max: 300, img: "https://images.unsplash.com/photo-1615397323635-718cda1e17d6?w=500&q=80" },
    { name: "Refreshing Floral Body Mist", category: "Body Care & Aesthetics", min: 150, max: 300, img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80" },
    { name: "Deep Moisture Shea Body Butter", category: "Body Care & Aesthetics", min: 500, max: 1000, img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80" },
    { name: "SPF 50+ Sunscreen Lotion", category: "Body Care & Aesthetics", min: 500, max: 1000, img: "https://images.unsplash.com/photo-1556228578-b118b622ca88?w=500&q=80" },
    { name: "Advanced Stretch Mark Cream", category: "Body Care & Aesthetics", min: 500, max: 1000, img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&q=80" },

    // 4. Organizers
    { name: "24-Slot Transparent Lipstick Organizer", category: "Organizers", min: 200, max: 500, img: "https://images.unsplash.com/photo-1586498527357-12c8ff46bd2c?w=500&q=80" },
    { name: "Elegant Metal Jewellery Tree", category: "Organizers", min: 200, max: 500, img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=500&q=80" },
    { name: "360 Rotating Makeup Organizer", category: "Organizers", min: 1000, max: 2000, img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80" },
    { name: "LED Mirror Portable Makeup Travel Case", category: "Organizers", min: 1000, max: 2000, img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80" },

    // 5. Miscellaneous
    { name: "Premium Silk Sleep Mask", category: "Miscellaneous", min: 100, max: 250, img: "https://images.unsplash.com/photo-1629895240292-623e1ced554a?w=500&q=80" },
    { name: "Silicone Travel Bottle Set", category: "Miscellaneous", min: 300, max: 600, img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80" },
    { name: "Electric Callus Foot Filer", category: "Miscellaneous", min: 500, max: 1200, img: "https://images.unsplash.com/photo-1610411322080-692fcbd6c8a7?w=500&q=80" }
];

async function runSeeder() {
    try {
        console.log("Connecting to Database...");
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined.");
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB!");

        // 1. Setup Categories logic
        const categoriesData = [
            { name: "Hair Accessories & Tools", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&q=80" },
            { name: "Skincare Devices", image: "https://images.unsplash.com/photo-1615397323635-718cda1e17d6?w=500&q=80" },
            { name: "Body Care & Aesthetics", image: "https://images.unsplash.com/photo-1556228578-b118b622ca88?w=500&q=80" },
            { name: "Organizers", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80" },
            { name: "Miscellaneous", image: "https://plus.unsplash.com/premium_photo-1661628148805-3e2840c94f57?w=500&q=80" }
        ];

        for (let cat of categoriesData) {
            const existingCat = await Category.findOne({ name: cat.name });
            if (!existingCat) {
                await Category.create(cat);
                console.log(`Created Category: ${cat.name}`);
            } else {
                console.log(`Category ${cat.name} already exists.`);
            }
        }

        // 2. Generate and Insert Products
        let createdCount = 0;
        const generatedProducts = [];

        for (const template of productTemplates) {
            // For variety, let's create 2 products for each base template
            for (let i = 1; i <= 2; i++) {
                // Determine price
                const validSmartPrices = smartPrices.filter(p => p >= template.min && p <= template.max);
                let finalPrice = validSmartPrices.length > 0
                    ? validSmartPrices[Math.floor(Math.random() * validSmartPrices.length)]
                    : template.max; // fallback

                // Discount
                const discountPercentage = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
                
                // Old price
                const oldPrice = Math.round(finalPrice / (1 - (discountPercentage / 100)));

                // Rating & Reviews
                const ratingOptions = [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
                const rating = ratingOptions[Math.floor(Math.random() * ratingOptions.length)];
                const reviewsCount = Math.floor(Math.random() * (400 - 20 + 1)) + 20;

                // Brand
                const brands = ["Lumina", "GlowUp", "BeautyCare", "TrendyVibe", "Aesthetics", "PureBlend"];

                const productName = i === 1 ? template.name : `${template.name} - Premium Edition`;

                generatedProducts.push({
                    name: productName,
                    brand: brands[Math.floor(Math.random() * brands.length)],
                    price: finalPrice,
                    oldPrice: oldPrice,
                    discount: `${discountPercentage}%`,
                    rating: rating,
                    reviews: reviewsCount,
                    image: template.img,
                    gallery: [template.img, template.img],
                    category: template.category,
                    subCategory: i === 1 ? "Standard" : "Premium",
                    description: `Superb ${template.name.toLowerCase()} that provides amazing daily results. Highly recommended by dermatologists and beauty experts! Comes with best-in-class quality.`,
                    stock: Math.floor(Math.random() * (150 - 20 + 1)) + 20,
                    fastDelivery: Math.random() < 0.6,
                    status: 'active'
                });
            }
        }

        // Insert into DB
        await Product.insertMany(generatedProducts);
        
        console.log(`\n🎉 Task Complete! Embedded ${categoriesData.length} categories and generated ${generatedProducts.length} trendy products.`);
    } catch (error) {
        console.error("Error setting up new catalog:", error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

runSeeder();
