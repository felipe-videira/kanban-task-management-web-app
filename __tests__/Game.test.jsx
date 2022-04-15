import "jsdom-global/register";
import "jest-styled-components";

import React from "react";
import { render, mount } from "enzyme";
import { navigateMock, useParamsMock } from "../__mocks__/react-router-dom";
import Game from "../src/pages/Game";

const gameConfig = [
  {
    name: "original",
    rules: "src/images/images-rules.svg",
    listSetup: {
      pointingUp: false,
    },
    options: [
      {
        name: "paper",
        icon: "src/images/icon-paper.svg",
        color: ["hsl(230, 89%, 62%)", "hsl(230, 89%, 65%)"],
        winRules: {
          scissors: false,
          rock: true,
        },
      },
      {
        name: "scissors",
        icon: "src/images/icon-scissors.svg",
        color: ["hsl(39, 89%, 49%)", "hsl(40, 84%, 53%)"],
        winRules: {
          rock: false,
          paper: true,
        },
      },
      {
        name: "rock",
        icon: "src/images/icon-rock.svg",
        color: ["hsl(349, 71%, 52%)", "hsl(349, 70%, 56%)"],
        winRules: {
          scissors: true,
          paper: false,
        },
      },
    ],
  },
];
jest.mock("../src/services/score", () => ({
  __esModule: true,
  get: jest.fn(),
  save: jest.fn(),
  clear: jest.fn(),
  setSaveOnExitListener: jest.fn(),
}));
jest.mock("../src/utils/checkFile", () => ({
  __esModule: true,
  default: () => true,
}));
jest.mock("../src/utils/isColor", () => ({
  __esModule: true,
  default: () => true,
}));

jest.mock("../src/gameConfig.json", () => gameConfig);

// /utils/isMobile, window?

// snapshot
// user click
// size
// match logic
// score
describe("Game", () => {
  it("should render correctly", () => {
    useParamsMock.mockImplementation(() => {
      return { gameName: "original" };
    });

    const wrapper = render(<Game />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call "navigate" if the game does not exist', () => {
    useParamsMock.mockImplementation(() => {
      return { gameName: "wrong" };
    });

    mount(<Game />);

    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("should ", () => {
    useParamsMock.mockImplementation(() => {
      return { gameName: "original" };
    });

    const wrapper = mount(<Game />);

    expect(wrapper.find("h1").text()).toBe(gameConfig[0].name);
  });
});
