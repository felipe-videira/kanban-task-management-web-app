import React from "react";
import { shallow } from "enzyme";
import Option from "../src/components/Option";
import checkFile from "../src/services/checkFile";
import isColor from "../src/utils/isColor";

const mockGameConfig = {
  name: "paper",
  icon: "images/icon-paper.svg",
  colorString: "#000",
  colorArray: ["hsl(230, 89%, 62%)", "hsl(230, 89%, 65%)"],
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
    const component = shallow(
      <Option
        {...mockGameConfig}
        color={mockGameConfig.colorString}
        onClick={mockClickFn}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("should render correctly with all props, with color as array", () => {
    const component = shallow(
      <Option
        {...mockGameConfig}
        color={mockGameConfig.colorArray}
        onClick={mockClickFn}
      />
    );

    expect(component).toMatchSnapshot();
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
    const component = shallow(
      <Option {...mockGameConfig} onClick={mockClickFn} />
    );

    component.find("button").simulate("click");

    expect(mockClickFn).toHaveBeenCalled();
  });
});
