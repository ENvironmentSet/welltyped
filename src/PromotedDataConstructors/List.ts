import { Stuck } from 'Utils/Stuck';
import { Type } from 'Utils/Type';
import { HKT, TotalHKT } from 'Utils/HKT';
import { Apply } from 'Utils/Apply';
import { If } from 'PromotedDataConstructors/Bool';

export type AnyList = Array<Type>;

export interface IsEmpty extends TotalHKT<AnyList> {
  result: this['param'] extends [] ? true : false;
}

export interface Head extends HKT<AnyList> {
  result: Apply<If, [Apply<IsEmpty, this['param']>, Stuck, this['param'][0]]>;
  failed: Apply<IsEmpty, this['param']>;
}

export interface Tail extends HKT { //@FIXME: without not specifying type of param, this doesn't works. further investigation required.
  result: this['param'] extends AnyList ?
      ((..._: this['param']) => never) extends (_: infer _, ...tail: infer tail) => never ? tail
        : Stuck
    : Stuck;
  failed: this['param'] extends AnyList ? Apply<IsEmpty, this['param']> : Stuck;
}

export interface Cons extends TotalHKT { //@FIXME: without not specifying type of param, this doesn't works. further investigation required.
  result: this['param'] extends [infer car, infer cdr] ?
    cdr extends AnyList ?
      ((car: car, ...cdr: cdr) => never) extends (..._: infer consed) => never ? consed : Stuck : Stuck : Stuck;
}