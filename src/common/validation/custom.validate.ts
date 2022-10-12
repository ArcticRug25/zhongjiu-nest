import { ValidationPipe, ValidationError } from '@nestjs/common'

export default class CustomValidate extends ValidationPipe {
  protected mapChildrenToValidationErrors(error: ValidationError, parentPath?: string): ValidationError[] {
    const errors = super.mapChildrenToValidationErrors(error, parentPath)

    return errors
  }
}
