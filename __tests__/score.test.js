import { get, save, setSaveOnExitListener } from "../src/services/score";

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

describe("score", () => {
  it("should retrive score from localStorage with the correct params", () => {
    global.localStorage.getItem.mockClear();
    global.localStorage.getItem.mockImplementation(() => "1");

    expect(get("original")).toBe(1);
    expect(global.localStorage.getItem).toHaveBeenCalledWith(
      "user-score-original"
    );
  });

  it("should save item in localStorage with the correct params", () => {
    global.localStorage.setItem.mockClear();

    save("original", 2);

    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      "user-score-original",
      "2"
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
      score: 3,
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
    expect(event.returnValue).toBe("");
  });
});
