export const convertShallowSetsToArrays = (obj) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) =>
      value instanceof Set
        ? {
            ...acc,
            [key]: [...value],
          }
        : { ...acc, [key]: value },
    {}
  );
