import { Stuck } from 'Utils/Stuck';
import { Type } from 'Utils/Type';
import { HKT } from 'Utils/HKT';
import { Apply } from 'Utils/Apply';
import { If } from 'Promoted/Bool';
import { Z, S, Nat } from 'Promoted/Nat';
import { DeriveGeneric, UnInitialized } from 'Utils/UnInitialized';

export type AnyList = Array<Type>;

interface _IsEmpty extends HKT {
  result: this['param'] extends [] ? true : false;
}
export type IsEmpty<param = UnInitialized> = DeriveGeneric<_IsEmpty, param>;

interface _Head extends HKT {
  result: this['param'] extends AnyList ? If<[IsEmpty<this['param']>, Stuck, this['param'][0]]> : Stuck;
}
export type Head<param = UnInitialized> = DeriveGeneric<_Head, param>;

interface _Tail extends HKT {
  result: this['param'] extends AnyList ?
      ((..._: this['param']) => never) extends (_: infer _, ...tail: infer tail) => never ? tail
        : Stuck
    : Stuck;
}
export type Tail<param = UnInitialized> = DeriveGeneric<_Tail, param>;

interface _Last extends HKT {
  result: this['param'] extends infer list ? {
      base: Head<list>;
      recursiveStep: Last<Tail<list>>;
    }[If<[Length<list> extends S<Z> ? true : false, 'base', 'recursiveStep']>]
    : Stuck
}
export type Last<param = UnInitialized> = DeriveGeneric<_Last, param>;

interface _Init extends HKT {
  result: this['param'] extends infer list ? {
      base: [];
      recursiveStep: Cons<[Head<list>, Init<Tail<list>>]>;
    }[If<[Length<list> extends S<Z> ? true : false, 'base', 'recursiveStep']>]
    : Stuck
}
export type Init<param = UnInitialized> = DeriveGeneric<_Init, param>;

interface _Length extends HKT {
  result: this['param'] extends infer list ? {
      base: Z;
      recursiveStep: Length<Tail<list>> extends infer length ?
        length extends Nat ?
          S<length>
          : Stuck
        : Stuck;
    }[If<[IsEmpty<list>, 'base', 'recursiveStep']>]
    : Stuck
}
export type Length<param = UnInitialized> = DeriveGeneric<_Length, param>;

interface _Cons extends HKT {
  result: this['param'] extends [infer car, infer cdr] ?
    cdr extends AnyList ?
      ((car: car, ...cdr: cdr) => never) extends (..._: infer consed) => never ? consed : Stuck : Stuck : Stuck;
}
export type Cons<param = UnInitialized> = DeriveGeneric<_Cons, param>;

interface _Snoc extends HKT {
  result: this['param'] extends [infer car, infer cdr] ?
    Reverse<Cons<[car, Reverse<cdr>]>>
    : Stuck;
}
export type Snoc<param = UnInitialized> = DeriveGeneric<_Snoc, param>;

interface _Filter extends HKT {
  result: this['param'] extends [infer predicate, infer list] ? {
    base: [],
    recursiveStep: predicate extends HKT ?
      list extends AnyList ?
        If<[
          Apply<predicate, Head<list>>,
          Filter<[predicate, Tail<list>]> extends infer xs ?
            Cons<[Head<list>, xs]>
            : Stuck,
          Filter<[predicate, Apply<Tail, list>]>
        ]>
        : Stuck
      : Stuck
  }[If<[IsEmpty<list>, 'base', 'recursiveStep']>]
  : Stuck;
}
export type Filter<param = UnInitialized> = DeriveGeneric<_Filter, param>;

interface _Map extends HKT {
  result: this['param'] extends [infer f, infer list] ? {
      base: [],
      recursiveStep: f extends HKT ?
        list extends AnyList ?
          Map<[f, Tail<list>]> extends infer xs ?
            Cons<[Apply<f, Head<list>>, xs]>
            : Stuck
          : Stuck
        : Stuck
    }[If<[IsEmpty<list>, 'base', 'recursiveStep']>]
    : Stuck;
}
export type Map<param = UnInitialized> = DeriveGeneric<_Map, param>;

interface _Reduce extends HKT {
  result: this['param'] extends [infer f, infer base, infer list] ? {
      base: base,
      recursiveStep: f extends HKT ?
        list extends AnyList ?
          Reduce<[f, Apply<f, [base, Head<list>]>, Tail<list>]>
          : Stuck
        : Stuck
    }[If<[IsEmpty<list>, 'base', 'recursiveStep']>]
    : Stuck;
}
export type Reduce<param = UnInitialized> = DeriveGeneric<_Reduce, param>;

interface _Concat extends HKT {
  result: this['param'] extends [infer xs, infer ys] ? {
      base: ys,
      recursiveStep: xs extends AnyList ?
        ys extends AnyList ?
            Cons<[Head<xs>, Concat<[Tail<xs>, ys]>]>
          : Stuck
        : Stuck
    }[If<[IsEmpty<xs>, 'base', 'recursiveStep']>]
    : Stuck;
}
export type Concat<param = UnInitialized> = DeriveGeneric<_Concat, param>;

export interface _Reverse extends HKT {
  result: this['param'] extends infer list ? {
      base: [];
      recursiveStep: Cons<[Last<list>, Reverse<Init<list>>]>;
    }[If<[IsEmpty<list>, 'base', 'recursiveStep']>]
    : Stuck
}
export type Reverse<param = UnInitialized> = DeriveGeneric<_Reverse, param>;