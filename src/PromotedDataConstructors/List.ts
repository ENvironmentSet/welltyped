import { Stuck } from 'Utils/Stuck';
import { Type } from 'Utils/Type';
import { HKT } from 'Utils/HKT';
import { Apply } from 'Utils/Apply';
import { If } from 'PromotedDataConstructors/Bool';
import { Z, S } from 'PromotedDataConstructors/Nat';

export type AnyList = Array<Type>;

type Nil_ = [];
export interface Nil extends Nil_ {}

export interface IsEmpty extends HKT {
  result: this['param'] extends [] ? true : false;
}

export interface Head extends HKT {
  result: this['param'] extends AnyList ? Apply<If, [Apply<IsEmpty, this['param']>, Stuck, this['param'][0]]> : Stuck;
}

export interface Tail extends HKT {
  result: this['param'] extends AnyList ?
      ((..._: this['param']) => never) extends (_: infer _, ...tail: infer tail) => never ? tail
        : Stuck
    : Stuck;
}

export interface Length extends HKT {
  result: this['param'] extends infer list ? {
      base: Z;
      recursiveStep: S<Apply<Length, Apply<Tail, list>>>
    }[list extends [] ? 'base' : 'recursiveStep']
    : Stuck
}

export interface Cons extends HKT {
  result: this['param'] extends [infer car, infer cdr] ?
    cdr extends AnyList ?
      ((car: car, ...cdr: cdr) => never) extends (..._: infer consed) => never ? consed : Stuck : Stuck : Stuck;
}