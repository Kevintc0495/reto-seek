import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
} from "react";

export type PropsWithAs<R, T extends ElementType> = R & {
  as?: T;
  className?: string;
};
export type Ref<T extends ElementType> = ComponentPropsWithRef<T>["ref"];
export type PolymorphicProps<R, T extends ElementType> = PropsWithAs<R, T> &
  ComponentPropsWithoutRef<T> & { ref?: Ref<T> };
export type PolymorphicComponent<OwnProps, T extends ElementType> = <
  C extends ElementType = T,
>(
  props: PolymorphicProps<OwnProps, C>,
) => ReactNode;
