import { useState } from "react";

export function DoneModal({ isOpen, setOpen, handleHabitUpdate }) {
  const [inputValue, setInputValue] = useState("");
  if (!isOpen) return null;
  const closeModal = function() {
    setOpen(false);
  };

  const handleUpdate = async function(event) {
    event.preventDefault();

    closeModal();
    handleHabitUpdate(inputValue);
  };

  return (
    <div className="habit-overlay" onClick={closeModal}>
      <div className="main-habit-form" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleUpdate}>
          <label>
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              required
            />
            <span>Value</span>
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
