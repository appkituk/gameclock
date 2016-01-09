import Countdown from '../../../utils/countdown';
import { module, test } from 'qunit';

module('Unit | Utility | countdown');

test('it initialises with a provided value', function(assert) {
  let countdown = Countdown.create({
    value: 1000
  });
  assert.ok(countdown.value === 1000);
});

test('it correctly sets expiry time when count is called', function(assert) {
  let countdown = Countdown.create({
    value: 1000,
    _tick: function() {},
    now() { return 100; }
  });
  countdown.count();
  assert.equal(countdown.get('_expiresAt'), 1100);
});

test('it can count down', function(assert) {
  let done  = assert.async();
  let countdown = Countdown.create({
    value: 60000,
  });
  countdown.count();
  setTimeout(function() {
    assert.ok(countdown.get('value') < 60000);
    done();
  }, 100);
});

test('it can be paused', function(assert) {
  let done  = assert.async();
  let countdown = Countdown.create({
    value: 60000,
  });
  countdown.count();
  countdown.pause();
  let mark = countdown.get('value');
  setTimeout(function() {
    assert.equal(countdown.get('value'), mark);
    done();
  }, 100);
});

test('it computes hasExpired', function(assert) {
  let countdown = Countdown.create({
    value: 1000,
  });
  assert.equal(countdown.get('hasExpired'), false);
  countdown.set('value', 0);
  assert.equal(countdown.get('hasExpired'), true);
});