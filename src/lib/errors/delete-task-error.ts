export class DeleteTaskError {
  type: 'delete task'
  message: string
  details?: undefined

  constructor(message: string) {
    this.message = message
    this.type = 'delete task'
    Object.setPrototypeOf(this, DeleteTaskError.prototype)
  }
}
