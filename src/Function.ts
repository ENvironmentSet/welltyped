import { Length, Head, Tail, AnyList, Cons } from 'PromotedDataConstructors/List';
import { hnil } from 'HList';
import { Z, S } from 'PromotedDataConstructors/Nat';
import { Stuck } from 'Utils/Stuck';
import { Apply } from 'Utils/Apply';
import { HKT } from 'Utils/HKT';

export type AnyFunction = (...args: never) => unknown;

//@FIXME: Wrong typing, can't cover all function.
export type Curried<f extends AnyFunction> = {
  base: Apply<Length, Parameters<f>> extends Z ? ReturnType<f> : ((...args: Parameters<f>) => ReturnType<f>);
  recursiveStep: Parameters<f> extends infer params ?
    params extends AnyList ?
      & ((...args: params) => ReturnType<f>)
      & ((...args: [Apply<Head, params>]) => Curried<(...args: Apply<Tail, params>) => ReturnType<f>>)
      & ((...args: Apply<Cons, [Apply<Head, params>, [Apply<Head, Apply<Tail, params>>]]>) =>
      Curried<(...args: Apply<Tail, Apply<Tail, params>>) => ReturnType<f>>)
      : Stuck
    : Stuck;
}[Apply<Length, Parameters<f>> extends Z | S<Z> ? 'base' : 'recursiveStep'];

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
