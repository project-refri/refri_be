export type SuccessResponseType = {
  success: boolean;
  statusCode: number;
  data: object;
};

export class SuccessResponse {
  success = true;
  statusCode = 200;
}

export class CreatedResponse extends SuccessResponse {
  statusCode = 201;
}

export class NoContentResponse extends SuccessResponse {
  statusCode = 204;
}

export class OkResponse extends SuccessResponse {
  statusCode = 200;
}
