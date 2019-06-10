<script>
export default {
  name: "VTogglyManager",
  role: "manager",
  props: {
    mode: {
      default: null,
      type: [String],
      validator(v) {
        return [null, "accordion", "last-toggly-stands"].indexOf(v) !== -1;
      }
    }
  },
  // computed props for accessing elements
  computed: {
    togglies() {
      return this.$children;
    }
  },
  methods: {
    deactivateAll() {
      this.togglies.map(el => el.deactivate());
    },
    activateAll() {
      this.togglies.map(el => el.activate());
    },
    /**
     * Controls the sate of Toggly Instances
     * @param {Instance} VToggly - A toggly component instance
     * @private
     */
    _manage(VToggly) {
      if (this.mode === "last-toggly-stands" && VToggly.active) return;

      this.$emit("change", {
        prev: this.togglies.filter(t => t.active),
        next: VToggly
      });

      // god doesn't act on its children
      // let's them be free...
      // of couse he can decide to terminate
      // them all.. but they're free yet
      if (!this.mode) return;

      // before i active this new toggly check if is there a sibling active
      this.togglies
        .filter(toggly => toggly._uid !== VToggly._uid)
        .map(toggly => toggly.deactivate());

      VToggly.active
        ? VToggly.deactivate()
        : VToggly.activate();
    }
  },
  render() {
    return this.$scopedSlots.default({
      deactivateAll: !this.mode ? this.deactivateAll : () => {},
      activateAll: !this.mode ? this.activateAll : () => {}
    });
  },
  created() {
    this.$on("toggly-toggled", this._manage);
  },
  mounted () {
    if (this.mode === "last-toggly-stands" || this.mode === "accordion") {
      let activeTogglies = this.togglies.filter(t => t.active)
      if (activeTogglies.length === 0 && this.mode === "last-toggly-stands") {
        this.togglies[0].activate()
        console.warn(`👮‍♂️TogglyManager: You’re using "last-toggly-stands" mode, at least one toggly is required to start and or be active in this mode. First toggly found was activated as penalty for breaking the law`)
      }

      if(activeTogglies.length > 1) {
        // let the first founded up, deactivate the rest
        activeTogglies.slice(1).map(t => t.deactivate())
        console.warn(`👮‍♂️TogglyManager: You’re using "${this.mode}" mode, only one toggly active is allowed at once; ${activeTogglies.length} active togglies were found at Manager mount. Keeping first found active, deactivating the remaingin siblings.
        If you want to have more than one active at the same time, please remove mode prop`)
      }
    }
  }
};
</script>
