import Ember from 'ember';

export function fixed(params/*, hash*/) {
  return (params[1]/1000).toFixed(params[0]);
}

export default Ember.Helper.helper(fixed);
