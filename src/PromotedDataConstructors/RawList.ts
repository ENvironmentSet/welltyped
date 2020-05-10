import { PhantomTypeParameter } from 'Utils/PhantomTypeParameter';
import { Stuck } from 'Utils/Stuck';
import { Z, S } from 'PromotedDataConstructors/Nat';

export type RawTNil = 'RawTNil';
type _RawTCons<car, cdr>
  = PhantomTypeParameter<'RawTCons/car', car> & PhantomTypeParameter<'RawTCons/tcdr', cdr>;
export interface RawTCons<car, cdr> extends _RawTCons<car, cdr> {};

export type RawHead<rawList> = rawList extends RawTCons<infer car, infer _> ? car : Stuck;

export type RawTail<rawList> = rawList extends RawTCons<infer _, infer cdr> ? cdr : Stuck;

export type RawLast<rawList> = {
  base: rawList extends RawTCons<infer car, infer _> ? car : Stuck;
  recursiveStep: rawList extends RawTCons<infer _, infer cdr> ? RawLast<cdr> : Stuck;
  undefined: Stuck;
}[rawList extends RawTCons<infer _, infer tcdr> ? tcdr extends RawTNil ? 'base' : 'recursiveStep' : 'undefined'];

export type RawInit<rawList, result = RawTNil> = {
  base: result;
  recursiveStep: rawList extends RawTCons<infer car, infer cdr> ? RawInit<cdr, RawTCons<car, result>> : Stuck;
  undefined: Stuck;
}[rawList extends RawTCons<infer _, infer cdr> ? cdr extends RawTNil ? 'base' : 'recursiveStep' : 'undefined'];

export type RawLength<rawList> = {
  base: Z;
  recursiveStep: S<RawLength<RawTail<rawList>>>
}[rawList extends RawTNil ? 'base' : 'recursiveStep'];

export type RawConcat<xs, ys> = {
  base: ys;
  recursiveStep: xs extends RawTCons<infer car, infer cdr> ? RawTCons<car, RawConcat<cdr, ys>> : Stuck;
}[xs extends RawTNil ? 'base' : 'recursiveStep'];