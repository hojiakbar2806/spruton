import React, { useRef, useState, useEffect } from "react";
import { TabMenu } from "primereact/tabmenu";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useDispatch, useSelector } from "react-redux";
import { openAddBox } from "../../context/slice/addBoxSlice";

export const ShareBox = () => {
  const id = useSelector((state) => state.box.sharedQuestId);

  const quests = JSON.parse(localStorage.getItem("quests")) || [];
  const currentQuest = quests?.find((item) => item.id === id);

  const [selectStatus, setSelectStatus] = useState("");
  const [description, setDescription] = useState("");
  const [channelLink, setChannelLink] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();

  const show = useSelector((state) => (state.box.sharedQuestId ? true : false));

  const items = [{ label: "Settings" }];
  const onTabChange = (e) => {
    setActiveIndex(e.index);
  };

  const options = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  useEffect(() => {
    if (currentQuest) {
      setDescription(currentQuest.description || "");
      setChannelLink(currentQuest.channel_link || "");
      setSelectStatus(currentQuest.status || "");
    }
  }, [id]);

  const setQuest = () => {
    const updatedQuests = quests.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          description,
          channel_link: channelLink,
          status: selectStatus,
        };
      }
      return item;
    });

    localStorage.setItem("quests", JSON.stringify(updatedQuests));
    if (description !== "" && channelLink !== "" && selectStatus !== "") {
      dispatch(openAddBox());
    }
  };

  return (
    <>
      <div className={`overlay ${show ? "show" : ""}`}></div>
      <div className={`create-box share-modal modal ${show ? "show" : ""}`}>
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
              <span className="box-number"></span>
              <span className="box-link">Box #123</span>
            </div>
            <button
              style={{ cursor: "pointer", margin: "auto 0 auto auto" }}
              onClick={() => dispatch(openAddBox())}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                cols={30}
                className="form-control form-control__text"
              />
            </div>
            <div className="box">
              <span className="label">Status</span>
              <Dropdown
                value={selectStatus}
                onChange={(e) => setSelectStatus(e.value)}
                options={options}
                placeholder="Select Status"
                className="form-control"
              />
            </div>
            <div className="box">
              <span className="label">Channel link</span>
              <InputText
                value={channelLink}
                onChange={(e) => setChannelLink(e.target.value)}
                className="form-control"
              />
            </div>
            <Button
              className="go-btn"
              label="Save"
              severity="help"
              onClick={setQuest}
            />
          </div>
        </div>
      </div>
    </>
  );
};
