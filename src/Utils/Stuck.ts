import { PhantomTypeParameter } from 'Utils/PhantomTypeParameter';

export type Stuck = 'Stuck' & PhantomTypeParameter<never>