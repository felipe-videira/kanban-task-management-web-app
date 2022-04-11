import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Option from "../../components/Option";
import PolygonalList from "../../components/PolygonalList";
import gameConfig from "../../gameConfig.json";
import * as userScoreService from "../../services/userScore";
import { clamp } from "../../utils/clamp";
import { isMobile } from "../../utils/isMobile";
import { random } from "../../utils/random";
import { Container, Score, Options, Display, Title } from "./styles";

type GameConfig = {
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
};

function Game() {
  const navigate = useNavigate();
  const { gameName } = useParams();

  const [game, setGame] = useState<GameConfig>();
  const [listSize, setListSize] = useState<number>(0);
  const [optionSize, setOptionSize] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(userScoreService.get());
  const [userChoice, setUserChoice] = useState<string>();
  const [houseChoice, setHouseChoice] = useState<string>();
  const [userWins, setUserWins] = useState<boolean>();

  function setupGame(selectedGame: GameConfig) {
    setGame(selectedGame);

    const { length } = selectedGame.options;
    const size = clamp(
      (screen.width / length) * (isMobile() ? 1 : 0.4),
      50,
      isMobile() ? screen.width / length : screen.width / 3 / length
    );

    setOptionSize(size);
    setListSize(size * (length / 2));
  }

  function resetGame() {
    setUserChoice(undefined);
    setHouseChoice(undefined);
    setUserWins(false);
  }

  function onOptionClick(name: string) {
    if (game) {
      setUserChoice(name);

      const houseOption = game.options[random(0, game.options.length - 1)];

      setHouseChoice(houseOption.name);

      const userOption = game.options.find((option) => option.name === name);

      if (userOption?.winRules[houseOption.name]) {
        setUserWins(true);
        setUserScore(userScore + 1);
        userScoreService.save(userScore);
      }
    }
  }

  useEffect(() => {
    const selectedGame = gameConfig.find(
      (config) => config.name === gameName
    ) as GameConfig | undefined;

    if (selectedGame) {
      setupGame(selectedGame);
      userScoreService.setOnExitSaveListener(() => {
        userScoreService.save(userScore);
      });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <Display>
        <Title>{game?.name}</Title>
        <Score>{userScore}</Score>
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
