import { HKT } from 'Primitive/HKT';
import { Stuck } from 'Primitive/Stuck';

export type Apply<f extends HKT, x, fallback = Stuck>
  = (f & { param: x })['result'] | fallback;