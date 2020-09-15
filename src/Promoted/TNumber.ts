import { Stuck } from '../Primitive/Stuck';
import { HKT } from '../Primitive/HKT';
import { DeriveGeneric, UnInitialized } from '../Primitive/UnInitialized';
import { Length, MakeTArray, Tail } from './TArray';

export type TNumber = number;

export interface _Inc extends HKT {
  result: Add<[this['param'], 1]>
}
export type Inc<param = UnInitialized> = DeriveGeneric<_Inc, param>;

export interface _Add extends HKT {
  result: this['param'] extends [infer x, infer y] ?
      x extends TNumber ?
        y extends TNumber ?
          Length<[...MakeTArray<x>, ...MakeTArray<y>]>
          : Stuck
        : Stuck
    : Stuck;
}
export type Add<param = UnInitialized> = DeriveGeneric<_Add, param>;

export interface _Dec extends HKT {
  result: this['param'] extends TNumber ? Length<Tail<MakeTArray<this['param']>>> : Stuck
}
export type Dec<param = UnInitialized> = DeriveGeneric<_Dec, param>;

export interface _Sub extends HKT {
  result: this['param'] extends [infer x, infer y] ?
    x extends 0 ?
      0 //@FIXME: Negative Number?
      : y extends 0 ?
        x
        : Sub<[Dec<x>, Dec<y>]>
    : Stuck;
}
export type Sub<param = UnInitialized> = DeriveGeneric<_Sub, param>;

export interface _Mul extends HKT {
  result: this['param'] extends [infer x, infer y] ?
    x extends 0 ?
      0 //@FIXME: Negative Number?
      : y extends 0 ?
      0
      : x extends 1 ?
        y
        : y extends 1 ?
          x
          : Add<[Mul<[x, Dec<y>]>, x]>
    : Stuck;
}
export type Mul<param = UnInitialized> = DeriveGeneric<_Mul, param>;

export interface _Exp extends HKT {
  result: this['param'] extends [infer x, infer y] ?
    y extends 0 ?
      1
      : y extends 1 ?
      x
      : Mul<[Exp<[x, Dec<y>]>, x]>
    : Stuck;
}
export type Exp<param = UnInitialized> = DeriveGeneric<_Exp, param>;
