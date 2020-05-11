import { PhantomTypeParameter } from 'Utils/PhantomTypeParameter';
import { Stuck } from 'Utils/Stuck';
import { MakeVoid } from 'Utils/MakeVoid';
import { TotalHKT } from 'Utils/HKT';
import { Apply } from 'Utils/Apply';

export interface Nat extends MakeVoid<'Nat'> {}
type _Z = MakeVoid<'Z'> & Nat;
export interface Z extends _Z {}
type _S<N extends Nat> = PhantomTypeParameter<'S/N', N> & Nat
export interface S<N extends Nat> extends _S<N> {}

export interface IsZ extends TotalHKT<Nat, boolean> {
  result: this['param'] extends true ? false : true;
}

export interface Add extends TotalHKT<[Nat, Nat], Nat> {
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