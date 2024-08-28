import React, { useState, useEffect } from "react";
import "./tasks.scss";
import assets from "../../assets";
import { Footer } from "../../components";
import {
  useCheckTaskMutation,
  useGetMyTaskQuery,
  useGetPerformTaskQuery,
} from "../../context/service/user.service";

export const Tasks = () => {
  const { data, refetch } = useGetMyTaskQuery({
    pollingInterval: 1000,
  });
  const [check] = useCheckTaskMutation();

  const [id, setId] = useState(localStorage.getItem("taskId") || null);
  const [whenDone, setWhenDone] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(0);

  useEffect(() => {
    if (data) {
      const firstIncompleteTask = data.innerData.quest.find(
        (item) => item.status !== "completed"
      );

      if (firstIncompleteTask) {
        setActiveTaskId(firstIncompleteTask.id);
      }
    }
  }, [data]);

  useEffect(() => {
    if (id && data) {
      const validItem = data.innerData.quest.some((item) => item.id === id);
      if (!validItem) {
        localStorage.removeItem("taskId");
        setId(null);
      }
    }
  }, [data, id]);

  useGetPerformTaskQuery(id, { skip: !id });

  useEffect(() => {
    if (!id) return;

    const startTimer = async () => {
      try {
        const res = await check(id);
        const remainingTime = res?.data?.innerData?.remaining_time;

        if (remainingTime === undefined) {
          localStorage.removeItem("taskId");
          setWhenDone(null);
          setId(null);
          refetch();
          return;
        }

        let [m, s] = remainingTime.split(":").map(Number);
        let totalSeconds = m * 60 + s;

        const interval = setInterval(() => {
          if (totalSeconds <= 0) {
            clearInterval(interval);
            setWhenDone("");
            refetch();
            localStorage.removeItem("taskId");
            return;
          }
          totalSeconds--;
          updateTimer(totalSeconds);
        }, 1000);

        setIntervalId(interval);
      } catch (error) {
        console.error("Failed to fetch task status:", error);
      }
    };

    startTimer();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [id, check, refetch]);

  const updateTimer = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const remainingSeconds = String(seconds % 60).padStart(2, "0");
    setWhenDone(`${minutes}:${remainingSeconds}`);
  };

  const performTask = (item) => {
    if (item.channel_link) {
      window.open(item.channel_link, "_blank");
    }
    if (item.status !== "completed") {
      localStorage.setItem("taskId", item.id);
      setId(item.id);
    }
  };

  return (
    <>
      <div className="tasks-section">
        <div className="container">
          <span className="text">
            To open the lootbox you need <br /> to fulfil a task
          </span>
          <div className="cards">
            {data?.innerData?.quest?.map((item, index) => {
              let activeTask, completed, block;
              completed = item.status === "completed";
              activeTask = activeTaskId === item.id;
              block = !activeTask && !completed;
              return (
                <div
                  onClick={() => (block ? null : performTask(item))}
                  target="blank"
                  className={`card ${completed ? "completed" : ""} ${
                    block ? "block" : ""
                  } `}
                  key={index}
                >
                  {StarSvg}
                  <span>
                    {index + 1}. {item.name}
                  </span>
                  {id === item.id && <span>{whenDone}</span>}
                  {block ? (
                    BlockSvg
                  ) : (
                    <img
                      className="right-img"
                      src={
                        item.status === "completed" ? assets.check : assets.next
                      }
                      alt="icon"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const StarSvg = (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.0104 4.3124L17.9375 8.26032C17.9271 8.80199 18.2709 9.52074 18.7084 9.84365L21.2917 11.802C22.9479 13.052 22.6771 14.5832 20.6979 15.2082L17.3334 16.2603C16.7709 16.4374 16.1771 17.052 16.0313 17.6249L15.2292 20.6874C14.5938 23.1041 13.0104 23.3437 11.6979 21.2187L9.86461 18.2499C9.53128 17.7082 8.73961 17.302 8.11461 17.3332L4.63544 17.5103C2.14586 17.6353 1.43753 16.1978 3.06253 14.302L5.12503 11.9062C5.51044 11.4582 5.68753 10.6249 5.51044 10.0624L4.44794 6.6874C3.83336 4.70824 4.93753 3.61449 6.90628 4.26032L9.9792 5.27074C10.5 5.4374 11.2813 5.32282 11.7188 4.9999L14.9271 2.6874C16.6667 1.44782 18.0521 2.17699 18.0104 4.3124Z"
      fill="white"
    />
    <path
      d="M22.3334 21.3228L19.1771 18.1666C18.875 17.8645 18.375 17.8645 18.0729 18.1666C17.7709 18.4686 17.7709 18.9686 18.0729 19.2707L21.2292 22.427C21.3854 22.5832 21.5834 22.6561 21.7813 22.6561C21.9792 22.6561 22.1771 22.5832 22.3334 22.427C22.6354 22.1249 22.6354 21.6249 22.3334 21.3228Z"
      fill="white"
    />
  </svg>
);

const LikeSvg = (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M29.9445 14.9166L28.0556 12.7221C27.6945 12.3055 27.4028 11.5277 27.4028 10.9721V8.61104C27.4028 7.13881 26.1945 5.93048 24.7223 5.93048H22.3611C21.8195 5.93048 21.0278 5.63881 20.6111 5.2777L18.4167 3.38881C17.4584 2.56937 15.8889 2.56937 14.9167 3.38881L12.7361 5.29159C12.3195 5.63881 11.5278 5.93048 10.9861 5.93048H8.58337C7.11115 5.93048 5.90281 7.13881 5.90281 8.61104V10.986C5.90281 11.5277 5.61115 12.3055 5.26393 12.7221L3.38893 14.9305C2.58337 15.8888 2.58337 17.4444 3.38893 18.4027L5.26393 20.611C5.61115 21.0277 5.90281 21.8055 5.90281 22.3471V24.7221C5.90281 26.1944 7.11115 27.4027 8.58337 27.4027H10.9861C11.5278 27.4027 12.3195 27.6944 12.7361 28.0555L14.9306 29.9444C15.8889 30.7638 17.4584 30.7638 18.4306 29.9444L20.625 28.0555C21.0417 27.6944 21.8195 27.4027 22.375 27.4027H24.7361C26.2084 27.4027 27.4167 26.1944 27.4167 24.7221V22.361C27.4167 21.8194 27.7084 21.0277 28.0695 20.611L29.9584 18.4166C30.7639 17.4583 30.7639 15.8749 29.9445 14.9166ZM23.1667 16.6666L21.5417 21.611C21.3334 22.4305 20.4584 23.0971 19.5695 23.0971H17C16.5556 23.0971 15.9306 22.9444 15.6528 22.6666L13.6111 21.0694C13.5695 21.9583 13.1667 22.3333 12.1806 22.3333H11.5139C10.4861 22.3333 10.0695 21.9305 10.0695 20.9583V14.3194C10.0695 13.3471 10.4861 12.9444 11.5139 12.9444H12.1945C13.2223 12.9444 13.6389 13.3471 13.6389 14.3194V14.8194L16.3334 10.8194C16.6111 10.3888 17.3195 10.0833 17.9167 10.3194C18.5695 10.5416 18.9861 11.2638 18.8473 11.9027L18.5139 14.0694C18.4861 14.2638 18.5278 14.4444 18.6528 14.5833C18.7639 14.7083 18.9306 14.7916 19.1111 14.7916H21.8195C22.3473 14.7916 22.7917 14.9999 23.0556 15.3749C23.2917 15.736 23.3334 16.1944 23.1667 16.6666Z"
      fill="#000"
    />
  </svg>
);

const GroupSvg = (
  <svg
    width="29"
    height="29"
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.1821 9.38877C21.0975 9.37669 21.0129 9.37669 20.9283 9.38877C19.0554 9.32835 17.5692 7.79377 17.5692 5.90877C17.5692 3.98752 19.1279 2.41669 21.0612 2.41669C22.9825 2.41669 24.5533 3.97544 24.5533 5.90877C24.5412 7.79377 23.055 9.32835 21.1821 9.38877Z"
      fill="black"
    />
    <path
      d="M25.1213 17.7625C23.7679 18.6687 21.8708 19.0071 20.1188 18.7775C20.5779 17.7867 20.8196 16.6871 20.8317 15.5271C20.8317 14.3187 20.5658 13.1708 20.0583 12.1679C21.8467 11.9262 23.7438 12.2646 25.1092 13.1708C27.0184 14.4275 27.0184 16.4937 25.1213 17.7625Z"
      fill="black"
    />
    <path
      d="M7.78165 9.38877C7.86624 9.37669 7.95082 9.37669 8.0354 9.38877C9.90832 9.32835 11.3946 7.79377 11.3946 5.90877C11.3946 3.97544 9.83582 2.41669 7.90249 2.41669C5.98124 2.41669 4.42249 3.97544 4.42249 5.90877C4.42249 7.79377 5.90874 9.32835 7.78165 9.38877Z"
      fill="black"
    />
    <path
      d="M7.91457 15.5271C7.91457 16.6991 8.16832 17.8108 8.62749 18.8137C6.92374 18.995 5.14749 18.6325 3.84249 17.7746C1.93332 16.5058 1.93332 14.4396 3.84249 13.1708C5.13541 12.3008 6.95999 11.9504 8.67582 12.1437C8.18041 13.1587 7.91457 14.3066 7.91457 15.5271Z"
      fill="black"
    />
    <path
      d="M14.645 19.1762C14.5483 19.1642 14.4396 19.1642 14.3308 19.1762C12.1075 19.1037 10.3312 17.2792 10.3312 15.0317C10.3433 12.7358 12.1921 10.875 14.5 10.875C16.7958 10.875 18.6567 12.7358 18.6567 15.0317C18.6446 17.2792 16.8804 19.1037 14.645 19.1762Z"
      fill="black"
    />
    <path
      d="M10.7179 21.6775C8.89334 22.8979 8.89334 24.9038 10.7179 26.1121C12.7963 27.5017 16.2038 27.5017 18.2821 26.1121C20.1067 24.8917 20.1067 22.8858 18.2821 21.6775C16.2158 20.2879 12.8083 20.2879 10.7179 21.6775Z"
      fill="black"
    />
  </svg>
);

const BlockSvg = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="right-img"
  >
    <path
      d="M10 14.4583C10.7502 14.4583 11.3583 13.8502 11.3583 13.1C11.3583 12.3498 10.7502 11.7416 10 11.7416C9.24981 11.7416 8.64166 12.3498 8.64166 13.1C8.64166 13.8502 9.24981 14.4583 10 14.4583Z"
      fill="#A3A3A3"
    />
    <path
      d="M15.2334 7.94169V6.90002C15.2334 4.65002 14.6917 1.66669 10 1.66669C5.30835 1.66669 4.76669 4.65002 4.76669 6.90002V7.94169C2.43335 8.23335 1.66669 9.41669 1.66669 12.325V13.875C1.66669 17.2917 2.70835 18.3334 6.12502 18.3334H13.875C17.2917 18.3334 18.3334 17.2917 18.3334 13.875V12.325C18.3334 9.41669 17.5667 8.23335 15.2334 7.94169ZM10 15.6167C8.60835 15.6167 7.48335 14.4834 7.48335 13.1C7.48335 11.7084 8.61669 10.5834 10 10.5834C11.3834 10.5834 12.5167 11.7167 12.5167 13.1C12.5167 14.4917 11.3917 15.6167 10 15.6167ZM6.12502 7.86669C6.05835 7.86669 6.00002 7.86669 5.93335 7.86669V6.90002C5.93335 4.45835 6.62502 2.83335 10 2.83335C13.375 2.83335 14.0667 4.45835 14.0667 6.90002V7.87502C14 7.87502 13.9417 7.87502 13.875 7.87502H6.12502V7.86669Z"
      fill="#A3A3A3"
    />
  </svg>
);

const CompletedSvg = (
  <svg
    width="18"
    height="14"
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 7L6.67466 12L16 2"
      stroke="url(#paint0_linear_3_2061)"
      stroke-width="3.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3_2061"
        x1="9"
        y1="2"
        x2="9"
        y2="12"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#88FF00" />
        <stop offset="1" stop-color="#DAFF00" />
      </linearGradient>
    </defs>
  </svg>
);
