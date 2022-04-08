import "jsdom-global/register";

import React from "react";
import { mount } from "enzyme";
import PolygonalList from "../src/components/PolygonalList";
import "jest-styled-components";

const mockProps = {
  data: [{ value: "value" }, { value: "value" }, { value: "value" }],
  ItemComponent: (props) => (
    // eslint-disable-next-line react/prop-types
    <button onClick={props.onClick}>{props.value}</button>
  ),
  itemProps: {
    onClick: () => {},
  },
  itemSize: 200,
  size: 400,
};

describe("PolygonalList", () => {
  it("should render correctly with all props", () => {
    const wrapper = mount(<PolygonalList {...mockProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should throw error if prop "data" is not present', () => {
    expect(() =>
      shallow(<PolygonalList {...mockProps} data={undefined} />)
    ).toThrow();
  });

  it('should throw error if prop "data" is not an array of objects', () => {
    expect(() => shallow(<PolygonalList {...mockProps} data={1} />)).toThrow();
  });

  it('should throw error if prop "ItemComponent" is not present', () => {
    expect(() =>
      shallow(<PolygonalList {...mockProps} ItemComponent={undefined} />)
    ).toThrow();
  });

  it('should throw error if prop "ItemComponent" is not a React element type', () => {
    expect(() =>
      shallow(<PolygonalList {...mockProps} ItemComponent={() => {}} />)
    ).toThrow();
  });

  it('should throw error if prop "itemProps" is not an object', () => {
    expect(() =>
      shallow(<PolygonalList {...mockProps} itemProps={"value"} />)
    ).toThrow();
  });

  it('should throw error if prop "itemSize" is not present', () => {
    expect(() =>
      shallow(<PolygonalList {...mockProps} itemSize={undefined} />)
    ).toThrow();
  });

  it('should throw error if prop "itemSize" is not a number', () => {
    expect(() =>
      shallow(<PolygonalList {...mockProps} itemSize={"1"} />)
    ).toThrow();
  });

  it('should throw error if prop "size" is not present', () => {
    expect(() =>
      shallow(<PolygonalList {...mockProps} size={undefined} />)
    ).toThrow();
  });

  it('should throw error if prop "size" is not a number', () => {
    expect(() =>
      shallow(<PolygonalList {...mockProps} size={"1"} />)
    ).toThrow();
  });
});
