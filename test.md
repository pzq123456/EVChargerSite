# test

<DropDown
:options="data"
defaultKey="B"
/>


<script setup>
import { menu } from './map/menu.js';
import DropDown from '@/components/Dropdown.vue';

const data = menu;
</script>
