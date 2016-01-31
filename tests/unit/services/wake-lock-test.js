import { moduleFor, test } from 'ember-qunit';

function stubPowerManagement() {
  window.powermanagement = {
    acquire() {},
    release() {}
  };
}

function tearDownPowerManagement() {
  window.powermanagement = undefined;
}

moduleFor('service:wake-lock', 'Unit | Service | wake lock', {});

test('it can detect when wake locks are supported', function(assert) {
  let service = this.subject();
  stubPowerManagement();
  assert.equal(service.get('isWakeLockSupported'), true);
  tearDownPowerManagement();
});

test('it can detect when wake locks are not supported', function(assert) {
  let service = this.subject();
  assert.equal(service.get('isWakeLockSupported'), false);
});

test('it can acquire a lock', function(assert) {
  stubPowerManagement();
  let service = this.subject();
  service.acquire();
  assert.equal(service.get('hasLock'), true);
  tearDownPowerManagement();
});

test('it can release a lock', function(assert) {
  stubPowerManagement();
  let service = this.subject();
  service.acquire();
  service.release();
  assert.equal(service.get('hasLock'), false);
  tearDownPowerManagement();
});

test('it correctly updates the hasLock property', function(assert) {
  stubPowerManagement();
  let service = this.subject();
  service.acquire();
  assert.equal(service.get('hasLock'), true);
  service.release();
  assert.equal(service.get('hasLock'), false);
  tearDownPowerManagement();
});