import { create } from "zustand"

type UpdateUserCallback = (attributes: {
  nonce: string
  password: string
}) => Promise<unknown>

type ForgotPasswordStore = {
  updateUser: UpdateUserCallback | null
  setUpdateUser: (updateUser: UpdateUserCallback) => void
  otp: string | null
  setOtp: (otp: string) => void
  clear: () => void
}

export const useForgotPasswordStore = create<ForgotPasswordStore>((set) => ({
  updateUser: null,
  setUpdateUser: (updateUser) => set({ updateUser }),
  otp: null,
  setOtp: (otp) => set({ otp }),
  clear: () => set({ updateUser: null, otp: null }),
}))
