import {IVertex} from "./_vertex";

export interface IBook extends IVertex {
	title: string
	author: string
	year: number
	summary: string
	coverURL: string
}