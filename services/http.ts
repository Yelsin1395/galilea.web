import ApiProvider from '@/providers/apiProvider'
import { cfg } from '@/configs/environment'

const { NEXT_PUBLIC_BASE_URL_VISTA_ALEGRE_OWNER_MS } = cfg;

export const httpApisPeru = new ApiProvider(cfg.NEXT_PUBLIC_BASE_URL_APIS_PERU || '')
export const httpOwnerMs = new ApiProvider(NEXT_PUBLIC_BASE_URL_VISTA_ALEGRE_OWNER_MS)
