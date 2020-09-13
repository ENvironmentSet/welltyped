import { HKT, Apply } from '../Primitive/HKT';
import { Stuck } from '../Primitive/Stuck';
import { Reverse } from '../Promoted/List';
import { DeriveGeneric, UnInitialized } from '../Primitive/UnInitialized';

interface Flipped<f extends HKT> extends HKT {
  result: Apply<f, Apply<Reverse, this['param']>>;
}
interface _Flip extends HKT {
  result: this['param'] extends HKT ?
    Flipped<this['param']>
    : Stuck;
}
export type Flip<param = UnInitialized> = DeriveGeneric<_Flip, param>;