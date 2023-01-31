import { reactive } from 'vue'

// store
function userStore() {
  const state = reactive({
    id: ''
  })
  return state
}
let userStoreData: ReturnType<typeof userStore>|null = null
export function useUserStore() {
  if (!userStoreData) userStoreData = userStore()
  return userStoreData
}
// mutation
export const userMutation = {
  setUserId: (id: string) => {
    const userStore = useUserStore()
    userStore.id = id
  }
}