import React from "react";
import "./connect-wallet.scss";
import { Avatar } from "primereact/avatar";
import assets from "../../assets";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { closeBox, openConnectedBox } from "../../context/slice/openSlice";

export const ConnectWallet = () => {
  const showModal = useSelector((state) => state.open.connectBox);
  const dispatch = useDispatch();
  return (
    <>
      <div className={`overlay ${showModal ? "show" : ""}`}></div>
      <div className={`connect-wallet modal ${showModal ? "show" : ""}`}>
        <div
          className="connect-wallet__header"
          onClick={() => dispatch(openConnectedBox())}
        >
          <Avatar image={assets.avatar} size="large" shape="circle" />

          <button className="connect-wallet__btn" style={{ cursor: "pointer" }}>
            <img src={assets.wallet} alt="wallet" />
            {/* <span>Connect Wallet</span> */}
          </button>
        </div>
        <div className="connect-wallet__content">
          <div className="priz-box">
            <img src={assets.priz} alt="" />
          </div>
          <h3>You unlocked</h3>
          <h1>25</h1>
          <span className="text">Jettons</span>
        </div>
        <Button
          className="go-btn"
          label="Claim"
          severity="help"
          onClick={() => dispatch(closeBox())}
        />
      </div>
    </>
  );
};
