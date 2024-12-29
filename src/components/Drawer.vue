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
      default: "500px",
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

  // unmounted 时，恢复滚动
  beforeUnmount() {
    this.toggleBackgroundScrolling(false);
    // 同时关闭自身
    this.closeDrawer();
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
  max-width: 400px; /* 限制抽屉宽度，避免过大 */
  z-index: 9999;
  overflow: auto;
  transition: transform 0.3s ease-in-out; /* 添加平滑过渡效果 */
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  background-color: var(--vp-c-bg); /* 使用背景变量 */
  box-shadow: 0 2px 6px var(--vp-c-divider); /* 使用分割线颜色作为阴影 */
}

.controlBar {
  margin-top: auto;
  padding: 10px; /* 增加内边距 */
  display: flex;
  justify-content: flex-end;
  background-color: var(--vp-c-bg-soft); /* 使用背景变量 */
  position: sticky;
  bottom: 0;
  border-top: 1px solid var(--vp-c-border); /* 添加上边框 */
}

.close-btn {
  padding: 8px 16px; /* 增加按钮内边距 */
  background-color: var(--vp-c-danger-1); /* 使用危险色变量 */
  color: var(--vp-c-white); /* 使用白色文本 */
  border: none;
  border-radius: 4px; /* 圆角 */
  cursor: pointer;
  font-family: var(--vp-font-family-base); /* 使用默认字体 */
  transition: background-color 0.2s ease-in-out; /* 添加悬停过渡效果 */
}

.close-btn:hover {
  background-color: var(--vp-c-danger-2); /* 悬停时使用更亮的危险色 */
}
</style>