import {
  emailOTPClient,
  jwtClient,
  twoFactorClient,
} from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: "https://auth.evorsio.app",
  plugins: [jwtClient(), twoFactorClient(), emailOTPClient()],
})
