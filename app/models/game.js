import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

  /**
   * The steps in this game.
   * {Step[]}
   */
  steps: DS.hasMany('step', { async: true }),

  /**
   * The steps in this game in order.
   * {Step[]}
   */
  arrangedSteps: Ember.computed('steps.@each.order', function() {
    return this.get('steps').sortBy('order');
  }),

  /**
   * The players in this game.
   * @type {Player[]}
   */
  players: DS.hasMany('player', { async: true }),

  /**
   * The name for this game.
   * @type {String}
   */
  name: DS.attr('string', {defaultValue: ""}),

  /**
   * The name for this game for display.
   * @type {String}
   */
  displayName: Ember.computed('name', function() {
    return this.get('name') || 'Untitled game...';
  }),
  
  /**
   * Whether this game is currently active.
   * @type {Boolean}
   */
  active: false,

  /**
   * How many times the steps for this game have been completed.
   * @type {Number}
   */
  turn: 0,

  /**
   * An index for the current step.
   * @type {Number}
   */
  _stepIndex: 0,

  /**
   * The current step.
   * @type {String}
   */
  step: Ember.computed('steps', '_stepIndex', function() {
    return this.get('steps').findBy('order', this.get('_stepIndex'));
  }),

  /**
   * Player is ready for next step.
   * @return {Function} [description]
   */
  playerReadyForNextStep(player) {
    player.set('actionRequired', false);
    
    let actionsRemaining = this.get('players').filter(player => player.get('actionRequired')).length;

    if (actionsRemaining === 0) {
      if (!this.get('step.timer.hasExpired')) {
        Ember.debug('pause ', this.get('step.instruction'));
        this.get('step.timer').pause();
      }
      this.nextStep();
    }
  },

  /**
   * Progress the game to the next step. Increment the turn if we are at the last step.
   */
  nextStep() {
    let _stepIndex = this.get('_stepIndex');
    
    if (_stepIndex !== this.get('steps').get('length') - 1) {
      this.set('_stepIndex', _stepIndex + 1);
    } else {
      this.set('_stepIndex', 0);
      this.incrementProperty('turn', 1);
    }
    this.get('step').initStep();
  },

  /**
   * Reset properties and start timers.
   */
  initGame() {
    this.get('players').forEach(function(player) {
      player.reset();
    });
    this.get('step.timer').pause();
    this.setProperties({
      'active': true,
      'turn': 1,
      '_stepIndex': 0
    });
    this.get('step').initStep();
  }

});
