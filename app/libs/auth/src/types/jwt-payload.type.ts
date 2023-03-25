export type JwtPayload = {
  sub: string;
};

export type JwtRefreshPayload = {
  sub: string;
  uuid: string;
};
