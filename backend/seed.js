require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Data to seed
const users = [
  { username: 'user1', password: 'password1', role: 'user', dob: '01/12/2000', gender:'male', email:'user@gmail.com' },
  { username: 'mediator1', password: 'password2', role: 'mediator', dob: '01/12/2000', gender:'male', email:'mediator@gmail.com' },
  { username: 'gov1', password: 'password3', role: 'government' , dob: '01/12/2000', gender:'male', email:'government@gmail.com'},
];

// Seed function
const seedDatabase = async () => {
  try {
    await User.deleteMany(); // Remove existing users
    console.log('Existing users removed');

    await User.insertMany(users); // Insert new users
    console.log('Users seeded successfully');

    mongoose.connection.close(); // Close connection
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

// Run the seeding function
seedDatabase();
