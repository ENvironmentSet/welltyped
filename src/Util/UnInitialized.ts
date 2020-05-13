import { MakeVoid } from 'Util/MakeVoid';
import { HKT } from 'Util/HKT';
import { Apply } from 'Util/Apply';

export interface UnInitialized extends MakeVoid<'UnInitialized'> {}

interface _IsUnInitialized extends HKT {
  result: this['param'] extends UnInitialized ? true : false;
}
export type IsUnInitialized<param> = param extends UnInitialized ? _IsUnInitialized : Apply<_IsUnInitialized, param>;

export type DeriveGeneric<f extends HKT, param> = param extends UnInitialized ? f : Apply<f, param>;