import { Empty, TArray, Cons, Concat } from './Promoted/TArray';
import { TType } from './Primitive/TType';

export const empty = [] as Empty;

export function cons<type extends TType, tarray extends TArray>(x: type, xs: tarray): Cons<[type, tarray]> {
  return [x, ...xs] as Cons<[type, tarray]>;
}

export function head<type extends TType>([x]: Cons<[type, TArray]>): type {
  return x;
}

export function tail<tarray extends TArray>([_, ...xs]: Cons<[unknown, tarray]>): tarray {
  return xs as tarray;
}

export function concat<xs extends TArray, ys extends TArray>(xs: xs, ys: ys): Concat<[xs, ys]> {
  return xs.concat(ys) as Concat<[xs, ys]>;
}
