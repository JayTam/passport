import Clipboard from "clipboard";

/**
 * clipboard指令
 * v-clipboard="绑定要复制的值"
 * v-clipboard:cut="绑定要剪切的值"
 * v-clipboard:success="成功回调函数"
 * v-clipboard:error="失败回调函数"
 */
const clipboard = {
  mounted: function(el, binding) {
    if (binding.arg === "success") {
      el._v_clipboard_success = binding.value;
    } else if (binding.arg === "error") {
      el._v_clipboard_error = binding.value;
    } else {
      const clipboard = new Clipboard(el, {
        text() {
          return binding.value;
        },
        action() {
          return binding.arg === "cut" ? "cut" : "copy";
        },
      });
      clipboard.on("success", e => {
        const callback = el._v_clipboard_success;
        callback && callback(e);
      });
      clipboard.on("error", e => {
        const callback = el._v_clipboard_error;
        callback && callback(e);
      });
      el._v_clipboard = clipboard;
    }
  },
  updated: function(el, binding) {
    if (binding.arg === "success") {
      el._v_clipboard_success = binding.value;
    } else if (binding.arg === "error") {
      el._v_clipboard_error = binding.value;
    } else {
      if (el._v_clipboard) {
        el._v_clipboard.text = function() {
          return binding.value;
        };
        el._v_clipboard.action = function() {
          return binding.arg === "cut" ? "cut" : "copy";
        };
      }
    }
  },
  unmounted: function(el, binding) {
    if (binding.arg === "success") {
      delete el._v_clipboard_success;
    } else if (binding.arg === "error") {
      delete el._v_clipboard_error;
    } else {
      el._v_clipboard?.destroy();
      delete el._v_clipboard;
    }
  },
};

export default clipboard;
