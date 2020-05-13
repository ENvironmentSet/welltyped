import { HKT } from 'Utils/HKT';
import { Stuck } from 'Utils/Stuck';
import { Apply } from 'Utils/Apply';
import { Reverse } from 'PromotedDataConstructors/List';

interface Flipped<f extends HKT> extends HKT {
  result: Apply<f, Apply<Reverse, this['param']>>;
}
export interface Flip extends HKT {
  result: this['param'] extends HKT ?
    Flipped<this['param']>
    : Stuck;
}