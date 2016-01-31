import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['duration-picker'],

  value: 0,

  selectedMinute: Ember.computed('value', function() {
    return Math.floor(this.get('value') / 60000);
  }),

  selectedSecond: Ember.computed('value', 'selectedMinute', function() {
    return Math.floor(this.get('value') / 1000) - (this.get('selectedMinute') * 60);
  }),

  secondOptions: null,

  minuteOptions: null,

  init() {
    this._super();

    let minuteOptions = [];
    for (let i = 0; i < 60; i++) {
      minuteOptions.push(i);
    }
    this.set('minuteOptions', minuteOptions);

    let secondOptions = [];
    for (let i = 0; i < 60; i++) {
      secondOptions.push(i);
    }
    this.set('secondOptions', secondOptions);
  },

  actions: {
    
    change() {
      let $selects = this.$('select');
      let minuteValue = $selects.eq(0).val() * 60000;
      let secondValue = $selects.eq(1).val() * 1000;
      this.sendAction('update', minuteValue + secondValue);
    }

  },

});
