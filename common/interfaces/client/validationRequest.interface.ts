import { DocumentType } from "@/common/enums/documentType.enum";


export interface ValidationRequest {
  propertyBlock: string;
  propertyLot: string;
  documentType: DocumentType;
  documentNumber: string;
  plateNumber?: string;
}
