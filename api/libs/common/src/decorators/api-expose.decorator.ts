import { Expose, ExposeOptions } from 'class-transformer';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiPropertyOptions,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';

export const ApiExpose = (
  options?: (ExposeOptions | ApiPropertyOptions) & { isOptional?: boolean },
) => {
  if (isNil(options.isOptional)) options.isOptional = false;
  if (options.isOptional)
    return applyDecorators(Expose(options), ApiPropertyOptional(options));
  return applyDecorators(Expose(options), ApiProperty(options));
};
