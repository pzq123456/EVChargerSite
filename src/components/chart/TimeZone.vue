<template>
    <div>
        <div class="country">

            <div class="countryBand">

                <h1 class="countryName">{{ country }}</h1>

                <div class="flag">
                    <img v-if="flag" :src="flag" alt="flag" />
                </div>
            </div>


            <!-- 渲染当前时间 -->
            <!-- <div v-if="localTime" class="time">
                <p class="num">{{ localTime }}</p>
            </div> -->
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
        // return pinyin(props.country, { toneType: 'none' }) + '(' + props.country + ')';
        return handleChineseCityName(props.country);
    }
    return props.country;
});


const keyWordsMap = {
  '省': 'Province',
  '自治区': 'Autonomous Region',
  '市': 'City',
  '香港': 'Hong Kong',
  '澳门': 'Macau',
  '直辖市': 'Municipality'
}

function handleChineseCityName(name) {
  // 首先识别中文字符中是否含有关键字
  for (let key in keyWordsMap) {
    if (name.includes(key)) {
        // 若是香港或澳门，则直接返回
        if (key === '香港' || key === '澳门') {
            return keyWordsMap[key];
        }

      let mypinyin =  pinyin(name.replace(key, ''), {
        toneType: 'none'
      });

      // 删除空格
        mypinyin = mypinyin.replace(/\s+/g, '');
        // 首字母大写
        mypinyin = mypinyin.charAt(0).toUpperCase() + mypinyin.slice(1);
        // 连接关键字
        mypinyin = mypinyin 
        //  + keyWordsMap[key];
        // ,China
        mypinyin = mypinyin + ', China';
    //   console.log(mypinyin);
    //   .toUpperCase() + ' ' + keyWordsMap[key];
    return mypinyin;


    }
  }
}

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

    // if (props.country === 'USA' || props.country === 'United States') {
    //     return 'https://flagcdn.com/h40/us.png';
    // }// 修改为包含 USA, United States 和 US 字符串
    if (props.country.includes('USA') || props.country.includes('United States') || props.country.includes('US')) {
        return 'https://flagcdn.com/h40/us.png';
    }

    // if (props.country === 'UK' || props.country === 'United Kingdom') {
    //     return 'https://flagcdn.com/h40/gb.png';
    // }

    if (props.country.includes('UK') || props.country.includes('United Kingdom')) {
        return 'https://flagcdn.com/h40/gb.png';
    }

    // // "provinece, Country" 提取国家名

    // const country = props.country.split(',')[0].trim();
 
    // console.log(country);
    // if (flagData[country]) {
    //     const country = flagData[country];
    //     // console.log(country); //"﻿ISO2"
    //     return `https://flagcdn.com/h40/${country["﻿ISO2"].toLowerCase()}.png`;
    // } else {
    //     return null;
    // }

    const countryInput = props.country.split(',')[1]?.trim(); // 提取逗号后的部分并去掉首尾空格

    // 修改 country 变量使之仅仅含有国家名
    country.value = props.country.split(',')[0].trim();

    console.log(countryInput);

    if (flagData[countryInput]) {
        const countryData = flagData[countryInput]; // 避免重复定义变量
        // console.log(countryData); //"﻿ISO2"
        return `https://flagcdn.com/h40/${countryData["﻿ISO2"].toLowerCase()}.png`;
    } else {
        return null;
    }


    // // 若 props 有 countryFlag，则使用 countryFlag
    // if (props.countryFlag) {
    //     return `https://flagcdn.com/h40/${props.countryFlag.toLowerCase()}.png`;
    // }else if (flagData[props.country]) {
    //     const country = flagData[props.country];
    //     // console.log(country); //"﻿ISO2"
    //     return `https://flagcdn.com/h40/${country["﻿ISO2"].toLowerCase()}.png`;
    // }else {
    //     return null;
    // }
});

</script>

<style scoped>
    .country {
        display: flex;
        flex-direction: column;
        align-items: left;
        width: 100%;
    }

    .countryBand {
        display: flex;
        flex-direction: row;
        align-items: left;
        width: 100%;
        background-color: var(--vp-c-gray-soft);
        padding: 10px;
        border-radius: 5px;
        border-bottom: 1px solid var(--vp-c-gray-soft);
    }

    .flag {
        display: flex;
        width: 75px;
        height: 45px;
        background-color: var(--vp-c-gray-soft);
        border-radius: 5px;
        /* 固定在右边 */
        margin-left: auto;

    }

    .countryName {
        font-size: 1.5em;
        font-weight: bold;
        padding: 10px;
        color: var(--vp-c-text)
    }

    .num {
        font-size: 1em;
        color: var(--vp-c-success-1);
        font-weight: bold;
        padding: 10px 0;
  }
</style>
