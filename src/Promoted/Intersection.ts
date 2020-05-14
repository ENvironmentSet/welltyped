import { HKT } from '../Primitive/HKT';
import { Stuck } from '../Primitive/Stuck';
import { DeriveGeneric, UnInitialized } from '../Primitive/UnInitialized';

interface _Intersection extends HKT {
  result: this['param'] extends [infer A, infer B] ?
    A & B
    : Stuck;
}
export type Intersection<param = UnInitialized> = DeriveGeneric<_Intersection, param>;