import { HKT } from '../Primitive/HKT';
import { Stuck } from '../Primitive/Stuck';
import { UnInitialized, DeriveGeneric } from '../Primitive/UnInitialized';

interface _If extends HKT {
  result: this['param'] extends [infer condition, infer then, infer orElse] ?
    condition extends true ? then : orElse
    : Stuck;
}
export type If<param = UnInitialized> = DeriveGeneric<_If, param>;

interface _Not extends HKT {
  result: this['param'] extends true ? false : true;
}
export type Not<param> = DeriveGeneric<_Not, param>;