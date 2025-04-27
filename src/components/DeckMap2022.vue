<template>


  <div id = "deck-map"> </div>
    <div id="control-panel">

      <div class="tool-bar" :class= "{collapsed: togglePanel}">
        <button class = "cn" @click="cnV">China</button>
        <button class = "eu" @click="euV">Europe</button>
        <button class = "us" @click="usV">USA</button>
        <button class = "animation" @click="animationV">Animation</button>
        <!-- <button class="togglePanel" @click="togglePanel = !togglePanel">
          Panel {{ togglePanel ? 'OFF' : 'ON' }}
        </button> -->
      </div>

      <div class="legned">
        <div style="background-color: rgb(1, 152, 189); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(73, 227, 206); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(216, 254, 181); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(254, 237, 177); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(254, 173, 84); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(209, 55, 78); width: 16.6666668%; height: 10px;"></div>
      </div>

      <div class="legnd-info">
        <span>Lower</span>
        <span>Higher</span>
      </div>
    </div>
</template>

<script setup>
import { 
  loadDeckResources, 
  cleanupDeckResources, 
  main, 
  AnimationManager,
  viewPresets 
} from '@/components/DeckMapUtils.js'
import { onMounted, onUnmounted, ref } from 'vue';
import { data } from '@/loader/points2.data.js'; // 2024年数据

const togglePanel = ref(false);
const deckmap = ref(null);
let deckgl = null;
let animationManager = null;

onMounted(() => {
    loadDeckResources(main, 'deck-map', data).then((deck) => {
        deckgl = deck;
        animationManager = new AnimationManager(deckgl);
    });
});

// 手动控制函数
function cnV() { 
  animationManager.flyTo(viewPresets.china); 
}
function euV() { 
  animationManager.flyTo(viewPresets.europe); 
}
function usV() { 
  animationManager.flyTo(viewPresets.usa); 
}

function animationV(){
  // 关闭 panel
  togglePanel.value = true;
  animationManager.startAutoAnimation(
    ()=>{ // 动画结束额回调函数
      // 打开 panel
      togglePanel.value = false;
    }
  );
}

onUnmounted(() => {
    if (animationManager) {
        animationManager.destroy();
    }
    if (deckgl) {
        deckgl.finalize();
        deckgl.canvas.remove();
        deckgl = null;
    }
    cleanupDeckResources();
});
</script>

<style scoped>

#control-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 12px;
  padding: 20px;
  z-index: 1;
  border: 1px solid var(--vp-c-border); /* 使用边框变量 */
  border-radius: 5px;
  box-shadow: var(--vp-shadow-1); /* 使用阴影变量 */
  backdrop-filter: blur(8px); /* 添加背景模糊效果 */
  /* 设置字体为 Arial 粗体*/
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 20px;
}


/* control panel 折叠后的样式*/
.tool-bar.collapsed {
  /* 确保宽度不变的情况下，隐藏内容 */
  overflow: hidden;
  height: 0;
}

label {
  display: inline-block;
  width: 140px;
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

input {
  width: 100px;
  padding: 5px;
  border: 1px solid var(--vp-c-border); /* 使用边框变量 */
  border-radius: 3px;
  background-color: var(--vp-c-bg); /* 使用背景变量 */
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

.legned {
  display: flex;
  justify-content: space-between;
  margin-top: 10px; /* 添加间距 */
}

.legnd-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

#deck-map {
  height: 78vh;
  width: 100%;
  z-index: 0;
  margin: 0 auto;
  border-radius: 5px; /* 添加圆角 */
  overflow: hidden; /* 隐藏溢出内容 */
}



button {
  padding: 8px 16px; /* 增加按钮内边距 */
  margin: 0 5px;
  border: 1px solid var(--vp-c-bg-soft); /* 使用成功色 */
  border-radius: 5px; /* 增加圆角 */
  background-color: var(--vp-c-green-soft); /* 使用成功色 */
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
  cursor: pointer;
  font-weight: 500; /* 增加字体粗细 */
}

button:hover {
  background-color: var(--vp-c-bg-soft); /* 使用背景变量 */
  border: 1px solid var(--vp-c-green-1);
}

</style>