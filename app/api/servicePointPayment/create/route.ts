import { createServicePointPayment } from '@/services/servicePointPayment.service'

export async function POST(req: Request) {
	const res = await req.json()
	const result = await createServicePointPayment(res)
	return Response.json(result)
}
