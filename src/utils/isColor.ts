export default (colorStr: string) => {
  const s = new Option().style;
  s.color = colorStr;
  return s.color !== "";
};
