import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Run enviroment variables;
dotenv.config({path: './src/config/config.env'});



const connectionDB = async (env: 'development' | 'production' | string) => {

  let connectionURI = env === 'development' ? process.env.DATABASE_LOCAL : process.env.DATABASE_MONGO;
  console.log(connectionURI);
  try {
    await mongoose.connect(connectionURI!, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    console.log(`Database online on ${env} mode`)
  } catch (error) {
    throw new Error ('Error connecting to the database');
  }

}


export default connectionDB;