import { create } from "zustand"

type OtpCallback = (params: { token: string }) => Promise<unknown>

type SignUpStore = {
  verifyOtp: OtpCallback | null
  setVerifyOtp: (verifyOtp: OtpCallback) => void
  clearVerifyOtp: () => void
}

export const useSignUpStore = create<SignUpStore>((set) => ({
  verifyOtp: null,
  setVerifyOtp: (verifyOtp) => set({ verifyOtp }),
  clearVerifyOtp: () => set({ verifyOtp: null }),
}))
