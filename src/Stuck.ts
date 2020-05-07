import { PhantomTypeParameter } from './PhantomTypeParameter';

export type Stuck = 'Stuck' & PhantomTypeParameter<never>