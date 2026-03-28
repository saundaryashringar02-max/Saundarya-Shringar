const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Banner = require('../models/Banner');
const Blog = require('../models/Blog');
const Testimonial = require('../models/Testimonial');
const InstagramPost = require('../models/InstagramPost');
const fs = require('fs');

// Load Cloudinary Mapping
const mappingPath = path.join(__dirname, '../cloudinary_mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

const getUrl = (fileName) => {
    // Cleanup filename (remove leading slash if any)
    const cleanName = fileName.replace(/^\//, '');
    return mapping[cleanName] || fileName;
};

const categories = [
    { name: 'Skincare', image: getUrl('cat_skincare_new.png'), count: 12 },
    { name: 'Soaps', image: getUrl('cat_soaps.png'), count: 8 },
    { name: 'Haircare', image: getUrl('cat_haircare_new.png'), count: 6 },
    { name: 'Makeup', image: getUrl('cat_makeup_new.png'), count: 15 },
    { name: 'Jewellery', image: getUrl('cat_jewellery.png'), count: 5 },
    { name: 'Innerwear', image: getUrl('cat_innerwear.png'), count: 10 },
    { name: 'Wellness', image: getUrl('cat_wellness_new.png'), count: 4 },
    { name: 'Combos', image: getUrl('cat_beautykits_new.png'), count: 2 },
];

const products = [
    {
        name: 'TIRTIR Mask Fit Pink Cushion',
        price: 1450,
        rating: 5,
        reviews: 120,
        image: getUrl('tirtir_pink_cushion.png'),
        category: 'Skincare',
        subCategory: 'Moisturizer',
        description: 'Perfectly dewy skin for a radiant finish.',
        cashback: true,
        flashSale: true
    },
    {
        name: 'TIRTIR Dual Concealer Stick',
        price: 1650,
        rating: 4,
        reviews: 89,
        image: getUrl('tirtir_concealer_stick.png'),
        category: 'Skincare',
        subCategory: 'Serum',
        description: 'Blemish control with organic essence.'
    },
    {
        name: 'Sandalwood Luxury Soap',
        price: 350,
        rating: 5,
        reviews: 450,
        image: getUrl('cat_skincare.png'),
        category: 'Soaps',
        subCategory: 'Natural',
        description: 'Traditional handcrafted luxury soap.'
    },
    {
        name: 'Turmeric Herbal Soap',
        price: 250,
        rating: 5,
        reviews: 320,
        image: getUrl('cat_skincare.png'),
        category: 'Soaps',
        subCategory: 'Herbal',
        description: 'Antiseptic organic turmeric bar.'
    },
    {
        name: 'Lakmé UV Face Powder',
        price: 1899,
        oldPrice: 3200,
        rating: 5,
        reviews: 890,
        discount: '10%',
        image: getUrl('lakme_face_powder.png'),
        category: 'Makeup',
        subCategory: 'Compact',
        description: 'Breathable HD coverage.'
    },
    {
        name: 'Lakmé 2-in-1 Lipstick Set',
        price: 999,
        rating: 5,
        reviews: 120,
        image: getUrl('lakme_2_in_1_lipstick.png'),
        category: 'Makeup',
        subCategory: 'Lipstick',
        description: 'Matte finish with 24h stay.'
    },
    {
        name: 'Volumizing Eye Mascara',
        price: 1150,
        rating: 4,
        reviews: 45,
        image: getUrl('volumizing_mascara.png'),
        category: 'Makeup',
        subCategory: 'Mascara'
    },
    {
        name: 'Royal Heritage Jhumkas',
        price: 1850,
        rating: 5,
        reviews: 120,
        image: getUrl('hero3.png'),
        category: 'Jewellery',
        subCategory: 'Traditional',
        description: 'Exquisite gold-plated traditional jhumkas.',
        cashback: true,
        flashSale: true
    },
    {
        name: 'Rose Gold Eyeshadow Palette',
        price: 1550,
        rating: 5,
        reviews: 85,
        image: getUrl('rose_gold_eyeshadow_palette.png'),
        category: 'Makeup',
        subCategory: 'Eyes',
        description: 'Elegant rose gold tones for festive looks.'
    },
    {
        name: 'Cotton Comfort Bra',
        price: 599,
        oldPrice: 899,
        rating: 4,
        reviews: 890,
        image: getUrl('banner_2.png'),
        category: 'Innerwear',
        subCategory: 'Daily',
        description: 'Breathable everyday cotton comfort.',
        discount: '33%',
        hasTimer: true
    },
    {
        name: 'Seamless Lace Balconette',
        price: 1250,
        oldPrice: 1950,
        rating: 5,
        reviews: 230,
        image: getUrl('banner_2.png'),
        category: 'Innerwear',
        subCategory: 'Premium',
        description: 'Premium lace finish with seamless fit.',
        discount: '35%',
        hasTimer: true
    },
    {
        name: 'Onion Hair Oil',
        price: 599,
        rating: 5,
        reviews: 890,
        image: getUrl('cat_haircare.png'),
        category: 'Haircare',
        subCategory: 'Hair Oil',
        description: 'Strengthens roots and reduces hair fall.'
    },
    {
        name: 'Ashwagandha Drops',
        price: 1250,
        rating: 5,
        reviews: 89,
        image: getUrl('cat_wellness.png'),
        category: 'Wellness',
        subCategory: 'Supplements',
        description: 'Stress relief with pure roots.',
        cashback: true
    },
    {
        name: 'Bridal Radiance Kit',
        price: 1950,
        oldPrice: 2800,
        rating: 5,
        reviews: 45,
        discount: '18%',
        image: getUrl('banner_3.png'),
        category: 'Combos',
        subCategory: 'Gifts',
        description: 'Complete glow ritual for your big day.',
        cashback: true,
        flashSale: true
    },
    {
        name: 'Herbal Neem Soap',
        price: 50,
        oldPrice: 85,
        rating: 5,
        reviews: 1200,
        discount: '41%',
        hasTimer: true,
        image: getUrl('cat_skincare_new.png'),
        category: 'Soaps',
        subCategory: 'Daily Care',
        description: 'Antibacterial neem for clear skin.'
    },
    {
        name: 'Traditional Black Kajal',
        price: 75,
        oldPrice: 150,
        rating: 4,
        reviews: 890,
        discount: '50%',
        hasTimer: true,
        image: getUrl('cat_skincare.png'),
        category: 'Makeup',
        subCategory: 'Eyes',
        description: 'Natural smudge-proof herbal kajal.'
    },
    {
        name: 'Mini Rose Water',
        price: 99,
        oldPrice: 199,
        rating: 5,
        reviews: 2300,
        discount: '50%',
        hasTimer: true,
        image: getUrl('cat_essentialoils_new.png'),
        category: 'Skincare',
        subCategory: 'Toner',
        description: 'Pure distilled rose mist for instant freshness.'
    }
];

const storefrontBanners = [
    { title: 'Hero Season Collection', type: 'Main Slider', image: getUrl('banner_1.png'), res: '1920x800' },
    { title: 'Festive Makeup Sale', type: 'Main Slider', image: getUrl('banner_2.png'), res: '1920x800' },
    { title: 'Skincare Essentials', type: 'Main Slider', image: getUrl('banner_3.png'), res: '1920x800' },
    { title: 'Trending Now Promo', type: 'Mid-Section', image: getUrl('trending_banner.png'), res: '1200x400' },
    { title: 'Organic Soap Highlight', type: 'Category Banner', image: getUrl('cat_skincare_new.png'), res: '800x800' },
    {
        title: 'Trending Essentials',
        type: 'Trending',
        subtitle: 'Seasonal Sale | Up to 50% Off',
        description: 'Grab the best deals on Skincare, Soaps and the new Innerwear collection.',
        btnText: 'SHOP SALE',
        price: '₹299',
        link: '/shop',
        image: getUrl('banner_1.png'),
        status: 'Live'
    },
    {
        title: 'Trending Now | Most Loved',
        type: 'Trending',
        subtitle: 'Trending Now | Most Loved',
        description: 'Discover the heritage jhumka collection and trending foundations.',
        btnText: 'VIEW TRENDING',
        price: '₹599',
        link: '/shop',
        image: getUrl('banner_2.png'),
        status: 'Live'
    },
    {
        title: 'Timeless Elegance',
        type: 'Offers',
        subtitle: 'Exclusive Offer',
        description: 'Indulge in Timeless Elegance with our heritage collection.',
        btnText: 'Explore Collection',
        link: '/shop',
        image: getUrl('offers_video.mp4'),
        isVideo: true,
        status: 'Live'
    },
];

const blogs = [
    {
        title: 'Long-Lasting Bridal Glow',
        category: 'BRIDAL',
        excerpt: 'Tips for makeup that lasts from ceremony to party.',
        content: "Your wedding day is a marathon, not a sprint. To ensure your bridal glow lasts from the first photo to the last dance, preparation is key.",
        image: getUrl('blog_item_1.png'),
        date: 'MAR 15',
        readTime: '5M',
        author: 'Saundarya Team'
    },
    {
        title: 'Finding Your Perfect Red',
        category: 'COLOR',
        excerpt: 'Red lipstick is the ultimate power move.',
        content: "Finding the perfect red lipstick is like finding the perfect pair of jeans—it changes everything.",
        image: getUrl('blog_item_2.png'),
        date: 'MAR 10',
        readTime: '4M',
        author: 'Saundarya Team'
    }
];

const testimonials = [
    {
        name: 'Akanksha Khanna',
        text: "Delighted with my engagement ring from Saundarya! It's my dream ring, fits perfectly and is stunning to look at.",
        image: getUrl('testi_1.png'),
        rating: 5,
        status: 'Approved'
    },
    {
        name: 'Diksha Singh',
        text: "I was worried about finding good quality fine jewellery pieces online, but Saundarya's customer service gave me full assurance.",
        image: getUrl('testi_2.png'),
        rating: 5,
        status: 'Approved'
    }
];

const instaPosts = [
    { caption: 'The glow that never fades.', image: getUrl('insta_1.png'), link: 'https://instagram.com' },
    { caption: 'Sandalwood sets the mood.', image: getUrl('insta_2.png'), link: 'https://instagram.com' },
    { caption: 'Heritage in every hue.', image: getUrl('insta_3.png'), link: 'https://instagram.com' },
    { caption: 'Your daily beauty ritual.', image: getUrl('insta_4.png'), link: 'https://instagram.com' },
    { caption: 'Elegance personified.', image: getUrl('insta_5.png'), link: 'https://instagram.com' },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Clearing old data...');
        await Product.deleteMany({});
        await Category.deleteMany({});
        await Banner.deleteMany({});
        await Blog.deleteMany({});
        await Testimonial.deleteMany({});
        await InstagramPost.deleteMany({});

        console.log('Seeding categories with Cloudinary URLs...');
        await Category.insertMany(categories);

        console.log('Seeding products with Cloudinary URLs...');
        await Product.insertMany(products);

        console.log('Seeding banners with Cloudinary URLs...');
        await Banner.insertMany(storefrontBanners);

        console.log('Seeding blogs...');
        await Blog.insertMany(blogs);

        console.log('Seeding testimonials...');
        await Testimonial.insertMany(testimonials);

        console.log('Seeding instagram posts...');
        await InstagramPost.insertMany(instaPosts);

        console.log('\x1b[32m%s\x1b[0m', '✓ Full Storefront Seeding Complete.');
        process.exit();
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', `✗ Seeding Failed: ${err.message}`);
        process.exit(1);
    }
};

seedDB();
