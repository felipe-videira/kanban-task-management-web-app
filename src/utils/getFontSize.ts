import { ReactNode } from "react";
import clamp from "./clamp";

export default (text: string | ReactNode, base = 1, max = 10) =>
  text
    ? `${clamp(
        base + screen.width * 0.001 - text.toString().length * 0.05,
        1,
        max
      ).toFixed(2)}rem`
    : "1em";
