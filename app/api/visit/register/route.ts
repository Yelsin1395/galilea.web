import { registerVisit } from '@/services/visit.service'

export async function POST(req: Request) {
	const res = await req.json()
	const result = await registerVisit(res)
	return Response.json(result)
}
