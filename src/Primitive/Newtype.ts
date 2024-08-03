import { PhantomTypeParameter } from './PhantomTypeParameter';
import { Stuck } from './Stuck';

export type Newtype<typeName extends keyof any, type> = type & PhantomTypeParameter<typeName, Stuck>;