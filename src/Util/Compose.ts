import { Stuck } from 'Util/Stuck'
import { HKT } from 'Util/HKT';
import { Apply } from 'Util/Apply';

export interface Composed<F extends HKT, G extends HKT> extends HKT {
  result: Apply<F, Apply<G, this['param']>>;
}

export interface Compose extends HKT {
  result: this['param'] extends [infer F, infer G] ?
      F extends HKT ?
        G extends HKT ?
          Composed<F, G>
          : Stuck
        : Stuck
    : Stuck;
}