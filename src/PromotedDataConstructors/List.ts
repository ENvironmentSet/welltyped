import { Stuck } from 'Utils/Stuck';
import { Type } from 'Utils/Type';
import { HKT } from 'Utils/HKT';
import { Apply } from 'Utils/Apply';
import { If } from 'PromotedDataConstructors/Bool';
import { Z, S } from 'PromotedDataConstructors/Nat';

export type AnyList = Array<Type>;

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

export interface Last extends HKT {
  result: this['param'] extends infer list ? {
      base: Apply<Head, list>;
      recursiveStep: Apply<Last, Apply<Tail, list>>;
    }[Apply<If, [Apply<Length, list> extends S<Z> ? true : false, 'base', 'recursiveStep']>]
    : Stuck
}

export interface Init extends HKT {
  result: this['param'] extends infer list ? {
      base: [];
      recursiveStep: Apply<Cons, [Apply<Head, list>, Apply<Init, Apply<Tail, list>>]>;
    }[Apply<If, [Apply<Length, list> extends S<Z> ? true : false, 'base', 'recursiveStep']>]
    : Stuck
}

export interface Length extends HKT {
  result: this['param'] extends infer list ? {
      base: Z;
      recursiveStep: S<Apply<Length, Apply<Tail, list>>>
    }[Apply<If, [Apply<IsEmpty, list>, 'base', 'recursiveStep']>]
    : Stuck
}

export interface Cons extends HKT {
  result: this['param'] extends [infer car, infer cdr] ?
    cdr extends AnyList ?
      ((car: car, ...cdr: cdr) => never) extends (..._: infer consed) => never ? consed : Stuck : Stuck : Stuck;
}

export interface Filter extends HKT {
  result: this['param'] extends [infer predicate, infer list] ? {
    base: [],
    recursiveStep: predicate extends HKT ?
      list extends AnyList ?
        Apply<If, [
          Apply<predicate, Apply<Head, list>>,
          Apply<Filter, [predicate, Apply<Tail, list>]> extends infer xs ?
            Apply<Cons, [Apply<Head, list>, xs]>
            : Stuck,
          Apply<Filter, [predicate, Apply<Tail, list>]>
        ]>
        : Stuck
      : Stuck
  }[Apply<If, [Apply<IsEmpty, list>, 'base', 'recursiveStep']>]
  : Stuck;
}

export interface Map extends HKT {
  result: this['param'] extends [infer f, infer list] ? {
      base: [],
      recursiveStep: f extends HKT ?
        list extends AnyList ?
          Apply<Map, [f, Apply<Tail, list>]> extends infer xs ?
            Apply<Cons, [Apply<f, Apply<Head, list>>, xs]>
            : Stuck
          : Stuck
        : Stuck
    }[Apply<If, [Apply<IsEmpty, list>, 'base', 'recursiveStep']>]
    : Stuck;
}

export interface Reduce extends HKT {
  result: this['param'] extends [infer f, infer base, infer list] ? {
      base: base,
      recursiveStep: f extends HKT ?
        list extends AnyList ?
          Apply<Reduce, [f, Apply<f, [base, Apply<Head, list>]>, Apply<Tail, list>]>
          : Stuck
        : Stuck
    }[Apply<If, [Apply<IsEmpty, list>, 'base', 'recursiveStep']>]
    : Stuck;
}

export interface Concat extends HKT {
  result: this['param'] extends [infer xs, infer ys] ? {
      base: ys,
      recursiveStep: xs extends AnyList ?
        ys extends AnyList ?
            Apply<Cons, [Apply<Head, xs>, Apply<Concat, [Apply<Tail, xs>, ys]>]>
          : Stuck
        : Stuck
    }[Apply<If, [Apply<IsEmpty, xs>, 'base', 'recursiveStep']>]
    : Stuck;
}

export interface Reverse extends HKT {
  result: this['param'] extends infer list ? {
      base: [];
      recursiveStep: Apply<Cons, [Apply<Last, list>, Apply<Reverse, Apply<Init, list>>]>;
    }[Apply<If, [Apply<IsEmpty, list>, 'base', 'recursiveStep']>]
    : Stuck
}