import { HKT } from '../Primitive/HKT';
import { Stuck } from '../Primitive/Stuck';
import { DeriveGeneric, UnInitialized } from '../Primitive/UnInitialized';

interface _Eq extends HKT {
  result: this['param'] extends [infer A, infer B] ?
    A extends B ?
      B extends A ?
        true
        : false
      : false
    : Stuck;
}
export type Eq<param = UnInitialized> = DeriveGeneric<_Eq, param>;