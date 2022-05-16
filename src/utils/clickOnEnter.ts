export default (evt: React.KeyboardEvent<HTMLLabelElement>) => {
  if (evt.key === "Enter") {
    evt.currentTarget.click();
  }
};
