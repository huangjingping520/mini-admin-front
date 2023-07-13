import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

export function elMessage(message: any, type: any) {
  ElMessage({
    showClose: true,
    message: message || '成功',
    type: type || 'success',
    center: false,
  })
}
