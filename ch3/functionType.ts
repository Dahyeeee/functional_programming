export type MapType<A, B> = (xs: Array<A>, f: (x: A) => B) => Array<B>;

export type MapType1 = MapType<number, number>;

export type Compose<A, B, C> = (g: (y: B) => C, f: (x: A) => B) => (a: A) => C;

export type Compose1 = Compose<string, number, boolean>;
