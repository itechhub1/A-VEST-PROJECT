import mongoose, { Model, Document } from "mongoose";
import { InvesmentStatus, Role } from "../util";
import { Moment } from "moment";

interface investmentAtrr {
  fullname: string;
  email: string;
  phonenumber: string;

  plan: string;
  monthsLeft?: string;
  percentage: string;
  amount: number;
  roi: number;
  employerCompany: string;
  occupationDesc: string;
  nextOfKin: string;
  addressOfKin: string;
  relationshipOfKin: string;
  phonenumberOfKin: string;
  agreement: boolean;
  paymentPlan: string;
  status?: InvesmentStatus;
  payment?: boolean;
  paymentRef?: string;
  termination?: boolean;
  investementExpired?: boolean;
  expireTime: string;
  userId?: string;
}

interface investmentDoc extends Document {
  fullname: string;
  email: string;
  phonenumber: string;

  plan: string;
  monthsLeft?: string;
  percentage: string;
  amount: number;
  roi: number;
  employerCompany: string;
  occupationDesc: string;
  nextOfKin: string;
  addressOfKin: string;
  relationshipOfKin: string;
  phonenumberOfKin: string;
  agreement: boolean;
  paymentPlan: string;
  status?: InvesmentStatus;
  payment?: boolean;
  paymentRef?: string;
  termination?: boolean;
  investementExpired?: boolean;
  expireTime: string;
  userId: string;
}

interface investmentModel extends Model<investmentDoc> {
  build(attr: investmentAtrr): investmentDoc;
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

    plan: {
      type: String,
      required: true,
    },

    percentage: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    roi: {
      type: Number,
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
    nextOfKin: {
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
    termination: {
      type: Boolean,
      default: false,
    },
    investementExpired: {
      type: Boolean,
      default: false,
    },
    expireTime: {
      type: String,
    },
    agreement: {
      type: Boolean,
      required: true,
    },
    monthsLeft: {
      type: String,
    },
    userId: {
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
