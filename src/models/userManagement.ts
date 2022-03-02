import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  id: string;
  _id: string;
  fullname?: string;
  email?: string;
  address: string;
  password?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
 
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const User = mongoose.model('user', userSchema);
export default User;