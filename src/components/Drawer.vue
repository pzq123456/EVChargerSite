<template>
    <div class="drawer" :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
      <div
        class="drawer__content"
          :style="{
            maxWidth: maxWidth,
            transitionDuration: `${speed}ms`,
            backgroundColor: backgroundColor,
            backdropFilter: `blur(${blur})`,
          }">
        <slot></slot>
      </div>
    </div>
</template>

<script>

export default {
  name: "Drawer",

  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },

    maxWidth: {
      type: String,
      required: false,
      default: "600px",
    },

    // Transition Speed in Milliseconds
    speed: {
      type: Number,
      required: false,
      default: 300,
    },

    backgroundColor: {
      type: String,
      required: false,
      default: "--vp-c-bg"
    },

    // 高斯模糊
    blur: {
      type: String,
      required: false,
      default: "5px",
    },
  },

  data() {
    return {
      isVisible: false,
      isTransitioning: false,
    };
  },

  watch: {
    isOpen(val) {
      this.isTransitioning = true;

      if (val) {
        this.toggleBackgroundScrolling(true);
        this.isVisible = true;
      } else {
        this.toggleBackgroundScrolling(false);
        setTimeout(() => (this.isVisible = false), this.speed);
      }

      setTimeout(() => (this.isTransitioning = false), this.speed);
    },
  },

  methods: {
    toggleBackgroundScrolling(enable) {
      const body = document.querySelector("body");

      body.style.overflow = enable ? "hidden" : null;
    },

    closeDrawer() {
      // console.log("closeDrawer");
      if (!this.isTransitioning) {
        this.$emit("close");
      }
    },

    openDrawer() {
      // console.log("openDrawer");
      if (!this.isTransitioning) {
        this.$emit("open");
      }
    },
  },

  mounted() {
    this.isVisible = this.isOpen;
  },
};
</script>

<style scoped>
  .drawer {
    visibility: hidden;
  }

  .drawer.is-visible {
    visibility: visible;
  }

  .drawer.is-open .drawer__content {
    transform: translateX(0);
  }

  .drawer__content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;
    overflow: auto;
    transition-property: transform;
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    box-shadow: 0 2px 6px var(--vp-c-gutter);
  }
</style>