import Ember from 'ember';

export default Ember.Controller.extend({

  /**
   * The currently selected game.
   * @type {[type]}
   */
  selectedGame: null,

  /**
   * Re-indexes the steps from 0.
  */
  reindexStepOrder() {
    let index = 0;
    let steps = this.get('selectedGame.steps');
    steps.sortBy('order').forEach(function(step) {
      step.set('order', index);
      step.save();
      index++;
    });
  },

  actions: {

    /**
     * Set the selected game.
     */
    selectGame(game) {
      this.set('selectedGame', game);
    },

    /**
     * Create a new game with two players.
     */
    newGame() {
      let newGame = this.store.createRecord('game', {});
      let player1 = this.store.createRecord('player', {name: 'Player 1'});
      let player2 = this.store.createRecord('player', {name: 'Player 2'});
      newGame.get('players').pushObject(player1);
      newGame.get('players').pushObject(player2);
      this.send('selectGame', newGame);
      
      Ember.run.schedule('render', this, function() {
        Ember.$('.index_game-setup-title').focus();
      });
    },

    /**
     * Create a new game with the same steps, and players as the provided game.
     */
    duplicateGame(game) {
      let newGame = this.store.createRecord('game', {name: game.get('name') + ' (copy)'});
      let newPlayerMap = new Map();

      game.get('players').forEach(function(player) {
        let newPlayer = this.store.createRecord('player', {
          game: newGame,
          name: player.get('name'),
          reserveTime: player.get('reserveTime')
        });
        newGame.get('players').pushObject(newPlayer);
        newPlayerMap.set(player, newPlayer);
      }, this);

      game.get('arrangedSteps').forEach(function(step) {
        let newStep = this.store.createRecord('step', {
          game: newGame, instruction: step.get('instruction'), order: step.get('order'), wait: step.get('wait')
        });
        
        step.get('actors').forEach(function(actor) {
          newStep.get('actors').pushObject(newPlayerMap.get(actor));
        }, this);
      }, this);
    },

    /**
     * Delete the given game, along with all its players and steps.
     */
    deleteGame(game) {
      game.get('steps').slice().forEach(function(step) {
        console.log('tick');
        step.deleteRecord();
      });
      game.get('players').slice().forEach(function(player) {
        player.deleteRecord();
      });
      game.deleteRecord();

      this.set('selectedGame', null);
    },

    /**
     * Updates the name for the given game with the given value.
     */
    updateGameName(model, value) {
      model.set('name', value);
    },

    /**
     * Add player to the selected game.
     */
    addPlayer() {
      let game = this.get('selectedGame');
      if (game) {
        let num = game.get('players.length') + 1;
        let newPlayer = this.store.createRecord('player', {name: 'Player ' + num});
        game.get('players').pushObject(newPlayer);
      }
    },

    /**
     * Delete a player.
     */
    deletePlayer(player) {
      player.deleteRecord();
    },

    /**
     * Updates the name for the given player with the given value.
     */
    updatePlayerName(player, value) {
      player.set('name', value);
    },

    /**
     * Updates the reserve time for the given player with the given value.
     */
    updatePlayerReserveTime(player, time) {
      Ember.debug('updating player reserve time');
      player.set('reserveTime', time).save();
    },

    /**
     * Add a step to the selected game.
     */
    addStep() {
      let game = this.get('selectedGame');
      let order = game.get('steps.length');
      this.store.createRecord('step', {game, order});

      Ember.run.schedule('render', this, function() {
        Ember.$('.index_game-setup input.index_game-list-item-main').focus();
      });
    },

    /**
     * Remove the step from its game.
     */
    deleteStep(step) {
      step.deleteRecord();
      this.reindexStepOrder();
    },

    /**
     * Updates the instruction for the given step with the given value.
     */
    updateStepInstruction(model, value) {
      model.set('instruction', value);
    },

    /**
     * Updates the wait time for the given step with the given value.
     */
    updateStepWait(step, time) {
      Ember.debug('updating step wait time');
      step.set('wait', time).save();
    },

    /**
     * Swap the given step's order with the step before it.
     */
    moveStepUp(step) {
      let currentOrder = step.get('order');
      let swap = step.get('game.arrangedSteps').objectAt(currentOrder - 1);
      if (swap) {
        step.set('order', swap.get('order'));
        swap.set('order', currentOrder);
      }
    },

    /**
     * Swap the given step's order with the step after it.
     */
    moveStepDown(step) {
      let currentOrder = step.get('order');
      let swap = step.get('game.arrangedSteps').objectAt(currentOrder + 1);
      if (swap) {
        step.set('order', swap.get('order'));
        swap.set('order', currentOrder);
      }
    },

    /**
     * Toggle whether the given player is an actor in the given step.
     */
    toggleActor(player, step) {
      let actors = step.get('actors');
      if (actors.contains(player)) {
        actors.removeObject(player);
      } else {
        actors.pushObject(player);
      }
    }

  }

});
