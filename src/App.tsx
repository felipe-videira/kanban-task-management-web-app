import "./App.scss";
import Routes from "./Routes";
import styled from "styled-components/macro";
import { useEffect, useRef, useState } from "react";
import ToggleButton from "./components/ToggleButton";
import { useTranslation } from "react-i18next";
import { mobile } from "./utils/breakpoints";
import isMobileDevice from "./utils/isMobileDevice";
import useTouch from "./hooks/useTouch";
import useFocusProvider from "./hooks/focus/useFocusProvider";

const AppContainer = styled.div<{ animationsEnabled: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  ${(props) =>
    !props.animationsEnabled
      ? `
    *, *:after, *:before {
      animation-name: none !important;
      transition: none !important; 
    }`
      : ""}

  *:focus {
    outline: 3px solid #fff;
    box-shadow: 2px 2px 20px #fff;
  }
`;

const AriaTouchInstructionsContainer = styled.div`
  position: absolute;
  background-color: transparent;
  top: -100%;
`;

const AnimationToggleContainer = styled.div`
  z-index: 1;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;

  ${mobile} {
    padding: 0.5rem;
  }
`;

const Attribution = styled.div`
  font-size: 0.75rem;
  text-align: center;
  bottom: 10px;
  color: #fff;
  width: 100%;
  text-align: center;
  z-index: -1;

  a {
    color: hsl(228, 45%, 44%);
  }
`;

function App() {
  const { t } = useTranslation();

  const [
    FocusProvider,
    nextFocus,
    previousFocus,
    nextKeyFocus,
    previousKeyFocus,
    clickFocused,
    focusRefList,
    keyFocusRefList,
    focusedElementRef,
  ] = useFocusProvider();

  const appRef = useRef<HTMLDivElement>(null);

  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);
  const [ariaTouchInstructionsText, setAriaTouchInstructionsText] =
    useState<string>("");

  function toggleAnimations() {
    setAnimationsEnabled(!animationsEnabled);
  }

  function screenFullScan() {
    appRef.current?.focus();
  }

  useTouch(
    ({ count, doubleTap, swipe, swipeDirection }) => {
      if (doubleTap && count === 2) {
        screenFullScan();
      }

      if (swipe && (swipeDirection.x === 0 || swipeDirection.y === 0)) {
        if (swipeDirection.x === 1) {
          nextFocus();
        } else if (swipeDirection.x === -1) {
          previousFocus();
        } else if (swipeDirection.y === 1) {
          nextKeyFocus();
        } else if (swipeDirection.y === -1) {
          previousKeyFocus();
        }
      }

      if (doubleTap) {
        clickFocused();
      }
    },
    [focusedElementRef.current, focusRefList.current, keyFocusRefList.current]
  );

  useEffect(() => {
    if (isMobileDevice()) {
      setAriaTouchInstructionsText(t("ariaLabel.touchInstructions"));
    }
  }, []);

  return (
    <AppContainer animationsEnabled={animationsEnabled} ref={appRef}>
      <AriaTouchInstructionsContainer
        aria-live="polite"
        aria-atomic="true"
        aria-hidden="false"
        role="alert"
      >
        {ariaTouchInstructionsText}
      </AriaTouchInstructionsContainer>

      <AnimationToggleContainer>
        <ToggleButton
          label={t("label.animationToggle")}
          ariaLabel={t("ariaLabel.animationToggle")}
          checked={animationsEnabled}
          onChange={toggleAnimations}
        />
      </AnimationToggleContainer>

      <FocusProvider>
        <Routes />
      </FocusProvider>

      <Attribution
        tabIndex={0}
        role="navigation"
        dangerouslySetInnerHTML={{ __html: t("message.attribution") }}
      />
    </AppContainer>
  );
}

export default App;
