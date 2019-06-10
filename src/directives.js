/**
 * Experimental: use at your own risk
 */

const togglyDirective = function() {
  const DEFAULTS = {
    className: "is-active"
  };

  const toggleClass = function(el, target, className) {
    el.classList.toggle(className);
    target.classList.toggle(className);
  };

  let toggleRef;

  return {
    // alled only once, when the directive is first bound to the element. This is where you can do one-time setup work.
    // bind(el, binding, vnode) {
    inserted(el, binding, vnode) {
      // <div v-toggly="null">
      if (binding.value != null) {
        let opts;
        if (typeof binding.value === "object") {
          opts = { ...DEFAULTS, ...binding.value };
        } else {
          opts = { ...DEFAULTS, target: binding.value };
        }

        let target = vnode.context.$refs[opts.target];

        toggleRef = function() {
          toggleClass(el, target, opts.className);
        };

        vnode.elm.addEventListener("click", toggleRef);
      } else {
        throw Error("we do not support empty values, please pass a ref");
      }
    },
    // update(el, binding, vnode, oldVnode){

    // },
    // componentUpdate(el, binding, vnode, oldVnode){

    // },
    unbind(el, binding, vnode) {
      el.removeEventListener("click", toggleRef);
    }
  };
};

const TogglyDirective = togglyDirective();
export default TogglyDirective;
