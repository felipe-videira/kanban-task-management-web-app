import { Requireable } from "prop-types";

export interface LengthValidator<T> {
  (min: number, max?: number): Requireable<T>;
}

export interface Measurable<T> extends Requireable<T> {
  lenght: LengthValidator<T>;
}
