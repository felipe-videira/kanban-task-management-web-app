import { get, save, setSaveOnExitListener } from "../src/services/score";

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

describe("score", () => {
  it("should retrive score from localStorage with the correct params", () => {
    global.localStorage.getItem.mockClear();
    global.localStorage.getItem.mockImplementation(() => "1");

    expect(get("original", false)).toBe(1);
    expect(global.localStorage.getItem).toHaveBeenCalledWith(
      "user-score-original"
    );

    global.localStorage.getItem.mockClear();
    global.localStorage.getItem.mockImplementation(() => "23");

    expect(get("lizard-spock", true)).toBe(23);
    expect(global.localStorage.getItem).toHaveBeenCalledWith(
      "house-score-lizard-spock"
    );
  });

  it("should save item in localStorage with the correct params", () => {
    global.localStorage.setItem.mockClear();

    save("original", 2, false);

    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      "user-score-original",
      "2"
    );

    global.localStorage.setItem.mockClear();

    save("lizard-spock", 323, true);

    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      "house-score-lizard-spock",
      "323"
    );
  });

  it("should call save with the correct params on the beforeunload event", () => {
    global.localStorage.setItem.mockClear();

    let listener;
    global.window = {
      addEventListener: jest.fn().mockImplementation((e, l) => {
        listener = l;
      }),
    };

    const event = { returnValue: true };

    setSaveOnExitListener(() => ({
      game: "original",
      userScore: 3,
      houseScore: 10,
    }));

    listener(event);

    expect(window.addEventListener).toHaveBeenCalledWith(
      "beforeunload",
      listener
    );
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      "user-score-original",
      "3"
    );
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      "house-score-original",
      "10"
    );
    expect(event.returnValue).toBe("");
  });
});
