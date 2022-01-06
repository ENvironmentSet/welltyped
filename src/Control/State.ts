import { PhantomTypeParameter } from '../Primitive/PhantomTypeParameter';
import { TType } from '../Primitive/TType';
import { Apply, HKT } from '../Primitive/HKT';

type Context<context> = PhantomTypeParameter<'welltyped/state/context', context>;
type Shadow<shadow> = PhantomTypeParameter<'welltyped/state/phantom', shadow>;
type PickContext<state> = state extends Context<infer context> ? context : never;
type PickShadow<shadow> = shadow extends Shadow<infer shadow> ? shadow : never;

export interface Return<a extends TType> extends HKT { //@TODO: Make State strictly typed via kind polymorphism.
  params: [TType];
  context: this['params'][0];
  result: a & Context<this['context']> & Shadow<a>;
}

export interface Bind<state extends HKT, f extends HKT> extends HKT {
  params: [TType];
  context: this['params'][0];
  result: Apply<f, [PickShadow<state>, PickContext<this['context']>]>
}

export type Exec<state extends HKT, s extends TType> = Apply<state, [s]>;
