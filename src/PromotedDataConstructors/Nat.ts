import { PhantomTypeParameter } from 'Utils/PhantomTypeParameter';
import { Stuck } from 'Utils/Stuck';
import { MakeVoid } from 'Utils/MakeVoid';

export interface Z extends MakeVoid<'Z'> {};
type _S<Nat> = PhantomTypeParameter<'S/Nat', Nat>;
export interface S<Nat> extends _S<Nat> {};

export type Add<X, Y> = {
  base: Y;
  recursiveStep: X extends S<infer XP> ? Add<XP, S<Y>> : Stuck;
}[X extends Z ? 'base' : 'recursiveStep'];