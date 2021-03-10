import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { connect } from "react-redux";
import { TwoFactorAuth } from "../../../../action/administrator/auth/2FA";

const TwoFactor = ({ TwoFactorAuth }) => {
  const [otp, setotp] = useState('');
  const [loading, setloading] = useState(false);

  const handleChange = (otp) => {
    setotp(otp);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    TwoFactorAuth({ token: otp }, () => setloading(false));
  };
  return (
    <div className=" flex flex-col justify-center items-center w-full bg-gray-200 h-screen">
      <div className="flex flex-col justify-center items-center">
        <img
          src={require("../../../../assets/logo.jpeg").default}
          alt="aimart logo"
          srcset=""
          className=" w-62 h-62 object-fit rounded-full mb-4"
        />
        <h1 className="mb-4 text-black text-lg md:text-2xl font-semibold">
          Input OTP
        </h1>
        <OtpInput
          isInputSecure={false}
          containerStyle="border border-dotted border-blue-800"
          inputStyle={{ width: "75px", height: "75px", borderStyle: "solid" }}
          value={otp}
          onChange={handleChange}
          numInputs={6}
          separator={<span>-</span>}
          hasErrored={true}
          isInputNum={true}
        />

        <button
          disabled={loading}
          className="bg-blue-800 text-white p-2 px-8 mt-4 rounded-md"
          onClick={onSubmit}
        >
          {loading ? "loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default connect(null, { TwoFactorAuth })(TwoFactor);
