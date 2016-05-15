/**
 * Created by mor on 15/05/16.
 */

require("amd-loader");
var assert = require('chai').assert;

var Sorter = require('../classes/sorter.js');

describe('Sorter', function() {
    describe('BubbleSort', function () {
        it('should sort an array', function () {
            var sorter = new Sorter([1,-4,12,6,4,0]);
            sorter.bubbleSort();
            assert.deepEqual(sorter.getArray(), [-4,0,1,4,6,12]);
        });
    });
});