import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      token: '',
    }
  },
  persist: {
    storage: localStorage,
    paths: ['token'],
  },
  actions: {
    setToken(data: any) {
      this.token = data
    },
  },
})
