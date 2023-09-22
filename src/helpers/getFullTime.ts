export function getFullTime(): string {
  const currentTime = new Date();

  // Extract hours, minutes, and seconds
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // Format the time to have leading zeros if necessary
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  // Return a string representing the full clock time
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}