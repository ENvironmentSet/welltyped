import { HKT } from 'Utils/HKT';
import { Stuck } from 'Utils/Stuck';
import { DeriveGeneric, UnInitialized } from 'Utils/UnInitialized';

interface _Join extends HKT {
  result: this['param'] extends [infer A, infer B] ?
    A & B
    : Stuck;
}
export type Join<param = UnInitialized> = DeriveGeneric<_Join, param>;