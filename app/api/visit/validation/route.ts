import { validationVisit } from '@/services/visit.service'

export async function POST(req: Request) {
	const res = await req.json()
	console.log({ res })
	const result = await validationVisit(res)
	return Response.json(result)
}
