import { listServicePoint } from '@services/servicePoint.service'

// disabled caching
export const revalidate = 0

export async function GET() {
	const result = await listServicePoint()
	return Response.json(result)
}
