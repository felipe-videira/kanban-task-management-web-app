import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Option from "../../components/Option";
import PolygonalList from "../../components/PolygonalList";
import gameConfig from "../../gameConfig.json";
import * as userScoreService from "../../services/userScore";
import { clamp } from "../../utils/clamp";
import { isMobile } from "../../utils/isMobile";
import { random } from "../../utils/random";
import {
  Container,
  Score,
  Options,
  Display,
  Title,
  Stepper,
  Step,
  GameResultContainer,
  GameResultUserChoice,
  GameResult,
  GameResultHouseChoice,
} from "./styles";

const RESULT_DELAY = 6;

type GameOption = {
  name: string;
  icon: string;
  color: string[] | string;
  winRules: {
    [key: string]: boolean;
  };
};

type GameConfig = {
  name: string;
  rules: string;
  listSetup: {
    pointingUp: boolean;
  };
  options: GameOption[];
};

function Game() {
  const navigate = useNavigate();
  const { gameName } = useParams();

  const [game, setGame] = useState<GameConfig>();
  const [listSize, setListSize] = useState<number>(0);
  const [optionSize, setOptionSize] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [userChoice, setUserChoice] = useState<string>();
  const [houseChoice, setHouseChoice] = useState<string>();
  const [userWins, setUserWins] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  function getSize(
    selectedGame: GameConfig,
    screenWidth: number = screen.width
  ): [optionsSize: number, listSize: number] {
    const { length } = selectedGame.options;
    const size = clamp(
      (screenWidth / length) * (isMobile() ? 1 : 0.4),
      50,
      isMobile() ? screenWidth / length : screenWidth / 3 / length
    );

    return [size, size * (length / 2)];
  }

  function playMatch(
    optionName: string,
    options: GameOption[]
  ): [isWinner: boolean, houseOption: GameOption] {
    const houseOption = options[random(0, options.length - 1)];
    const userOption = options.find((option) => option.name === optionName);
    return [!!userOption?.winRules[houseOption.name], houseOption];
  }

  //todo
  function incrementScore() {
    //todo
    if (userWins && game) {
      const newScore = userScore + 1;
      setUserScore(newScore);
      userScoreService.save(game.name, newScore);
    }
  }

  function onOptionClick(name: string) {
    const [isWinner, houseOption] = playMatch(name, game?.options || []);

    setUserChoice(name);
    setHouseChoice(houseOption.name);
    setUserWins(isWinner);
    setStep(2);
  }

  function resetGame() {
    setStep(1);
    setUserChoice(undefined);
    setHouseChoice(undefined);
    setUserWins(false);
  }

  function setupGame(): GameConfig | undefined {
    const selectedGame = gameConfig.find(
      (config) => config.name === gameName
    ) as GameConfig | undefined;

    if (selectedGame) {
      setGame(selectedGame);

      const [options, list] = getSize(selectedGame);
      setOptionSize(options);
      setListSize(list);
      setUserScore(userScoreService.get(selectedGame.name));
    }

    return selectedGame;
  }

  useEffect(() => {
    const selectedGame = setupGame();

    if (selectedGame) {
      userScoreService.setOnExitSaveListener(() => {
        userScoreService.save(selectedGame.name, userScore);
      });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <Display>
        <Title>{game?.name}</Title>
        <Score value={userScore} />
      </Display>
      <Options size={listSize}>
        <Stepper value={step}>
          <Step value={1}>
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
          </Step>
          <Step value={2}>
            <GameResultContainer userWins={userWins} delayInSecs={RESULT_DELAY}>
              <GameResultUserChoice>{userChoice}</GameResultUserChoice>
              <GameResult onAnimationEnd={incrementScore}>
                <p>{userWins ? "You win" : "You loose"}</p>
                <button type="button" onClick={resetGame}>
                  Play again
                </button>
              </GameResult>
              <GameResultHouseChoice>{houseChoice}</GameResultHouseChoice>
            </GameResultContainer>
          </Step>
        </Stepper>
      </Options>
    </Container>
  );
}

export default Game;
