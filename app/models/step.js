import Ember from 'ember';
import DS from 'ember-data';
import Countdown from '../utils/countdown';

/**
 * A class representing a step in a game.
 * @class Step
 */
export default DS.Model.extend({

  /**
   * The game this step belongs to.
   * @type {Game}
   */
  game: DS.belongsTo('game'),

  /**
   * Order of this step within the game.
   * @type {Number}
   */
  order: DS.attr('number'),

  /**
   * The instruction for this step.
   * @type {String}
   */
  instruction: DS.attr('string'),

  /**
   * Players who have a part to play in this step.
   * @type {Player[]}
   */
  actors: DS.hasMany('player'),

  /**
   * Time allowance for this step in milliseconds.
   * @type {Number}
   */
  wait: DS.attr('number', {defaultValue: 15000}),

  /**
   * Countdown for this step.
   * @type {Countdown}
   */
  timer: Ember.computed(function() {
    return Countdown.create({value: this.get('wait')});
  }),

  /**
   * Resets and starts the timer for this step.
   */
  initStep() {
    this.get('actors').forEach(function(player) {
      player.set('actionRequired', true);
    });

    let wait = this.get('wait');
    if (wait > 0) {
      let timer = this.get('timer');
      timer.set('value', wait);
      Ember.debug('count ' + this.get('instruction'));
      timer.count();
    } else if (this.get('actors.length') > 0) {
      this.startActorTimers();
    } else {
      this.get('game').nextStep();
    }
  },

  /**
   * When the timer expires, start the actor timers
   */
  stepTimeExpired: Ember.observer('timer.hasExpired', function() {
    if (this.get('timer.hasExpired')) {
      if (this.get('actors.length') > 0) {
        this.startActorTimers();
      } else {
        this.get('game').nextStep();
      }
    }
  }),

  /**
   * Start the actor timers
   */
  startActorTimers() {
    this.get('actors').forEach(function(player) {
      Ember.debug(this.get('instruction') + ' expired, count ' + player.get('name'));
      player.get('timer').count();
    }, this);
  }
  
});
