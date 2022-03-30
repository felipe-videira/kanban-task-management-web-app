export default function isColor(colorStr: string) {
  const s = new Option().style;
  s.color = colorStr;
  return s.color !== "";
}
