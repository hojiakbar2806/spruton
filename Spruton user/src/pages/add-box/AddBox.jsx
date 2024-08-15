import React, { useState } from "react";
import { AvatarBox } from "../../components/AvatarBox";
import "./add-box.scss";
import assets from "../../assets";
import { Select } from "../../components/Select";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { CreateBox } from "./CreateBox";
import { Footer } from "../../components";

export const AddBox = () => {
  const [selectWeek, setSelectWeek] = useState(false);
  const [selectedOption, setSelectedOption] = useState("DAY");
  const [addedBox, setAddedBox] = useState(false);

  const handleShowAddedBox = () => {
    setAddedBox(!addedBox);
  };

  const handleShowSelect = () => {
    setSelectWeek(!selectWeek);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };
  return (
    <>
      <CreateBox showModal={addedBox} handleShowAddedBox={handleShowAddedBox} />
      <Select
        selectWeek={selectWeek}
        handleShowSelect={handleShowSelect}
        onSelect={handleSelectOption}
      />
      <div className="add-box__page">
        <AvatarBox />
        <div className="your-shops">
          <span className="your-shops__title">Your stores</span>
          <button className="select-date" onClick={handleShowSelect}>
            <span>{selectedOption}</span>
            <img src={assets.uppDownArrow} />
          </button>
        </div>
        <div className="cards-box">
          <Card className="card">
            <div className="left-box">
              <div className="status"></div>
              <div className="img-box">
                <img src={assets.giftBox} alt="" width={62} height={47} />
              </div>
              <div>
                <span className="box-number">Box #123</span>
                <span className="box-item">486 items</span>
                <span className="box-price">$1,200</span>
              </div>
            </div>
            <button>
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2L8.75 8.75L2 15.5"
                  stroke="#A9B9D1"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </Card>
          <Card className="card">
            <div className="left-box">
              <div className="status"></div>
              <div className="img-box">
                <img src={assets.giftBox} alt="" width={62} height={47} />
              </div>
              <div>
                <span className="box-number">Box #123</span>
                <span className="box-item">486 items</span>
                <span className="box-price">$1,200</span>
              </div>
            </div>
            <button>
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2L8.75 8.75L2 15.5"
                  stroke="#A9B9D1"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </Card>
          <Card className="card">
            <div className="left-box">
              <div className="status"></div>
              <div className="img-box">
                <img src={assets.giftBox} alt="" width={62} height={47} />
              </div>
              <div>
                <span className="box-number">Box #123</span>
                <span className="box-item">486 items</span>
                <span className="box-price">$1,200</span>
              </div>
            </div>
            <button>
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2L8.75 8.75L2 15.5"
                  stroke="#A9B9D1"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </Card>
          <Card className="card disabled">
            <div className="left-box">
              <div className="status"></div>
              <div className="img-box">
                <img src={assets.giftBox} alt="" width={62} height={47} />
              </div>
              <div>
                <span className="box-number">Box #123</span>
                <span className="box-item">486 items</span>
                <span className="box-price">$1,200</span>
              </div>
            </div>
            <button>
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2L8.75 8.75L2 15.5"
                  stroke="#A9B9D1"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </Card>
          <Card className="card">
            <div className="left-box">
              <div className="status"></div>
              <div className="img-box">
                <img src={assets.giftBox} alt="" width={62} height={47} />
              </div>
              <div>
                <span className="box-number">Box #123</span>
                <span className="box-item">486 items</span>
                <span className="box-price">$1,200</span>
              </div>
            </div>
            <button>
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2L8.75 8.75L2 15.5"
                  stroke="#A9B9D1"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </Card>
          <Card className="card">
            <div className="left-box">
              <div className="status"></div>
              <div className="img-box">
                <img src={assets.giftBox} alt="" width={62} height={47} />
              </div>
              <div>
                <span className="box-number">Box #123</span>
                <span className="box-item">486 items</span>
                <span className="box-price">$1,200</span>
              </div>
            </div>
            <button>
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2L8.75 8.75L2 15.5"
                  stroke="#A9B9D1"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </Card>
          <Card className="card">
            <div className="left-box">
              <div className="status"></div>
              <div className="img-box">
                <img src={assets.giftBox} alt="" width={62} height={47} />
              </div>
              <div>
                <span className="box-number">Box #123</span>
                <span className="box-item">486 items</span>
                <span className="box-price">$1,200</span>
              </div>
            </div>
            <button>
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2L8.75 8.75L2 15.5"
                  stroke="#A9B9D1"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </Card>
          <Card className="card">
            <div className="left-box">
              <div className="status"></div>
              <div className="img-box">
                <img src={assets.giftBox} alt="" width={62} height={47} />
              </div>
              <div>
                <span className="box-number">Box #123</span>
                <span className="box-item">486 items</span>
                <span className="box-price">$1,200</span>
              </div>
            </div>
            <button>
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2L8.75 8.75L2 15.5"
                  stroke="#A9B9D1"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </Card>
          <Card className="card">
            <div className="left-box">
              <div className="status"></div>
              <div className="img-box">
                <img src={assets.giftBox} alt="" width={62} height={47} />
              </div>
              <div>
                <span className="box-number">Box #123</span>
                <span className="box-item">486 items</span>
                <span className="box-price">$1,200</span>
              </div>
            </div>
            <button>
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2L8.75 8.75L2 15.5"
                  stroke="#A9B9D1"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </Card>
        </div>
        <Button
          className="go-btn add-box__btn"
          label="Add box"
          severity="help"
          onClick={handleShowAddedBox}
        />
      </div>
      <Footer hideMarket={false} />
    </>
  );
};
