import { deleteServicePointPayment } from '@/services/servicePointPayment.service'

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string; ownerId: string }> }
) {
	const { id, ownerId } = await params
	const result = await deleteServicePointPayment(id, ownerId)
	return Response.json(result)
}
