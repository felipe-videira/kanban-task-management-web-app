import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Option from "../../components/Option";
import PolygonalList from "../../components/PolygonalList";
import gameConfig from "../../gameConfig.json";
import { clamp } from "../../utils/clamp";
import { isMobile } from "../../utils/isMobile";
import { Container, Score, Options, Display, Title } from "./styles";

type GameConfig =
  | {
      name: string;
      rules: string;
      listSetup: {
        pointingUp: boolean;
      };
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
  const [listSize, setListSize] = useState<number>(0);
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
      const { length } = selectedGame.options;
      const size = clamp(
        (screen.width / length) * (isMobile() ? 1 : 0.4),
        50,
        isMobile() ? screen.width / length : screen.width / 3 / length
      );
      setOptionSize(size);
      setListSize(size * (length / 2));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <Display>
        <Title>{game?.name}</Title>
        <Score></Score>
      </Display>
      <Options size={listSize}>
        <PolygonalList
          data={game?.options || []}
          ItemComponent={Option}
          itemProps={{
            size: optionSize,
            onClick: onOptionClick,
          }}
          itemSize={optionSize}
          size={listSize}
          pointingUp={game?.listSetup.pointingUp}
        />
      </Options>
    </Container>
  );
}

export default Game;
