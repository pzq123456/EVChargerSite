---
layout: page
---

<app>
    <div>Current Count: {{ counter.count }}</div>
</app>

<script setup>
    import app from './app.vue'

    // import { useCounterStore } from './stores/counter.js'

    import { defineStore } from 'pinia'

    const useCounterStore = defineStore('counter', {
    state: () => {
        return { count: 0 }
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    actions: {
        increment() {
        this.count++
        },
    },
    })

    const counter = useCounterStore()

    counter.count++
    // 自动补全！ ✨
    counter.$patch({ count: counter.count + 1 })
    // 或使用 action 代替
    counter.increment()
</script>
