import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class SuccessResponse {
  success = true;
  @ApiExpose({ name: 'status_code' })
  statusCode = 200;
}

export class CreatedResponse extends SuccessResponse {
  @ApiExpose({ name: 'status_code' })
  statusCode = 201;
}

export class NoContentResponse extends SuccessResponse {
  @ApiExpose({ name: 'status_code' })
  statusCode = 204;
}

export class OkResponse extends SuccessResponse {
  @ApiExpose({ name: 'status_code' })
  statusCode = 200;
}
