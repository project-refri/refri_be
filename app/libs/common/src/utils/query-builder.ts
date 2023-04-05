export const queryBuilder = (queryObject: any) => {
  const query = {};
  for (const key in queryObject) {
    if (queryObject[key]) {
      query[key] = queryObject[key];
    }
  }
  return query;
};
