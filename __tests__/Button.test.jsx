import "jsdom-global/register";
import "jest-styled-components";

import React from "react";
import { render, shallow } from "enzyme";
import Button from "../src/components/Button";

describe("Button", () => {
  it('should render correctly with "outlined" true', () => {
    const wrapper = render(<Button outlined onClick={() => {}} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with "outlined" false', () => {
    const wrapper = render(<Button outlined={false} onClick={() => {}} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should call click function", () => {
    const onClick = jest.fn();

    const wrapper = shallow(<Button outlined onClick={onClick} />);

    wrapper.simulate("click");

    expect(onClick).toHaveBeenCalled();
  });
});
