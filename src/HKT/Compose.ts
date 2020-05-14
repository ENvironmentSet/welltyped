import { Stuck } from 'Primitive/Stuck'
import { HKT, Apply } from 'Primitive/HKT';

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