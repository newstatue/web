import { create } from 'zustand';
import { cloud } from '@/lib/cloudbase';






const auth = cloud.auth()

type CloudBaseUser = Awaited<ReturnType<typeof auth.getCurrentUser>>

interface AuthState {
  auth: {
    user: CloudBaseUser
    setUser: (user: CloudBaseUser) => void
    loadUser: () => Promise<void>
    getAccessToken: () => Promise<string | null>
    reset: () => Promise<void>
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  return {
    auth: {
      user: null,
      setUser: (user) => set((state) => ({ auth: { ...state.auth, user } })),
      loadUser: async () => {
        const user = await auth.getCurrentUser()
        set((state) => ({ auth: { ...state.auth, user } }))
      },
      getAccessToken: async () => {
        const { accessToken } = await auth.getAccessToken()
        return accessToken || null
      },
      reset: async () => {
        await auth.signOut()
        set((state) => ({ auth: { ...state.auth, user: null } }))
      },
    },
  }
})
