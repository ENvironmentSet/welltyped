import { Stuck } from 'Utils';
import {
  RawTCons, RawTNil,
  RawHead, RawTail, RawLength,
  RawInit, RawLast, RawConcat
} from 'PromotedDataConstructors/RawList';

export type AnyTListKind = unknown[];

// Inspired by $mol_type https://github.com/eigenmethod/mol/tree/master/type
export type ToRawList<list extends AnyTListKind> = {
  base: RawTNil;
  recursiveStep: ((...tlist: list) => never) extends ((car: infer car, ...cdr: infer cdr) => never) ?
    RawTCons<car, ToRawList<cdr>>
    : Stuck;
}[list extends [] ? 'base' : 'recursiveStep'];

export type FromRawList<rawList, base extends AnyTListKind = []> = {
  base: base;
  recursiveStep: rawList extends RawTCons<infer car, infer rawCdr> ?
    FromRawList<rawCdr> extends infer cdr ?
      cdr extends AnyTListKind ?
        ((car: car, ..._cdr: cdr) => never) extends ((...list: infer list) => never) ?
          list
          : Stuck
        : Stuck
      : Stuck
    : Stuck;
}[rawList extends RawTNil ? 'base' : 'recursiveStep'];

export type Head<list extends AnyTListKind> = RawHead<ToRawList<list>>;

export type Tail<list extends AnyTListKind> = FromRawList<RawTail<ToRawList<list>>>;

export type Last<list extends AnyTListKind> = RawLast<ToRawList<list>>;

export type Init<list extends AnyTListKind> = FromRawList<RawInit<ToRawList<list>>>;

export type Length<list extends AnyTListKind> = RawLength<ToRawList<list>>;

export type Concat<xs extends AnyTListKind, ys extends AnyTListKind>
  = FromRawList<RawConcat<ToRawList<xs>, ToRawList<ys>>>;

export type Cons<car, cdr extends AnyTListKind> = FromRawList<RawTCons<car, ToRawList<cdr>>>

export type Nil = [];