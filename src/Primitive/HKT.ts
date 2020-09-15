import { TType } from './TType';
import { Stuck } from './Stuck';

export interface HKT {
  param: TType;
  result: TType;
}

export type Apply<f extends HKT, x, fallback = Stuck> //@TODO: Make Apply non-primitive
  = (f & { param: x })['result'] | fallback;
