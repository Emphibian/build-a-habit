// check if the instance should be generated for the current day
function checkIfInstanceRequired(habit) {
  if (habit.frequency === "daily") {
    return true;
  } else if (habit.frequency === "weekly") {
    const currentDay = new Date().getDay();
    const daysInWeek = habit.frequencyInfo.split(",");
    if (daysInWeek.includes(currentDay.toString())) return true;
  }

  return false;
}

module.exports = checkIfInstanceRequired;
