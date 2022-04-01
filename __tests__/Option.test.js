import 'jsdom-global/register';

import React from "react";
import { shallow, mount } from "enzyme";
import Option from "../src/components/Option";
import checkFile from "../src/services/checkFile";
import isColor from "../src/utils/isColor";
import "jest-styled-components";


//TODO: array lenght
//TODO: size
const mockColorString = "#000";
const mockColorArray = ["hsl(230, 89%, 62%)", "hsl(230, 89%, 65%)"];
const mockGameConfig = {
  name: "paper",
  icon: "images/icon-paper.svg",
  color: mockColorArray,
  size: 200,
};
const mockClickFn = jest.fn((name) => {});
const mockInvalidPath = "invalid/path";
const mockInvalidColor = "invalid";

jest.mock("../src/services/checkFile");
jest.mock("../src/utils/isColor");

checkFile.mockImplementation((value) => value !== mockInvalidPath);
isColor.mockImplementation((value) => value !== mockInvalidColor);

describe("Option", () => {

  it("should render correctly with all props, with color as string", () => {
    const wrapper = mount(
      <Option
        {...mockGameConfig}
        color={mockColorString}
        onClick={mockClickFn}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should render correctly with all props, with color as array", () => {
    const wrapper = mount(
      <Option
        {...mockGameConfig}
        color={mockColorArray}
        onClick={mockClickFn}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should throw error if prop "name" is not present', () => {
    expect(() =>
      shallow(
        <Option {...mockGameConfig} name={undefined} onClick={mockClickFn} />
      )
    ).toThrow();
  });

  it('should throw error if prop "name" is not a string', () => {
    expect(() =>
      shallow(<Option {...mockGameConfig} name={1} onClick={mockClickFn} />)
    ).toThrow();
  });

  it('should throw error if prop "name" is below min length', () => {
    expect(() =>
      shallow(<Option {...mockGameConfig} name={"a"} onClick={mockClickFn} />)
    ).toThrow();
  });

  it('should throw error if prop "icon" is not present', () => {
    expect(() =>
      shallow(
        <Option {...mockGameConfig} icon={undefined} onClick={mockClickFn} />
      )
    ).toThrow();
  });

  it('should throw error if prop "icon" is not a string', () => {
    expect(() =>
      shallow(<Option {...mockGameConfig} icon={1} onClick={mockClickFn} />)
    ).toThrow();
  });

  it('should throw error if prop "icon" is not valid', () => {
    expect(() =>
      shallow(
        <Option
          {...mockGameConfig}
          icon={mockInvalidPath}
          onClick={mockClickFn}
        />
      )
    ).toThrow();
  });

  it('should throw error if prop "color" is not present', () => {
    expect(() =>
      shallow(
        <Option {...mockGameConfig} color={undefined} onClick={mockClickFn} />
      )
    ).toThrow();
  });

  it('should throw error if prop "color" is not a string or string[]', () => {
    expect(() =>
      shallow(<Option {...mockGameConfig} color={1} onClick={mockClickFn} />)
    ).toThrow();
  });

  it('should throw error if prop "color" is not valid', () => {
    expect(() =>
      shallow(
        <Option
          {...mockGameConfig}
          color={mockInvalidColor}
          onClick={mockClickFn}
        />
      )
    ).toThrow();
  });

  it('should throw error if prop "onclick" is not present', () => {
    expect(() => shallow(<Option {...mockGameConfig} />)).toThrow();
  });

  it("should call click function", () => {
    const wrapper = shallow(
      <Option {...mockGameConfig} onClick={mockClickFn} />
    );

    wrapper.find(`#option-${mockGameConfig.name}`).simulate("click");

    expect(mockClickFn).toHaveBeenCalled();
  });
});
