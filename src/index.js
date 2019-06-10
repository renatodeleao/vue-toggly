import VTogglyManager from "./components/VTogglyManager.vue";
import VToggly from "./components/VToggly.vue";
import TogglyDirective from "./directives";

const DEFAULTS = {
  togglyManagerName: "VTogglyManager",
  togglyName: "VToggly",
  togglyDirectiveName: "VToggly"
};

const VTogglyPlugin = {
  install(Vue, options = {}) {
    /**
     * Makes sure that plugin can be installed only once
     */
    if (this.installed) {
      return;
    }

    this.installed = true;
    this.names = {
      togglyManager: options.togglyManagerName || DEFAULTS.options.togglyManagerName,
      toggly: options.togglyName || DEFAULTS.options.togglyName,
      togglyDirective:
        options.togglyDirectiveName || DEFAULTS.options.togglyDirectiveName
    };

    Vue.component(this.names.togglyManagerName, VTogglyManager);
    Vue.component(this.names.togglyName, VToggly);
    Vue.directive(this.names.togglyDirective, TogglyDirective);
  }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VTogglyPlugin);
  window.VueToggly = VTogglyPlugin;
}

export default VTogglyPlugin;
export { VTogglyManager, VToggly, TogglyDirective };
