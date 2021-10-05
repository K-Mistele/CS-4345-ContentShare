export interface User {
	name: string,
	id: number,
	sex: string

	// properties that are only present when the user has been retrieved from the database
	'@class'?: string,
	'@type'?: string,
	'@rid'?: string | object,
	'@version'?: number
}