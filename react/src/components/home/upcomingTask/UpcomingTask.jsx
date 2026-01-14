import CalendarMonth from "../../../assets/svgs/calendar-month.svg?react";

export function UpcomingTask({ name }) {
  return (
    <div className="entry">
      <p className="entry-name">{name}</p>
      <button>
        <CalendarMonth />
      </button>
    </div>
  );
}
