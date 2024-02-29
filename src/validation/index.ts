import { ValidationError, UnprocessableEntityException } from '@nestjs/common';

export const UnproccessableEntityExepctionPipe = (
  errors: ValidationError[],
) => {
  return new UnprocessableEntityException({
    message: 'Validation Failed',
    errors: errors.map((error) => ({
      field: error.property,
      message: error.constraints[Object.keys(error.constraints)[0]],
    })),
  });
};
