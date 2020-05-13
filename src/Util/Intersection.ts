import { HKT } from 'Util/HKT';
import { Stuck } from 'Util/Stuck';
import { DeriveGeneric, UnInitialized } from 'Util/UnInitialized';

interface _Intersection extends HKT {
  result: this['param'] extends [infer A, infer B] ?
    A & B
    : Stuck;
}
export type Intersection<param = UnInitialized> = DeriveGeneric<_Intersection, param>;