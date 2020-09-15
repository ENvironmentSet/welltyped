import { HKT } from '../Primitive/HKT';
import { UnInitialized, DeriveGeneric } from '../Primitive/UnInitialized';

export type TBool = boolean;

interface _Not extends HKT {
  result: this['param'] extends true ? false : true;
}
export type Not<param = UnInitialized> = DeriveGeneric<_Not, param>;
