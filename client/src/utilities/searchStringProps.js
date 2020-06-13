export const searchStringProps = (props, searchTerm) =>
  Object.values(props).reduce(
    (acc, value) =>
      acc || value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    false
  );
