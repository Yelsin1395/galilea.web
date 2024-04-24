export function comparePathComplete(pathName: string, href: string) {
	return pathName.includes(href) && pathName.length === href.length
}
