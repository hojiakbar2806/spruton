import React from "react";
import assets from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { openConnectBox } from "../context/slice/openSlice";

export const TakeGift = () => {
  const showModal = useSelector((state) => state.open.giftBox);
  const dispatch = useDispatch();
  return (
    <>
      <div className={`overlay ${showModal ? "show" : ""}`}></div>
      <div className={`take-gift__modal modal ${showModal ? "show" : ""}`}>
        <div className="modal-content">
          {showModal && (
            <video
              src={assets.takeGiftVideo}
              autoPlay={true}
              onEnded={() => dispatch(openConnectBox())}
              playsInline
              muted
            ></video>
          )}
        </div>
      </div>
    </>
  );
};
