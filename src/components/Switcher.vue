<template>
    <div class="switcher">
        <button
            v-for="(button, index) in buttons"
            :key="index"
            :class="{ active: activeIndex === index }"
            @click="activate(index)"
        >
            {{ button }}
        </button>
    </div>
</template>

<script setup>
defineProps({
    buttons: Array,
    activeIndex : {
        type: Number,
        default: 0,
    },
});

const emit = defineEmits(['update:activeIndex'])

const activate = (index) => {
    emit('update:activeIndex', index);
};

</script>

<style scoped>
.switcher button {
    background-color: var(--vp-c-green-soft);
    color: var(--vp-c-text-2);
    border: none;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
}

.switcher button.active {
    background-color: var(--vp-c-green-3);
    color: var(--vp-c-text-2);
    border: none;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
}
</style>