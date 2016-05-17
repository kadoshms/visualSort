/**
 * Created by mor on 15/05/16.
 */

define([], function(){

    /**
     * create a new sorter instance
     * @param array array to sort
     * @param graphics group OR array for testing
     * @param optional callback function non related to a specific group
     * @constructor
     */
    var Sorter = function(group, callback){
        this.array = group instanceof Array ? group : group.getArray();
        this.group = group;
        this.callback = callback;
        this.swaps = [];
        this.counter = 0;
    }


    /**
     * bubble sort algorithm
     *
     * @complexity O(n^2)
     */
    Sorter.prototype.bubbleSort = function(){
        for(var i=0;i<this.array.length;i++)
        {
            for(var j=0;j<this.array.length-1;j++)
            {
                if(this.array[j] > this.array[j+1])
                {
                    this.swap(j, j+1);
                }
            }
        }
    }

    /**
     * selection sort algorithm
     * @complexity O(n^2)
     */
    Sorter.prototype.selectionSort = function(){
        var minIdx, temp;
        for(var i = 0; i < this.array.length; i++)
        {
            minIdx = i;
            for(var  j = i+1; j< this.array.length; j++)
            {
                if(this.array[j]<this.array[minIdx])
                {
                    minIdx = j;
                }
            }
            this.swap(i,minIdx);
        }
    }

    /**
     * get current array
     * @returns {*}
     */
    Sorter.prototype.getArray = function(){
        return this.array;
    }

    /**
     * swap between two elements in the array
     * @param i
     * @param j
     */
    Sorter.prototype.swap = function(i, j){
        var sorter = this;
        var temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;
        this.swaps.push({i : i, j : j});
    }

    /**
     * animate swaps using group callback
     */
    Sorter.prototype.animateSwaps = function(){
        var index = 0;
        var sorter = this;

        var interval = setInterval(function(){
            if(index == sorter.swaps.length)
                clearInterval(interval);
            else{
                var currentSwap = sorter.swaps[index];
                if(typeof sorter.group.swap == "function")
                    sorter.group.swap(currentSwap.i, currentSwap.j);

                index = index + 1;
            }
        }, 700);
    }

    /**
     * a generic sort
     * @param type sort type
     */
    Sorter.prototype.sort = function(type){
        if(typeof this[type] == "function"){
            this[type].apply(this);
            this.animateSwaps();
        }
        else
            console.error("Unkown sorting algorithm");
    }

    return Sorter;
});