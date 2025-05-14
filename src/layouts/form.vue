<template>
  <div class="container">
    <!-- 用户信息表单 -->
    <el-form 
      :model="userForm" 
      label-width="120px" 
      class="user-info-form"
      :rules="userFormRules"
      ref="userInfoFormRef"
    >
      <h3 class="form-section-title">用户信息</h3>
      
      <el-form-item label="称谓" prop="title">
        <el-select v-model="userForm.title" placeholder="请选择">
          <el-option label="教授" value="教授" />
          <el-option label="博士" value="博士" />
          <el-option label="先生" value="先生" />
          <el-option label="女士" value="女士" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="姓名" prop="name">
        <el-input v-model="userForm.name" />
      </el-form-item>
      
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" type="email" />
      </el-form-item>
      
      <el-form-item label="所属组织" prop="organization">
        <el-input v-model="userForm.organization" />
      </el-form-item>
      
      <el-form-item label="数据用途" prop="purpose">
        <el-input 
          v-model="userForm.purpose" 
          type="textarea" 
          :rows="3"
          placeholder="请简要说明您需要这些数据的目的"
        />
      </el-form-item>
      
      <el-form-item label="电子签名" prop="signature">
        <el-upload
          class="signature-upload"
          action="#"
          :auto-upload="false"
          :on-change="handleSignatureUpload"
          :show-file-list="false"
          accept="image/*"
        >
          <el-button type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            请上传您的签名图片（PNG/JPG格式）
          </div>
          <div v-if="userForm.signature" class="signature-preview">
            <img :src="userForm.signature" alt="签名预览" class="signature-image" />
            <el-button 
              size="mini" 
              type="danger" 
              @click.stop="removeSignature"
            >
              移除
            </el-button>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>

    <!-- 数据查询表单 -->
    <el-form 
      :model="queryForm" 
      label-width="120px" 
      class="query-form"
      :rules="queryFormRules"
      ref="queryFormRef"
    >
      <h3 class="form-section-title">数据选择</h3>
      
      <el-form-item label="数据库选择" prop="databases">
        <el-checkbox-group v-model="queryForm.databases">
          <el-checkbox label="charging_stations">充电桩数据</el-checkbox>
          <el-checkbox label="user_reviews">用户评论数据</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item 
        label="地区选择" 
        prop="regions"
        v-if="queryForm.databases.length > 0"
      >
        <el-cascader
          v-model="queryForm.regions"
          :options="regionOptions"
          :props="{ multiple: true }"
          collapse-tags
          collapse-tags-tooltip
          clearable
          placeholder="请选择地区"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item 
        label="年份选择" 
        prop="years"
        v-if="queryForm.databases.length > 0"
      >
        <el-checkbox-group v-model="queryForm.years">
          <el-checkbox 
            v-for="year in availableYears" 
            :key="year" 
            :label="year"
          >
            {{ year }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button 
          type="primary" 
          @click="generatePreview"
          :disabled="queryForm.databases.length === 0"
        >
          生成预览
        </el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 打印预览区域 -->
    <div class="preview-container" v-if="showPreview">
      <div class="preview-content" id="printable-content">
        <!-- 报告头 -->
        <div class="report-header">
          <div class="header-left">
            <h1 class="report-title">{{ reportTitle }}</h1>
            <p class="report-subtitle">数据请求报告</p>
          </div>
          <div class="header-right">
            <p class="generation-time">生成时间: {{ generationTime }}</p>
          </div>
        </div>
        
        <!-- 用户信息 -->
        <div class="user-info-section">
          <h3 class="section-title">用户信息</h3>
          <table class="info-table">
            <tr>
              <td class="label">姓名:</td>
              <td>{{ userForm.title }} {{ userForm.name }}</td>
            </tr>
            <tr>
              <td class="label">邮箱:</td>
              <td>{{ userForm.email }}</td>
            </tr>
            <tr>
              <td class="label">组织:</td>
              <td>{{ userForm.organization }}</td>
            </tr>
            <tr>
              <td class="label">数据用途:</td>
              <td>{{ userForm.purpose }}</td>
            </tr>
          </table>
          <div class="signature-box" v-if="userForm.signature">
            <p class="signature-label">签名:</p>
            <img :src="userForm.signature" alt="用户签名" class="signature-image" />
          </div>
        </div>
        
        <!-- 筛选条件 -->
        <div class="filter-section">
          <h3 class="section-title">筛选条件</h3>
          <table class="info-table">
            <tr>
              <td class="label">选择数据库:</td>
              <td>{{ selectedDatabasesLabel }}</td>
            </tr>
            <tr>
              <td class="label">地区:</td>
              <td>{{ selectedRegionsLabel }}</td>
            </tr>
            <tr>
              <td class="label">年份:</td>
              <td>{{ selectedYearsLabel }}</td>
            </tr>
          </table>
        </div>
        
        <!-- 数据预览 -->
        <div class="data-preview-section">
          <h3 class="section-title">数据预览</h3>
          
          <div 
            v-if="queryForm.databases.includes('charging_stations')" 
            class="database-preview"
          >
            <h4>充电桩数据</h4>
            <p>共查询到 {{ sampleData.chargingStations.count }} 条记录</p>
            <el-table 
              :data="sampleData.chargingStations.sample" 
              border 
              style="width: 100%"
            >
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="location" label="位置" />
              <el-table-column prop="operator" label="运营商" />
              <el-table-column prop="power" label="功率(kW)" width="100" />
            </el-table>
          </div>
          
          <div 
            v-if="queryForm.databases.includes('user_reviews')" 
            class="database-preview"
          >
            <h4>用户评论数据</h4>
            <p>共查询到 {{ sampleData.userReviews.count }} 条记录</p>
            <el-table 
              :data="sampleData.userReviews.sample" 
              border 
              style="width: 100%"
            >
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="stationId" label="充电站ID" width="120" />
              <el-table-column prop="rating" label="评分" width="100" />
              <el-table-column prop="comment" label="评论" />
            </el-table>
          </div>
        </div>
        
        <!-- 页脚 -->
        <div class="report-footer">
          <p>本报告由EV数据分析系统生成，仅供授权用户使用</p>
          <p>© 2023 EV Data Analytics. All rights reserved.</p>
        </div>
        
        <!-- 操作按钮 -->
        <div class="print-actions">
          <el-button type="success" @click="printReport">
            <i class="el-icon-printer"></i> 打印报告
          </el-button>
          <el-button type="primary" @click="exportPDF">
            <i class="el-icon-document"></i> 导出PDF
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 用户表单数据模型
const userForm = reactive({
  title: '',
  name: '',
  email: '',
  organization: '',
  purpose: '',
  signature: ''
})

// 用户表单验证规则
const userFormRules = {
  title: [{ required: true, message: '请选择称谓', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  organization: [{ required: true, message: '请输入所属组织', trigger: 'blur' }],
  purpose: [{ required: true, message: '请输入数据用途', trigger: 'blur' }],
  signature: [{ required: true, message: '请上传签名', trigger: 'blur' }]
}

// 查询表单数据模型
const queryForm = reactive({
  databases: [],
  regions: [],
  years: []
})

// 查询表单验证规则
const queryFormRules = {
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

// 表单引用
const userInfoFormRef = ref()
const queryFormRef = ref()

// 地区选项
const regionOptions = [
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
const availableYears = ['2022', '2023', '2024', '2025']

// 预览相关状态
const showPreview = ref(false)
const generationTime = ref('')

// 示例数据
const sampleData = {
  chargingStations: {
    count: 1254,
    sample: [
      { id: 'CS1001', location: '北京市朝阳区', operator: '国家电网', power: '120' },
      { id: 'CS1002', location: '上海市浦东新区', operator: '特斯拉', power: '250' },
      { id: 'CS1003', location: '广州市天河区', operator: '星星充电', power: '60' }
    ]
  },
  userReviews: {
    count: 8765,
    sample: [
      { id: 'UR1001', stationId: 'CS1001', rating: '4.5', comment: '充电速度快，服务好' },
      { id: 'UR1002', stationId: 'CS1002', rating: '3.0', comment: '价格偏贵，但充电效率高' },
      { id: 'UR1003', stationId: 'CS1003', rating: '5.0', comment: '非常满意的充电体验' }
    ]
  }
}

// 计算属性
const selectedDatabasesLabel = computed(() => {
  const labels = {
    'charging_stations': '充电桩数据库',
    'user_reviews': '用户评论数据库'
  }
  return queryForm.databases.map(db => labels[db]).join('， ')
})

const selectedRegionsLabel = computed(() => {
  if (!queryForm.regions.length) return '全部地区'
  return queryForm.regions.map(region => {
    const flatOptions = []
    regionOptions.forEach(opt => {
      if (opt.children) {
        opt.children.forEach(child => {
          flatOptions.push(child)
        })
      } else {
        flatOptions.push(opt)
      }
    })
    const lastItem = region[region.length - 1]
    const found = flatOptions.find(opt => opt.value === lastItem)
    return found ? found.label : lastItem
  }).join('， ')
})

const selectedYearsLabel = computed(() => {
  return queryForm.years.length ? queryForm.years.join('， ') : '全部年份'
})

const reportTitle = computed(() => {
  return `${userForm.organization || '数据'}请求报告`
})

// 方法
const handleSignatureUpload = (file) => {
  const isImage = file.raw.type.includes('image')
  if (!isImage) {
    ElMessage.error('请上传图片文件')
    return false
  }
  
  const reader = new FileReader()
  reader.onload = (e) => {
    userForm.signature = e.target.result
  }
  reader.readAsDataURL(file.raw)
}

const removeSignature = () => {
  userForm.signature = ''
}

const validateForms = async () => {
  try {
    await Promise.all([
      userInfoFormRef.value.validate(),
      queryFormRef.value.validate()
    ])
    return true
  } catch (error) {
    ElMessage.error('请完善所有必填信息')
    return false
  }
}

const generatePreview = async () => {
  const isValid = await validateForms()
  if (!isValid) return
  
  generationTime.value = new Date().toLocaleString()
  showPreview.value = true
}

const resetForm = () => {
  userInfoFormRef.value.resetFields()
  queryFormRef.value.resetFields()
  showPreview.value = false
}

const printReport = () => {
  const printContent = document.getElementById('printable-content').innerHTML
  const originalContent = document.body.innerHTML
  
  document.body.innerHTML = printContent
  window.print()
  document.body.innerHTML = originalContent
  location.reload()
}

const exportPDF = () => {
  // 实际项目中这里应该调用PDF生成库
  console.log('导出PDF:', {
    userInfo: { ...userForm },
    queryParams: { ...queryForm },
    data: {
      chargingStations: queryForm.databases.includes('charging_stations') 
        ? sampleData.chargingStations 
        : null,
      userReviews: queryForm.databases.includes('user_reviews') 
        ? sampleData.userReviews 
        : null
    }
  })
  ElMessage.success('PDF导出功能需集成PDF生成库')
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.form-section-title {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #333;
}

.user-info-form,
.query-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.signature-upload {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.signature-preview {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.signature-image {
  max-width: 200px;
  max-height: 100px;
  border: 1px solid #eee;
}

.preview-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.preview-content {
  padding: 20px;
  background: white;
  color: #333;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.report-title {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.report-subtitle {
  margin: 5px 0 0;
  font-size: 16px;
  color: #666;
}

.generation-time {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.section-title {
  margin: 25px 0 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #333;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.info-table tr {
  border-bottom: 1px solid #eee;
}

.info-table td {
  padding: 8px 0;
}

.info-table .label {
  width: 120px;
  font-weight: bold;
  color: #666;
}

.signature-box {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.signature-label {
  font-weight: bold;
  margin-bottom: 10px;
}

.database-preview {
  margin-bottom: 30px;
}

.database-preview h4 {
  margin: 20px 0 10px;
  color: #444;
}

.report-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.print-actions {
  margin-top: 30px;
  text-align: center;
}

/* 打印样式 */
@media print {
  body * {
    visibility: hidden;
  }
  #printable-content, #printable-content * {
    visibility: visible;
  }
  #printable-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 20px;
  }
  .print-actions {
    display: none;
  }
  
  /* 优化打印表格 */
  .el-table {
    border-collapse: collapse;
    width: 100%;
  }
  .el-table th,
  .el-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  .el-table th {
    background-color: #f2f2f2;
  }
}
</style>