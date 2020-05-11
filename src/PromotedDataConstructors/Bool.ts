import { TotalHKT } from 'Utils/HKT';
import { Stuck } from 'Utils/Stuck';

export interface If extends TotalHKT<[boolean, unknown, unknown]> {
  result: this['param'] extends [infer condition, infer then, infer orElse] ?
    condition extends true ? then : orElse
    : Stuck;
}

export interface Not extends TotalHKT<boolean, boolean> {
  result: this['param'] extends true ? false : true;
}