import React, { useEffect, useRef, useState } from "react";
import assets from "../../assets";
import { TabMenu } from "primereact/tabmenu";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { ShareBox } from "./ShareBox";
import { Toast } from "primereact/toast";
import { useSelector, useDispatch } from "react-redux";
import {
  closeAddBox,
  setSharedQuestId,
} from "../../context/slice/addBoxSlice.js";
import { useCreateBoxMutation } from "../../context/service/box.service.js";
import { useQuestQuery } from "../../context/service/quest.service.js";

export const CreateBox = () => {
  const { data = null } = useQuestQuery();
  const [create] = useCreateBoxMutation();
  const toast = useRef(null);
  const [selectStatus, setSelectStatus] = useState("active");
  const [selectPrice, setSelectPrice] = useState("usd");
  const [dates, setDates] = useState([]);
  const [name, setName] = useState("");
  const [totalDrop, setTotalDrop] = useState();
  const [rankToView, setRankToView] = useState();
  const [dropPerBox, setDropPerBox] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [logo, setLogo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      localStorage.setItem("quests", JSON.stringify(data?.innerData));
    }
  }, [data]);

  const quests = JSON.parse(localStorage.getItem("quests"));

  const handleSubmit = async () => {
    const formData = {
      status: selectStatus,
      name: name,
      start_date: start_date(),
      end_date: end_date(),
      rank_to_view: rankToView,
      drop_type: selectPrice,
      total_drop: totalDrop,
      drop_per_box: dropPerBox,
      total_boxes: totalBoxes(),
      logo: logo,
      quests: localStorage.getItem("quests"),
    };

    const newFormData = new FormData();
    const emptyFields = [];

    Object.entries(formData).forEach(([key, value]) => {
      if (!value && value !== 0 && value !== "" && !(value instanceof Date)) {
        emptyFields.push(key);
      } else {
        newFormData.append(key, value);
      }
    });

    if (emptyFields.length === 0) {
      try {
        const res = await create(newFormData);
        if (res.data.variant === "success") {
          dispatch(closeAddBox());
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Box created successfully",
            life: 3000,
          });
          setDates([]);
          setTotalDrop();
          setRankToView();
          setDropPerBox();
          setLogo(null);
          setName("");
          setSelectStatus("active");
          setSelectPrice("usd");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Something went wrong",
          life: 3000,
        });
      }
    } else {
      console.log(`Empty fields:\n${emptyFields.join(",\n")}`);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill in all required fields",
        life: 3000,
      });
    }
  };

  const showAddBoxModal = useSelector((state) => state.box.openAddBox);

  const items = [{ label: "Settings" }, { label: "Analytics" }];

  const prices = [
    { label: "USD", value: "usd" },
    { label: "UZS", value: "uzs" },
    { label: "RUBL", value: "rubl" },
  ];

  const options = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setLogo(file);

    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setLogo(null);
  };

  const start_date = () =>
    dates.length > 1
      ? new Date(dates[0]).toISOString().split("T")[0]
      : undefined;

  const end_date = () =>
    dates.length > 1
      ? new Date(dates[dates.length - 1]).toISOString().split("T")[0]
      : undefined;

  const totalBoxes = () => {
    return parseFloat(((totalDrop / dropPerBox) * 100).toFixed(2)) || 0;
  };

  return (
    <>
      <ShareBox />
      <Toast ref={toast} />
      <div className={`overlay ${showAddBoxModal ? "show" : ""}`}></div>
      <div className={`create-box modal ${showAddBoxModal ? "show" : ""}`}>
        <div className="content">
          <div className="top-box">
            <div className="img-box">
              <img src={assets.giftIcon} alt="" />
            </div>
            <div>
              <span className="box-number">Box #123</span>
              <span className="box-link">@ToySellerBot</span>
            </div>
            <button
              style={{ cursor: "pointer", margin: "auto 0 auto auto" }}
              onClick={() => dispatch(closeAddBox())}
            >
              <svg
                fill="red"
                height="15px"
                width="15px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 460.775 460.775"
                xmlSpace="preserve"
              >
                <path
                  d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
                />
              </svg>
            </button>
          </div>
          <TabMenu
            model={items}
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)} // e.index ga diqqat qiling
          />
        </div>
        <div className={`tab-content ${activeIndex === 0 ? "show" : ""}`}>
          <div className="scroll-box">
            <div className="box">
              <span className="label">Status</span>
              <Dropdown
                value={selectStatus}
                onChange={(e) => setSelectStatus(e.value)}
                options={options}
                className="form-control"
                placeholder="Select Status"
              />
            </div>
            <div className="date-picker-box">
              <span className="data-label">Period</span>
              <Calendar
                value={dates}
                onChange={(e) => setDates(e.value)}
                selectionMode="range"
                readOnlyInput
                dateFormat="yy-mm-dd"
                placeholder="10-16 June 2024"
                showIcon
                className="form-control"
              />
              <i className="pi pi-chevron-right"></i>
            </div>
            <div className="box">
              <span className="label">Box logo</span>

              {selectedFile ? (
                <div className="custom-file-upload">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected image"
                    className="uploaded-image"
                  />
                  <button onClick={removeFile}>delete</button>
                </div>
              ) : (
                <label htmlFor="file-upload" className="custom-file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={fileHandler}
                    id="file-upload"
                    className="hidden" // Inputni yashirish
                  />
                  <span>Upload</span>
                </label>
              )}
            </div>
            <div className="box">
              <span className="label">Name Box</span>
              <InputText
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Box name"
              />
            </div>
            <div className="box">
              <span className="label">Rank to view</span>
              <InputNumber
                value={rankToView}
                onValueChange={(e) => setRankToView(e.value)}
                className="form-control"
                placeholder="Rank to view"
              />
            </div>
            <div className="box">
              <span className="label">You quest</span>
              <div className="cards-box">
                {quests?.map((item) => (
                  <Card
                    key={item.id}
                    className={`card ${
                      item.status === "active" ? "" : "disabled"
                    }`}
                    onClick={() => dispatch(setSharedQuestId(item.id))}
                  >
                    <div className="left-box">
                      <Badge severity="success"></Badge>
                      <div>
                        <span className="box-number">{item.name}</span>
                        <span className="box-item">{item.description}</span>
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
                className="form-control"
                placeholder="Select Price"
              />
            </div>
            <div className="flex-box">
              <div className="box">
                <span className="label">Total drop</span>
                <InputNumber
                  value={totalDrop}
                  onValueChange={(e) => setTotalDrop(e.value)}
                  className="form-control"
                  placeholder="Total drop"
                />
              </div>
              <div className="box">
                <span className="label">Drop per 1 box</span>
                <InputNumber
                  value={dropPerBox}
                  onValueChange={(e) => setDropPerBox(e.value)}
                  className="form-control"
                  placeholder="Drop per 1 box"
                />
              </div>
            </div>
            <div className="form-control more-btn">
              <span>Add more drop</span>
            </div>
            <div className="box">
              <span className="label">Total Boxes</span>
              <div
                className="form-control more-btn"
                style={{
                  width: "100%",
                  textAlign: "left",
                  paddingLeft: "10px",
                }}
              >
                <span>{totalBoxes()}</span>
              </div>
            </div>
            <Button
              className="go-btn"
              label="Save"
              severity="help"
              onClick={handleSubmit}
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
                  <Card key={index}>
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
          />
        </div>
      </div>
    </>
  );
};
