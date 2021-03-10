import NodeCron from "node-cron";
import moment from "moment";
import { investment as Investemnt } from "./models/Investments";
import { InvesmentStatus } from "./util";

moment().format("MM/DD/YYYY");

/* running every min  and make update*/
NodeCron.schedule("* * * * *", async () => {
  console.log("Am runing every min");
  let investment = await Investemnt.find({ payment: true });

  if (investment.length === 0) return;
  investment.map(async (invest) => {
    /* creating moment time */
    let investmentExpire = moment(new Date(invest.expireTime));
    if (investmentExpire.diff(new Date())) {
      /* alert  the investor by email for information for extending or termination */
    }
    
    if (
      investmentExpire.diff(new Date(), "days") === 0 &&
      !invest.investementExpired
    ) {
      invest.set({
        status: InvesmentStatus.EXPIRED,
        investementExpired: true,
      });

      await invest.save();
      console.log("one investment expired.");
    }
  });
});

/* running every month end */
NodeCron.schedule("0 0 28 * * ", async () => {
  //console.log("am running every month end");
  let investement = await Investemnt.find();
  if (!investement) return;

  investement.map(async (invest) => {
    /* checking if investment is as been terminated */
    if (!invest.termination && !invest.expireTime) {
      /* make updats on how many days left for termnation */
      const dates = moment(invest.expireTime, "DD-MM-YYYY");
      const monthsLeft = dates.diff(moment(), "months");
      /* updating investor */
      let singleInvestemnt = await Investemnt.findById(invest.id);
      singleInvestemnt?.set({
        monthsLeft,
      });

      await singleInvestemnt?.save();
    }
  });
});
