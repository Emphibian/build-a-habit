import { useState } from "react";
import { createPortal } from "react-dom";

import { Dial } from "../Dial";
import StopwatchIcon from "../../../assets/svgs/timer.svg?react";
import CloseIcon from "../../../assets/svgs/close.svg?react";

const FocusModal = ({ closeModal }) => {
  const [duration, setDuration] = useState(25);

  return (
    <div className="focus-modal">
      <div className="focus-div">
        <h3>Set Focus Session Duration</h3>
        <Dial
          initial={duration}
          onChange={(duration) => setDuration(duration)}
        />
        <div>
          <button className="button-blue">Start Session</button>
        </div>
      </div>
      <button onClick={() => closeModal()} className="focus-close">
        <CloseIcon />
      </button>
    </div>
  );
};

export const FocusSessionButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  let modal = "";
  if (modalOpen) {
    let domElement = <FocusModal closeModal={closeModal} />;
    modal = createPortal(domElement, document.getElementById("modal-root"));
  }

  return (
    <>
      {modal}
      <button onClick={openModal}>
        {/* TODO: change this icon */}
        <StopwatchIcon />
        <span>Start Focus Session</span>
      </button>
    </>
  );
};
