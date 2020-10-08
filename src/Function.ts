import { Head, Length, Tail } from './Promoted/TArray';
import { Eq } from './Promoted/Eq';

export type TFunction = (...args: never) => unknown;
type ConstraintVariadicFunction<f extends TFunction>
  = Eq<Length<Parameters<f>>, number> extends true ? [never] : never;

export type Curried<f extends TFunction>
  = Length<Parameters<f>> extends 0 ?
    ReturnType<f>
  : (x: Head<Parameters<f>>) => Curried<(...args: Tail<Parameters<f>>) => ReturnType<f>>;

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
