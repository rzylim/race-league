export const yearRange = () => {
  let years = [];
  let startYear = new Date().getFullYear() + 1;
  const endYear = 1672; // Ferdinand Verbiest
  while (startYear >= endYear) years.push(startYear--);
  return years;
};
