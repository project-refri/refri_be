export const StoreMethod = {
  FREEZE: 'FREEZE',
  REFRIGERATE: 'REFRIGERATE',
  ROOM_TEMPERATURE: 'ROOM_TEMPERATURE',
};

export type StoreMethod = (typeof StoreMethod)[keyof typeof StoreMethod];
