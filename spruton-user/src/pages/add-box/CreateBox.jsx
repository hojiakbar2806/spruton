import React, { useRef, useState } from "react";
import assets from "../../assets";
import { TabMenu } from "primereact/tabmenu";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { Footer } from "../../components";
import { ShareBox } from "./ShareBox";

export const CreateBox = ({ showModal, handleShowAddedBox }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dates, setDates] = useState(null);
  const toast = useRef(null);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [selectPrice, setSelectPrice] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shareBox, setShareBox] = useState(false);

  const handleShareBox = () => {
    setShareBox(!shareBox);
    handleShowAddedBox();
  };

  const items = [{ label: "Settings" }, { label: "Analytics" }];

  const onTabChange = (e) => {
    setActiveIndex(e.index);
  };

  const prices = [
    { name: "USD", code: "USD" },
    { name: "UZS", code: "UZS" },
    { name: "RUBL", code: "RUBL" },
  ];

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const onUpload = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  return (
    <>
      <ShareBox showModal={shareBox} setShareBox={setShareBox} />
      <div className={`overlay ${showModal ? "show" : ""}`}></div>
      <div className={`create-box modal ${showModal ? "show" : ""}`}>
        <div className="content">
          <div className="top-box">
            <div className="img-box">
              <img src={assets.giftIcon} alt="" />
            </div>
            <div>
              <span className="box-number">Box #123</span>
              <span className="box-link">@ToySellerBot</span>
            </div>
          </div>
          <TabMenu
            model={items}
            activeIndex={activeIndex}
            onTabChange={onTabChange}
          />
        </div>
        <div className={`tab-content ${activeIndex === 0 ? "show" : ""}`}>
          <div className="scroll-box">
            <div className="box">
              <span className="label">Status</span>
              <Dropdown
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.value)}
                options={options}
                placeholder="Active"
                className="form-control"
              />
            </div>
            <div className="date-picker-box">
              <span className="data-label">Period</span>
              <Calendar
                value={dates}
                onChange={(e) => setDates(e.value)}
                selectionMode="range"
                readOnlyInput
                dateFormat="dd-mm-yy"
                placeholder="10-16 June 2024"
                showIcon
                className="form-control"
              />
              <i className="pi pi-chevron-right"></i>
            </div>
            <div className="box">
              <span className="label">Box logo</span>
              <Toast ref={toast}></Toast>
              <FileUpload
                mode="basic"
                name="demo[]"
                url="/api/upload"
                accept="image/*"
                maxFileSize={1000000}
                onUpload={onUpload}
                className="file-upload"
              />
            </div>
            <div className="box">
              <span className="label">Name Box</span>
              <InputText
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="box">
              <span className="label">Rank to view</span>
              <InputNumber
                value={value2}
                onValueChange={(e) => setValue2(e.value)}
                className="form-control"
              />
            </div>
            <div className="box">
              <span className="label">You quest</span>
              <div className="cards-box">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card
                    key={index}
                    className={`card ${index >= 4 ? "disabled" : ""}`}
                    onClick={handleShareBox}
                  >
                    <div className="left-box">
                      <Badge severity="success"></Badge>
                      <div>
                        <span className="box-number">Share box</span>
                        <span className="box-item">
                          Description text in to your quest
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
                ))}
              </div>
            </div>
            <div className="box">
              <span className="label"></span>
              <Dropdown
                value={selectPrice}
                onChange={(e) => setSelectPrice(e.value)}
                options={prices}
                optionLabel="name"
                placeholder="USD"
                className="form-control"
              />
            </div>
            <div className="flex-box">
              <div className="box">
                <span className="label">Total drop</span>
                <InputNumber
                  value={value1}
                  onValueChange={(e) => setValue1(e.value)}
                  className="form-control"
                />
              </div>
              <div className="box">
                <span className="label">Total drop</span>
                <InputNumber
                  value={value3}
                  onValueChange={(e) => setValue3(e.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-control more-btn">
              <span>Add more drop</span>
            </div>
            <div className="box">
              <span className="label">Total drop</span>
              <InputNumber
                value={value4}
                onValueChange={(e) => setValue4(e.value)}
                placeholder="4,832,372"
                className="form-control"
              />
            </div>
            <Button
              className="go-btn"
              label="Save"
              severity="help"
              onClick={handleShowAddedBox}
            />
          </div>
        </div>
        <div className={`tab-content ${activeIndex === 1 ? "show" : ""}`}>
          <div className="scroll-box pb">
            <div className="box">
              <span className="label">You Balance</span>
              <Card>
                <div className="price-list">
                  <div>
                    <span>USDT:</span>
                    <p className="price">$27,392.00</p>
                  </div>
                  <div>
                    <span>SPR:</span>
                    <p className="price">7,392.00</p>
                  </div>
                  <div>
                    <span>Coin:</span>
                    <p className="price">64.00</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="box">
              <span className="label">User list</span>
              <div className="cards">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card>
                    <div className="box">
                      <div>
                        <span className="user-name">@appsdesigner</span>
                        <span className="box-name">XKJ76...CQ83s</span>
                      </div>
                      <div>
                        <span className="box-name">BOX</span>
                        <span className="user-name">32</span>
                      </div>
                    </div>
                    <div className="price-list">
                      <div>
                        <span>USDT:</span>
                        <p className="price">$27,392.00</p>
                      </div>
                      <div>
                        <span>SPR:</span>
                        <p className="price">7,392.00</p>
                      </div>
                      <div>
                        <span>Coin:</span>
                        <p className="price">64.00</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <Button
            className="go-btn fixed-btn"
            label="Export xml "
            severity="help"
            onClick={handleShowAddedBox}
          />
        </div>
      </div>
    </>
  );
};
