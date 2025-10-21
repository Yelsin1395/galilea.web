import { DocumentType } from '@/common/enums/documentType.enum'
import { VisitStatusType } from '@/common/enums/visitStatusType.enum'
import { VisitType } from '@/common/enums/visitType.enum'

export interface CreateVisitRequest {
	ownerId: string
	documentType: DocumentType
	documentNumber: string
	fullName: string
	propertyBlock: string
	propertyLot: string
	visitType: VisitType
	visitStatus: VisitStatusType
	plateNumber?: string
}
