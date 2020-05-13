import { HKT } from 'Util/HKT';
import { Stuck } from 'Util/Stuck';
import { Apply } from 'Util/Apply';
import { Reverse } from 'Promoted/List';

interface Flipped<f extends HKT> extends HKT {
  result: Apply<f, Apply<Reverse, this['param']>>;
}
export interface Flip extends HKT {
  result: this['param'] extends HKT ?
    Flipped<this['param']>
    : Stuck;
}