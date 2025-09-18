export default function prettyPrintDuration(workDuration) {
  if (isNaN(workDuration)) return "-";
  if (workDuration < 60) return `${workDuration}m`;
  const hours = Math.floor(workDuration / 60);
  const minutes = workDuration % 60;

  return `${hours}h ${minutes}m`;
}
