import "jsdom-global/register";
import "jest-styled-components";

import React from "react";
import { mount } from "enzyme";
import Game from "../src/pages/Game";
import { navigateMock, useParamsMock } from "../__mocks__/react-router-dom";
import {
  GameResult,
  GameResultHouseChoice,
  ScoreValue,
} from "../src/pages/Game/styles";
import random from "../src/utils/random";
import { save } from "../src/services/score";
import { withTheme } from "../testUtils";

jest.mock("../src/services/score", () => ({
  __esModule: true,
  get: jest.fn().mockImplementation(() => 0),
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

jest.mock("../src/icons", () => ({
  __esModule: true,
  ArrowBackIcon: () => null,
  CloseIcon: () => null,
}));

jest.mock("../src/utils/random", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../src/gameConfig.json", () => [
  {
    name: "original",
    rules: "src/images/images-rules.svg",
    settings: {
      showHouseChoiceDelay: 0,
      showHouseChoiceDuration: 0,
      showResultDelay: 0,
      showResultDuration: 0,
      updateScoreDelay: 0,
      winnerBackgroundEffectDelay: 0,
    },
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
]);

describe("Game", () => {
  it("should render correctly", () => {
    useParamsMock.mockImplementation(() => {
      return { gameName: "original" };
    });

    const wrapper = mount(withTheme(<Game />));

    expect(wrapper).toMatchSnapshot();
  });

  it('should call "navigate" if the game does not exist', () => {
    useParamsMock.mockImplementation(() => {
      return { gameName: "wrong" };
    });

    mount(withTheme(<Game />));

    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("should win and update user score", () => {
    useParamsMock.mockImplementation(() => {
      return { gameName: "original" };
    });
    random.mockClear();
    random.mockImplementation(() => 2);

    const wrapper = mount(withTheme(<Game />));

    wrapper.find("Option[name='paper']").simulate("click");

    expect(
      wrapper.find(GameResultHouseChoice).children().find("Option[name='rock']")
    ).toBeTruthy();
    expect(wrapper.find(GameResult).children().find("p").text()).toBe(
      "message.victory"
    );
    expect(save).toHaveBeenCalledWith("original", 1, false);
    expect(wrapper.find(ScoreValue).find("div[name='user']").text()).toBe("1");
  });

  it("should lose and update house score", () => {
    useParamsMock.mockImplementation(() => {
      return { gameName: "original" };
    });
    random.mockClear();
    random.mockImplementation(() => 0);

    const wrapper = mount(withTheme(<Game />));

    wrapper.find("Option[name='rock']").simulate("click");

    expect(
      wrapper
        .find(GameResultHouseChoice)
        .children()
        .find("Option[name='paper']")
    ).toBeTruthy();
    expect(wrapper.find(GameResult).children().find("p").text()).toBe(
      "message.defeat"
    );
    expect(save).toHaveBeenCalledWith("original", 1, true);
    expect(wrapper.find(ScoreValue).find("div[name='house']").text()).toBe("1");
  });
});
