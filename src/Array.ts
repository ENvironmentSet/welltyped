import { TArray, Cons, Concat } from './Promoted/TArray';
import { TType } from './Primitive/TType';

export function cons<type extends TType, tarray extends TArray>(x: type, xs: tarray): Cons<type, tarray> {
  return [x, ...xs];
}

export function head<type extends TType>([x]: Cons<type, TArray>): type {
  return x;
}

export function tail<tarray extends TArray>([_, ...xs]: Cons<TType, tarray>): tarray {
  return xs;
}

export function concat<xs extends TArray, ys extends TArray>(xs: xs, ys: ys): Concat<xs, ys> {
  return [...xs, ...ys];
}
