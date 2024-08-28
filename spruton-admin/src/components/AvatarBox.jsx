import React from "react";
import { Avatar } from "primereact/avatar";
import assets from "../assets";
import { useUserMeQuery } from "../context/service/user.service";
import { TonConnectButton } from "@tonconnect/ui-react";

export const AvatarBox = () => {
  const { data } = useUserMeQuery();

  return (
    <div className="avatar-box">
      <div className="user-box">
        <Avatar image={assets.avatar} size="large" shape="circle" />
        <div>
          <span className="user-name">
            {data?.innerData.first_name ?? "Loading..."}
          </span>
          <span className="user-id">
            {data?.innerData.username && `@${data?.innerData.username}`}
          </span>
        </div>
      </div>
      <TonConnectButton className="wallet__btn" />
    </div>
  );
};
