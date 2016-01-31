import Ember from 'ember';

function to2Figures(value) {
  return ('' + value).length === 2 ? value : '0' + value;
}

export function formatTime(params/*, hash*/) {
  let time = params[0];
  Ember.assert('FormatTimeHelper: you must provide this helper with a number', Number.isFinite(time));

  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(seconds / 60);
  let secondsInMinute = seconds - (minutes * 60);
  let displaySeconds = to2Figures(secondsInMinute);
  return `${minutes}:${displaySeconds}`;
}

export default Ember.Helper.helper(formatTime);
