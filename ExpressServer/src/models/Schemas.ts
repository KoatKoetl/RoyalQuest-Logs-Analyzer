import mongoose, { Schema, mongo } from 'mongoose';

const itemSchema = new mongoose.Schema({
  _id: String,
  name: { type: String, required: true, unique: true },
  type: String,
  rarity: String,
  rarityColor: String,
  marketPrice: Number,
  NPCPrice: Number,
  amount: { type: Number, default: undefined },
  slots: { type: Number, default: undefined },
});

const userSchema = new mongoose.Schema({
  _id: String,
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const createMongooseModel = (collectionName: string, itemSchema: Schema) => {
  const newCollection = mongoose.model(collectionName, itemSchema);
  return newCollection;
};

export { createMongooseModel, itemSchema, userSchema };
