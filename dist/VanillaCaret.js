(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('VanillaCaret', ['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.VanillaCaret = mod.exports;
  }
})(this, function (module) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var VanillaCaret = function () {
    function VanillaCaret(target) {
      _classCallCheck(this, VanillaCaret);

      this.target = target;
      this.isContentEditable = target && target.contentEditable;
    }

    _createClass(VanillaCaret, [{
      key: 'getPos',
      value: function getPos() {
        if (document.activeElement !== this.target) {
          return -1;
        }
        if (this.isContentEditable === 'true') {
          this.target.focus();
          var _range = document.getSelection().getRangeAt(0);
          var range = _range.cloneRange();
          range.selectNodeContents(this.target);
          range.setEnd(_range.endContainer, _range.endOffset);
          return range.toString().length;
        }

        return this.target.selectionStart;
      }
    }, {
      key: 'setPos',
      value: function setPos(position) {
        if (this.isContentEditable === 'true') {
          if (position >= 0) {
            var selection = window.getSelection();
            var range = this.createRange(this.target, {
              count: position
            });
            if (range) {
              range.collapse(false);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        } else {
          this.target.focus();
          this.target.setSelectionRange(position, position);
        }
      }
    }, {
      key: 'createRange',
      value: function createRange(node, chars, range) {
        if (!range) {
          range = document.createRange();
          range.selectNode(node);
          range.setStart(node, 0);
        }
        if (chars.count === 0) {
          range.setEnd(node, chars.count);
        } else if (node && chars.count > 0) {
          if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
              chars.count -= node.textContent.length;
            } else {
              range.setEnd(node, chars.count);
              chars.count = 0;
            }
          } else {
            for (var lp = 0; lp < node.childNodes.length; lp++) {
              range = this.createRange(node.childNodes[lp], chars, range);
              if (chars.count === 0) {
                break;
              }
            }
          }
        }
        return range;
      }
    }]);

    return VanillaCaret;
  }();

  module.exports = VanillaCaret;
});