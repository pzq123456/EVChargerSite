<template>
    <div>
        <div class="country">
            <h1>{{ country }}</h1>
            <!-- 渲染 flag emoji -->
            <div v-if="timezone" class="flag">
                <img :src="flag" alt="flag" />
                <!-- {{ flag }} -->
            </div>

            <!-- 渲染当前时间 -->
            <div v-if="localTime" class="time">
                <p class="num">{{ localTime }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
import { pinyin } from 'pinyin-pro';

import { ref, defineProps, computed, watch } from 'vue';
import { data } from '@/loader/euTimeZone.data.js';

const props = defineProps({
  country: String,
  countryFlag: String
});

// 若 country 为中文字符，则转换为拼音
// computed pinyin('汉语拼音', { toneType: 'none' }); // 'han yu pin yin'
const country = computed(() => {
    if (isChineseChar(props.country)) {
        // console.log(props.country);
        // console.log(pinyin(props.country, { toneType: 'none' }));
        return pinyin(props.country, { toneType: 'none' }) + '(' + props.country + ')';
    }
    return props.country;
});

// 帮助函数判断是否为中文字符
function isChineseChar(str) {
    return /^[\u4e00-\u9fa5]+$/.test(str);
}

const timezone = computed(() => {
//   return data[props.country] || null;
    let result = null;

    if (data[props.country]) {
        result = data[props.country];
    } else if (data[props.countryFlag]) {
        result = data[props.countryFlag];
    }else {
        result = null;
    }

    // console.log(result);

    return result;

    // || data[properties.countryFlag] 
});

// 获取指定时区的当前时间字符串
function getLocalTime(timeZone) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone,
        hour12: false
    };
    const time = new Intl.DateTimeFormat('en-GB', options).format(new Date());
    const timeZoneOffset = getTimeZoneOffset(timeZone);
    return `${time} ${timeZoneOffset}`;
}

// 计算并显示 UTC 偏移
function getTimeZoneOffset(timeZone) {
    const now = new Date();
    const localTime = now.toLocaleString("en-US", { timeZone });
    const localDate = new Date(localTime);
    const offset = (localDate.getTime() - now.getTime()) / 60000;
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? "+" : "-";
    return `(UTC ${sign}${String(hours).padStart(2, '0')}:${String(minutes.toFixed(0)).padStart(2, '0')})`;
}

// computed
const localTime = computed(() => {
    if (timezone.value) {
        return getLocalTime(timezone.value.timeZone);
    }
    return null;
});

// 计算国旗 URL
const flag = computed(() => {
    return `https://flagcdn.com/h40/${props.countryFlag.toLowerCase()}.png`;
});

</script>

<style scoped>
    h1 {
        font-size: 1.5em;
        font-weight: bold;
    }


    .flag {
        display: flex;
        width: 75px;
        height: 45px;
        background-color: var(--vp-c-gray-soft);
        border-radius: 5px;
        align-items: center;
        justify-content: center;
    }

    .num {
    font-size: 1em;
    color: var(--vp-c-success-1);
  }
</style>
