import { Children, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Option from "../components/Option";
import gameConfig from "../gameConfig.json";

import "./styles.scss";

type GameConfig =
  | {
      name: string;
      rules: string;
      options: {
        name: string;
        icon: string;
        color: string[] | string;
        winRules: {
          [key: string]: boolean;
        };
      }[];
    }
  | null
  | undefined;

function Game() {
  const navigate = useNavigate();
  const { gameName } = useParams();

  const [game, setGame] = useState<GameConfig>();
  const [optionSize, setOptionSize] = useState<number>(0);
  const [optionsLength, setOptionsLength] = useState<number>(0);

  function onOptionClick(name: string): void {
    console.log(name);
  }

  useEffect(() => {
    const selectedGame = gameConfig.find(
      (config) => config.name === gameName
    ) as GameConfig;

    if (selectedGame) {
      setGame(selectedGame);
      setOptionSize(screen.width / (selectedGame.options.length + 1));
      setOptionsLength(selectedGame.options.length);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div
      className="container"
      style={{ "--size": `${optionSize}px`, "--length": optionsLength }}
    >
      <div className="score"></div>
      <div className="options-list-container">
        <div className="options-list">
          {(() => {
            const degress = 360 / (game?.options.length || 1);

            const Item = ({ list = [], index = 0 }) => {
              if (index >= list.length) return null;

              const zIndex = optionsLength - index;

              return (
                <div
                  key={list[index].name}
                  className="options-list__item"
                  style={{ zIndex }}
                >
                  <div
                    className="options-list__item__content"
                    style={{
                      zIndex,
                      transform: `rotate(${
                        (degress * (index + 1) + 45) * -1
                      }deg)`,
                    }}
                  >
                    <Option
                      name={list[index].name}
                      icon={list[index].icon}
                      color={list[index].color}
                      size={optionSize}
                      onClick={onOptionClick}
                    />
                  </div>
                  <Item list={list} index={index + 1} />
                </div>
              );
            };

            return <Item list={game?.options} />;
          })()}
        </div>
      </div>
    </div>
  );
}

export default Game;
