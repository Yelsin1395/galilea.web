import { ServicePointType } from '@common/enums/servicePointType.enum'

export interface InputServicePointForm {
	type: ServicePointType
	price: number
	description: string
}
