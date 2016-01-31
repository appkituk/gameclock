import Ember from 'ember';

export default Ember.Route.extend({

  wakeLock: Ember.inject.service(),

  model(params) {
    return this.store.find('game', params.game_id);
  },

  afterModel(model) {
    model.initGame();
  },

  activate() {
    this.get('wakeLock').acquire();
  },

  deactivate() {
    this.get('wakeLock').release();
  }

});