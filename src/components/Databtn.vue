<template>
    <div class="row">
        <div class="col-md-4">
            <button @click="downloadFile" class="btn btn-primary">{{ buttonText }}</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    // 文件下载URL
    fileUrl: {
        type: String,
        required: true
    },
    // 按钮显示文本
    buttonText: {
        type: String,
        default: "Download File"
    },
    // 下载时的文件名
    fileName: {
        type: String,
        default: "download"
    }
});

const downloadFile = () => {
    const a = document.createElement('a');
    a.href = props.fileUrl;
    a.download = props.fileName;
    a.click();
}
</script>

<style scoped>
    .row {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .col-md-4 {
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
        padding: 5px 5px;
    }

    .btn-primary {
        border: 1px solid var(--vp-c-border);
        border-radius: 5px;
    }

    .btn-primary:hover {
        border: 1px solid var(--vp-c-brand-3);
        color: var(--vp-c-brand-3);
        background-color: var(--vp-c-bg-soft);
        font-weight: bold;
        /* 动画效果 */
        transition: all 0.3s;
    }

    .btn {
        width: 100%;
    }
</style>