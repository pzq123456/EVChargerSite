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
    margin: 5px;
    padding: 10px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: 5px;
    border: 1px solid gainsboro;
}

.switcher button.active {
    background-color: var(--vp-c-green-soft);
    color: var(--vp-c-text-2);
    border-radius: 5px;
    font-weight: bold;
}
</style>