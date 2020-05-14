import { HKT } from '../Primitive/HKT';
import { DeriveGeneric, UnInitialized } from '../Primitive/UnInitialized';

interface _EqC<A> extends HKT {
  result: Eq<[A, this['param']]>;
}
interface _Eq extends HKT {
  result: this['param'] extends [infer A, infer B] ?
    A extends B ?
      B extends A ?
        true
        : false
      : false
    : _EqC<this['param']>;
}
export type Eq<param = UnInitialized> = DeriveGeneric<_Eq, param>;