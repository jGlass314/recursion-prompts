/*
 Binary search trees (BST), sometimes called ordered or sorted binary trees. They allow fast lookup, addition and removal of items.
 Binary search trees keep their keys in sorted order, so that lookup and other operations can use the principle of binary search.
 Binary Search Trees have the following properties:

  -The left subtree of a node contains only nodes with keys less than the node’s key.
  -The right subtree of a node contains only nodes with keys greater than the node’s key.
  -The left and right subtree each must also be a binary search tree.
  -There must be no duplicate nodes

  More tree terminology:
  Root: The topmost node in a tree
  Leaf: A node with no children
  Siblings: Nodes with the same parent

  The depth of a node is the number of edges from the root to the node.
  The height of a node is the number of edges from the node to the deepest leaf.
  The height of a tree is a height of the root.
  A *full* binary tre is a binary tree in which each node has exactly zero or two children.
  A *complete* binary tree is a binary tree, which is completely filled, with the possible exception of the bottom level, which is filled from left to right.
*/


/*
 CONSTRUCTOR
*/
var BinarySearchTree = function(value) {
  this.value = value;
  this.left = null;
  this.right = null;
};

/*
  Write a function which searches the tree (in any order, BF, DF, pre order, post order, in order are all acceptable)
  and returns back the node which matches the value passed in and the node which would be it's parent if no match is found.
  I: this is a node. the value parameter is the value to search for
  O: if found, the node. if not found, the parent that would have the child as a node
  C: The function should be written using recursion.
  E: this.value or value is undefined
  Time Complexity: What is the time complexity of the this function?
    O(log(n))
*/
BinarySearchTree.prototype.find = function(value) {
  if(value === undefined || this.value === undefined) {
    return null;
  }
  if(value < this.value && this.left !== null) {
    return this.left.find(value);
  }
  if(value > this.value && this.right !== null) {
    return this.right.find(value);
  }
  return this;
};

/*
  Write a function which inserts into the tree at the correct location per the rules (listed above) for Binary Search Trees.
  Your function must be written using recursion. You may re-use any of the other functions listed here.
  I: value to be inserted
  O: the node which was inserted
  C: The function should be written using recursion
  E: the tree already contains the value to be inserted
  Time Complexity: O(log(n))
*/
BinarySearchTree.prototype.insert = function(value) {
  /* WRITE GOOD CODE HERE :) */
  var node = this.find(value);
  if(node.value === value) {
    return node;
  }
  // else, node is parent of node to be inserted
  if(value < node.value) {
    node.left = new BinarySearchTree(value);
    return node.left;
  }
  if(value > node.value) {
    node.right = new BinarySearchTree(value);
    return node.right;
  }
};

/*
  Write a function which returns true if the tree contains the value passed in and false otherwise.
  Your function must be written using recursion.You may re-use any of the other functions listed here.
  I: value to be searched for
  O: boolean, indicating whether or not the value is in the tree
  C: The function should be written using recursion
  E: FILL_ME_IN
  Time Complexity: O(log(n))
*/
BinarySearchTree.prototype.contains = function(value) {
  /* WRITE GOOD CODE HERE :) */
  return this.find(value).value === value;
};


/*
  Write a function which traverses through the Binary Search Tree in *depth* first order and executes the passed in callback function on each node value.
  **Use recursion**. You may re-use any of the other functions listed here.
  See test data below for expected output given certain input to get an example of what the order looks like.
  I: a callback function to be operated on the node
  O: none
  C: The function should be written using recursion
  E: the callback function corrupts the tree
  Time Complexity: O(n)
*/
BinarySearchTree.prototype.depthFirstRecursive = function(cb) {
  /* WRITE GOOD CODE HERE */
  cb(this.value);
  if(this.left) {
    this.left.depthFirstRecursive(cb);
  }
  if(this.right) {
    this.right.depthFirstRecursive(cb);
  }
};

/*
  Write a function which traverses through the Binary Search Tree in *breadth* first order and executes the passed in callback function on each node value.
  **Use recursion**. You may re-use any of the other functions listed here.
  See test data below for expected output given certain input to get an example of what the order looks like.
  I: a callback function
  O: none
  C: The function should be written using recursion
  E: the callback corrupts the tree
  Time Complexity: O(n)
*/
BinarySearchTree.prototype.breadthFirstRecursive = function(cb) {
  /* WRITE GOOD CODE HERE :) */
  var queue = [];
  queue.push(this);
  var recurse = function(cb, queue) {
    if(queue.length === 0) {
      return;
    }
    var node = queue.shift();
    cb(node.value);
    if(node.left) {
      queue.push(node.left);
    }
    if(node.right) {
      queue.push(node.right);
    }
    recurse(cb, queue);
  }
  recurse(cb, queue);

};


/*
   Example callback function you may use.
*/
var logValue = function(val) {
  console.log(val);
}


// ------------- TESTS ----------
const myTree = new BinarySearchTree(10);
myTree.insert(13);
myTree.insert(12);
myTree.insert(8);
myTree.insert(9);
myTree.insert(7);
console.log(myTree.contains(7)); //Logs True
myTree.depthFirstRecursive((val) => console.log(val)); //Logs 10 8 7 9 13 12
myTree.breadthFirstRecursive((val) => console.log(val)); //Logs 10 8 13 7 9 12
// ------------- TESTS ----------
