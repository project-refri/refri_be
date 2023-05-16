export enum QueryType {
  FIND_ONE = 'FIND_ONE',
  FIND_MANY = 'FIND_MANY',
  MODIFY_ONE = 'MODIFY_ONE',
  MODIFY_MANY = 'MODIFY_MANY',
}

export type QueryObject = {
  type: QueryType;
  id?: string;
  dto?: any;
};
