import mongoose from 'mongoose';

export const dbConection = async (DB_URL: string) => {
  try {
    await mongoose.connect(DB_URL);
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error while connecteing the database', error);
  }
};