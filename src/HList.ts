import { Cons, Head, AnyList, Tail, Concat, Reduce } from './Promoted/List';
import { Union } from './Promoted/Union';

export const hnil = [] as [];
export function hcons<type, tlist extends AnyList>(x: type, xs: tlist): Cons<[type, tlist]> {
  return [x, ...xs] as Cons<[type, tlist]>;
}

export function hl<tlist extends AnyList>(_: TemplateStringsArray, ...xs: tlist): tlist;
export function hl<tlist extends AnyList>(...xs: tlist): tlist;
export function hl(x: any, ...xs: any) {
  if (x?.hasOwnProperty?.('raw') && Object.prototype.toString.call(x.raw) === '[object Array]') return xs;
  else return [x, ...xs];
}

export function head<tlist extends AnyList>([x]: tlist): Head<tlist> {
  return x as Head<tlist>;
}

export function tail<tlist extends AnyList>([_, ...xs]: tlist): Tail<tlist> {
  return xs as Tail<tlist>;
}

export function concat<xs extends AnyList, ys extends AnyList>(xs: xs, ys: ys): Concat<[xs, ys]> {
  return xs.concat(ys) as Concat<[xs, ys]>;
}

export function reduce<tlist extends AnyList, R>(f: (x: Reduce<[Union, R, tlist]>, acc: R) => R, base: R, xs: tlist): R {
  if (xs.length === 0) return base;
  //@ts-ignore
  else return reduce(f, f(head(xs), base), tail(xs));
}