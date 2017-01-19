import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let ExerciseSchema = new Schema({
  type: {type: String, required: true},
  name: {type: String, required: true},
  sets: {type: Number, required: true},
  reps: {type: Number, required: true},
  weights: {type: Number, required: true},
  level: {type: Number, required: true, default: 1},

  userId: {type: Schema.Types.ObjectId, required: true},
  workoutId: {type: Schema.Types.ObjectId, required: true, unique: true, dropDups: true},

  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date},
  deleted_at: {type: Date}
});

export default mongoose.model('Exercise', ExerciseSchema);