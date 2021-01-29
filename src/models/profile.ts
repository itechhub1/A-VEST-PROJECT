import Mongoose, { Model, Document } from "mongoose";

interface userAtrr {
  _id: Mongoose.Schema.Types.ObjectId;
  relationship: string;
  phonenumber: string;
  dob: string;
  nationality: string;
}

interface userDoc extends Document {
  _id: Mongoose.Schema.Types.ObjectId;
  relationship: string;
  phonenumber: string;
  dob: string;
  nationality: string;
  isPasswordCorrect(input: string): Promise<Boolean>;
}

interface userModel extends Model<userDoc> {
  build(attr: userDoc): userDoc;
}

const userSchma = new Mongoose.Schema(
  {
    _id: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

userSchma.statics.build = (attr: userAtrr) => {
  return new profile(attr);
};

const profile = Mongoose.model<userDoc, userModel>("profile", userSchma);
export { profile };
