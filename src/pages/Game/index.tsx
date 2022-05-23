import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clamp from "../../utils/clamp";
import random from "../../utils/random";
import * as scoreService from "../../services/score";
import Button from "../../components/Button";
import Option from "../../components/Option";
import PolygonalList from "../../components/PolygonalList";
import { Step } from "../../components/Stepper";
import {
  Container,
  Options,
  Header,
  ResultContainer,
  ResultUserChoice,
  Result,
  ResultHouseChoice,
  ResultMessage,
  RulesImageContainer,
  RulesImage,
  RulesButton,
  Score,
  ScoreLabel,
  ScoreValue,
  Stepper,
  ResultChoiceLabel,
} from "./styles";
import gameConfig from "../../gameConfig.json";
import useStateWithGetter from "../../hooks/useStateWithGetter";
import AriaLabel from "../../components/AriaLabel";
import useModal from "../../hooks/useModal";
import { SettingsContext } from "../../providers/settings";
import Logo from "../../components/Logo";
import isScreenMobileSize from "../../utils/isScreenMobileSize";
import { addTranslation } from "../../i18n";

function Game() {
  const navigate = useNavigate();
  const { gameName } = useParams();
  const { t } = useTranslation(["common", "selectedGame"]);

  const { animationsEnabled } = useContext(SettingsContext);
  const toggleModal = useModal();

  const [game, setGame, getGame] = useStateWithGetter<Game>(null);
  const [listSize, setListSize] = useState<number>(0);
  const [optionSize, setOptionSize] = useState<number>(0);
  const [resultSize, setResultSize] = useState<number>(0);
  const [userScore, setUserScore, getUserScore] = useStateWithGetter<number>(0);
  const [userChoice, setUserChoice] = useState<GameOption>(null);
  const [houseChoice, setHouseChoice] = useState<GameOption>(null);
  const [userWins, setUserWins] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [resultMessage, setResultMessage] = useState<string>("");
  const [showHouseChoice, setShowHouseChoice] =
    useState<boolean>(animationsEnabled);
  const [showResult, setShowResult] = useState<boolean>(animationsEnabled);

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

  function updateScore(userIsWinner: boolean) {
    if (!game) return;

    const newScore = Math.max(getUserScore() + (userIsWinner ? 1 : -1), 0);

    scoreService.save(game.name, newScore);
    setUserScore(newScore);
  }

  function displayResult() {
    if (!animationsEnabled && game && game.settings.showResultDelay > 0) {
      setTimeout(() => {
        setShowResult(true);
        setShowHouseChoice(true);
      }, game.settings.showResultDelay * 1000);
    } else {
      setShowHouseChoice(true);
      setShowResult(true);
    }
  }

  function onOptionClick(name: string) {
    if (!game) return;

    const [isWinner, userOption, houseOption] = playMatch(name, game.options);

    setUserChoice(userOption);
    setHouseChoice(houseOption);
    setUserWins(isWinner);
    setResultMessage(t(isWinner ? "message.victory" : "message.defeat"));
    setStep(2);

    if (game.settings.updateScoreDelay > 0) {
      setTimeout(() => {
        updateScore(isWinner);
      }, game.settings.updateScoreDelay * 1000);
    } else {
      updateScore(isWinner);
    }
  }

  function toggleRules() {
    if (!game) return;

    toggleModal({
      title: t("label.rulesModal"),
      children: () => (
        <RulesImageContainer>
          <RulesImage
            src={t("image.rules", { ns: "selectedGame" })}
            alt={t("ariaLabel.rules", { ns: "selectedGame" })}
            tabIndex={0}
          />
        </RulesImageContainer>
      ),
    });
  }

  function setSizes(selectedGame = getGame()) {
    if (!selectedGame) return;

    const { length } = selectedGame.options;

    const containerSize = !isScreenMobileSize()
      ? window.innerHeight * 0.6
      : window.innerWidth * 0.9;
    setListSize(containerSize);

    const containerSizeByLen = containerSize / length;
    setOptionSize(
      containerSizeByLen +
        (containerSizeByLen / containerSize <= 0.25 ? containerSize * 0.05 : 0)
    );

    setResultSize(
      clamp(containerSize / (!isScreenMobileSize() ? 1.75 : 2.5), 50, 1000)
    );
  }

  function onScreenResize() {
    if (window.innerWidth < window.outerWidth) {
      setSizes();
    }
  }

  function resetGame() {
    setStep(1);
    setUserChoice(null);
    setHouseChoice(null);
    setUserWins(false);
    setShowResult(false);
    setShowHouseChoice(false);
  }

  function setupGame(): Game | undefined {
    const selectedGame = gameConfig.games.find(
      (config) => config.name === gameName
    ) as Game | undefined;

    if (selectedGame) {
      setGame(selectedGame);
      setSizes(selectedGame);
      setUserScore(scoreService.get(selectedGame.name));
    }

    return selectedGame;
  }

  function navigateToHome() {
    navigate("/");
  }

  useEffect(() => {
    setShowResult(animationsEnabled);
    setShowHouseChoice(animationsEnabled);

    if (step === 2) {
      displayResult();
    }
  }, [animationsEnabled, step]);

  useEffect(() => {
    const selectedGame = setupGame();

    if (selectedGame) {
      addTranslation(selectedGame);

      window.addEventListener("resize", onScreenResize);

      scoreService.setSaveOnExitListener(() => ({
        game: selectedGame.name,
        score: getUserScore(),
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
      <Header tabIndex={0} role="region">
        <Logo
          src={t("image.logo", { ns: "selectedGame" })}
          alt={t("gameName", { ns: "selectedGame" })}
        />

        <Score tabIndex={0}>
          <ScoreLabel>{t("label.score")}</ScoreLabel>
          <ScoreValue key={userScore} aria-hidden="false">
            <AriaLabel live="off">{t("ariaLabel.userScore")}</AriaLabel>
            {userScore}
          </ScoreValue>
        </Score>
      </Header>

      <Stepper value={step} tabIndex={0} role="main">
        <Step value={1}>
          <Options>
            <AriaLabel live="off">{t("ariaLabel.options")}</AriaLabel>

            <PolygonalList
              data={game.options || []}
              ItemComponent={Option}
              itemProps={{
                size: optionSize,
                onClick: onOptionClick,
                alt: (name: string) =>
                  t(`option.${name}`, { ns: "selectedGame" }),
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
                {showHouseChoice ? (
                  <Option
                    {...houseChoice}
                    size={resultSize}
                    alt={t(`label.${houseChoice.name}`)}
                    ariaHidden={false}
                  />
                ) : (
                  <div
                    style={{
                      width: `${resultSize}px`,
                      height: `${resultSize}px`,
                    }}
                  />
                )}
              </ResultHouseChoice>

              {showResult ? (
                <Result aria-hidden="false">
                  <ResultMessage>{resultMessage}</ResultMessage>
                  <Button onClick={resetGame}>{t("label.retryButton")}</Button>
                </Result>
              ) : null}
            </ResultContainer>
          ) : null}
        </Step>
      </Stepper>

      <RulesButton onClick={toggleRules}>{t("label.rulesButton")}</RulesButton>
    </Container>
  ) : null;
}

export default Game;
