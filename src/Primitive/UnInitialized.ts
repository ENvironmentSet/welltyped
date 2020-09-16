import { MakeVoid } from './MakeVoid';
import { HKT, Apply } from './HKT';

export interface UnInitialized extends MakeVoid<'UnInitialized'> {}

export type DeriveGeneric<f extends HKT, param> = param extends UnInitialized ? f : Apply<f, param>;
