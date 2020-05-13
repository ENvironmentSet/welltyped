import { HKT } from 'Util/HKT';
import { Stuck } from 'Util/Stuck';

export type Apply<f extends HKT, x, fallback = Stuck>
  = (f & { param: x })['result'] | fallback;