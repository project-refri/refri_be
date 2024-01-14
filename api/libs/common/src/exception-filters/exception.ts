export class DomainException extends Error {
  getResponse() {
    return {
      name: this.constructor.name,
      message: this.message,
    };
  }
}
