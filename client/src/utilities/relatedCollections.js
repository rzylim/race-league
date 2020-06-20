export const getRelatedCollections = (collectionNames, searchLocation) =>
  collectionNames.reduce(
    (acc, collectionName) => ({
      ...acc,
      [collectionName]: searchLocation[collectionName],
    }),
    {}
  );
