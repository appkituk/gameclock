import Ember from 'ember';

/**
 * A class that manages an accurate countdown timer.
 * @class Countdown
 */
export default Ember.Object.extend({

  /**
   * Reference to the requestAnimationFrame used to tick the countdown.
   * @type {AnimationFrameRef}
   */
  _tickProcess: null,

  /**
   * The current value of the countdown in milliseconds.
   * @type {Number}
   */
  value: 0,

  /**
   * Time in milliseconds (from epoc) at which the countdown will expire.
   * @type {Number}
   */
  _expiresAt: 0,

  /**
   * Whether the countdown has reached 0.
   * @type {Boolean}
   */
  hasExpired: Ember.computed('value', '_expiresAt', function() {
    return this.get('value') === 0;
  }),

  /**
   * Public method that causes the countdown to be active.
   */
  count() {
    this.set('_expiresAt', this.now() + this.get('value'));
    this._tick();
  },

  /**
   * Returns the current time in milliseconds (since epoc).
   * @return {Number} time in milliseconds (since epoc)
   */
  now() {
    return Date.now();
  },

  /**
   * Public method to pause the countdown.
   */
  pause() {
    this._cancelTickProcess();
  },

  /**
   * Runs on animation frames whilst the countdown is active.
   */
  _tick() {
    this._cancelTickProcess();
    this._updateValue();
    if (!this.get('hasExpired')) {
      this._tickProcess = requestAnimationFrame(() => this._tick());
    }
  },

  /**
   * Updates the countdown's value.
   */
  _updateValue() {
    let remaining = this.get('_expiresAt') - Date.now();
    this.set('value', Math.max(remaining, 0));
  },

  /**
   * Cancels the process that runs the countdown.
   */
  _cancelTickProcess() {
    if (this._tickProcess) {
      cancelAnimationFrame(this._tickProcess);
      this._tickProcess = null;
    }
  }

});