import { Length, Reduce, AnyList, Map, Head, Tail, Snoc, Last, Cons } from 'Promoted/List';
import { hnil } from 'HList';
import { Z, S } from 'Promoted/Nat';
import { Stuck } from 'Primitive/Stuck';
import { HKT, Apply } from 'Primitive/HKT';
import { DeriveGeneric, UnInitialized } from 'Primitive/UnInitialized';
import { Intersection } from 'Promoted/Intersection';

export type AnyFunction = (...args: never) => unknown;

type Diff<A, B> = {
  base: B;
  recursiveStep: Head<A> extends Head<B> ?
    Diff<Tail<A>, Tail<B>>
    : Cons<[Head<B>, Diff<Tail<A>, Tail<B>>]>
}[Length<A> extends Z ? 'base' : A extends B ? B extends A ? 'base' : 'recursiveStep' : 'recursiveStep'];

interface _Lambda_2C<curriedParams> extends HKT {
  result: this['param'] extends AnyList ?
    curriedParams extends [infer originalParams, infer returnType] ?
      Diff<this['param'], originalParams> extends infer A ?
        A extends AnyList ?
          (...args: this['param']) => Curried<(...args: A) => returnType>
          : Stuck
        : Stuck
      : Stuck
    : Stuck;
}
interface _Lambda_2 extends HKT {
  result: _Lambda_2C<this['param']>;
}
type Lambda_2<param = UnInitialized> = DeriveGeneric<_Lambda_2, param>;

interface Lambda_1 extends HKT {
  result: this['param'] extends [infer acc, infer type] ?
    Snoc<[
      Snoc<[type, Last<acc>]>
      ,
      acc
    ]>
    : Stuck;
}
type MagicalSlice<list extends AnyList> = Reduce<[
  Lambda_1,
  [[Head<list>]],
  Tail<list>
]>;

interface _Curried extends HKT {
  result: this['param'] extends infer f ?
    f extends AnyFunction ? {
        base: Length<Parameters<f>> extends Z ? ReturnType<f> : f;
        recursiveStep: Parameters<f> extends infer params ?
          params extends AnyList ?
            Reduce<[
              Intersection,
              unknown,
              Map<[
                Lambda_2<[params, ReturnType<f>]>
                ,
                MagicalSlice<params>
              ]>
            ]>
            : Stuck
          : Stuck;
      }[Length<Parameters<f>> extends Z | S<Z> ? 'base' : 'recursiveStep']
      : Stuck
    : Stuck;
}
type Curried<param = UnInitialized> = DeriveGeneric<_Curried, param>;

export function curry<f extends AnyFunction>(f: f): Curried<f> {
  function _curry<applied extends AnyList>(applied: applied): Curried<f> {
    //@ts-ignore @TODO: Type this code
    return (...args) => args.length + applied.length < f.length ? _curry(applied.concat(args)) : f(...(applied.concat(args)));
  }

  return _curry(hnil);
}

export type ElimWithConstraint<constraint extends HKT> = <R>(f: <A>(x: Apply<constraint, A>) => R) => R;
export function makeElimWithConstraint<constraint extends HKT>(): <A>(x: Apply<constraint, A>) => ElimWithConstraint<constraint> {
  return x => f => f(x);
}
