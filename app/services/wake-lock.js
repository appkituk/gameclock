import Ember from 'ember';

/**
 * This service can be injected and allows a wake lock to
 * be acquired which prevents compatible devices from
 * sleeping by using the cordova power management plugin.
 */
export default Ember.Service.extend({

  /**
   * Whether the app currently has a wake lock.
   * @type {Boolean}
   */
  hasLock: false,

  /**
   * Whether the device supports wake locks.
   */
  isWakeLockSupported: Ember.computed(function() {
    return !!window.powermanagement;
  }),

  /**
   * This method is called to acquire a wake lock, which
   * prevents the screen from going to sleep.
   */
  acquire() {
    if (this.get('isWakeLockSupported')) {
      window.powermanagement.acquire();
      this.set('hasLock', true);
    }
  },

  /**
   * This method releases a wake lock, which allows the 
   * screen to go to sleep.
   */
  release() {
    if (this.get('isWakeLockSupported')) {
      window.powermanagement.release();
      this.set('hasLock', false);
    }
  }

});