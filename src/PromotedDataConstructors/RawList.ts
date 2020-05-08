import { PhantomTypeParameter } from 'Utils/PhantomTypeParameter';
import { Stuck } from 'Utils/Stuck';
import { Z, S } from 'PromotedDataConstructors/Nat';

export type RawTNil = 'TRawNil';
export type RawTCons<car, cdr>
  = PhantomTypeParameter<'RawTCons/car', car> & PhantomTypeParameter<'RawTCons/tcdr', cdr>;

export type RawHead<list> = list extends RawTCons<infer car, infer _> ? car : Stuck;

export type RawTail<list> = list extends RawTCons<infer _, infer cdr> ? cdr : Stuck;

export type RawLast<list> = {
  base: list extends RawTCons<infer car, infer _> ? car : Stuck;
  recursiveStep: list extends RawTCons<infer _, infer cdr> ? RawLast<cdr> : Stuck;
  undefined: Stuck;
}[list extends RawTCons<infer _, infer tcdr> ? tcdr extends RawTNil ? 'base' : 'recursiveStep' : 'undefined'];

export type RawInit<list, result = RawTNil> = {
  base: result;
  recursiveStep: list extends RawTCons<infer car, infer cdr> ? RawInit<cdr, RawTCons<car, result>> : Stuck;
  undefined: Stuck;
}[list extends RawTCons<infer _, infer cdr> ? cdr extends RawTNil ? 'base' : 'recursiveStep' : 'undefined'];

export type RawLength<list> = {
  base: Z;
  recursiveStep: S<RawLength<RawTail<list>>>
}[list extends RawTNil ? 'base' : 'recursiveStep'];

export type RawConcat<xs, ys> = {
  base: ys;
  recursiveStep: xs extends RawTCons<infer car, infer cdr> ? RawTCons<car, RawConcat<cdr, ys>> : Stuck;
}[xs extends RawTNil ? 'base' : 'recursiveStep'];