import { Length, Reduce, AnyList, Map, Head, Tail, Snoc, Init, Cons, Scan } from './Promoted/List';
import { hnil } from './HList';
import { Z, S } from './Promoted/Nat';
import { Stuck } from './Primitive/Stuck';
import { HKT, Apply } from './Primitive/HKT';
import { DeriveGeneric, UnInitialized } from './Primitive/UnInitialized';
import { Intersection } from './Promoted/Intersection';
import { Flip } from './HKT/Flip';
import { If } from './Promoted/Bool';
import { Eq } from './Promoted/Eq';

export type AnyFunction = (...args: never) => unknown;

type FilterByMatch<A, B> = {
  base: B;
  recursiveStep: If<[Eq<[Head<A>, Head<B>]>, FilterByMatch<Tail<A>, Tail<B>>, Cons<[Head<B>, FilterByMatch<Tail<A>, Tail<B>>]>]>
}[Length<A> extends Z ? 'base' : 'recursiveStep'];

interface ExtractNArgFunction<functionSignature extends AnyFunction> extends HKT {
  result:
    this['param'] extends AnyList ?
      FilterByMatch<this['param'], Parameters<functionSignature>> extends infer A ?
        A extends AnyList ?
          (...args: this['param']) => Curried<(...args: A) => ReturnType<functionSignature>>
          : Stuck
        : Stuck
    : Stuck;
}

type Subsequences<list extends AnyList> = Init<Scan<[
  Flip<Snoc>,
  [],
  list
]>>;

interface _Curried extends HKT {
  result: this['param'] extends infer f ?
    f extends AnyFunction ? {
        base: Length<Parameters<f>> extends Z ? ReturnType<f> : f;
        recursiveStep:
            Reduce<[
              Intersection,
              unknown,
              Map<[
                ExtractNArgFunction<f>
                ,
                Subsequences<Parameters<f>>
              ]>
            ]>
      }[Length<Parameters<f>> extends Z | S<Z> ? 'base' : 'recursiveStep']
      : Stuck
    : Stuck;
}
type Curried<param = UnInitialized> = DeriveGeneric<_Curried, param>;

export function curry<f extends AnyFunction>(f: f): Curried<f> {
  function _curry<applied extends AnyList>(applied: applied): Curried<f> {
    //@ts-expect-error @TODO: Type this code
    return (...args) => args.length + applied.length < f.length ? _curry(applied.concat(args)) : f(...(applied.concat(args)));
  }

  return _curry(hnil);
}

export type ElimWithConstraint<constraint extends HKT> = <R>(f: <A>(x: Apply<constraint, A>) => R) => R;
export function makeElimWithConstraint<constraint extends HKT>(): <A>(x: Apply<constraint, A>) => ElimWithConstraint<constraint> {
  return x => f => f(x);
}
