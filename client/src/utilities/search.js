export const searchStringProps = (props, searchTerm) =>
  Object.values(props).reduce(
    (acc, value) =>
      acc || value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    false
  );

export const handleSearchChange = (event, setSearch) => {
  setSearch(event.target.value);
};

export const shallowFindByKeyValue = (obj, k, v) =>
  Object.values(obj).filter((value) => value[k] === v)[0];
