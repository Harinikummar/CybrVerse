const mongoose = require('mongoose');
const mongodb = require('mongodb');

const connectDB = async () => {
  try {
    // Connect using native MongoDB driver
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017');
    const adminDb = client.db().admin();
    const databasesList = await adminDb.listDatabases();

    const dbExists = databasesList.databases.some(db => db.name === 'cybersecurity');

    if (!dbExists) {
      console.log('Creating the database...');
      await mongoose.connect('mongodb://localhost:27017/cybersecurity');
      console.log('MongoDB connected and database created.');

      // Initialize the required collections
      await initializeCollections();
    } else {
      console.log('Database already exists. Connecting...');
      await mongoose.connect('mongodb://localhost:27017/cybersecurity');
      console.log('MongoDB connected.');
      
      // Ensure collections exist
      await ensureCollectionsExist();
    }
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Initialize schemas and create the "topics" collection
const initializeCollections = async () => {
  try {
    const topicSchema = new mongoose.Schema({
      category: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      videoLink: { type: String, required: true },
      referenceLink: { type: String, required: true },
    });

    // Create "topics" collection if it doesn't exist
    mongoose.model('topics', topicSchema);
    console.log('Topics collection created (without documents).');
  } catch (error) {
    console.error('Error initializing collections:', error.message);
  }
};

// Ensure specific collections exist without adding any documents
const ensureCollectionsExist = async () => {
  try {
    const db = mongoose.connection;
    
    // Check and create "users" collection
    const usersCollection = await db.db.listCollections({ name: 'users' }).toArray();
    if (usersCollection.length === 0) {
      await db.createCollection('users');
      console.log("Created 'users' collection...");
    }

    // Check and create "quizResults" collection
    const quizResultsCollection = await db.db.listCollections({ name: 'quizResults' }).toArray();
    if (quizResultsCollection.length === 0) {
      await db.createCollection('quizResults');
      console.log("Created 'quizResults' collection...");
    }

    // Uncomment to ensure other collections (e.g., quizzes) exist
    // const quizCollection = await db.db.listCollections({ name: 'quizzes' }).toArray();
    // if (quizCollection.length === 0) {
    //   await db.createCollection('quizzes');
    //   console.log("Created 'quizzes' collection...");
    // }

    console.log('All required collections checked and ensured.');
  } catch (error) {
    console.error('Error ensuring collections:', error.message);
  }
};

module.exports = connectDB;
