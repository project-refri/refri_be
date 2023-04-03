export function queryBuilder(queryObject: any, querySchema: any) {
  const query = {};
  Object.keys(queryObject).forEach((key) => {
    if (querySchema[key] && queryObject[key]) {
      query[key] = queryObject[key];
    }
  });
  return query;
}
