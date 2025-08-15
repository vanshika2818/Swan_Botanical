import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Validate the connection string exists
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    // Connection options (recommended for newer MongoDB versions)
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // Not needed for Mongoose 6+
      // useFindAndModify: false // Not needed for Mongoose 6+
    };

    // Establish connection
    await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log('MongoDB Connected...');
    
    // Connection events for better debugging
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;