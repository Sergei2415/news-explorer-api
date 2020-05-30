
class ConflictingRequest extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    this.name = 'ConflictingRequest';
  }
}

module.exports = { ConflictingRequest };
