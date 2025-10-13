import { getAllOwner } from '@services/owner.service'

// disabled caching
export const revalidate = 0

export async function GET() {
	const result = await getAllOwner()
	return Response.json(result)
}
