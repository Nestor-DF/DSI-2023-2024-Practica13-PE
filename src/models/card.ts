import { Document, Schema, model } from 'mongoose';
import { Color, Type, Rarity } from '../MagiCard.js';

interface MagicCardDocument extends Document {
  id: number;
  name: string;
  manaCost: number;
  color: Color;
  type: Type;
  rarity: Rarity;
  rulesText: string;
  marketValue: number;
  powerAndToughness?: [number, number];
  loyaltyMarks?: number;
}

const MagicCardSchema = new Schema<MagicCardDocument>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  manaCost: { type: Number, required: true },
  color: { type: String, enum: Object.values(Color), required: true },
  type: { type: String, enum: Object.values(Type), required: true },
  rarity: { type: String, enum: Object.values(Rarity), required: true },
  rulesText: { type: String, required: true, trim: true },
  marketValue: { type: Number, required: true },
  powerAndToughness: { type: [Number], required: false },
  loyaltyMarks: { type: Number, required: false },
});

export const MagicCardModel = model<MagicCardDocument>('cards', MagicCardSchema);
