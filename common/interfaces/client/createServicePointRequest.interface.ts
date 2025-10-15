import { ServicePointType } from '@common/enums/servicePointType.enum';

export interface CreateServicePointRequest {
  type: ServicePointType;
  price: number;
  description: string;
}
