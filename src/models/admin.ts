import mongoose, { Model, Document } from "mongoose";
import _bcrypt from "bcrypt";
import { Role } from "../util";

interface adminAtrr {
  email: string;
  username: string;
  password: string;
  secret?: string;
  twoFactor?: boolean;
  role?: Role;
}

interface adminDocument extends Document {
  email: string;
  username: string;
  password: string;
  twoFactor: boolean;
  secret: string;
  role?: Role;
  isPasswordCorrect(input: string): Promise<Boolean>;
}

interface adminModel extends Model<adminDocument> {
  build(attr: adminAtrr): adminDocument;
}

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    twoFactor: {
      type: Boolean,
      default: false,
      required: true,
    },
    secret: {
      type: String,
      default: undefined,
    },
    role: {
      type: String,
      default: Role.ADMIN,
      enum: Object.values(Role),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        //delete ret.password;
        delete ret.__v;
      },
    },
  }
);

adminSchema.methods.isPasswordCorrect = async function (inputPassword: string) {
  const password = this.get("password");
  const passwordMatch = await _bcrypt.compare(inputPassword, password);

  return passwordMatch;
};

adminSchema.pre("save", async function (done) {
  //check if password is modifies before hashing
  if (this.isModified("password")) {
    try {
      const hashing = await _bcrypt.genSalt(12);
      const hashedPassword = await _bcrypt.hash(this.get("password"), hashing);
      this.set("password", hashedPassword);

      done();
    } catch (error) {
      console.log(error.message);
    }
  }
});

adminSchema.statics.build = (attr: adminAtrr) => {
  return new adminUser(attr);
};

const adminUser = mongoose.model<adminDocument, adminModel>(
  "adminUser",
  adminSchema
);

export { adminUser as administrator };
