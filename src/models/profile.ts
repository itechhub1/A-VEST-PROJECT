import Mongoose, { Model, Document } from "mongoose";

interface userAtrr {
  _id: string;
  relationship: string;
  phonenumber: string;
  dob: string;
  nationality: string;
}

interface userDoc extends Document {
  _id: string;
  relationship: string;
  phonenumber: string;
  dob: string;
  nationality: string;
}

interface userModel extends Model<userDoc> {
  build(attr: userAtrr): userDoc;
}

const profileSchma = new Mongoose.Schema(
  {
    _id: {
      type: String,
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
    relationship: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

profileSchma.statics.build = (attr: userAtrr) => {
  return new profile(attr);
};

const profile = Mongoose.model<userDoc, userModel>("profile", profileSchma);
export { profile };
