import { regex } from '@common/regex';

export function comparePathComplete(pathName: string, href: string) {
  return pathName.includes(href) && pathName.length === href.length
}

export function dateCurrentUTC() {
  const currenDate = new Date()
  return currenDate.toISOString()
}

export function date(inputDate: string): string {
  const dateUTC: Date = new Date(inputDate)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Lima',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }

  return dateUTC.toLocaleString('es-PE', options)
}

export function time(inputDate: string): string {
  const dateUTC: Date = new Date(inputDate)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Lima',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }

  return dateUTC.toLocaleString('es-PE', options)
}

export function datetime(inputDate: string): string {
  const dateUTC: Date = new Date(inputDate)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Lima',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }

  return dateUTC.toLocaleString('es-PE', options)
}

export function isEmptyString(str: string): boolean {
  return str.trim().length === 0
}

export function convertToUpperCase(str: string): string {
  return str.toUpperCase()
}

export function areAllFieldsFilled(obj: any): boolean {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (!obj[key]) {
        return false
      }
    }
  }
  return true
}

type ValidEmailRoleKey = "main" | "admin" | "security";
export function getRoleByEmailUser(email: string): string | undefined {
  const isValidRoleEmail = email.match(regex.emailRole);

  if (!isValidRoleEmail) {
    return undefined;
  }

  const roleEmailCodes = {
    main: 'SYS',
    admin: 'ADMIN',
    security: 'SECURITY'
  };

  return roleEmailCodes[isValidRoleEmail[1] as ValidEmailRoleKey] || "";
}
