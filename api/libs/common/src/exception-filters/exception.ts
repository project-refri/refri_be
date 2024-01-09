export class DomainException extends Error {
  getResponse(): string | object {
    return {
      name: this.constructor.name,
      message: this.message,
    };
  }
}
