class BinaryNode {
  constructor(data = null, left_child = null, right_child = null) {
    this.data = data;
    this.left = left_child;
    this.right = right_child;

  }
  IsNode() {
    if (this.data === null && this.left_child === null && this.right_child === null)
      return true;
    else if (this.data != null)
      return true;
    else
      return false;
  }
  UpdateKey(data, new_data) {
    if (this.data === data)
      this.data = new_data;
  }
}



  class BinaryTree {

      constructor() {
          this.root = null;
          this.animationState = []

      }

      CopyTree(node = this.root) {
          var CloneTree = function(Root) {
              if (Root == null)
                  return null;
              //create new node and make it a copy of node pointed by Root
              var NewNode = new BinaryNode();
              NewNode.data = Root.data; //copying data
              NewNode.left = CloneTree(Root.left); //cloning left child
              NewNode.right = CloneTree(Root.right); //cloning right child
              return NewNode;
          }
          var newTree = CloneTree(node);
          return newTree;
      }

      CreateNode(Key) {
          var NewNode = new BinaryNode(Key);
          return NewNode;
      }

      Insert(Value) {
          var NewNode = this.CreateNode(Value);

          function InsertNode(Root, newNode) {
              var Queue = [];
              Queue.push(Root); //push the root
              while (true) {
                  var node = Queue.pop();
                  if (node.left === null) {
                      node.left = newNode;
                      return;
                  } else {
                      Queue.unshift(node.left)
                  }

                  if (node.right === null) {
                      node.right = newNode;
                      return;
                  } else {
                      Queue.unshift(node.right)
                  }
              }
          }
          if (this.root === null)
              this.root = NewNode;
          else
              InsertNode(this.root, NewNode);
          return this;
      }

      BuildTree(NodeList = null) {
          for (let node in NodeList) {
              this.Insert(NodeList[node]);
          }
          return this;
      }

      GetRootNode() {
          return this.root;
      }

      Size() {
          var CalSize = function(Root) {
              if (Root != null) {
                  return 1 + CalSize(Root.left) + CalSize(Root.right);
              } else {
                  return 0;
              }
          }
          var size = CalSize(this.root);
          return size;
      }

      GenerateState() {
          var stater;

          if (this.root == null) {
              console.log("Root is NULL")
              return null;
          }

          function gen(root, starter) {

              if (root.left != null || root.right != null) {
                  starter.children = []

                  if (root.left != null) {

                      starter.children.push({
                          data: root.left.data
                      })
                      gen(root.left, starter.children[0])
                  }
                  if (root.right != null) {

                      starter.children.push({
                          data: root.right.data
                      })
                      if (starter.children.length > 1) {

                          gen(root.right, starter.children[1])

                      } else {
                          gen(root.right, starter.children[0])

                      }
                  }
              }
          }
          stater = {
              data: this.root.data,
              children: []
          };
          gen(this.root, stater)
          return stater
      }


      InOrder() {
          this.animationState = []
          var context = this;

          function Inorderhelper(Root, node_list) {

              if (Root !== null) {
                  let list = [context.GenerateState(), Root.data, "", "black"]
                  context.animationState.push(list)
                  if (Root.left != null) {
                      Inorderhelper(Root.left, node_list);
                  }
                  // console.log(Root.data); // Need to save states here

                  list = [context.GenerateState(), Root.data, " " + Root.data + " ", "red"]
                  context.animationState.push(list)
                  node_list.push(Root.data);
                  if (Root.right != null) {
                      Inorderhelper(Root.right, node_list);


                      list = [context.GenerateState(), Root.data, "", "black"]
                      context.animationState.push(list)
                  }
                  // return node_list;
              }
          }
          var node_list = [];
          let list = [context.GenerateState(), -999, "In Order : [ ", "black"]
          context.animationState.push(list)
          Inorderhelper(this.root, node_list)

          list = [context.GenerateState(), -999, " ] ", "black"]
          context.animationState.push(list)

          return node_list;
          // console.log(node_list);
      }

      PreOrder() {
          this.animationState = []
          var context = this

          function PreOrderhelper(Root, node_list) {
              if (Root != null) {
                  let list = [context.GenerateState(), Root.data, " " + Root.data + " ", "red"]
                  context.animationState.push(list)
                  node_list.push(Root.data);
                  if (Root.left != null) {
                      PreOrderhelper(Root.left, node_list);
                      list = [context.GenerateState(), Root.data, "", "black"]
                      context.animationState.push(list)
                  }
                  if (Root.right != null) {
                      PreOrderhelper(Root.right, node_list);
                      list = [context.GenerateState(), Root.data, "", "black"]
                      context.animationState.push(list)
                  }
              }
          }
          var node_list = [];

          let list = [context.GenerateState(), -999, "Pre Order : [ ", "black"]
          context.animationState.push(list)
          PreOrderhelper(this.root, node_list);
          list = [context.GenerateState(), -999, " ] ", "black"]
          context.animationState.push(list)
          return node_list;

      }

      PostOrder() {
          this.animationState = []
          var context = this

          function PostOrderhelper(Root, node_list) {
              if (Root != null) {
                  let list = [context.GenerateState(), Root.data, "", "black"]
                  context.animationState.push(list)
                  if (Root.left != null) {
                      PostOrderhelper(Root.left, node_list);
                      list = [context.GenerateState(), Root.data, "", "black"]
                      context.animationState.push(list)
                  }
                  if (Root.right != null) {
                      PostOrderhelper(Root.right, node_list);
                  }
                  list = [context.GenerateState(), Root.data, " " + Root.data + " ", "red"]
                  context.animationState.push(list)

                  node_list.push(Root.data);
              }
          }
          var node_list = [];
          let list = [context.GenerateState(), -999, "Post Order : [ ", "black"]
          context.animationState.push(list)
          PostOrderhelper(this.root, node_list);
          list = [context.GenerateState(), -999, " ] ", "black"]
          context.animationState.push(list)
          // console.log(node_list);
          return node_list;
      }


      Erase() {
          this.root = null;
          return null;
      }


      Height() {
          var HeightWithRoot = function(Root) {
              if (Root == null)
                  return 0;
              let lHeight = HeightWithRoot(Root.left);
              let rHeight = HeightWithRoot(Root.right);
              if (lHeight > rHeight)
                  return 1 + lHeight;
              return 1 + rHeight;
          }
          var height = HeightWithRoot(this.root);
          return height;
      }



      Level() {
          var LevelWithRoot = function(Root) {
              if (Root == null)
                  return 0;
              var lHeight = LevelWithRoot(Root.left);
              var rHeight = LevelWithRoot(Root.right);
              if (lHeight > rHeight)
                  return 1 + lHeight;
              return 1 + rHeight;
          }
          var level = LevelWithRoot(this.root);
          return level;
      }

      Search(Root, Key) {
          if (Root === null)
              return null;
          if (Key == Root.data)
              return Root;
          return (this.Search(Root.left, Key) || this.Search(Root.right, Key));
      }


  };


  class BinarySearchTree extends BinaryTree {
      constructor() {
          super();
      }


      CopyTree(node = this.root) {
          var newTree = new BinarySearchTree();
          var TempTree = new BinaryTree();
          newTree.root = TempTree.CopyTree(this.root);
          return newTree;
      }

      FindMinimum() {
          this.animationState = []
          if (this.root == null) {
              let list = [this.GenerateState(), -999, "Tree is empty!<br>", "black"]
              this.animationState.push(list)
              return null;
          }
          this.FindMinNode(this.root)
      }

      FindMinNode(Root) {
          if (Root.left === null) {
              let list = [this.GenerateState(), Root.data, "Since (" + Root.data + ") node has no left child therefore (" + Root.data + ") is the minimum valued node.<br>", "blue"]
              this.animationState.push(list)

              list = [this.GenerateState(), Root.data, "", "blue"]
              this.animationState.push(list)

              list = [this.GenerateState(), Root.data, "", "blue"]
              this.animationState.push(list)
              return Root;

          } 
          else {
              let list = [this.GenerateState(), Root.data, "Since (" + Root.data + ") has a left child (" + Root.left.data + ") so we will continue traversing its left child to find the minimum node<br>", "black"]
              this.animationState.push(list)

              return this.FindMinNode(Root.left);
          }

      }
      Search(data) {
          this.animationState = []
          return this.SearchFactory(data)
      }
      SearchFactory(data) {
          var context = this
          var SearchWithRoot = function(Root, Key) {
              if (Root === null) {
                  let list = [context.GenerateState(), -999, "We've encountered a null node while searching for (" + Key + "). This implies that the search key is not present<br>", "black"]
                  context.animationState.push(list)
                  return null;
                  
              }
              else if (Key < Root.data) {
                  let list = [context.GenerateState(), Root.data, "Since (" + Key + ") is less than (" + Root.data + ") so we traverse left <br>", "black"]
                  context.animationState.push(list)
                  return SearchWithRoot(Root.left, Key);
                  
              } 
              else if (Key > Root.data) {
                  let list = [context.GenerateState(), Root.data, "Since (" + Key + ") is greater than (" + Root.data + ") so we traverse right <br>", "black"]
                  context.animationState.push(list)
                  return SearchWithRoot(Root.right, Key);

              } 
              else {
                  let list = [context.GenerateState(), Root.data, "(" + Key + ") Found! <br>", "#ffae42"]
                  context.animationState.push(list)
                  list = [context.GenerateState(), Root.data, "", "#ffae42"]
                  context.animationState.push(list)
                  list = [context.GenerateState(), Root.data, "", "#ffae42"]
                  context.animationState.push(list)
                  return Root;
                  
              }
          }
          var found = SearchWithRoot(this.root, data);
          return found;
      }

      RightSubTree() {
          var newTree = new BinarySearchTree();
          var TempTree = new BinaryTree();
          newTree.root = TempTree.CopyTree(this.root.right);
          return newTree;
      }
      
      LeftSubTree() {
          var newTree = new BinarySearchTree();
          var TempTree = new BinaryTree();
          newTree.root = TempTree.CopyTree(this.root.left);
          return newTree;
      }


      Insert(Key) {
          
          var found = this.SearchFactory(Key);
          if (found !== null) {
              console.log("Node with value (", Key, ") already exists! No insertion done");
              this.animationState = []
              let list = [this.GenerateState(), -999, "Node with value (" + Key + ") already exists! Therefore no insertion done", "black"]
              this.animationState.push(list)
              return this;
          }

          var NewNode = this.CreateNode(Key);
          var context = this;

          function InsertNode(Root, newNode) {
              if (newNode.data < Root.data) {
                  let list = [context.GenerateState(), Root.data, "Since (" + newNode.data + ") is less than (" + Root.data + ") so we will traverse left <br>", "black"]
          context.animationState.push(list)
                  if (Root.left === null) {
                      let list = [context.GenerateState(), Root.data, "Since (" + Root.data + ") has no left-child, so we will add the node as the left-child <br>", "black"]
                      context.animationState.push(list)
                      Root.left = newNode;
                      list = [context.GenerateState(), newNode.data, "(" + newNode.data + ") added to the tree <br>", "#006400"]

                      context.animationState.push(list)
                      list = [context.GenerateState(), newNode.data, "", "#006400"]
                      context.animationState.push(list)
                      list = [context.GenerateState(), newNode.data, "", "#006400"]
                      context.animationState.push(list)
                  } 
                  else
                      InsertNode(Root.left, newNode);
              }
              else {
                  let list = [context.GenerateState(), Root.data, "Since (" + newNode.data + ") is greater than (" + Root.data + ") so we will traverse right <br>", "black"]
                  context.animationState.push(list)
                  if (Root.right === null) {
                      let list = [context.GenerateState(), Root.data, "Since (" + Root.data + ") has no right-child, so we will add the node as the right-child <br>", "black"]
                      context.animationState.push(list)
                      Root.right = newNode;
                      list = [context.GenerateState(), newNode.data, "(" + newNode.data + ") added to the tree <br>", "#006400"]
                      context.animationState.push(list)
                      list = [context.GenerateState(), newNode.data, "", "#006400"]
                      context.animationState.push(list)
                      list = [context.GenerateState(), newNode.data, "", "#006400"]
                      context.animationState.push(list)

                  } 
                  else {

                      InsertNode(Root.right, newNode);

                  }
              }
          }

          if (this.root === null) {
              this.root = NewNode;
              this.animationState = []
              var list = [this.GenerateState(), this.root.data, "Tree has no nodes thus we add (" + NewNode.data + ") as the root node <br>", "#006400"]
              this.animationState.push(list)
              
              list = [context.GenerateState(), this.root.data, "", "#006400"]
              this.animationState.push(list)
              list = [context.GenerateState(), this.root.data, "", "#006400"]
              this.animationState.push(list)

          }
          else {
              this.animationState = []
              var list = [this.GenerateState(), this.root.data, "We Insert to the tree by exploring from the root node <br>", "black"]
              this.animationState.push(list)

              InsertNode(this.root, NewNode);

          }
          return this;
      }



      BuildTree(NodeList = null) {
          for (let node in NodeList) {
              this.Insert(NodeList[node]);
          }
          return this;
      }

      Remove(data) {
          this.animationState = []
          var context = this
          var found = this.SearchFactory(data);
          if (found === null) {
              console.log("Node with data (", data, ") not found!");
              return this;
          }
          this.animationState = []
          var that = this;
          
          function RemoveNode(Root, data) {
              if (Root === null)
                  return null;
              else if (data < Root.data) {
                  let list = [context.GenerateState(), Root.data, "Since (" + data + ") is less than (" + Root.data + ") so we will traverse left <br>", "black"]
                  context.animationState.push(list)
                  Root.left = RemoveNode(Root.left, data);
                  return Root;
              }
              else if (data > Root.data) {
                  let list = [context.GenerateState(), Root.data, "Since (" + data + ") is greater than (" + Root.data + ") so we will traverse right <br>", "black"]
                  context.animationState.push(list)
                  Root.right = RemoveNode(Root.right, data);
                  return Root;
              } 
              else {
                  let list = [context.GenerateState(), Root.data, "Reached (" + Root.data + ") node <br>", "red"]
                  context.animationState.push(list)
                  
                  if (Root.left === null && Root.right === null) {
                      list = [context.GenerateState(), Root.data, "Since (" + Root.data + ") has no children so will return null to its parent <br>", "red"]
                      context.animationState.push(list)

                      Root = null;
                      return Root;
                  }
                  if (Root.left === null) {
                      list = [context.GenerateState(), Root.data, "Since (" + Root.data + ") has no left child but a right child, so we will attach the right child i.e. (" + Root.right.data + ")  to (" + Root.data + ")'s parent node <br>", "red"]
                      context.animationState.push(list)
                      Root = Root.right;
                      return Root;
                  }
                  else if (Root.right === null) {
                      let list = [context.GenerateState(), Root.data, "Since (" + Root.data + ") has no right child but a left child so  we will attach the left child i.e. (" + Root.left.data + ")  to (" + Root.data + ")'s parent <br>", "red"]
                      context.animationState.push(list)
                      Root = Root.left;
                      return Root;
                  }
                  list = [context.GenerateState(), Root.data, "Since (" + Root.data + " has both a left child as well as a right child so we will pick the minimum of the (" + Root.data + ")s right subtree i.e the successor node<br>", "red"]
                  context.animationState.push(list)
                  var aux = that.FindMinNode(Root.right);
                  list = [context.GenerateState(), Root.data, "Now (" + Root.data + ") will get replaced by (" + aux.data + ") <br>", "red"]
                  context.animationState.push(list)
                  Root.data = aux.data;

                  list = [context.GenerateState(), Root.data, "Now we will delete (" + aux.data + ") from  the right subtree. Deletion Complete.<br>", "red"]
                  context.animationState.push(list)
                  Root.right = RemoveNode(Root.right, aux.data);
                  return Root;
              }
          }
          
          this.root = RemoveNode(this.root, data);
          let list = [context.GenerateState(), -999, "We now have the Resultant Tree after performing deletion <br>", "black"]
          context.animationState.push(list)
          return this;
      }


  };



