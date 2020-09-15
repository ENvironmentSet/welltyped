import { HKT } from '../Primitive/HKT';
import { DeriveGeneric, UnInitialized } from '../Primitive/UnInitialized';

interface _EqC<a> extends HKT {
  result: Eq<[a, this['param']]>;
}
interface _Eq extends HKT {
  result: this['param'] extends [infer a, infer b] ?
    a extends b ?
      b extends a ?
        true
        : false
      : false
    : _EqC<this['param']>;
}
export type Eq<param = UnInitialized> = DeriveGeneric<_Eq, param>;
