import mongoose from 'mongoose';
import env from './env'; 
mongoose.connect(env.dbHost); // connect to our datab