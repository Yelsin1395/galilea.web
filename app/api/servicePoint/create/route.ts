import { createServicePoint } from '@services/servicePoint.service'

export async function POST(req: Request) {
	const res = await req.json()
	const result = await createServicePoint(res)
	return Response.json(result)
}
