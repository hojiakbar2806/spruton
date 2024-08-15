import React from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { closeBox } from "../context/slice/openSlice";
export const EmptBox = () => {
  const showModal = useSelector((state) => state.open.emptyBox);
  const dispatch = useDispatch();
  return (
    <>
      <div className={`overlay ${showModal ? "show" : ""}`}></div>
      <div className={`not-found modal ${showModal ? "show" : ""}`}>
        <div className="content-box">
          <h1>OOPS!</h1>
          <span className="text">
            This box is empty. <br /> Try another time.
          </span>
        </div>
        <Button
          className="go-btn"
          label="Try again"
          severity="help"
          onClick={() => dispatch(closeBox())}
        />
      </div>
    </>
  );
};
