export class ValidationError extends Error {
  type: 'validation'
  details?: undefined

  constructor(message: string) {
    super(message)
    this.type = 'validation'
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}
