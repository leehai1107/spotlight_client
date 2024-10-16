export function convertUnixToDateTime(unixTimestamp) {
  // Convert Unix timestamp to milliseconds by multiplying by 1000
  const date = new Date(unixTimestamp * 1000);

  // Get the date and time components
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0-based
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  // Format the date and time in YYYY-MM-DD HH:mm:ss format
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
