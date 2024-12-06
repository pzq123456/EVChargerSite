<template>
    <div>
        <div class="country">
            <h1>{{ country }}</h1>
            <!-- 渲染 flag emoji -->
            <div v-if="flag" class="flag">
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

import { defineProps, computed } from 'vue';
import { data } from '@/loader/euTimeZone.data.js';

import { data as flagData } from '@/loader/flag.data.js';

// console.log(flagData);

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
    let result = null;

    if (data[props.country]) {
        result = data[props.country];
    } else if (data[props.countryFlag]) {
        result = data[props.countryFlag];
    }else {
        result = null;
    }
    return result;
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
    // 若传入的 name 是汉字范围则认为是中国
    if (props.country&&isChineseChar(props.country[0])) {
        return 'https://flagcdn.com/h40/cn.png';
    }

    if (props.country === 'USA' || props.country === 'United States') {
        return 'https://flagcdn.com/h40/us.png';
    }

    if (props.country === 'UK' || props.country === 'United Kingdom') {
        return 'https://flagcdn.com/h40/gb.png';
    }

    // 若 props 有 countryFlag，则使用 countryFlag
    if (props.countryFlag) {
        return `https://flagcdn.com/h40/${props.countryFlag.toLowerCase()}.png`;
    }else if (flagData[props.country]) {
        const country = flagData[props.country];
        // console.log(country); //"﻿ISO2"
        return `https://flagcdn.com/h40/${country["﻿ISO2"].toLowerCase()}.png`;
    }else {
        return null;
    }
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
