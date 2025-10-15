import { deleteServicePoint } from '@services/servicePoint.service'

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const result = await deleteServicePoint(id)
	return Response.json(result)
}
