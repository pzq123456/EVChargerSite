// 地区选项
export const regionOptions = [
  {
    value: 'China',
    label: 'China'
  },
  {
    value: 'USA',
    label: 'USA'
  },
  {
    value: 'Europe',
    label: 'Europe',
    children: [
      { value: 'Germany', label: 'Germany' },
      { value: 'France', label: 'France' },
      { value: 'UK', label: 'UK' },
      { value: 'Italy', label: 'Italy' }
    ]
  },
  {
    value: 'others',
    label: 'Other Regions',
    children: [
      { value: 'HongKong, China', label: 'Hong Kong' },
      { value: 'Japan', label: 'Japan' },
      { value: 'korea', label: 'Korea' },
      { value: 'TaiWan, China', label: 'Taiwan' },
      { value: 'Australia', label: 'Australia' },
      { value: 'Newzealand', label: 'New Zealand' },
      { value: 'Thailand', label: 'Thailand' },
      { value: 'Singapore', label: 'Singapore' },
      { value: 'Malaysia', label: 'Malaysia' },
      { value: 'Colombia', label: 'Colombia' },
      { value: 'Peru', label: 'Peru' },
      { value: 'Brazil', label: 'Brazil' }
    ]
  }
]

// 可用年份
export const availableYears = ['2022', '2024*', '2025*']

// 表单验证规则
export const rules = {
  databases: [
    { 
      type: 'array', 
      required: true, 
      message: '请至少选择一个数据库', 
      trigger: 'change' 
    }
  ],
  regions: [
    { 
      type: 'array', 
      required: true, 
      message: '请选择地区', 
      trigger: 'change' 
    }
  ],
  years: [
    { 
      type: 'array', 
      required: true, 
      message: '请选择年份', 
      trigger: 'change' 
    }
  ]
}