///////////////////////////////////////////////////////////////////////////////////

// The following code provides the developer with the basic functions on AVL Trees (through developer console) //
// It has not yet been interfaced with the renderer and presently not available for use by the end-user //

///////////////////////////////////////////////////////////////////////////////////

class AVLNode extends BinaryNode
{
  constructor(data = null,left_child = null,right_child = null){
      super(data,left_child,right_child);
      this.height=0;

  }
};

class AVLTree extends BinarySearchTree{

// A utility function to get the height of the tree
height(N)
{
    if (N === null)
        return 0;
    return N.height;
}

// A utility function to get maximum of two integers
max(a,b)
{
    if(a>b)
    {
      return a;
    }
    return b;
}

/* Helper function that allocates a new node with the given data and
    NULL left and right pointers. */
newNode(data)
{
    var node = new AVLNode();
    node.data   = data;
    node.height = 1;  // new node is initially added at leaf
    return node;
}

// A utility function to right rotate subtree rooted with y
// See the diagram given above.
rightRotate(y)
{
    var x = y.left;
    var T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    y.height = this.max(this.height(y.left), this.height(y.right))+1;
    x.height = this.max(this.height(x.left), this.height(x.right))+1;

    // Return new root
    return x;
}

// A utility function to left rotate subtree rooted with x
// See the diagram given above.
leftRotate(x)
{
  var  y = x.right;
  var  T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    //  Update heights
    x.height = this.max(this.height(x.left), this.height(x.right))+1;
    y.height = this.max(this.height(y.left), this.height(y.right))+1;

    // Return new root
    return y;
}

// Get Balance factor of node N
getBalance(N)
{
    if (N === null)
        return 0;
    return this.height(N.left) - this.height(N.right);
}
Insert(data){

this.root =   this.inserthelper(this.root,data);
}
// Recursive function to insert a data in the subtree rooted
// with node and returns the new root of the subtree.
inserthelper(node,data)
{
    /* 1.  Perform the normal BST insertion */
    if (node === null)
        return(this.newNode(data));

    if (data < node.data)
        node.left  = this.inserthelper(node.left, data);
    else if (data > node.data)
        node.right = this.inserthelper(node.right, data);
    else // Equal datas are not allowed in BST
        return node;

    /* 2. Update height of this ancestor node */
    node.height = 1 + this.max(this.height(node.left),
                           this.height(node.right));

    /* 3. Get the balance factor of this ancestor
          node to check whether this node became
          unbalanced */
  var  balance = this.getBalance(node);

    // If this node becomes unbalanced, then
    // there are 4 cases

    // Left Left Case
    if (balance > 1 && data < node.left.data)
        return this.rightRotate(node);

    // Right Right Case
    if (balance < -1 && data > node.right.data)
        return this.leftRotate(node);

    // Left Right Case
    if (balance > 1 && data > node.left.data)
    {
        node.left =  this.leftRotate(node.left);
        return this.rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && data < node.right.data)
    {
        node.right = rightRotate(node.right);
        return this.leftRotate(node);
    }

    /* return the (unchanged) node pointer */
    return node;
}
minValueNode(node)
{
var current = node;

    /* loop down to find the leftmost leaf */
    while (current.left != null)
        current = current.left;

    return current;
}

// Recursive function to delete a node with given data
// from subtree with given root. It returns root of
// the modified subtree.
Delete(data){
  this.root = this.deleteNode(this.root,data);
}
deleteNode(root,data)
{
    // STEP 1: PERFORM STANDARD BST DELETE

    if (root ===null)
        return root;

    // If the data to be deleted is smaller than the
    // root's data, then it lies in left subtree
    if ( data < root.data )
        root.left = this.deleteNode(root.left, data);

    // If the data to be deleted is greater than the
    // root's data, then it lies in right subtree
    else if( data > root.data )
        root.right = this.deleteNode(root.right, data);

    // if data is same as root's data, then This is
    // the node to be deleted
    else
    {
        // node with only one child or no child
        if( (root.left === null) || (root.right === null) )
        {
            var temp = root.left ? root.left : root.right;

            // No child case
            if (temp === null)
            {
                temp = root;
                root = null;
            }
            else // One child case
              root = temp; // Copy the contents of
                            // the non-empty child

        }
        else
        {
            // node with two children: Get the inorder
            // successor (smallest in the right subtree)
            temp = this.minValueNode(root.right);

            // Copy the inorder successor's data to this node
            root.data = temp.data;

            // Delete the inorder successor
            root.right = this.deleteNode(root.right, temp.data);
        }
    }

    // If the tree had only one node then return
    if (root === null)
      return root;

    // STEP 2: UPDATE HEIGHT OF THE CURRENT NODE
    root.height = 1 + this.max(this.height(root.left),
                           this.height(root.right));

    // STEP 3: GET THE BALANCE FACTOR OF THIS NODE (to
    // check whether this node became unbalanced)
    var balance = this.getBalance(root);

    // If this node becomes unbalanced, then there are 4 cases

    // Left Left Case
    if (balance > 1 && this.getBalance(root.left) >= 0)
        return this.rightRotate(root);

    // Left Right Case
    if (balance > 1 && this.getBalance(root.left) < 0)
    {
        root.left =  this.leftRotate(root.left);
        return this.rightRotate(root);
    }

    // Right Right Case
    if (balance < -1 && this.getBalance(root.right) <= 0)
        return this.leftRotate(root);

    // Right Left Case
    if (balance < -1 && this.getBalance(root.right) > 0)
    {
        root.right = this.rightRotate(root.right);
        return this.leftRotate(root);
    }

    return root;
}


};
