import NodeCron from "node-cron";
import moment from "moment";
import { investment as Investemnt } from "./models/Investments";
import { InvesmentStatus } from "./util";

moment().format("DD-MM-YYYY");

/* running every min  and make update*/
NodeCron.schedule("* * * * *", async () => {
  console.log("Am runing every min");
  let investment = await Investemnt.find();
  if (!investment) return;
  investment.map(async (invest) => {
    /* creating moment time */
    const investmentExpire = moment(invest.expireTime, "DD-MM-YYYY");
    if (investmentExpire.diff(moment(), "days") === 30) {
      /* alert  the investor by email for information for extending or termination */
    }

    if (investmentExpire.diff(moment(), "days") === 0 && invest.payment) {
      /* terminate investement for that particular investor and email the investor */
      invest.set({
        status: InvesmentStatus.EXPIRED,
      });

      await invest.save();
    }
  });
});

/* running every month end */
NodeCron.schedule("0 0 28 * * ", async () => {
  console.log("am running every month end");
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
