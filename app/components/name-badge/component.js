import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'button',

  classNameBindings: ['active:active'],

  displayLabel: Ember.computed('label', function() {
    let displayLabel;
    let labelArr = this.get('label').split(' ');
    if (labelArr.length > 1) {
      displayLabel = labelArr[0][0] + labelArr[1][0];
    } else {
      displayLabel = labelArr[0].substring(0, 2);
    }
    return displayLabel;
  }),

  click() {
    this.sendAction('toggleActive');
  }

});
