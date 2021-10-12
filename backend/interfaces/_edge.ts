import { IRecord } from './_record';

export interface IEdge extends IRecord {
	out: object | string 	// an @rid, the source object
	in: object | string 	// an @rid, the destination object
}