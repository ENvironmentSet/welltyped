import { HKT } from '../Primitive/HKT';
import { Stuck } from '../Primitive/Stuck';
import { DeriveGeneric, UnInitialized } from '../Primitive/UnInitialized';

interface _If extends HKT {
  result: this['param'] extends [infer condition, infer then, infer orElse] ?
    condition extends true ? then : orElse
    : Stuck;
}
export type If<param = UnInitialized> = DeriveGeneric<_If, param>;
