// config.js
export default {
  formProps: {
    labelWidth: "140px",
    class: "query-form"
  },
  title: "Data Selection",
  databases: {
    charging_stations: createDatabaseConfig("Charging Stations"),
    advanced_air_mobility: createSimpleDatabaseConfig("Advanced Air Mobility Text Data"),
    user_reviews: createDatabaseConfig("EV Charging Review Data*", "availableYearsForEVCReviewData", "regionOptions2"),
  },

  actions: true
};


function createSimpleDatabaseConfig(label) {
  return {
    label,
    fields: [
      {
        type: "checkbox-group",
        model: "Types",
        label: "Types",
        optionsRef: "availableYearsForAAM",
        rules: createRule("Please select at least one year"),
      }
    ]
  };
}


// 公共配置生成函数，减少重复代码
function createDatabaseConfig(label, yearOptions = "availableYears", regionOptions = "regionOptions") {
  const commonFields = [
    {
      type: "cascader",
      model: "regions",
      label: "Country/Region",
      optionsRef: regionOptions,
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
      optionsRef: yearOptions,
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