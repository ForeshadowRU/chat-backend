import { ValidationError, UnprocessableEntityException } from '@nestjs/common';

export const exceptionFactory = (errors: ValidationError[]) => {
  let message = { message: 'Validation Failed', errors: [] };
  errors.forEach(error =>
    message.errors.push({
      field: error.property,
      message: error.constraints[Object.keys(error.constraints)[0]],
    }),
  );
  return new UnprocessableEntityException(message);
};
