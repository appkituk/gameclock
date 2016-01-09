import Ember from 'ember';

export function contains(params/*, hash*/) {
  return params[0].contains(params[1]);
}

export default Ember.Helper.helper(contains);
