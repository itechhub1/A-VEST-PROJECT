import { Express } from "express";

import { AccountLogin } from "./routes/auth/login";
import { AccountCreation } from "./routes/auth/register";
import { NewInvestment } from "./routes/investments/new";
import { viewMyInvestment } from "./routes/investments/view";
import { AllInvestment } from "./routes/investments/index";
import { OptOutInvestement } from "./routes/investments/delete";
import {AccountcurrentUser} from './routes/auth/currentuser'


import { EmailVerification } from "./routes/auth/emailverification";
import { AdministratorLogin } from "./routes/administrator/auth/login";
import { AdminUpdateCredentials } from "./routes/administrator/auth/updateCredentials";
import { twoFactorVerify } from "./routes/administrator/auth/verify2FA";
import { AllAimartInvestment } from "./routes/administrator/investments/index";
import { ViewInvestment } from "./routes/administrator/investments/view";
import { ExtentendInvestment } from "./routes/administrator/investments/update";
import {GetAllUserCount} from './routes/administrator/investments/getUserCount'
import {BankTransferUpdate} from './routes/administrator/investments/bankTranferUpdate'
import {GetAllInvestment} from './routes/administrator/investments/getInvestmentCount'
import {GetAllPaidInvestmentCount} from './routes/administrator/investments/getPaidInvestmentCount'
import { GetAllTerminatedInvestment} from './routes/administrator/investments/getTerminatedInvestment'
import {GetAllRegisteredUsers} from './routes/administrator/investments/getUser'
import {GetAllPaidInvestment} from './routes/administrator/investments/getPaidInvestment'





const rootRoute = (app: Express) => {
  /* investors auth */
  app.use(AccountCreation);
  app.use(AccountLogin);
  app.use(EmailVerification);
  app.use(AccountcurrentUser)

  /* investors investment */
  app.use(NewInvestment);
  app.use(viewMyInvestment);
  app.use(AllInvestment);
  app.use(OptOutInvestement);

  /* admin seessin */
  app.use(AdministratorLogin);
  app.use(AdminUpdateCredentials);
  app.use(twoFactorVerify);

  app.use(AllAimartInvestment);
  app.use(ViewInvestment);
  app.use(ExtentendInvestment);
  app.use(GetAllUserCount);
  app.use(BankTransferUpdate);
  app.use(GetAllInvestment);
  app.use(GetAllPaidInvestment);
  app.use(GetAllPaidInvestmentCount);
  app.use(GetAllTerminatedInvestment);
  app.use(GetAllRegisteredUsers)

};

export { rootRoute };
