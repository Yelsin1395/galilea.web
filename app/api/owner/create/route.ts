import { createOwner } from '@services/owner.service'

export async function POST(req: Request) {
	const res = await req.json()
	const result = await createOwner(res)
	return Response.json(result)
}
