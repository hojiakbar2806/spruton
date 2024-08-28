import React, { useEffect, useRef, useState } from "react";
import assets from "../../assets";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { ShareBox } from "./ShareBox";
import { useSelector, useDispatch } from "react-redux";
import {
  closeAddBox,
  openAddBox,
  setSharedQuestId,
} from "../../context/slice/addBoxSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBoxByIdQuery,
  useUpdaetBoxLogoMutation,
  useUpdateBoxMutation,
} from "../../context/service/box.service.js";
import { Toast } from "primereact/toast";

export const ViewUpdate = () => {
  const id = useParams().id;
  const { data = null } = useGetBoxByIdQuery(id);
  const [updateBox] = useUpdateBoxMutation();
  const [updateLogo] = useUpdaetBoxLogoMutation();
  const toast = useRef(null);
  const [selectStatus, setSelectStatus] = useState("active");
  const [selectPrice, setSelectPrice] = useState("usd");
  const [dates, setDates] = useState([]);
  const [name, setName] = useState("");
  const [totalDrop, setTotalDrop] = useState(0);
  const [rankToView, setRankToView] = useState(0);
  const [dropPerBox, setDropPerBox] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [quests, setQuests] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const curr = data.innerData;
      setSelectStatus(curr.status);
      setName(curr.name);
      setTotalDrop(curr.total_drop);
      setRankToView(curr.rank_to_view);
      setDropPerBox(curr.drop_per_box);
      setSelectedFile(curr.logo);
      setQuests(curr.quests);
      setDates([new Date(curr.start_date), new Date(curr.end_date)]);
    }
    dispatch(openAddBox());
  }, [data]);

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
    };

    try {
      const res = await updateBox({ id, formData });
      if (res.data.variant === "success") {
        toast.current.show({
          severity: res.data.variant,
          summary: res.data.variant,
          detail: res.data.message,
        });

        navigate("/");
        dispatch(closeAddBox());
      }
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
    }
  };

  const showAddBoxModal = useSelector((state) => state.box.openAddBox);

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

    try {
      const res = updateLogo({ id: id, formData: file });
      if (res.data.variant === "success") {
        toast.current.show({
          severity: res.data.variant,
          summary: res.data.variant,
          detail: res.data.message,
        });
      }
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
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
        <div className="content" style={{ padding: "16px" }}>
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
              onClick={() => {
                dispatch(closeAddBox());
                navigate("/");
              }}
            >
              Back
            </button>
          </div>
        </div>
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
                  src={selectedFile}
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
    </>
  );
};
