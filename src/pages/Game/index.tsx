import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Option from "../../components/Option";
import PolygonalList from "../../components/PolygonalList";
import gameConfig from "../../gameConfig.json";
import { clamp } from "../../utils/clamp";
import { isMobile } from "../../utils/isMobile";
import { Container, Score, Options } from "./styles";

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

  function onOptionClick(name: string): void {
    console.log(name);
  }
  useEffect(() => {
    const selectedGame = gameConfig.find(
      (config) => config.name === gameName
    ) as GameConfig;

    if (selectedGame) {
      setGame(selectedGame);
      setOptionSize(
        clamp(
          (screen.width / selectedGame.options.length) * (isMobile() ? 1 : 0.4),
          50,
          200
        )
      );
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <Score></Score>
      <Options size={400}>
        <PolygonalList
          data={game?.options || []}
          ItemComponent={Option}
          itemProps={{
            size: optionSize,
            onClick: onOptionClick,
          }}
          itemSize={optionSize}
          size={400}
        />
      </Options>
    </Container>
  );
}

export default Game;
