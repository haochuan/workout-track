import mongoose from 'mongoose';
import moment from 'moment';
const Schema = mongoose.Schema;

let WorkoutSchema = new Schema({
  name: {type: String, required: true},
  date: {type: Date, required: true},

  userId: {type: Schema.Types.ObjectId, required: true},

  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date},
  deleted_at: {type: Date}
});

WorkoutSchema.index({ userId: 1, date: 1 }, { unique: true, dropDups: true});

export default mongoose.model('Workout', WorkoutSchema);