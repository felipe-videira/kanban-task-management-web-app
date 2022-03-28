export default function isColor(colorStr: string): boolean {
  const s = new Option().style;
  s.color = colorStr;
  return s.color !== "";
}
