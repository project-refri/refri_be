export class SuccessResponse {
  success = true;
}

export class CreatedResponse extends SuccessResponse {}

export class NoContentResponse extends SuccessResponse {}

export class OkResponse extends SuccessResponse {}
