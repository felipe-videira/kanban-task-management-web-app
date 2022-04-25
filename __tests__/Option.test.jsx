import "jsdom-global/register";
import "jest-styled-components";
import "../scripts/throwOnPropTypeError";

import React from "react";
import { shallow, render } from "enzyme";
import Option from "../src/components/Option";

const props = {
  name: "paper",
  icon: "images/icon-paper.svg",
  color: ["hsl(230, 89%, 62%)", "hsl(230, 89%, 65%)"],
  size: 200,
  onClick: jest.fn(),
};
const invalidPath = "invalid/path";
const invalidColor = "invalid";

jest.mock("../src/utils/checkFile", () => ({
  __esModule: true,
  default: (value) => value !== invalidPath,
}));

jest.mock("../src/utils/isColor", () => ({
  __esModule: true,
  default: (value) => value !== invalidColor,
}));

describe("Option", () => {
  it("should render correctly with all props", () => {
    const wrapper = render(<Option {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should throw error if prop "name" is below min length', () => {
    expect(() => shallow(<Option {...props} name={"a"} />)).toThrow();
  });

  it('should throw error if prop "icon" is not a valid image', () => {
    expect(() => shallow(<Option {...props} icon={invalidPath} />)).toThrow();
  });

  it('should throw error if prop "color" is not a valid color string or string[]', () => {
    expect(() => shallow(<Option {...props} color={invalidColor} />)).toThrow();
  });

  it("should call click function with the name as argument", () => {
    const wrapper = shallow(<Option {...props} />);

    wrapper.find("#paper").simulate("click");

    expect(props.onClick).toHaveBeenCalledWith(props.name);
  });
});
