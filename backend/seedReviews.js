const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Review = require('./models/Review');

dotenv.config();

const indianFirstNames = [
  "Aarav", "Priya", "Rahul", "Sneha", "Aditya", "Neha", "Rohan", "Anjali", "Vikram", "Pooja",
  "Karan", "Kavya", "Aryan", "Meera", "Kabir", "Nisha", "Ishaan", "Simran", "Dhruv", "Riya",
  "Amit", "Divya", "Rohit", "Tanvi", "Siddharth", "Ayesha", "Kunal", "Shruti", "Gaurav", "Nandini",
  "Samir", "Shreya", "Nitin", "Ananya", "Arjun", "Tanya", "Vishal", "Kritika", "Sanjay", "Sonal",
  "Varun", "Ruchi", "Akash", "Aarti", "Tarun", "Poonam", "Manish", "Preeti", "Rajat", "Swati"
];

const adjectives = ["amazing", "fantastic", "luxurious", "soothing", "perfect", "excellent", "beautiful", "premium", "wonderful", "great", "lovely", "high-quality", "refreshing", "authentic", "divine"];
const features = ["texture", "fragrance", "quality", "packaging", "finish", "feel", "results", "smell", "consistency", "effect", "look", "value"];
const targetAreas = ["skin", "face", "hair", "look", "daily routine", "collection"];

const templates = [
  "I absolutely love the [PRODUCT_NAME]. The [FEATURE] is very [ADJECTIVE]!",
  "This is my second time buying [PRODUCT_NAME]. Highly recommended for your [TARGET_AREA].",
  "Very [ADJECTIVE] [FEATURE]. It works perfectly for my [TARGET_AREA].",
  "The [PRODUCT_NAME] feels so [ADJECTIVE] on the [TARGET_AREA]. Great purchase.",
  "Such a [ADJECTIVE] product. I am impressed with the [FEATURE].",
  "Bought [PRODUCT_NAME] after a friend recommended it. The [FEATURE] is [ADJECTIVE]!",
  "One of the best products for [TARGET_AREA]. It's very [ADJECTIVE] and the [FEATURE] is superb.",
  "I have been using [PRODUCT_NAME] for weeks. Gives a very [ADJECTIVE] finish.",
  "In love with the [ADJECTIVE] [FEATURE] of this product. Will buy again.",
  "Totally worth the price. The [FEATURE] is [ADJECTIVE], best for [TARGET_AREA]."
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateReviewText(productName) {
  const template = getRandomItem(templates);
  const adjective = getRandomItem(adjectives);
  const feature = getRandomItem(features);
  const targetArea = getRandomItem(targetAreas);

  return template
    .replace("[PRODUCT_NAME]", productName)
    .replace("[ADJECTIVE]", adjective)
    .replace("[FEATURE]", feature)
    .replace("[TARGET_AREA]", targetArea);
}

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    // 1. Create 50 Dummy Users
    console.log("Generating dummy users...");
    const dummyUserIds = [];
    for (let i = 0; i < 50; i++) {
      const email = `verified_user_${i}@example.com`;
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name: indianFirstNames[i] || `User ${i}`,
          email,
          phone: `999999${i.toString().padStart(4, '0')}`,
          password: 'password123',
          role: 'customer'
        });
      }
      dummyUserIds.push(user._id);
    }
    console.log(`Secured ${dummyUserIds.length} verified users for reviews.`);

    // 2. Fetch all products
    const products = await Product.find({}, '_id name');
    console.log(`Found ${products.length} products. Generating reviews...`);

    // 3. Generate reviews in memory
    const allReviewsToInsert = [];

    // Clear existing dummy reviews if needed to avoid duplicate key errors, or just let insertMany fail on duplicates?
    // Let's delete existing reviews from these specific dummy users just in case
    await Review.deleteMany({ user: { $in: dummyUserIds } });
    console.log("Cleared old dummy reviews.");

    for (const product of products) {
      for (const userId of dummyUserIds) {
        // Random rating between 4 and 5, occasionally 3
        const rand = Math.random();
        let rating = 5;
        if (rand < 0.3) rating = 4;
        else if (rand < 0.05) rating = 3;

        allReviewsToInsert.push({
          product: product._id,
          user: userId,
          review: generateReviewText(product.name),
          rating: rating,
          isApproved: true
        });
      }
    }

    // 4. Bulk Insert
    console.log(`Inserting ${allReviewsToInsert.length} reviews. This may take a minute...`);
    const chunkSize = 5000;
    for (let i = 0; i < allReviewsToInsert.length; i += chunkSize) {
      const chunk = allReviewsToInsert.slice(i, i + chunkSize);
      await Review.insertMany(chunk, { ordered: false });
      console.log(`Inserted ${Math.min(i + chunkSize, allReviewsToInsert.length)} / ${allReviewsToInsert.length}`);
    }
    console.log("Bulk insertion complete!");

    // 5. Update Product Averages
    console.log("Recalculating all product averages...");
    const stats = await Review.aggregate([
      { $match: { isApproved: true } },
      { $group: { _id: '$product', nRating: { $sum: 1 }, avgRating: { $avg: '$rating' } } }
    ]);

    const bulkProductUpdates = stats.map(stat => ({
      updateOne: {
        filter: { _id: stat._id },
        update: {
          rating: Math.round(stat.avgRating * 10) / 10,
          reviews: stat.nRating
        }
      }
    }));

    if (bulkProductUpdates.length > 0) {
      await Product.bulkWrite(bulkProductUpdates);
    }
    console.log("All product ratings synchronized.");

    console.log("Task finished successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Script failed:", err);
    process.exit(1);
  }
}

seedDatabase();
