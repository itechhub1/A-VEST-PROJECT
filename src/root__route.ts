import {Express} from 'express'
import {AccountLogin} from './routes/auth/login'
import {AccountCreation} from './routes/auth/register'
import {NewInvestment} from './routes/investments/new'
import {EmailVerification} from './routes/auth/emailverification'
import {AdministratorLogin} from './routes/administrator/auth/login'
import {AdminUpdateCredentials} from './routes/administrator/auth/updateCredentials'
import {twoFactorVerify} from './routes/administrator/auth/verify2FA'
import {AllAimartInvestment} from './routes/administrator/investments/index'
import {ViewInvestment} from './routes/administrator/investments/view'
import {ExtentendInvestment} from './routes/administrator/investments/update'


const rootRoute = (app:Express)=>{
    app.use(AccountCreation)
    app.use(AccountLogin)
    app.use(NewInvestment)
    app.use(EmailVerification)
   

    /* admin seessin */
    app.use(AdministratorLogin)
    app.use(AdminUpdateCredentials)
    app.use(twoFactorVerify)


    app.use(AllAimartInvestment)
    app.use(ViewInvestment)
    app.use(ExtentendInvestment)
}

export {rootRoute}