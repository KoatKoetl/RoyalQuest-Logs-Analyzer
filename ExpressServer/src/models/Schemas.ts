import mongoose, { Schema } from 'mongoose';

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
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

const refreshTokenSchema = new mongoose.Schema({
  refreshToken: String,
});

const createMongooseModel = (collectionName: string, itemSchema: Schema) => {
  const newCollection = mongoose.model(collectionName, itemSchema);
  return newCollection;
};

const refreshTokenModel = createMongooseModel('tokens', refreshTokenSchema);
const userModel = createMongooseModel('users', userSchema);

export { createMongooseModel, itemSchema, refreshTokenModel, userModel };
