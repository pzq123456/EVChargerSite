// 地区选项
export const regionOptions = [
  {
    value: 'china',
    label: '中国'
  },
  {
    value: 'usa',
    label: '美国'
  },
  {
    value: 'europe',
    label: '欧洲',
    children: [
      { value: 'germany', label: '德国' },
      { value: 'france', label: '法国' },
      { value: 'uk', label: '英国' },
      { value: 'italy', label: '意大利' }
    ]
  },
  {
    value: 'others',
    label: '其他地区',
    children: [
      { value: 'hongkong', label: '香港' },
      { value: 'japan', label: '日本' },
      { value: 'korea', label: '韩国' },
      { value: 'taiwan', label: '台湾地区' },
      { value: 'australia', label: '澳大利亚' },
      { value: 'newzealand', label: '新西兰' },
      { value: 'thailand', label: '泰国' },
      { value: 'singapore', label: '新加坡' },
      { value: 'malaysia', label: '马来西亚' },
      { value: 'colombia', label: '哥伦比亚' },
      { value: 'peru', label: '秘鲁' },
      { value: 'brazil', label: '巴西' }
    ]
  }
]

// 可用年份
export const availableYears = ['2022', '2023', '2024', '2025']

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