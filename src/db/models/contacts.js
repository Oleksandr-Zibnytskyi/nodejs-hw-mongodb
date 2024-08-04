import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, unique: true },
    isFavourite: { type: Boolean, default: false },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactSchema);
