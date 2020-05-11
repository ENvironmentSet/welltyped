import { HKT } from 'Utils/HKT';
import { Apply } from 'Utils/Apply';

export interface Eq extends HKT {
  result: this['param'] extends [infer X, infer Y] ?
    X extends Y ?
      Y extends X ?
        true
        : false
      : false
    : false;
}

interface _EqC<X> extends HKT {
  result: Apply<Eq, [X, this['param']]>;
}
export interface EqC extends HKT {
  result: _EqC<this['param']>;
}