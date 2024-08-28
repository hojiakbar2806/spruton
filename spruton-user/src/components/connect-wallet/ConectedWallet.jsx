import React, { useEffect, useState } from "react";
import "./connect-wallet.scss";
import { AvatarBox } from "../AvatarBox";
import assets from "../../assets";
import { Card } from "primereact/card";
import { Select } from "../Select";
import { useSelector } from "react-redux";

export const ConectedWallet = () => {
  const [selectWeek, setSelectWeek] = useState(false);
  const [selectedOption, setSelectedOption] = useState("DAY");

  const showModal = useSelector((state) => state.open.connectedBox);

  const handleShowSelect = () => {
    setSelectWeek(!selectWeek);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Select
        selectWeek={selectWeek}
        handleShowSelect={handleShowSelect}
        onSelect={handleSelectOption}
      />
      <div className={`overlay ${showModal ? "show" : ""}`}></div>
      <div className={`conected-wallet modal ${showModal ? "show" : ""}`}>
        <AvatarBox />{" "}
        <div className="price-box">
          <span>
            USDT: <span className="price">27,392.00</span>
          </span>
          <span>
            LOOT: <span className="price">64,432.00</span>
          </span>
        </div>
        <div className="your-shops">
          <span className="your-shops__title">Your stores</span>
          <button
            className="select-date"
            style={{ cursor: "pointer" }}
            onClick={handleShowSelect}
          >
            <span>{selectedOption}</span>
            <img src={assets.uppDownArrow} alt="" />
          </button>
        </div>
        <div className="cards">
          <Card>
            <div className="box">
              <div className="gift-img__box">
                <img src={assets.giftIcon} alt="" />
              </div>
              <p className="text">
                Box <span className="box-id">#id2343</span>
              </p>
            </div>
            <div className="price-list">
              <div>
                <span>USDT:</span>
                <p className="price">$27,392.00</p>
              </div>
              <div>
                <span>LOOT: </span>
                <p className="price">64</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="box">
              <div className="gift-img__box">
                <img src={assets.giftIcon} alt="" />
              </div>
              <p className="text">
                Box <span className="box-id">#id2343</span>
              </p>
            </div>
            <div className="price-list">
              <div>
                <span>USDT:</span>
                <p className="price">$27,392.00</p>
              </div>
              <div>
                <span>LOOT: </span>
                <p className="price">64</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="box">
              <div className="gift-img__box">
                <img src={assets.giftIcon} alt="" />
              </div>
              <p className="text">
                Box <span className="box-id">#id2343</span>
              </p>
            </div>
            <div className="price-list">
              <div>
                <span>USDT:</span>
                <p className="price">$27,392.00</p>
              </div>
              <div>
                <span>LOOT: </span>
                <p className="price">64</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="box">
              <div className="gift-img__box">
                <img src={assets.giftIcon} alt="" />
              </div>
              <p className="text">
                Box <span className="box-id">#id2343</span>
              </p>
            </div>
            <div className="price-list">
              <div>
                <span>USDT:</span>
                <p className="price">$27,392.00</p>
              </div>
              <div>
                <span>LOOT: </span>
                <p className="price">64</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="box">
              <div className="gift-img__box">
                <img src={assets.giftIcon} alt="" />
              </div>
              <p className="text">
                Box <span className="box-id">#id2343</span>
              </p>
            </div>
            <div className="price-list">
              <div>
                <span>USDT:</span>
                <p className="price">$27,392.00</p>
              </div>
              <div>
                <span>LOOT: </span>
                <p className="price">64</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
