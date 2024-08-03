import { Stuck } from './Stuck';

export type Assert<type, ttype> = type extends ttype ? type : Stuck;
