import { PhantomTypeParameter } from 'Utils/PhantomTypeParameter';
import { Stuck } from 'Utils/Stuck';
import { Z, S } from 'PromotedDataConstructors/Nat';

export type TNil = 'TNil';
type _TCons<tcar, tcdr> = PhantomTypeParameter<'TCons/tcar', tcar> & PhantomTypeParameter<'TCons/tcdr', tcdr>
export interface TCons<tcar, tcdr> extends _TCons<tcar, tcdr> {};

export type Head<tlist> = tlist extends TCons<infer tcar, infer _> ? tcar : Stuck;
export type Tail<tlist> = tlist extends TCons<infer _, infer tcdr> ? tcdr : Stuck;
export type Last<tlist> = {
  base: tlist extends TCons<infer last, infer _> ? last : Stuck;
  recursiveStep: tlist extends TCons<infer _, infer tcdr> ? Last<tcdr> : Stuck;
  undefined: Stuck;
}[tlist extends TCons<infer _, infer tcdr> ? tcdr extends TNil ? 'base' : 'recursiveStep' : 'undefined'];
export type Init<tlist, result = TNil> = {
  base: result;
  recursiveStep: tlist extends TCons<infer tcar, infer tcdr> ? Init<tcdr, TCons<tcar, result>> : Stuck;
  undefined: Stuck;
}[tlist extends TCons<infer _, infer tcdr> ? tcdr extends TNil ? 'base' : 'recursiveStep' : 'undefined'];
export type Length<tlist> = {
  base: Z;
  recursiveStep: S<Length<Tail<tlist>>>
}[tlist extends TNil ? 'base' : 'recursiveStep'];
export type Concat<xs, ys> = {
  base: ys;
  recursiveStep: xs extends TCons<infer tcar, infer tcdr> ? TCons<tcar, Concat<tcdr, ys>> : Stuck;
}[xs extends TNil ? 'base' : 'recursiveStep'];