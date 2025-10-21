import { DocumentType } from '@common/enums/documentType.enum'

export interface InputOwnerForm {
	documentType: DocumentType
	documentNumber: string
	phoneNumber: string
	propertyBlock: string
	propertyLot: string
}
