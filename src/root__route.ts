import { Express } from "express";

import { AccountLogin } from "./routes/auth/login";
import { AccountLogout } from "./routes/auth/logout";
import { AccountCreation } from "./routes/auth/register";
import { UserUpdateCredentials } from "./routes/auth/updatePassword";

import { NewInvestment } from "./routes/investments/new";
import { viewMyInvestment } from "./routes/investments/view";
import { AllInvestment } from "./routes/investments/index";
import { OptOutInvestement } from "./routes/investments/delete";
import { AccountcurrentUser } from "./routes/auth/currentuser";

import { EmailVerification } from "./routes/auth/emailverification";
import { AdministratorLogin } from "./routes/administrator/auth/login";
import {AdmincurrentUser} from './routes/administrator/auth/currentUser'
import { AdminUpdateCredentials } from "./routes/administrator/auth/updateCredentials";
import { twoFactorVerify } from "./routes/administrator/auth/verify2FA";
import { AllAimartInvestment } from "./routes/administrator/investments/index";
import { ViewInvestment } from "./routes/administrator/investments/view";
import { ExtentendInvestment } from "./routes/administrator/investments/update";
import { GetAllUserCount } from "./routes/administrator/investments/getUserCount";
import { BankTransferUpdate } from "./routes/administrator/investments/bankTranferUpdate";
import {ViewInvestorProfile} from './routes/administrator/investments/viewInvestorProfile'


import { GetAllInvestment } from "./routes/administrator/investments/count/getInvestmentCount";
import { GetAllPaidInvestmentCount } from "./routes/administrator/investments/count/getPaidInvestmentCount";
import { GetAllExpiredInvestmentCount } from "./routes/administrator/investments/count/getExpiredInvCount";
import { GetAllTerminatedInvestmentCount } from "./routes/administrator/investments/count/getTerminatedInvestmentCount";

import { GetAllTerminatedInvestment } from "./routes/administrator/investments/getTerminatedInvestment";
import { GetAllRegisteredUsers } from "./routes/administrator/investments/getUser";
import { GetAllPaidInvestment } from "./routes/administrator/investments/getPaidInvestment";
import { ResolveInvestment } from "./routes/administrator/investments/resolveInvestor";



/* pAYSTACK */
import { AcknowlegdePayment } from "./routes/paystack/new";

import { ViewUserProfile } from "./routes/profile/view";
import { AddProfile } from "./routes/profile/new";
import { fileUploadROuter } from "./routes/profile/uploads";
import { GetAllExpiredInvestment } from "./routes/administrator/investments/getExpiredInvestment";

const rootRoute = (app: Express) => {
  /* investors auth */
  app.use(AccountCreation);
  app.use(AccountLogin);
  app.use(EmailVerification);
  app.use(AccountcurrentUser);
  app.use(AccountLogout);
  app.use(UserUpdateCredentials);

  /* investor profile */
  app.use(ViewUserProfile);
  app.use(fileUploadROuter);
  app.use(AddProfile);

  /* investors investment */
  app.use(NewInvestment);
  app.use(viewMyInvestment);
  app.use(AllInvestment);
  app.use(OptOutInvestement);

  /* admin seessin */
  app.use(AdministratorLogin);
  app.use(AdminUpdateCredentials);
  app.use(twoFactorVerify);
  app.use(AdmincurrentUser)

  app.use(AllAimartInvestment);
  app.use(ViewInvestment);
  app.use(ExtentendInvestment);
  app.use(GetAllUserCount);
  app.use(BankTransferUpdate);
  app.use(GetAllInvestment);
  app.use(GetAllPaidInvestment);
  app.use(GetAllPaidInvestmentCount);
  app.use(GetAllTerminatedInvestment);
  app.use(GetAllRegisteredUsers);

  app.use(GetAllExpiredInvestment)
  app.use(GetAllExpiredInvestmentCount)
  app.use(GetAllExpiredInvestment)
  app.use(GetAllPaidInvestment)
  app.use(GetAllPaidInvestment)
  app.use(GetAllTerminatedInvestment)
  app.use(GetAllTerminatedInvestmentCount)
  app.use(ViewInvestorProfile)
  app.use(ResolveInvestment)

  /* PAYSTACK */
  app.use(AcknowlegdePayment);
};

export { rootRoute };
