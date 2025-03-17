<template>
  <div class="dropdown" @click="toggleDropdown">
    <h1 class="dropdown-title">
      {{ selectedTitle }}
      <svg
        v-if="isDropdownOpen"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-caret-up-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-caret-down-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
        />
      </svg>
    </h1>
    <transition name="fade">
      <ul v-if="isDropdownOpen" class="dropdown-menu">
        <li v-for="(item, key) in options" :key="key" class="dropdown-item">
          <a
            :href="base + item.url"
            class="dropdown-link"
            :class="{ 'dropdown-item-active': selectedTitle === item.title }"
            @click="selectedTitle = item.title"
          >
            {{ item.title }}
          </a>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// vitepress 中获取 base 并拼接路径
const base = import.meta.env.BASE_URL;

// 接收属性
const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  defaultKey: {
    type: String,
    required: true,
  },
});

const isDropdownOpen = ref(false);
const selectedTitle = ref('');

// 初始化默认显示值
selectedTitle.value = props.options[props.defaultKey].title;

// 切换下拉框状态
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<style scoped>
.dropdown {
  margin: 1px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  padding: 5px 10px;
  width: 100%;
  transition: all 0.3s;
  border: 1px solid var(--vp-c-divider); /* 添加边框 */
  background-color: var(--vp-c-bg); /* 使用背景变量 */
}

.dropdown:hover {
  border-color: var(--vp-c-brand-1); /* 悬停时改变边框颜色 */
}

.dropdown-title {
  display: flex;
  font-size: 1.5em;
  color: var(--vp-c-brand-1); 
  font-weight: bold;
  align-items: center;
  /* 居中文字 */
  justify-content: center;
}

.dropdown svg {
  margin-left: 8px;
  fill: var(--vp-c-text-2); /* 使用文本颜色变量 */
  transition: transform 0.3s;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  padding: 8px 0;
  list-style: none;
  background-color: var(--vp-c-bg-soft); /* 使用背景变量 */
  border-radius: 8px;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  border: 1px solid var(--vp-c-divider); /* 添加边框 */
}

.dropdown-item {
  padding: 8px 16px;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: var(--vp-c-default-soft); /* 使用默认背景变量 */
}

/* 高亮当前选择的item */
.dropdown-item-active {
  background-color: var(--vp-c-warning-soft); /* 使用默认背景变量 */
  /* 加粗 */
  font-weight: 600;
}

.dropdown-link {
  text-decoration: none;
  color: var(--vp-c-text-1); /* 使用文本颜色变量 */
  display: block;
  width: 100%;
}

.dropdown-link:hover {
  text-decoration: underline;
  color: var(--vp-c-brand-2); /* 使用品牌色变量 */
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>