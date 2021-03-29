let id = 0
export default function TreeNode (val = undefined, left = null, right = null) {
	this.val = val
	this.right = right
	this.left = left
	this.key = id++
}