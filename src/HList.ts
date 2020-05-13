import { Cons, Head, AnyList, Tail, Concat } from 'PromotedDataConstructors/List';

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