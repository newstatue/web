import { createContext } from 'react'
import cloudbase from '@cloudbase/js-sdk'

export const cloud = cloudbase.init({
  env: 'evorsio-d2gdf1j35989ae02e',
  region: 'ap-shanghai',
})

export const CloudContext = createContext(cloud)
