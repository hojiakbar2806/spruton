import React from 'react';
import { Header } from './Header';
import assets from '../assets';

export const TakeGift = ({ showModal, onVideoEnd }) => {
  return (
    <>
      <div className={`overlay ${showModal ? 'show' : ''}`}></div>
      <div className={`take-gift__modal modal ${showModal ? 'show' : ''}`}>
        <div className="modal-content">
          {showModal && (
            <video
              src={assets.takeGiftVideo}
              autoPlay={true}
              onEnded={onVideoEnd}
              playsInline
              muted
            ></video>
          )}
        </div>
      </div>
    </>
  );
};
