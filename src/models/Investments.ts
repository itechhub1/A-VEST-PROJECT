import mongoose, { Model, Document } from "mongoose";
import { InvesmentStatus, Role } from "../util";

interface investmentAtrr {
  fullname: string;
  email: string;
  phonenumber: string;
  identity: string;
  plan: string;
  duration: string;
  percentage: string;
  amount: string;
  roi: string;
  employerCompany: string;
  occupationDesc: string;
  nameOfKin: string;
  addressOfKin: string;
  relationshipOfKin: string;
  phonenumberOfKin: string;
  agreement: boolean;
  paymentPlan: string;
  status?: boolean;
  payment?: boolean;
  paymentRef?: string;
}

interface investmentDoc extends Document {
  fullname: string;
  email: string;
  phonenumber: string;
  identity: string;
  plan: string;
  duration: string;
  percentage: string;
  amount: string;
  roi: string;
  employerCompany: string;
  occupationDesc: string;
  nameOfKin: string;
  addressOfKin: string;
  relationshipOfKin: string;
  phonenumberOfKin: string;
  agreement: boolean;
  paymentPlan: string;
  status?: string;
  payment?: boolean;
  paymentRef?: string;
}

interface investmentModel extends Model<investmentDoc> {
  build(attr: investmentAtrr): investmentAtrr;
}

const invesmentSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    identity: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    percentage: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    roi: {
      type: String,
      required: true,
    },
    employerCompany: {
      type: String,
      required: true,
    },
    occupationDesc: {
      type: String,
      required: true,
    },
    nameOfKin: {
      type: String,
      required: true,
    },
    addressOfKin: {
      type: String,
      required: true,
    },
    relationshipOfKin: {
      type: String,
      required: true,
    },
    phonenumberOfKin: {
      type: String,
      required: true,
    },
    paymentPlan: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.keys(InvesmentStatus),
      default: InvesmentStatus.PENDING,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    paymentRef: {
      type: String,
    },

    agreement: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

invesmentSchema.statics.build = (attr: investmentAtrr) => {
  return new investment(attr);
};

const investment = mongoose.model<investmentDoc, investmentModel>(
  "investment",
  invesmentSchema
);
export { investment };
