import { HKT } from 'Utils/HKT';
import { Stuck } from 'Utils/Stuck';
import { IsUnInitialized, UnInitialized } from 'Utils/UnInitialized';
import { Apply } from 'Utils/Apply';

interface _If extends HKT {
  result: this['param'] extends [infer condition, infer then, infer orElse] ?
    condition extends true ? then : orElse
    : Stuck;
}
export type If<param = UnInitialized> = Apply<_If, [IsUnInitialized<param>, _If, Apply<_If, param>]>;

interface _Not extends HKT {
  result: this['param'] extends true ? false : true;
}
export type Not<param> = If<[IsUnInitialized<param>, _Not, Apply<_Not, param>]>;