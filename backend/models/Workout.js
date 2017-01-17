import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let WorkoutSchema = new Schema({
  name: {type: String, required: true},
  date: {type: Date, required: true, unique: true, dropDups: true},

  userId: {type: Schema.Types.ObjectId, required: true},

  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date},
  deleted_at: {type: Date}
});


export default mongoose.model('Workout', WorkoutSchema);