import ApiProvider from '@/providers/apiProvider'
import { cfg } from '@/configs/environment'

export const httpApisPeru = new ApiProvider(cfg.NEXT_PUBLIC_BASE_URL_APIS_PERU || '')
