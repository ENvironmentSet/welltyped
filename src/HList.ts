import { Cons, Head, AnyList, Tail } from 'PromotedDataConstructors/List';
import { Apply } from 'Utils/Apply';

export const hnil = [] as [];
export function hcons<type, tlist extends AnyList>(x: type, xs: tlist): Apply<Cons, [type, tlist]> {
  return [x, ...xs] as Apply<Cons, [type, tlist]>;
}

export function hl<tlist extends AnyList>(_: TemplateStringsArray, ...xs: tlist): tlist;
export function hl<tlist extends AnyList>(...xs: tlist): tlist;
export function hl(x: any, ...xs: any) {
  if (x?.hasOwnProperty?.('raw') && Object.prototype.toString.call(x.raw) === '[object Array]') return xs;
  else return [x, ...xs];
}

export function head<tlist extends AnyList>([x]: tlist): Apply<Head, tlist> {
  return x as Apply<Head, tlist>;
}

export function tail<tlist extends AnyList>([_, ...xs]: tlist): Apply<Tail, tlist> {
  return xs as Apply<Tail, tlist>;
}