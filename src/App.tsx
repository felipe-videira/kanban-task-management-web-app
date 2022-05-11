import "./App.scss";
import Routes from "./Routes";
import styled from "styled-components/macro";
import { useEffect, useRef, useState } from "react";
import ToggleButton from "./components/ToggleButton";
import { useTranslation } from "react-i18next";
import { mobile } from "./utils/breakpoints";
import clamp from "./utils/clamp";
import isMobileDevice from "./utils/isMobileDevice";
import useTouch from "./hooks/useTouch";
import useRefList from "./hooks/useRefList";

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

  const focusedElement = useRef<HTMLElement>();

  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);
  const [ariaTouchInstructionsText, setAriaTouchInstructionsText] =
    useState<string>("");

  function toggleAnimations() {
    setAnimationsEnabled(!animationsEnabled);
  }

  function screenFullScan() {
    document.querySelector("#app")?.setAttribute("tabindex", "0");
    (document.querySelector("#app") as HTMLElement)?.focus();
  }

  const [refList, addToRefList] = useRefList();

  useTouch(
    ({ count, doubleTap, swipe, swipeDirection }) => {
      if (doubleTap && count === 2) {
        screenFullScan();
      }

      if (swipe) {
        const focusableElements = Array.from(
          document.querySelectorAll(
            'a[href], button:not([disabled]), input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
          )
        );

        const currentIndex = focusableElements.findIndex(
          (el) => el === document.activeElement
        );

        const nextEl = focusableElements[
          clamp(
            currentIndex + swipeDirection.x,
            0,
            focusableElements.length - 1
          )
        ] as HTMLElement;

        nextEl.focus();
        focusedElement.current = nextEl;
      }

      if (focusedElement.current && doubleTap) {
        focusedElement.current.click();
      }
    },
    [focusedElement.current]
  );

  useEffect(() => {
    if (isMobileDevice()) {
      setAriaTouchInstructionsText(t("ariaLabel.touchInstructions"));
    }
  }, []);

  return (
    <AppContainer animationsEnabled={animationsEnabled} id="app">
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

      <Routes />

      <Attribution
        tabIndex={0}
        role="navigation"
        dangerouslySetInnerHTML={{ __html: t("message.attribution") }}
      />
    </AppContainer>
  );
}

export default App;
