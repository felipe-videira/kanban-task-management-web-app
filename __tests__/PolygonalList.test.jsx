import "jsdom-global/register";

import React from "react";
import { mount, render } from "enzyme";
import PolygonalList from "../src/components/PolygonalList";
import "jest-styled-components";

const props = {
  data: [{ value: "value" }, { value: "value" }, { value: "value" }],
  ItemComponent: jest.fn().mockImplementation(() => null),
  itemProps: {
    prop: "prop",
  },
  itemSize: 200,
  size: 400,
  pointingUp: true,
};

describe("PolygonalList", () => {
  it("should render correctly with all props", () => {
    const wrapper = render(<PolygonalList {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should nest the items according to the prop "data"', () => {
    const wrapper = mount(<PolygonalList {...props} />);

    const lastElement = wrapper
      .first("div")
      .getDOMNode()
      .children.item(0)
      .children.item(1)
      .children.item(1);

    expect(lastElement).toBeTruthy();
  });

  it('should rotate the container according to the prop "pointingUp"', () => {
    const wrapper = mount(<PolygonalList {...props} />);

    const containerElement = wrapper.first("div").getDOMNode();

    expect(
      getComputedStyle(containerElement).getPropertyValue("transform")
    ).toBe("rotate(45deg)");

    wrapper.setProps({ pointingUp: false });

    expect(
      getComputedStyle(containerElement).getPropertyValue("transform")
    ).toBe("rotate(225deg)");
  });

  it("should rotate the items according to the data's length", () => {
    const wrapper = mount(<PolygonalList {...props} />);

    const firstItemElement = wrapper.first("div").getDOMNode().children.item(0);

    expect(
      getComputedStyle(firstItemElement).getPropertyValue("transform")
    ).toBe(`rotate(120deg)`);
  });

  it("should rotate the item content to be the item's absolute negative rotation", () => {
    const wrapper = mount(<PolygonalList {...props} />);

    const secondItemContentElement = wrapper
      .first("div")
      .getDOMNode()
      .children.item(0)
      .children.item(1)
      .children.item(0);

    expect(
      getComputedStyle(secondItemContentElement).getPropertyValue("transform")
    ).toBe(`rotate(-285deg)`);
  });

  it("should position the item content to be centered at the end of the container", () => {
    const wrapper = mount(<PolygonalList {...props} />);

    const firstItemContentElement = wrapper
      .first("div")
      .getDOMNode()
      .children.item(0)
      .children.item(0);

    const style = getComputedStyle(firstItemContentElement);

    expect(style.getPropertyValue("top")).toBe(`-100px`);
    expect(style.getPropertyValue("left")).toBe(`-100px`);
  });

  it('should pass on the "itemProps" and "data" as props to the "ItemComponent"', () => {
    props.ItemComponent.mockClear();

    mount(<PolygonalList {...props} />);

    expect(props.ItemComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "value",
        prop: "prop",
      }),
      {}
    );
  });
});
