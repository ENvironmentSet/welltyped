import { TType } from './TType';
import { Stuck } from './Stuck';

export interface HKT {
  params: TType[];
  result: TType;
}

export type Apply<f extends HKT, tParams extends TType[], fallback extends TType = Stuck>
  = (f & { params: tParams })['result'] | fallback;
