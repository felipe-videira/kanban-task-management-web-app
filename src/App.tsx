import Routes from "./Routes";
import styled from "styled-components/macro";
import { useState } from "react";
import ToggleButton from "./components/ToggleButton";
import { useTranslation } from "react-i18next";

import "./App.scss";
import { mobile } from "./utils/breakpoints";

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

  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);

  function toggleAnimations() {
    setAnimationsEnabled(!animationsEnabled);
  }

  return (
    <AppContainer animationsEnabled={animationsEnabled}>
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
