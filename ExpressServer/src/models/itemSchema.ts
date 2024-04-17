import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  _id: String,
  name: { type: String, required: true, unique: true },
  type: String,
  rarity: String,
  rarityColor: String,
  marketPrice: Number,
  NPCPrice: Number,
});

const Item = mongoose.model('Items', itemSchema);

export { Item };
