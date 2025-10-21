import { DocumentType } from '../enums/documentType.enum'

export interface InputVisitForm {
	propertyBlock: string
	propertyLot: string
	documentType: DocumentType
	documentNumber: string
	plateNumber?: string
}
