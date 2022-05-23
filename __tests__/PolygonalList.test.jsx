import "jsdom-global/register";
import "jest-styled-components";
import "../scripts/throwOnPropTypeError";

import { mount, render } from "enzyme";
import PolygonalList from "../src/components/PolygonalList";

describe("PolygonalList", () => {
  it("should render correctly with all props", () => {
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

    expect(render(<PolygonalList {...props} />)).toMatchSnapshot();
  });

  it('should nest the items according to the prop "data"', () => {
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

    expect(
      mount(<PolygonalList {...props} />)
        .first("div")
        .getDOMNode()
        .children.item(0)
        .children.item(1)
        .children.item(1)
    ).toBeTruthy();
  });

  it('should rotate the container according to the prop "pointingUp"', () => {
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

    const wrapper = mount(<PolygonalList {...props} />);

    expect(
      getComputedStyle(
        wrapper.find("PolygonalListItem[index=0]").getDOMNode()
      ).getPropertyValue("transform")
    ).toBe("rotate(45deg)");

    wrapper.setProps({ pointingUp: false });

    expect(
      getComputedStyle(
        wrapper.find("PolygonalListItem[index=0]").getDOMNode()
      ).getPropertyValue("transform")
    ).toBe("rotate(225deg)");
  });

  it("should rotate the items according to the data's length", () => {
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

    const wrapper = mount(<PolygonalList {...props} />);

    const style = getComputedStyle(
      wrapper.find("PolygonalListItem[index=1]").getDOMNode()
    );

    expect(style.getPropertyValue("transform")).toBe(`rotate(120deg)`);
  });

  it("should rotate the item content to be the item's absolute negative rotation", () => {
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

    const wrapper = mount(<PolygonalList {...props} />);

    const style = getComputedStyle(
      wrapper.find("PolygonalListItem[index=1]").getDOMNode().children.item(0)
    );

    expect(style.getPropertyValue("transform")).toBe(
      `rotate(calc(((120deg * 1) + 45deg) * -1))`
    );
  });

  it("should position the item content at the end of the container", () => {
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

    const wrapper = mount(<PolygonalList {...props} />);

    const style = getComputedStyle(
      wrapper.find("PolygonalListItem[index=0]").getDOMNode().children.item(0)
    );

    expect(style.getPropertyValue("top")).toBe(`0px`);
    expect(style.getPropertyValue("left")).toBe(`0px`);
  });

  it('should pass on the "itemProps" and "data" as props to the "ItemComponent"', () => {
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
