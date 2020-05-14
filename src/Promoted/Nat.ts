import { PhantomTypeParameter } from 'Primitive/PhantomTypeParameter';
import { Stuck } from 'Primitive/Stuck';
import { MakeVoid } from 'Primitive/MakeVoid';
import { HKT, Apply } from 'Primitive/HKT';
import { DeriveGeneric, UnInitialized } from 'Primitive/UnInitialized';

export interface Nat extends MakeVoid<'Nat'> {}
type _Z = MakeVoid<'Z'> & Nat;
export interface Z extends _Z {}
type _S<N extends Nat> = PhantomTypeParameter<'S/N', N> & Nat
export interface S<N extends Nat> extends _S<N> {}

interface _IsZ extends HKT {
  result: this['param'] extends true ? false : true;
}
export type IsZ<param = UnInitialized> = DeriveGeneric<_IsZ, param>;

export interface _Add extends HKT {
  result: this['param'] extends [infer X, infer Y] ?
      X extends Nat ?
        Y extends Nat ?
          {
            base: Y;
            recursiveStep: X extends S<infer XP> ? Apply<Add, [XP, S<Y>]> : Stuck;
          }[X extends Z ? 'base' : 'recursiveStep']
          : Stuck
      : Stuck
    : Stuck;
}
export type Add<param = UnInitialized> = DeriveGeneric<_Add, param>;