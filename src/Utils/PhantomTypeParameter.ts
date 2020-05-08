export abstract class PhantomTypeParameter<P> {
  protected readonly abstract _: (_: P) => P;
}