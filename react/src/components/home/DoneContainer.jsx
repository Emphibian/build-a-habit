import { useState } from "react";
import { useSelector } from "react-redux";
import { Habit } from "./Habit";
import ChevronUp from "../../assets/svgs/chevron-up.svg?react";
import ChevronDown from "../../assets/svgs/chevron-down.svg?react";

export function DoneContainer({
  updateValue,
  setSidebarHabit,
  setSidebarOpen,
  sidebarOpen,
  sidebarHabit,
  updateTask,
  setOperationModalOpen,
  setOperationModalPos,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tasks = useSelector((state) =>
    state.tasks.allIds.map((id) => state.tasks.byId[id]),
  ).filter((task) => task.completed);

  const habits = useSelector((state) =>
    state.habits.allIds.map((id) => state.habits.byId[id]),
  ).filter((habit) => habit.status === "Completed");

  let items = "";
  if (drawerOpen) {
    items = (
      <>
        {habits.map((habit) => {
          return (
            <Habit
              key={habit._id}
              id={habit._id}
              name={habit.name}
              workDuration={habit.workDuration}
              timeEstimate={habit.timeEstimate}
              handleUpdate={() =>
                updateValue(
                  habit._id,
                  habit.goalValue,
                  habit.goalTarget,
                  habit.goalType,
                )
              }
              openSidebar={() => {
                setSidebarHabit({ id: habit._id, isHabit: true });
                setSidebarOpen(true);
              }}
              openOperationModal={(position) => {
                setSidebarHabit({ id: habit._id, isHabit: true });
                setOperationModalPos(position);
                setOperationModalOpen(true);
              }}
              isSidebarOpen={sidebarOpen && habit._id === sidebarHabit?.id}
              isHabit={true}
            />
          );
        })}
        {tasks.map((task) => {
          return (
            <Habit
              key={task._id}
              id={task._id}
              name={task.name}
              workDuration={task.workDuration}
              timeEstimate={task.timeEstimate}
              handleUpdate={() => {
                updateTask(task._id);
              }}
              openSidebar={() => {
                setSidebarHabit({ id: task._id, isHabit: false });
                setSidebarOpen(true);
              }}
              openOperationModal={(position) => {
                setSidebarHabit({ id: task._id, isHabit: false });
                setOperationModalOpen(true);
                setOperationModalPos(position);
              }}
              isSidebarOpen={sidebarOpen && task._id === sidebarHabit?.id}
              isHabit={false}
            />
          );
        })}
      </>
    );
  }

  return (
    <div className="done-habits">
      <div
        className="collapsible"
        onClick={() => setDrawerOpen((prev) => !prev)}
      >
        <h3>
          {drawerOpen ? <ChevronUp /> : <ChevronDown />}
          Done ({tasks.length + habits.length})
        </h3>
      </div>
      {items}
    </div>
  );
}
