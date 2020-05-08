import { Stuck } from 'Utils';
import { Cons, Nil, AnyTListKind, Head, Tail } from 'PromotedDataConstructors';

export type HNil = { type: 'HNil' };
export type HCons<car, cdr extends AnyTListKind> = { type: 'HCons', car: car, cdr: HList<cdr> } & Cons<car, cdr>;
interface _HList<tlist extends AnyTListKind> {
  unwrap: {
    base: HNil;
    recursiveStep: Tail<tlist> extends infer tlistTail ?
      tlistTail extends AnyTListKind ?
        HCons<Head<tlist>, tlistTail>
        : Stuck
      : Stuck
  }[tlist extends Nil ? 'base' : 'recursiveStep'];
}
type HList<tlist> = tlist extends AnyTListKind ? _HList<tlist> : Stuck;

export const hnil: HList<Nil> = { unwrap: [] } as unknown as HList<Nil>;
export function hcons<type, tlist extends AnyTListKind>(car: type, cdr: HList<tlist>): HList<Cons<type, tlist>> {
  return { unwrap: { type: 'HCons', car, cdr } } as HList<Cons<type, tlist>>;
}

export function hl<tlist extends AnyTListKind>(_: TemplateStringsArray, ...xs: tlist): HList<tlist>;
export function hl<tlist extends AnyTListKind>(...xs: tlist): HList<tlist>;
export function hl(x: any, ...xs: any) {
  if (x?.hasOwnProperty?.('raw') && Object.prototype.toString.call(x.raw) === '[object Array]')
    return xs.reduce(hcons, hnil);
  else return hcons(x, xs.reduce(hcons, hnil));
}