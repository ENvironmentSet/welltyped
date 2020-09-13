import { Type } from './Type';
import { Stuck } from './Stuck';

export interface HKT {
  param: Type;
  result: Type;
}

export type Apply<f extends HKT, x, fallback = Stuck> //@TODO: Make Apply non-primitive
  = (f & { param: x })['result'] | fallback;
