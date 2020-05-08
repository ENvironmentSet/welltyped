import { PhantomTypeParameter } from 'Utils/PhantomTypeParameter';
import { Stuck } from 'Utils/Stuck';
import { Z, S } from 'PromotedDataConstructors/Nat';

export type RawTNil = 'TRawNil';
export type RawTCons<tcar, tcdr>
  = PhantomTypeParameter<'TRawCons/tcar', tcar> & PhantomTypeParameter<'TRawCons/tcdr', tcdr>;

export type RawHead<tlist> = tlist extends RawTCons<infer tcar, infer _> ? tcar : Stuck;

export type RawTail<tlist> = tlist extends RawTCons<infer _, infer tcdr> ? tcdr : Stuck;

export type RawLast<tlist> = {
  base: tlist extends RawTCons<infer last, infer _> ? last : Stuck;
  recursiveStep: tlist extends RawTCons<infer _, infer tcdr> ? RawLast<tcdr> : Stuck;
  undefined: Stuck;
}[tlist extends RawTCons<infer _, infer tcdr> ? tcdr extends RawTNil ? 'base' : 'recursiveStep' : 'undefined'];

export type RawInit<tlist, result = RawTNil> = {
  base: result;
  recursiveStep: tlist extends RawTCons<infer tcar, infer tcdr> ? RawInit<tcdr, RawTCons<tcar, result>> : Stuck;
  undefined: Stuck;
}[tlist extends RawTCons<infer _, infer tcdr> ? tcdr extends RawTNil ? 'base' : 'recursiveStep' : 'undefined'];

export type RawLength<tlist> = {
  base: Z;
  recursiveStep: S<RawLength<RawTail<tlist>>>
}[tlist extends RawTNil ? 'base' : 'recursiveStep'];

export type RawConcat<xs, ys> = {
  base: ys;
  recursiveStep: xs extends RawTCons<infer tcar, infer tcdr> ? RawTCons<tcar, RawConcat<tcdr, ys>> : Stuck;
}[xs extends RawTNil ? 'base' : 'recursiveStep'];