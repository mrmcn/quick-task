export class ValidationError {
  type: 'validation'
  message: string
  details?: undefined

  constructor(message: string) {
    this.message = message
    this.type = 'validation'
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}
