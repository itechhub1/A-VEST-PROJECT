import { administrator } from "./models/admin";
import { Role } from "./util";

const AdminRegister = {
  username: "admin",
  password: "admin1234",
  email: "tohshine@gmail.com",
  role: Role.ADMIN,
};

export default async () => {
  //checking if db is seeded already
  const admin = await administrator.findOne({ role: Role.ADMIN });

  if (admin) return;
  //do the seeding here

  const adminReg = administrator.build({
    ...AdminRegister,
  });

  await adminReg.save();
};
