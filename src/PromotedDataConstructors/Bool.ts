import { HKT } from 'Utils/HKT';
import { Stuck } from 'Utils/Stuck';

export interface If extends HKT {
  result: this['param'] extends [infer condition, infer then, infer orElse] ?
    condition extends true ? then : orElse
    : Stuck;
}

export interface Not extends HKT {
  result: this['param'] extends true ? false : true;
}