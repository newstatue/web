import {
  emailOTPClient,
  jwtClient,
  twoFactorClient,
} from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL ,
  plugins: [jwtClient(), twoFactorClient(), emailOTPClient()],
})
