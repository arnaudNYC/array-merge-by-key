const forkedMergeByKey = require('./index');
const originalMergeByKey = require('array-merge-by-key');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const makeArray = length =>
  Array.from({ length }, () => ({
    id: getRandomInt(100),
    value: `a_${getRandomInt(1000)}`,
  }));

const arrays = [makeArray(10000), makeArray(10000), makeArray(10000)];

suite
  .add('original array-merge-by-key', function() {
    originalMergeByKey('id', ...arrays);
  })
  .add('forked array-merge-by-key', function() {
    forkedMergeByKey('id', ...arrays);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
