import { Stuck } from '../Primitive/Stuck';
import { TType } from '../Primitive/TType';
import { HKT, Apply } from '../Primitive/HKT';
import { If } from './Control';
import { DeriveGeneric, UnInitialized } from '../Primitive/UnInitialized';
import { TNumber } from './TNumber';

export type TArray = Array<TType>;
export type Empty = [];

export type MakeTArray<length extends TNumber, initType = unknown, result extends TArray = Empty>
  = Length<result> extends length ? result : MakeTArray<length, initType, [initType, ...result]>;

interface _IsEmpty extends HKT {
  result: this['param'] extends Empty ? true : false;
}
export type IsEmpty<param = UnInitialized> = DeriveGeneric<_IsEmpty, param>;

interface _Head extends HKT {
  result: this['param'] extends TArray ? If<[IsEmpty<this['param']>, Stuck, this['param'][0]]> : Stuck;
}
export type Head<param = UnInitialized> = DeriveGeneric<_Head, param>;

interface _Tail extends HKT {
  result: this['param'] extends TArray ?
      this['param'] extends [unknown, ...infer tail] ?
        tail
        : Stuck
    : Stuck;
}
export type Tail<param = UnInitialized> = DeriveGeneric<_Tail, param>;

interface _Last extends HKT {
  result: this['param'] extends infer L ?
      L extends TArray ?
        If<[IsEmpty<this['param']>, Stuck, Last<Tail<L>>]>
        : Stuck
    : Stuck
}
export type Last<param = UnInitialized> = DeriveGeneric<_Last, param>;

interface _Length extends HKT {
  result: this['param'] extends TArray ? this['param']['length'] : Stuck
}
export type Length<param = UnInitialized> = DeriveGeneric<_Length, param>;

interface _Cons extends HKT {
  result: this['param'] extends [infer car, infer cdr] ?
    cdr extends TArray ?
      [car, ...cdr]
      : Stuck
    : Stuck
}
export type Cons<param = UnInitialized> = DeriveGeneric<_Cons, param>;

interface _Map extends HKT {
  result: this['param'] extends [infer f, infer list] ?
    f extends HKT ?
      If<[IsEmpty<list>, Empty, Cons<[Apply<f, Head<list>>, Map<[f, Tail<list>]>]>]>
      : Stuck
    : Stuck;
}
export type Map<param = UnInitialized> = DeriveGeneric<_Map, param>;
