import { HKT } from 'Util/HKT';
import { Stuck } from 'Util/Stuck';
import { UnInitialized, DeriveGeneric } from 'Util/UnInitialized';

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