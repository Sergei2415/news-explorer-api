
class EntryNotFound extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.name = 'ErrorNotFound';
  }
}
module.exports = { EntryNotFound };
