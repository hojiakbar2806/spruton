import { useState } from "react";
import assets from "../../assets";
import {
  TakeGift,
  ConnectWallet,
  ConectedWallet,
  Footer,
  EmptBox,
} from "../../components";
import "./loot-box.scss";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openConnectBox,
  openConnectedBox,
  openGiftBox,
} from "../../context/slice/openSlice";
import { Avatar } from "primereact/avatar";

export const LootBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openGift = () => {
    dispatch(openGiftBox());
  };

  return (
    <>
      <div className="loot-box container">
        <div>
          <div>
            <span className="content-text">Remained</span>
            <span className="content-text">1 912 000 / 2 000 000</span>
          </div>
          <div className="gift-box" onClick={openGift}>
            <img className="gift-box__img" src={assets.giftBox} alt="" />
          </div>
          <span className="content-text">
            To open the lootbox you need <br /> to fulfil a task
          </span>
        </div>
        <Button
          className="go-btn"
          label="Go"
          severity="help"
          onClick={() => navigate("/tasks-section")}
        />
      </div>
      <TakeGift />
      <ConnectWallet />
      <ConectedWallet />
      <EmptBox />
      <Footer />
    </>
  );
};
