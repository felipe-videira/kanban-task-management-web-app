import { ReactNode } from "react";
import clamp from "./clamp";

export default (text: string | ReactNode, containerSizeRem = 10) =>
  text
    ? `${clamp(containerSizeRem / text.toString().length, 0.75, 10).toFixed(
        2
      )}rem`
    : "1em";
