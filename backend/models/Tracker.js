import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let TrackerSchema = new Schema({
  setOrder: {type: Number, required: true},
  sets: {type: Number, required: true},
  reps: {type: Number, required: true},
  weights: {type: Number, required: true},
  level: {type: Number, required: true},

  userId: {type: Schema.Types.ObjectId, required: true},
  exerciseId: {type: Schema.Types.ObjectId, required: true},

  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date},
  deleted_at: {type: Date}
});

TrackerSchema.index({ setOrder: 1, exerciseId: 1 }, { unique: true, dropDups: true});

export default mongoose.model('Tracker', TrackerSchema);