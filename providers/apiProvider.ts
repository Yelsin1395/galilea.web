import { type Observable } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'

interface ApiProviderImpl {
	get: (url: string, headers?: Record<string, string>) => Observable<Response>
	post: (url: string, body: any, headers?: Record<string, string>) => Observable<Response>
	put: (url: string, body: any, headers?: Record<string, string>) => Observable<Response>
	patch: (url: string, body: any, headers?: Record<string, string>) => Observable<Response>
	delete: (url: string, headers?: Record<string, string>) => Observable<Response>
}

class ApiProvider implements ApiProviderImpl {
	constructor(public baseUrl: string) {}

	private readonly isAbsoluteUrl = (url: string): boolean => {
		const path = /^https?:\/\//i
		return path.test(url)
	}

	private readonly getUrl = (url: string) => {
		if (this.isAbsoluteUrl(url)) return url
		return `${this.baseUrl}${url}`
	}

	get = <T>(url: string, headers?: Record<string, string>): Observable<Response | T> =>
		fromFetch(this.getUrl(url), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
		})

	post = <T>(url: string, body: any, headers?: Record<string, string>): Observable<Response | T> =>
		fromFetch(this.getUrl(url), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
			body: JSON.stringify(body),
		})

	put = <T>(url: string, body: any, headers?: Record<string, string>): Observable<Response | T> =>
		fromFetch(this.getUrl(url), {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
			body: JSON.stringify(body),
		})

	patch = <T>(url: string, body: any, headers?: Record<string, string>): Observable<Response | T> =>
		fromFetch(this.getUrl(url), {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
			body: JSON.stringify(body),
		})

	delete = <T>(
		url: string,
		headers?: Record<string, string> | undefined
	): Observable<Response | T> =>
		fromFetch(this.getUrl(url), {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
		})

	setBaseUrl = (url: string) => {
		this.baseUrl = url
	}
}

export default ApiProvider
