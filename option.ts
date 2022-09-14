//값이 있을 수도, 없을 수도 있는 자료구조

//아래 방법은 undefined가 광범위하게 쓰이기 때문에 또다른 오류가 있을 수 있다.
//export type Option<A> = A | undefined;

export type Some<A> = {
  readonly _tag: "Some";
  readonly value: A;
};

export type None = {
  readonly _tag: "None";
};

export type Option<A> = Some<A> | None;

export const some = <A>(value: A): Option<A> => ({ _tag: "Some", value });

export const none = (): Option<never> => ({ _tag: "None" });

export const isSome = <A>(oa: Option<A>): oa is Some<A> => oa._tag === "Some";

export const isNone = <A>(oa: Option<A>): oa is None => oa._tag === "None";

export const fromUndefined = <A>(a: A | undefined): Option<A> => {
  if (a === undefined) return none();
  return some(a);
};

export const getOrElse = <A>(oa: Option<A>, defaultValue: A): A => {
  if (isNone(oa)) return defaultValue;
  return oa.value;
};
