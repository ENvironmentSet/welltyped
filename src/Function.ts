import { Head, Length, Tail, TArray } from './Promoted/TArray';
import { Eq } from './Promoted/Eq';
import { Assert } from './Primitive/Assert';

export type TFunction = (...args: never) => unknown;
type ConstraintVariadicFunction<f extends TFunction>
  = Eq<Length<Parameters<f>>, number> extends true ? [never] : never;

export type Curried<f extends TFunction>
  = Length<Parameters<f>> extends 0 ?
    ReturnType<f>
  : (x: Head<Parameters<f>>) => Curried<(...args: Assert<Tail<Parameters<f>>, TArray>) => ReturnType<f>>;
//@FIXME(Assert): IDK Why typescript can't catch that result of type well if there is variadic element with conditional type.

function setFunctionLength<f>(f: f, length: number): f {
  return Object.defineProperty(f, 'length', { value: length });
}

//@FIXME: Is there any nature way not to use @ts-ignore?
export function curry
  <f extends TFunction, constraint extends ConstraintVariadicFunction<f>>
  (f: f): Length<Parameters<f>> extends 0 ? f : Curried<f> {
  if (f.length < 2) return f as Length<Parameters<f>> extends 0 ? f : Curried<f>;
  //@ts-ignore
  else return x => curry(setFunctionLength((...args) => f(x, ...args), f.length - 1));
}
