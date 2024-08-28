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
import { useDispatch } from "react-redux";
import { loot, openLoadBox } from "../../context/slice/openSlice";
import { useOpenBoxMutation } from "../../context/service/user.service";

export const LootBox = () => {
  const [openBox] = useOpenBoxMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openGift = async () => {
    dispatch(openLoadBox());
    const res = await openBox();
    dispatch(loot(res.data.innerData.drop || null));
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
