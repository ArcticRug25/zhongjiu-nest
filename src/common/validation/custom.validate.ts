import { ValidationPipe, ValidationError } from '@nestjs/common'

export default class CustomValidate extends ValidationPipe {
  protected mapChildrenToValidationErrors(error: ValidationError, parentPath?: string): ValidationError[] {
    const errors = super.mapChildrenToValidationErrors(error, parentPath)

    errors.forEach((error) => {
      const constraints = error.constraints
      for (const key in constraints) {
        constraints[key] = error.property + '-' + constraints[key]
      }
    })

    return errors
  }
}
