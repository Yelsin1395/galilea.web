export enum StatusServicePointPayment {
  NEW = 'NUEVO',
  ADVANCED = 'ADELANTADO',
  PER_DAY = 'AL_DIA',
  OVERDUE = 'ATRASADO',
  NO_SERVICE = 'SIN_SERVICIO',
  SUSPENDED = 'SUSPENDIDO',
  NOT_CONTRIBUTING = 'NO_APORTANTE',
}


export enum ColorStatusServicePointPayment {
  NEW = 'is-white',
  ADVANCED = 'is-link',
  PER_DAY = 'is-success',
  OVERDUE = 'is-warning',
  NO_SERVICE = 'is-danger',
  SUSPENDED = 'is-danger is-light',
  NOT_CONTRIBUTING = 'is-black',
}