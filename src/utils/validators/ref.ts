/* eslint-disable @typescript-eslint/no-explicit-any */
import { any, func, oneOfType, Requireable } from "prop-types";

export const ref = oneOfType<
  Requireable<React.RefCallback<any>> | Requireable<React.RefObject<any>>
>([func, any]);
