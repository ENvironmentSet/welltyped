import { HKT } from '../Primitive/HKT';
import { Stuck } from '../Primitive/Stuck';
import { DeriveGeneric, UnInitialized } from '../Primitive/UnInitialized';

interface _Union extends HKT {
  result: this['param'] extends [infer A, infer B] ?
    A | B
    : Stuck;
}
export type Union<param = UnInitialized> = DeriveGeneric<_Union, param>;