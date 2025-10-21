import { listVisits } from '@/services/visit.service'

// disabled caching
export const revalidate = 0

export async function GET() {
	const result = await listVisits()
	return Response.json(result)
}
