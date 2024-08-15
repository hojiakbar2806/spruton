import React, { useRef, useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Footer } from "../../components";
import { InputTextarea } from "primereact/inputtextarea";

export const ShareBox = ({ showModal, setShareBox }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const toast = useRef(null);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("https://t.me/toyseller");
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [{ label: "Settings" }];

  const onTabChange = (e) => {
    setActiveIndex(e.index);
  };

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
      <div className={`overlay ${showModal ? "show" : ""}`}></div>
      <div
        className={`create-box share-modal modal ${showModal ? "show" : ""}`}
      >
        <div className="content">
          <div className="top-box">
            <div className="img-box white">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.0104 4.3124L17.9375 8.26032C17.9271 8.80199 18.2709 9.52074 18.7084 9.84365L21.2917 11.802C22.9479 13.052 22.6771 14.5832 20.6979 15.2082L17.3334 16.2603C16.7709 16.4374 16.1771 17.052 16.0313 17.6249L15.2292 20.6874C14.5938 23.1041 13.0104 23.3437 11.6979 21.2187L9.86461 18.2499C9.53128 17.7082 8.73961 17.302 8.11461 17.3332L4.63544 17.5103C2.14586 17.6353 1.43753 16.1978 3.06253 14.302L5.12503 11.9062C5.51044 11.4582 5.68753 10.6249 5.51044 10.0624L4.44794 6.6874C3.83336 4.70824 4.93753 3.61449 6.90628 4.26032L9.9792 5.27074C10.5 5.4374 11.2813 5.32282 11.7188 4.9999L14.9271 2.6874C16.6667 1.44782 18.0521 2.17699 18.0104 4.3124Z"
                  fill="black"
                />
                <path
                  d="M22.3334 21.3228L19.1771 18.1666C18.875 17.8645 18.375 17.8645 18.0729 18.1666C17.7709 18.4686 17.7709 18.9686 18.0729 19.2707L21.2292 22.427C21.3854 22.5832 21.5834 22.6561 21.7813 22.6561C21.9792 22.6561 22.1771 22.5832 22.3334 22.427C22.6354 22.1249 22.6354 21.6249 22.3334 21.3228Z"
                  fill="black"
                />
              </svg>
            </div>
            <div>
              <span className="box-number">Share box</span>
              <span className="box-link">Box #123</span>
            </div>
          </div>
        </div>
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={onTabChange}
        />
        <div className={`tab-content ${activeIndex === 0 ? "show" : ""}`}>
          <div className="scroll-box">
            <div className="box">
              <span className="label">Description of store</span>
              <InputTextarea
                autoResize
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={5}
                cols={30}
                className="form-control form-control__text"
              />
            </div>
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
            <div className="box">
              <span className="label">Channel link</span>
              <InputText
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="form-control"
              />
            </div>
            <Button
              className="go-btn"
              label="Save"
              severity="help"
              onClick={() => setShareBox(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
