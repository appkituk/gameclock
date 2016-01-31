import { formatTime } from '../../../helpers/format-time';
import { module, test } from 'qunit';

module('Unit | Helper | formatTime');

test('it formats timr in milliseconds as minutes:seconds', function(assert) {
  let result = formatTime([42000]);
  assert.equal(result, '0:42');
});

test('it always shows seconds as two digits', function(assert) {
  let result = formatTime([65000]);
  assert.equal(result, '1:05');
  
  result = formatTime([60000]);
  assert.equal(result, '1:00');
  
  result = formatTime([5000]);
  assert.equal(result, '0:05');
  
  result = formatTime([0]);
  assert.equal(result, '0:00');
});