import React from "react";
import assets from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { openConnectBox, openEmptyBox } from "../context/slice/openSlice";

export const TakeGift = () => {
  const showModal = useSelector((state) => state.open.loadBox);
  const loot = useSelector((state) => state.open.loot);
  const dispatch = useDispatch();

  const giftFunction = () => {
    if (loot) dispatch(openConnectBox());
    else dispatch(openEmptyBox());
  };
  return (
    <>
      <div className={`overlay ${showModal ? "show" : ""}`}></div>
      <div className={`take-gift__modal modal ${showModal ? "show" : ""}`}>
        <div className="modal-content">
          {showModal && (
            <video
              src={assets.takeGiftVideo}
              autoPlay={true}
              onEnded={() => giftFunction()}
              playsInline
              muted
            ></video>
          )}
        </div>
      </div>
    </>
  );
};
