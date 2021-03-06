var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

var Storage = require('./storage');

chai.use(chaiAsPromised);

describe('Storage', function() {
  beforeEach(function() {
    this.storage = new Storage();
    return this.storage.setup();
  });

  it('should populate storage without an error', function() {
    expect(this.storage.populate()).to.be.fulfilled;
  });

  it('should retrieve correct value after being populated', function() {
    var promise = this.storage.populate().then(this.storage.score.bind(this));
    expect(promise).to.become(1234);
  });
});
