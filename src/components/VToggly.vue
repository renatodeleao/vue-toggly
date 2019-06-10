<script>
export default {
  name: "VToggly",
  props: {
    startActive: {
      default: false
    }
  },
  data() {
    return {
      active: this.startActive,
      controlled: false
    };
  },
  methods: {
    toggle() {
      /**
       * If controlled by manger
       * state is directly handled by toggly but
       * by the manager
       */
      this.$parent.$emit("toggly-toggled", this);
      if (this.controlled) return;
      this.active ? this.deactivate() : this.activate();
    },
    deactivate() {
      this.active = false;
      this.$emit("deactivate");
    },
    activate() {
      this.active = true;
      this.$emit("activate");
    }
  },
  created() {
    if (this.$parent.$options.role !== "manager") return;
    this.controlled = this.$parent.$props.mode !== null;
  },
  render() {
    return this.$scopedSlots.default({
      active: this.active,
      toggle: this.toggle
    });
  }
};
</script>
