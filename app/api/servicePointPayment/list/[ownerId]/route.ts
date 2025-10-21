import { getServicePointPaymentByOwner } from '@/services/servicePointPayment.service'

// disabled caching
export const revalidate = 0

export async function GET(req: Request, { params }: { params: Promise<{ ownerId: string }> }) {
	const { ownerId } = await params
	const result = await getServicePointPaymentByOwner(ownerId)
	return Response.json(result)
}
