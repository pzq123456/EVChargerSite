<template>
    <div class="row">
        <div class="col-md-4">
            <button @click="downloadeu" class="btn btn-primary">Download Europe Data</button>
        </div>
        <div class="col-md-4">
            <button @click="downloadus" class="btn btn-primary">Download US Data</button>
        </div>
        <div class="col-md-4">
            <button @click="downloadcn" class="btn btn-primary">Download CN Data</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    dataSrc: Object,
});

const { eu, us, cn } = props.dataSrc;

// donwload data as csv
const downloadeu = () => {
    const data = eu.map(item => Object.values(item).join(',')).join('\n');
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'europe.csv';
    a.click();
}

const downloadus = () => {
    const data = us.map(item => Object.values(item).join(',')).join('\n');
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'us.csv';
    a.click();
}

const downloadcn = () => {
    const data = cn.map(item => Object.values(item).join(',')).join('\n');
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cn.csv';
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
        padding: 0 15px;
        color: var(--vp-c-brand-1);
    }

    .btn-primary {
        border: 1px solid var(--vp-c-brand-3);
        border-radius: 4px;
    }

    .btn-primary:hover {
        background-color: var(--vp-c-brand-3);
        color: white;
    }

    .btn {
        width: 100%;
    }
</style>