import { HKT } from 'Util/HKT';
import { Stuck } from 'Util/Stuck';
import { DeriveGeneric, UnInitialized } from 'Util/UnInitialized';

interface _Join extends HKT {
  result: this['param'] extends [infer A, infer B] ?
    A & B
    : Stuck;
}
export type Join<param = UnInitialized> = DeriveGeneric<_Join, param>;