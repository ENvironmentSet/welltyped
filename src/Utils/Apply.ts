import { HKT } from 'Utils/HKT';
import { Stuck } from 'Utils/Stuck';

export type Apply<f extends HKT, x, fallback = Stuck>
  = (f & { param: x })['result'] | fallback;