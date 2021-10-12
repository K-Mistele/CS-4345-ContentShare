import {IVertex} from "./_vertex";

export interface IMovie extends IVertex {
	title: string
	year: number
	cast: string[]
	director: string
	summary: string
	coverURL: string
}