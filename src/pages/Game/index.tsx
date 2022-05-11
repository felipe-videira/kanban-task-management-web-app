import { createRef, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clamp from "../../utils/clamp";
import isMobile from "../../utils/isScreenMobileSize";
import random from "../../utils/random";
import * as scoreService from "../../services/score";
import Button from "../../components/Button";
import Option from "../../components/Option";
import PolygonalList from "../../components/PolygonalList";
import { Step } from "../../components/Stepper";
import Modal from "../../components/Modal";
import {
  Container,
  Options,
  Header,
  Title,
  ResultContainer,
  ResultUserChoice,
  Result,
  ResultHouseChoice,
  ResultMessage,
  RulesImageContainer,
  RulesImage,
  RulesButton,
  GoBackButton,
  Score,
  ScoreLabel,
  ScoreValue,
  Stepper,
  ResultChoiceLabel,
} from "./styles";
import gameConfig from "../../gameConfig.json";
import { ArrowBackIcon } from "../../icons";
import useStateWithGetter from "../../hooks/useStateWithGetter";
import isMobileDevice from "../../utils/isMobileDevice";
import AriaLabel from "../../components/AriaLabel";

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
  settings: {
    showHouseChoiceDelay: number;
    showHouseChoiceDuration: number;
    showResultDelay: number;
    showResultDuration: number;
    updateScoreDelay: number;
    winnerBackgroundEffectDelay: number;
  };
  listSetup: {
    pointingUp: boolean;
  };
  options: NonNullable<GameOption>[];
} | null;

function Game() {
  const navigate = useNavigate();
  const { gameName } = useParams();
  const { t } = useTranslation();

  const [game, setGame, getGame] = useStateWithGetter<GameConfig>(null);
  const [listSize, setListSize] = useState<number>(0);
  const [optionSize, setOptionSize] = useState<number>(0);
  const [resultSize, setResultSize] = useState<number>(0);
  const [userScore, setUserScore, getUserScore] = useStateWithGetter<number>(0);
  const [houseScore, setHouseScore, getHouseScore] =
    useStateWithGetter<number>(0);
  const [userChoice, setUserChoice] = useState<GameOption>(null);
  const [houseChoice, setHouseChoice] = useState<GameOption>(null);
  const [userWins, setUserWins] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>("");

  function getSize(
    optionsLength: number,
    screenRatio = 1.0,
    minSize = 50,
    maxSize = 1000
  ) {
    return clamp(
      ((window.innerWidth / optionsLength +
        window.innerHeight / optionsLength) /
        2) *
        screenRatio,
      minSize,
      maxSize
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
    setResultMessage(t(isWinner ? "message.victory" : "message.defeat"));
    setStep(2);

    if (game && game.settings.updateScoreDelay > 0) {
      setTimeout(() => {
        incrementScore(isWinner);
      }, game.settings.updateScoreDelay * 1000);
    } else {
      incrementScore(isWinner);
    }
  }

  function toggleRules() {
    setShowRulesModal(!showRulesModal);
  }

  function setSizes(selectedGame = getGame()) {
    if (!selectedGame) return;

    const { length } = selectedGame.options;

    const size = getSize(length, isMobile() ? 0.7 : 0.4);
    setOptionSize(size);
    setListSize(size * (length / 2));
    setResultSize(getSize(2, 0.35));
  }

  function onScreenResize() {
    setSizes();
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
      setSizes(selectedGame);
      setUserScore(scoreService.get(selectedGame.name));
      setHouseScore(scoreService.get(selectedGame.name, true));
    }

    return selectedGame;
  }

  function navigateToHome() {
    navigate("/");
  }

  useEffect(() => {
    const selectedGame = setupGame();

    if (selectedGame) {
      window.addEventListener("resize", onScreenResize);

      scoreService.setSaveOnExitListener(() => ({
        game: selectedGame.name,
        userScore: getUserScore(),
        houseScore: getHouseScore(),
      }));
    } else {
      navigateToHome();
    }

    return () => {
      window.removeEventListener("resize", onScreenResize);
    };
  }, []);

  return game ? (
    <Container>
      {isMobileDevice() ? (
        <GoBackButton onClick={navigateToHome}>
          <ArrowBackIcon />
        </GoBackButton>
      ) : null}

      <Header tabIndex={0} role="region">
        <Title>{t(`gameName.${game.name}`)}</Title>

        <Score tabIndex={0}>
          <ScoreLabel>{t("label.score")}</ScoreLabel>
          <ScoreValue name="user" key={"user" + userScore} aria-hidden="false">
            <AriaLabel live="off">Jogador</AriaLabel>
            {userScore}
          </ScoreValue>
          <ScoreValue
            name="house"
            key={"house" + houseScore}
            aria-hidden="false"
          >
            <AriaLabel live="off">Casa</AriaLabel>
            {houseScore}
          </ScoreValue>
        </Score>
      </Header>

      <Stepper value={step} tabIndex={0} role="main">
        <Step value={1}>
          <Options size={listSize}>
            <AriaLabel live="off">{t("label.options")}</AriaLabel>

            <PolygonalList
              data={game.options || []}
              ItemComponent={Option}
              itemProps={{
                size: optionSize,
                onClick: onOptionClick,
                alt: (name: string) => t(`label.${name}`),
                disabled: step !== 1,
              }}
              itemSize={optionSize}
              size={listSize}
              pointingUp={game.listSetup.pointingUp}
            />
          </Options>
        </Step>

        <Step value={2}>
          {userChoice && houseChoice ? (
            <ResultContainer
              userWins={userWins}
              {...game.settings}
              size={resultSize}
              aria-live="polite"
              aria-atomic="true"
            >
              <ResultUserChoice size={resultSize}>
                <ResultChoiceLabel>{t("label.userChoice")}</ResultChoiceLabel>
                <Option
                  {...userChoice}
                  size={resultSize}
                  alt={t(`label.${userChoice.name}`)}
                />
              </ResultUserChoice>

              <ResultHouseChoice size={resultSize}>
                <ResultChoiceLabel>{t("label.houseChoice")}</ResultChoiceLabel>
                <Option
                  {...houseChoice}
                  size={resultSize}
                  alt={t(`label.${houseChoice.name}`)}
                  ariaHidden={false}
                />
              </ResultHouseChoice>

              <Result aria-hidden="false">
                <ResultMessage>{resultMessage}</ResultMessage>
                <Button onClick={resetGame}>{t("label.retryButton")}</Button>
              </Result>
            </ResultContainer>
          ) : null}
        </Step>
      </Stepper>

      <RulesButton onClick={toggleRules}>{t("label.rulesButton")}</RulesButton>

      <Modal
        show={showRulesModal}
        onChange={toggleRules}
        title={t("label.rulesModal")}
        closeButtonAriaLabel={t("ariaLabel.close")}
      >
        <RulesImageContainer>
          <RulesImage
            src={game.rules}
            alt={t(`ariaLabel.rules.${game.name}`)}
            tabIndex={0}
          />
        </RulesImageContainer>
      </Modal>
    </Container>
  ) : null;
}

export default Game;
