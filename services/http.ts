import ApiProvider from '@/providers/apiProvider'
import { cfg } from '@/configs/environment'

const {
	NEXT_PUBLIC_BASE_URL_VISTA_ALEGRE_OWNER_MS,
	NEXT_PUBLIC_BASE_URL_VISTA_ALEGRE_SERVICE_POINT_MS,
	NEXT_PUBLIC_BASE_URL_VISTA_ALEGRE_SERVICE_POINT_PAYMENT_MS,
	NEXT_PUBLIC_BASE_URL_VISTA_ALEGRE_VISIT_MS,
} = cfg

export const httpApisPeru = new ApiProvider(cfg.NEXT_PUBLIC_BASE_URL_APIS_PERU || '')
export const httpOwnerMs = new ApiProvider(NEXT_PUBLIC_BASE_URL_VISTA_ALEGRE_OWNER_MS)
export const httpServicePoint = new ApiProvider(NEXT_PUBLIC_BASE_URL_VISTA_ALEGRE_SERVICE_POINT_MS)
export const httpServicePointPayment = new ApiProvider(
	NEXT_PUBLIC_BASE_URL_VISTA_ALEGRE_SERVICE_POINT_PAYMENT_MS
)
export const httpVisitMs = new ApiProvider(NEXT_PUBLIC_BASE_URL_VISTA_ALEGRE_VISIT_MS)
