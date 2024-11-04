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
        <div class="controlBar">
          <button @click="closeDrawer" class="close-btn">Close > </button>
        </div>
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
      default: "450px",
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
      default: "var(--vp-c-bg)",
    },

    // 高斯模糊
    blur: {
      type: String,
      required: false,
      default: "30px",
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

  .controlBar {
    /* 位于父元素最底部 */
    margin-top: auto;
    padding: 5px;
    display: flex;
    justify-content: flex-end;
    background-color: var(--vp-c-gutter);
  }

  .close-btn {
    padding: 5px 10px;
    background-color: var(--vp-c-danger-1);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>