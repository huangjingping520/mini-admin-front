import service from '@/utils/axios'

export function loginReq(subForm: { phone: string; password: string }) {
  return service.post('/api/take/login', subForm)
}

export function registerReq(data: any) {
  return service.post('/api/take/register', data)
}
