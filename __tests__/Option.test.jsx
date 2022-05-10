import "jsdom-global/register";
import "jest-styled-components";
import "../scripts/throwOnPropTypeError";

import React from "react";
import { shallow, render } from "enzyme";
import Option from "../src/components/Option";
import checkFile from "../src/utils/checkFile";
import isColor from "../src/utils/isColor";

jest.mock("../src/utils/checkFile", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../src/utils/isColor", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Option", () => {
  it("should render correctly with all props", () => {
    const props = {
      name: "paper",
      icon: "images/icon-paper.svg",
      color: ["hsl(230, 89%, 62%)", "hsl(230, 89%, 65%)"],
      size: 200,
      onClick: jest.fn(),
      alt: "alt",
    };

    isColor.mockClear();
    isColor.mockImplementation(() => true);

    checkFile.mockClear();
    checkFile.mockImplementation(() => true);

    const wrapper = render(<Option {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should throw error if prop "name" is below min length', () => {
    const props = {
      name: "a",
      icon: "images/icon-paper.svg",
      color: ["hsl(230, 89%, 62%)", "hsl(230, 89%, 65%)"],
      size: 200,
      onClick: jest.fn(),
      alt: "alt",
    };

    expect(() => shallow(<Option {...props} />)).toThrow();
  });

  it('should throw error if prop "icon" is not a valid image', () => {
    const props = {
      name: "paper",
      icon: "images/icon-paper.svg",
      color: ["hsl(230, 89%, 62%)", "hsl(230, 89%, 65%)"],
      size: 200,
      onClick: jest.fn(),
      alt: "alt",
    };

    isColor.mockClear();
    isColor.mockImplementation(() => true);

    checkFile.mockClear();
    checkFile.mockImplementation(() => false);

    expect(() => shallow(<Option {...props} />)).toThrow();
  });

  it('should throw error if prop "color" is not a valid color string or string[]', () => {
    const props = {
      name: "paper",
      icon: "images/icon-paper.svg",
      color: "invalid",
      size: 200,
      onClick: jest.fn(),
      alt: "alt",
    };

    isColor.mockClear();
    isColor.mockImplementation(() => false);

    checkFile.mockClear();
    checkFile.mockImplementation(() => true);

    expect(() => shallow(<Option {...props} />)).toThrow();
  });

  it("should call click function with the name as argument", () => {
    const props = {
      name: "paper",
      icon: "images/icon-paper.svg",
      color: ["hsl(230, 89%, 62%)", "hsl(230, 89%, 65%)"],
      size: 200,
      onClick: jest.fn(),
      alt: "alt",
    };

    isColor.mockClear();
    isColor.mockImplementation(() => true);

    checkFile.mockClear();
    checkFile.mockImplementation(() => true);

    const wrapper = shallow(<Option {...props} />);

    wrapper.simulate("click");

    expect(props.onClick).toHaveBeenCalledWith("paper");
  });
});
