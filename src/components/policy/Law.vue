<template>

    <div class="policy-details" v-if="policy">
      <div class="TexBenefits"> Tex Benefits</div>
      <ul v-if="Array.isArray(policy.tax_benefits)">
        <li v-for="(benefit, index) in policy.tax_benefits" :key="index">
          - {{ benefit }}
        </li>
      </ul>
      <p v-else>
        - {{ policy.tax_benefits }}
      </p>
  
      <div  class="purchase-incentives">Purchase Incentives</div>
      <ul v-if="Array.isArray(policy.purchase_incentives)">
        <li v-for="(incentive, index) in policy.purchase_incentives" :key="index">
          - {{ incentive }}
        </li>
      </ul>
      <p v-else>
        - {{ policy.purchase_incentives }}
      </p>
    </div>

    <div v-else>
      <p>Policy not found</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    policy: {
      type: Object,
      required: true
    }
  });
  </script>
  
  <style scoped>

  .policy-details {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  .purchase-incentives {
    font-weight: bold;
    font-size:  1.2em;
    color: var(--vp-c-important-2);
  }

  .TexBenefits {
    font-weight: bold;
    font-size:  1.2em;
    color: var(--vp-c-important-2);
  }
  



  </style>
  