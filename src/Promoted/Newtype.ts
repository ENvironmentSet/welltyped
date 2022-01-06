import { PhantomTypeParameter } from '../Primitive/PhantomTypeParameter';
import { Stuck } from '../Primitive/Stuck';

export type Newtype<typeName extends keyof any, type> = type & PhantomTypeParameter<typeName, Stuck>;