import Mongoose, { Model, Document } from "mongoose";
import { promisify } from "util";
import bcrypt from "bcrypt";
import { Role } from "../util";

let _bcrypt = bcrypt;

_bcrypt.genSalt = promisify(_bcrypt.genSalt);

interface userAtrr {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  emailVerified?:boolean
}

interface userDoc extends Document {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role:Role
  emailVerified:boolean
  isPasswordCorrect(input: string): Promise<Boolean>;
}

interface userModel extends Model<userDoc> {
  build(attr: userDoc): userDoc;
}

const userSchma = new Mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
    emailVerified:{
      type:Boolean,
      default:false
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps:{createdAt:true,updatedAt:false}
    
  }
);

userSchma.pre("save", async function (done) {
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

userSchma.methods.isPasswordCorrect = async function (inputPassword: string) {
  const password = this.get("password");
  const passwordMatch = await _bcrypt.compare(inputPassword, password);

  return passwordMatch;
};

userSchma.statics.build = (attr: userAtrr) => {
  return new user(attr);
};

const user = Mongoose.model<userDoc, userModel>("user", userSchma);
export { user };
