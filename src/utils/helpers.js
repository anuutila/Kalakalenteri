
export function getDefaultDate() {
  const date = new Date();
  const currentDate = date.getDate();
  date.setDate(currentDate);
  const defaultDate = date.toLocaleDateString('en-CA');
  return defaultDate;
}