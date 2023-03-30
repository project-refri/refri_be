export type JwtPayload = {
  sub: string;
};

export type JwtRefreshPayload = {
  sub: string;
  uuid: string;
};

export type JwtRegisterPayload = {
  sub: string;
  username: string;
};
