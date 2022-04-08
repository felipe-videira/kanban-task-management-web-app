import "jsdom-global/register";

import React from "react";
import { shallow, mount } from "enzyme";
import Option from "../src/components/Option";
import checkFile from "../src/services/checkFile";
import isColor from "../src/utils/isColor";
import "jest-styled-components";

const mockColorString = "#000";
const mockColorArray = ["hsl(230, 89%, 62%)", "hsl(230, 89%, 65%)"];
const mockInvalidColorArray = ["hsl(230, 89%, 62%)"];
const mockInvalidPath = "invalid/path";
const mockInvalidColor = "invalid";
const mockProps = {
  name: "paper",
  icon: "images/icon-paper.svg",
  color: mockColorArray,
  size: 200,
};

const mockClickFn = jest.fn((name) => {});

jest.mock("../src/services/checkFile");
jest.mock("../src/utils/isColor");

checkFile.mockImplementation((value) => value !== mockInvalidPath);
isColor.mockImplementation((value) => value !== mockInvalidColor);

describe("Option", () => {
  it("should render correctly with all props, with color as string", () => {
    const wrapper = mount(
      <Option {...mockProps} color={mockColorString} onClick={mockClickFn} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should render correctly with all props, with color as array", () => {
    const wrapper = mount(
      <Option {...mockProps} color={mockColorArray} onClick={mockClickFn} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should throw error if prop "name" is not present', () => {
    expect(() =>
      shallow(<Option {...mockProps} name={undefined} onClick={mockClickFn} />)
    ).toThrow();
  });

  it('should throw error if prop "name" is not a string', () => {
    expect(() =>
      shallow(<Option {...mockProps} name={1} onClick={mockClickFn} />)
    ).toThrow();
  });

  it('should throw error if prop "name" is below min length', () => {
    expect(() =>
      shallow(<Option {...mockProps} name={"a"} onClick={mockClickFn} />)
    ).toThrow();
  });

  it('should throw error if prop "icon" is not present', () => {
    expect(() =>
      shallow(<Option {...mockProps} icon={undefined} onClick={mockClickFn} />)
    ).toThrow();
  });

  it('should throw error if prop "icon" is not a string', () => {
    expect(() =>
      shallow(<Option {...mockProps} icon={1} onClick={mockClickFn} />)
    ).toThrow();
  });

  it('should throw error if prop "icon" is not valid', () => {
    expect(() =>
      shallow(
        <Option {...mockProps} icon={mockInvalidPath} onClick={mockClickFn} />
      )
    ).toThrow();
  });

  it('should throw error if prop "color" is not present', () => {
    expect(() =>
      shallow(<Option {...mockProps} color={undefined} onClick={mockClickFn} />)
    ).toThrow();
  });

  it('should throw error if prop "color" is not a string or string[]', () => {
    expect(() =>
      shallow(<Option {...mockProps} color={1} onClick={mockClickFn} />)
    ).toThrow();
  });

  it('should throw error if prop "color" is a string[] below min length', () => {
    expect(() =>
      shallow(
        <Option
          {...mockProps}
          color={mockInvalidColorArray}
          onClick={mockClickFn}
        />
      )
    ).toThrow();
  });

  it('should throw error if prop "color" is not valid', () => {
    expect(() =>
      shallow(
        <Option {...mockProps} color={mockInvalidColor} onClick={mockClickFn} />
      )
    ).toThrow();
  });

  it('should throw error if prop "size" is not present', () => {
    expect(() =>
      shallow(<Option {...mockProps} size={undefined} onClick={mockClickFn} />)
    ).toThrow();
  });

  it('should throw error if prop "size" is not a number', () => {
    expect(() =>
      shallow(<Option {...mockProps} size={"1"} onClick={mockClickFn} />)
    ).toThrow();
  });

  it('should throw error if prop "onclick" is not present', () => {
    expect(() => shallow(<Option {...mockProps} />)).toThrow();
  });

  it("should call click function", () => {
    const wrapper = shallow(<Option {...mockProps} onClick={mockClickFn} />);

    wrapper.find(`#option-${mockProps.name}`).simulate("click");

    expect(mockClickFn).toHaveBeenCalled();
  });
});
