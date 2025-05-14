// config.js
export default {
  formProps: {
    labelWidth: "120px",
    class: "query-form"
  },
  title: "Data Selection",
  databases: {
    charging_stations: createDatabaseConfig("Charging Stations"),
    user_reviews: createDatabaseConfig("User Comments")
  },
  actions: true
};

// 公共配置生成函数，减少重复代码
function createDatabaseConfig(label) {
  const commonFields = [
    {
      type: "cascader",
      model: "regions",
      label: "Regions",
      optionsRef: "regionOptions",
      props: {
        multiple: true,
        collapseTags: true,
        collapseTagsTooltip: true,
        clearable: true
      },
      style: { width: "100%" },
      placeholder: "Please select a region",
      rules: createRule("Please select at least one region")
    },
    {
      type: "checkbox-group",
      model: "years",
      label: "Years",
      optionsRef: "availableYears",
      rules: createRule("Please select at least one year")
    }
  ];

  return {
    label,
    fields: commonFields
  };
}

// 规则生成函数
function createRule(message) {
  return {
    required: true,
    message,
    trigger: "change"
  };
}