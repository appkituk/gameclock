import Ember from 'ember';
import DS from 'ember-data';
import Countdown from '../utils/countdown';

/**
 * A class that presents a player in a game.
 * @class Player
 */
export default DS.Model.extend({

  /**
   * Game this this player belongs to.
   * @type {Game}
   */
  game: DS.belongsTo('game'),

  /**
   * Steps in which the player has actions to perform.
   * @type {Step[]}
   */
  steps: DS.hasMany('step'),

  /**
   * Name of player.
   * @type {String}
   */
  name: DS.attr('string', {defaultValue: ""}),

  /**
   * How long the player's personal time reserve is in milliseconds.
   * @type {Number}
   */
  reserveTime: DS.attr('number', {defaultValue: 30000}),

  /**
   * A countdown that represents the player's personal time reserve for the game.
   * @type {Countdown}
   */
  timer: Ember.computed(function() {
    return Countdown.create({value: this.get('reserveTime')});
  }),

  /**
   * Whether an action needs to be carried out by this play in the current step.
   * @type {Boolean}
   */
  actionRequired: false,

  /**
   * When no actions are required, pause the player's timer.
   */
  actionRequiredChange: Ember.observer('actionRequired', function() {
    if (!this.get('actionRequired')) {
      Ember.debug('pause ' + this.get('name'));
      this.get('timer').pause();
    }
  }),

  /**
   * Resets the player to the initial state.
   */
  reset() {
    this.set('actionRequired', false);
    this.set('timer.value', this.get('reserveTime'));
    this.get('timer').pause();
  }

});
