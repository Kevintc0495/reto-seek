const pipe = <T, R>(...fns: Array<(arg: T) => T>) => (initialValue: T): R =>
  fns.reduce((acc, fn) => fn(acc), initialValue) as unknown as R;

export default pipe;