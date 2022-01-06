import { TType } from './TType';
import { Stuck } from './Stuck';
import { Eq } from './Eq';

export interface HKT {
  params: TType[];
  result: TType;
}

export type Apply<f extends HKT, tParams extends TType[], fallback extends TType = Stuck>
  = Eq<(f & { params: tParams })['result'], Stuck> extends true ? fallback : (f & { params: tParams })['result'];
