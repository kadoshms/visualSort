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
        this.actions = [];
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
        this.animateSwaps();
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
        this.animateSwaps();
    }

    /**
     * merge sort alogirthm
     * @complexity O(nlog(n))
     * @refference http://www.stoimen.com/blog/2010/07/02/friday-algorithms-javascript-merge-sort/
     */
    Sorter.prototype.mergeSortAction = function(arr){
        if (arr.length < 2)
            return arr;

        var middle = parseInt(arr.length / 2);
        var left   = arr.slice(0, middle);
        var right  = arr.slice(middle, arr.length);

        var group = this.group;

        // merge and use callback
        return Utils.merge(this.mergeSortAction(left), this.mergeSortAction(right), function(a, b){
            group.swap(a, b);
        });
    }

    /**
     * merge sort delegator
     */
    Sorter.prototype.mergeSort = function(){
        var arr = this.array;

        arr = this.mergeSortAction(arr);
        this.array = arr;
    }

    /**
     * quick sort partition method
     * @param items
     * @param left
     * @param right
     * @returns {*}
     */
    Sorter.prototype.partition = function(items, left, right) {

        var pivot   = items[Math.floor((right + left) / 2)],
            i       = left,
            j       = right;


        while (i <= j) {

            while (items[i] < pivot) {
                i++;
            }

            while (items[j] > pivot) {
                j--;
            }

            if (i <= j) {
                this.swap(i, j);
                i++;
                j--;
            }
        }

        return i;
    }

    /**
     * quick sort algorithm
     * @param items
     * @param left
     * @param right
     * @returns {*}
     */
    Sorter.prototype.quickSortAction = function(items, left ,right){
        var index = undefined;

        if (items.length > 1) {

            left = typeof left != "number" ? 0 : left;
            right = typeof right != "number" ? items.length - 1 : right;

            index = this.partition(items, left, right);

            if (left < index - 1) {
                this.quickSortAction(items, left, index - 1);
            }

            if (index < right) {
                this.quickSortAction(items, index, right);
            }
        }

        return items;
    }

    /**
     * quick sort delegator
     */
    Sorter.prototype.quickSort = function(){
        var arr = this.array;
        this.array = this.quickSortAction(arr);
        this.animateSwaps();
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

        if(i != j)
            this.actions.push({i : i, j : j});
    }

    /**
     * animate swaps using group callback
     */
    Sorter.prototype.animateSwaps = function(){
        var index = 0;
        var sorter = this;

        var interval = setInterval(function(){
            if(index == sorter.actions.length)
                clearInterval(interval);
            else{
                var currentSwap = sorter.actions[index];
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
        }
        else
            console.error("Unkown sorting algorithm");
    }

    return Sorter;
});