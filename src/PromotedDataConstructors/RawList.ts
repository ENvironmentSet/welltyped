import { PhantomTypeParameter } from 'Utils/PhantomTypeParameter';
import { Stuck } from 'Utils/Stuck';
import { Z, S } from 'PromotedDataConstructors/Nat';

export type TRawNil = 'TRawNil';
export type TRawCons<tcar, tcdr>
  = PhantomTypeParameter<'TRawCons/tcar', tcar> & PhantomTypeParameter<'TRawCons/tcdr', tcdr>;

export type RawHead<tlist> = tlist extends TRawCons<infer tcar, infer _> ? tcar : Stuck;

export type RawTail<tlist> = tlist extends TRawCons<infer _, infer tcdr> ? tcdr : Stuck;

export type RawLast<tlist> = {
  base: tlist extends TRawCons<infer last, infer _> ? last : Stuck;
  recursiveStep: tlist extends TRawCons<infer _, infer tcdr> ? RawLast<tcdr> : Stuck;
  undefined: Stuck;
}[tlist extends TRawCons<infer _, infer tcdr> ? tcdr extends TRawNil ? 'base' : 'recursiveStep' : 'undefined'];

export type RawInit<tlist, result = TRawNil> = {
  base: result;
  recursiveStep: tlist extends TRawCons<infer tcar, infer tcdr> ? RawInit<tcdr, TRawCons<tcar, result>> : Stuck;
  undefined: Stuck;
}[tlist extends TRawCons<infer _, infer tcdr> ? tcdr extends TRawNil ? 'base' : 'recursiveStep' : 'undefined'];

export type RawLength<tlist> = {
  base: Z;
  recursiveStep: S<RawLength<Tail<tlist>>>
}[tlist extends TRawNil ? 'base' : 'recursiveStep'];

export type RawConcat<xs, ys> = {
  base: ys;
  recursiveStep: xs extends TRawCons<infer tcar, infer tcdr> ? TRawCons<tcar, RawConcat<tcdr, ys>> : Stuck;
}[xs extends TRawNil ? 'base' : 'recursiveStep'];