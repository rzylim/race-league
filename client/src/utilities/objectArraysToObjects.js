export const objectArraysToObjectsReducer = (acc, [key, value]) =>
  Array.isArray(value)
    ? {
        ...acc,
        [key]: Object.entries(value.reduce(arrayToObjectReducer, {})).reduce(
          objectArraysToObjectsReducer,
          {}
        ),
      }
    : typeof value === "object" && value !== null
    ? {
        ...acc,
        [key]: Object.entries(value).reduce(objectArraysToObjectsReducer, {}),
      }
    : {
        ...acc,
        [key]: value,
      };

const arrayToObjectReducer = (acc, value) => {
  const { _id, ...otherProps } = value;
  return typeof value === "object" && value !== null
    ? {
        ...acc,
        [_id]: { _id, ...otherProps },
      }
    : {
        ...acc,
        [value]: {},
      };
};
