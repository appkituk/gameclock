import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    playerReadyForNextStep(player) {
      this.get('model').playerReadyForNextStep(player);
    },

    resetGame() {
      this.get('model').initGame();
    },

    menu() {
      this.transitionToRoute("/");
    }

  }

});
