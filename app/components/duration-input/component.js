import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['duration-input'],

  value: 0,

  displayValue: Ember.computed('value', function() {
    return Math.round(this.get('value')/1000) + 's';
  }),

  increment: 1000,

  actions: {
    
    increase() {
      this.sendAction('update', this.get('value') + this.get('increment'));
    },

    decrease() {
      this.sendAction('update', Math.max(this.get('value') - this.get('increment'), 0));
    }

  }

});
