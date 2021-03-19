<script>

  function TreeNode (val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }

  const tree = new TreeNode(0)
  tree.left = new TreeNode(1)
  tree.right = new TreeNode(2)
  console.log(tree)
</script>

<style></style>

<div>{tree.val}</div>
<ul>
  <li>{tree.left.val}</li>
  <li>{tree.right.val}</li>
</ul>