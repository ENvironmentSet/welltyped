import { PhantomTypeParameter } from 'Utils';
import { Cons, Nil, AnyTListKind } from 'PromotedDataConstructors';

type _HList<tlist> = unknown[] & PhantomTypeParameter<'HList/tlist', tlist>
export interface HList<tlist> extends _HList<tlist> {};

export const nil: HList<Nil> = [] as unknown as HList<Nil>;
export function cons<type, tlist extends AnyTListKind>(x: type, xs: HList<tlist>): HList<Cons<type, tlist>> {
  return [x, ...xs] as HList<Cons<type, tlist>>;
}

export function hl<tlist extends AnyTListKind>(_: TemplateStringsArray, ...xs: tlist): HList<tlist>;
export function hl<tlist extends AnyTListKind>(...xs: tlist): HList<tlist>;
export function hl(x: any, ...xs: any) {
  if (x?.hasOwnProperty?.('raw') && Object.prototype.toString.call(x.raw) === '[object Array]') return xs;
  else return [x, ...xs];
}