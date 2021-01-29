import React, { useState } from "react";
import Plans from "./plans";
import PlanDetails from "./planDetails";
import PersonalInfomation from "./personalInformation";
import EmployerDetails from "./employerDetails";
import NextOfKin from "./nextOfKinDetails";
import PaymentInfo from "./paymentInfo";

const Index = () => {
  const [changeLayout, setchangeLayout] = useState(1);
  const prevPage = () => {
    return setchangeLayout(changeLayout - 1);
  };

  const nextPage = () => {
    return setchangeLayout(changeLayout + 1);
  };
  switch (changeLayout) {
    case 1:
      return <Plans nextPage={nextPage} />;

    case 2:
      return <PlanDetails nextPage={nextPage} prevPage={prevPage} />;

    case 3:
      return <PersonalInfomation nextPage={nextPage} prevPage={prevPage} />;

    case 4:
      return <EmployerDetails nextPage={nextPage} prevPage={prevPage} />;

    case 5:
      return <NextOfKin nextPage={nextPage} prevPage={prevPage} />;
    case 6:
      return <PaymentInfo nextPage={nextPage} prevPage={prevPage} />  

    default:
      break;
  }
};

export default Index;
