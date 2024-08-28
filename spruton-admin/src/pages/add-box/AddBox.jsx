import React, { useState } from "react";
import { AvatarBox } from "../../components/AvatarBox";
import "./add-box.scss";
import assets from "../../assets";
import { Select } from "../../components/Select";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { CreateBox } from "./CreateBox";
import { Footer } from "../../components";
import { useBoxQuery } from "../../context/service/box.service";
import { useDispatch } from "react-redux";
import { openAddBox } from "../../context/slice/addBoxSlice";
import { useNavigate } from "react-router-dom";

export const AddBox = () => {
  const [selectWeek, setSelectWeek] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [query, setQuery] = useState(`last=${selectedOption.toLowerCase()}`);
  const { data } = useBoxQuery(query);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowSelect = () => {
    setSelectWeek(!selectWeek);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setQuery(`last=${option.toLowerCase()}`);
  };
  return (
    <>
      <CreateBox />
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
          {data?.innerData.map((item) => {
            const priceSymbol = (() => {
              switch (item.drop_type) {
                case "usd":
                  return "$";
                case "eur":
                  return "€";
                case "gbp":
                  return "£";
                case "rub":
                  return "₽";
                default:
                  return "";
              }
            })();

            return (
              <Card
                key={item.id}
                onClick={() => navigate(`/${item.id}`)}
                style={{
                  cursor: "pointer",
                }} // style={`${
                //   item.status !== "active"
                //     ? { cursor: "not-allowed" }
                //     : { cursor: "pointer" }
                // }`}
                className={`card ${item.status !== "active" ? "disabled" : ""}`}
              >
                <div className="left-box">
                  <div className="status"></div>
                  <div className="img-box">
                    <img src={item?.logo} width="100%" height="100%" />
                  </div>
                  <div>
                    <span className="box-number">{item.name}</span>
                    <span className="box-item">{item.total_boxes} items</span>
                    <span className="box-price">
                      {priceSymbol + item.drop_per_box}
                    </span>
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
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Card>
            );
          })}
        </div>
        <Button
          className="go-btn add-box__btn"
          label="Add box"
          severity="help"
          onClick={() => dispatch(openAddBox())}
        />
      </div>
      <Footer hideMarket={false} />
    </>
  );
};
