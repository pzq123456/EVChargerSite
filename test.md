# test

<Column :data="jsonData" :activeColumn="activeColumn" />


<script setup>
import Column from "@/components/table/Column.vue";

import { ref } from "vue";

const jsonData = ref({ name: "John", age: 30, city: "New York", email: "das", phone: "1234567890" });
const activeColumn = ref("name");

</script>


