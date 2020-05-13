import { MakeVoid } from 'Utils/MakeVoid';
import { HKT } from 'Utils/HKT';
import { Apply } from 'Utils/Apply';

export interface UnInitialized extends MakeVoid<'UnInitialized'> {}

interface _IsUnInitialized extends HKT {
  result: this['param'] extends UnInitialized ? true : false;
}
export type IsUnInitialized<param> = param extends UnInitialized ? _IsUnInitialized : Apply<_IsUnInitialized, param>;