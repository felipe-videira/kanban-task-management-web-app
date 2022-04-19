import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Option from "../../components/Option";
import PolygonalList from "../../components/PolygonalList";
import gameConfig from "../../gameConfig.json";
import * as scoreService from "../../services/score";
import { clamp } from "../../utils/clamp";
import { isMobile } from "../../utils/isMobile";
import { random } from "../../utils/random";
import { Stepper, Step } from "../../components/Stepper";
import Modal from "../../components/Modal";
import {
  Container,
  Score,
  OptionsContainer,
  TitleContainer,
  Title,
  GameResultContainer,
  GameResultUserChoice,
  GameResult,
  GameResultHouseChoice,
  GameResultMessage,
  RulesButtonContainer,
  RulesImageContainer,
  RulesImage,
} from "./styles";

const RESULT_DELAY = 6;

type GameOption = {
  name: string;
  icon: string;
  color: string[] | string;
  winRules: {
    [key: string]: boolean;
  };
} | null;

type GameConfig = {
  name: string;
  rules: string;
  listSetup: {
    pointingUp: boolean;
  };
  options: NonNullable<GameOption>[];
} | null;

function Game() {
  const navigate = useNavigate();
  const { gameName } = useParams();

  const [game, setGame] = useState<GameConfig>(null);
  const [listSize, setListSize] = useState<number>(0);
  const [optionSize, setOptionSize] = useState<number>(0);
  const [resultSize, setResultSize] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [houseScore, setHouseScore] = useState<number>(0);
  const [userChoice, setUserChoice] = useState<GameOption>(null);
  const [houseChoice, setHouseChoice] = useState<GameOption>(null);
  const [userWins, setUserWins] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);

  function getSize(
    optionsLength: number,
    mobileRatio = 1.15,
    desktopRatio = 0.4,
    minSize = 50,
    screenWidth: number = screen.width
  ) {
    return clamp(
      (screenWidth / optionsLength) * (isMobile() ? mobileRatio : desktopRatio),
      minSize,
      isMobile()
        ? (screenWidth / optionsLength) * mobileRatio
        : screenWidth / 3 / optionsLength
    );
  }

  function playMatch(
    optionName: string,
    options: NonNullable<GameOption>[]
  ): [isWinner: boolean, userOption: GameOption, houseOption: GameOption] {
    const userOption = options.find((option) => option.name === optionName);

    if (userOption) {
      const houseOption = options[random(0, options.length - 1)];

      return [!!userOption.winRules[houseOption.name], userOption, houseOption];
    }

    return [false, null, null];
  }

  function incrementScore(userIsWinner: boolean) {
    const setStateAction = userIsWinner ? setUserScore : setHouseScore;

    setStateAction((prevValue) => {
      const newScore = prevValue + 1;

      scoreService.save(game?.name || "", newScore, !userIsWinner);

      return newScore;
    });
  }

  function onOptionClick(name: string) {
    const [isWinner, userOption, houseOption] = playMatch(
      name,
      game?.options || []
    );

    setUserChoice(userOption);
    setHouseChoice(houseOption);
    setUserWins(isWinner);
    setStep(2);

    setTimeout(() => {
      incrementScore(isWinner);
    }, RESULT_DELAY * 0.6 * 1000);
  }

  function toggleRules() {
    setShowRulesModal(!showRulesModal);
  }

  function resetGame() {
    setStep(1);
    setUserChoice(null);
    setHouseChoice(null);
    setUserWins(false);
  }

  function setupGame(): GameConfig | undefined {
    const selectedGame = gameConfig.find(
      (config) => config.name === gameName
    ) as GameConfig | undefined;

    if (selectedGame) {
      setGame(selectedGame);

      const { length } = selectedGame.options;

      const size = getSize(length);
      setOptionSize(size);
      setListSize(size * (length / 2));

      setResultSize(getSize(2, 0.75));

      setUserScore(scoreService.get(selectedGame.name));
    }

    return selectedGame;
  }

  useEffect(() => {
    const selectedGame = setupGame();

    if (selectedGame) {
      scoreService.setSaveOnExitListener(() => ({
        game: selectedGame.name,
        userScore,
        houseScore,
      }));
    } else {
      navigate("/");
    }
  }, []);

  return game ? (
    <Container>
      <TitleContainer>
        <Title>Rock Paper Scissors</Title>
        <Score label="Score" value={userScore} />
      </TitleContainer>

      <Stepper value={step} height="60%">
        <Step value={1}>
          <OptionsContainer size={listSize}>
            <PolygonalList
              data={game.options || []}
              ItemComponent={Option}
              itemProps={{
                size: optionSize,
                onClick: onOptionClick,
              }}
              itemSize={optionSize}
              size={listSize}
              pointingUp={game.listSetup.pointingUp}
            />
          </OptionsContainer>
        </Step>

        <Step value={2}>
          <GameResultContainer userWins={userWins} delayInSecs={RESULT_DELAY}>
            <GameResultUserChoice size={resultSize} label="You picked">
              {userChoice && <Option {...userChoice} size={resultSize} />}
            </GameResultUserChoice>

            <GameResult>
              <GameResultMessage>
                {userWins ? "You win" : "You lose"}
              </GameResultMessage>

              <Button onClick={resetGame}>Play again</Button>
            </GameResult>

            <GameResultHouseChoice size={resultSize} label="The house picked">
              {houseChoice && <Option {...houseChoice} size={resultSize} />}
            </GameResultHouseChoice>
          </GameResultContainer>
        </Step>
      </Stepper>

      <RulesButtonContainer>
        <Button outlined small onClick={toggleRules}>
          Rules
        </Button>
      </RulesButtonContainer>

      <Modal show={showRulesModal} title="Rules" onClick={toggleRules}>
        <RulesImageContainer>
          <RulesImage src={game.rules} alt="Rules" />
        </RulesImageContainer>
      </Modal>
    </Container>
  ) : null;
}

export default Game;
