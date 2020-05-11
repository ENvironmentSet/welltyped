import { Stuck } from 'Utils/Stuck'
import { HKT, GetHKTParamKind, GetHKTResultKind } from 'Utils/HKT';
import { Apply } from 'Utils/Apply';

export interface Composed<F extends HKT, G extends HKT> extends HKT<Apply<GetHKTParamKind, G>, Apply<GetHKTResultKind, F>> {
  result: Apply<F, Apply<G, this['param']>>;
  failed: Apply<G, this['param'], 'welltyped/stuck'> extends 'welltyped/stuck' ? //@TODO: Replace this constant by something better.
    true
    : Apply<F, Apply<G, this['param']>, 'welltyped/stuck'> extends 'welltyped/stuck' ?
      true
      : false;
}

export interface Compose extends HKT<[HKT, HKT], HKT> {
  result: this['param'] extends [infer F, infer G] ? //@FIXME: Type system forgot that F and G are always HKT. further investigation required.
      F extends HKT ?
        G extends HKT ?
          Apply<GetHKTResultKind, G> extends Apply<GetHKTParamKind, F> ?
            Composed<F, G>
            : Stuck
          : Stuck
        : Stuck
    : Stuck;
  failed: this['param'] extends [infer F, infer G] ?
    F extends HKT ?
      G extends HKT ?
        Apply<GetHKTResultKind, G> extends Apply<GetHKTParamKind, F> ?
          false
          : true
        : true
      : true
    : true;
}