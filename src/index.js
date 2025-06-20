export default class VanillaCaret {
  /**
   * Create a new caret helper.
   *
   * @param {HTMLElement} target element to read or set the caret position on
   */
  constructor(target) {
    this.target = target
    this.isContentEditable = target && target.contentEditable
  }

  /**
   * Return the current caret position.
   *
   * @returns {number} -1 if element is not in focus
   */
  getPos() {
    // for contenteditable field
    if (document.activeElement !== this.target) {
      return -1
    }
    if (this.isContentEditable === 'true') {
      this.target.focus()
      let _range = document.getSelection().getRangeAt(0)
      let range = _range.cloneRange()
      range.selectNodeContents(this.target)
      range.setEnd(_range.endContainer, _range.endOffset)
      return range.toString().length
    }
    // for textarea/input element
    return this.target.selectionStart
  }

  /**
   * Set the caret position.
   *
   * @param {number} position caret position to set
   */
  setPos(position) {
    if (this.isContentEditable === 'true') {
      if (position >= 0) {
        const selection = window.getSelection()
        const range = this.createRange(this.target, {
          count: position
        })
        if (range) {
          range.collapse(false)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }
    } else {
      this.target.focus();
      this.target.setSelectionRange(position, position)
    }
  }

  /**
   * Helper used to create a range for a given position.
   *
   * @param {Node} node  node to inspect
   * @param {{count: number}} chars current characters left
   * @param {Range} [range] working range
   * @returns {Range}
   */
  createRange(node, chars, range) {
    if (!range) {
      range = document.createRange()
      range.selectNode(node)
      range.setStart(node, 0)
    }
    if (chars.count === 0) {
      range.setEnd(node, chars.count)
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length
        } else {
          range.setEnd(node, chars.count)
          chars.count = 0
        }
      } else {
        for (let lp = 0; lp < node.childNodes.length; lp++) {
          range = this.createRange(node.childNodes[lp], chars, range)
          if (chars.count === 0) {
            break
          }
        }
      }
    }
    return range
  }
}
