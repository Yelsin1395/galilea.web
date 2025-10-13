import { DocumentType } from '@common/enums/documentType.enum';

export interface CreateOwnerRequest {
  documentType: DocumentType;
  documentNumber: string;
  propertyBlock: string;
  propertyLot: string;
}