import { Validator } from "prop-types"

export default function customValidator <T>(validator: Validator<T>): Validator<T> {
    return validator;
}