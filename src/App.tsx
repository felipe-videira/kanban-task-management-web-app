import "./App.scss";
import Routes from "./Routes";
import styled from "styled-components/macro";
import React, { useEffect, useRef, useState } from "react";
import ToggleButton, {
  ToggleButtonInput,
  ToggleButtonLabel,
} from "./components/ToggleButton";
import { useTranslation } from "react-i18next";
import { mobile } from "./utils/breakpoints";
import isMobileDevice from "./utils/isMobileDevice";
import useTouch from "./hooks/useTouch";
import useFocus from "./hooks/useFocus";
import { fadeIn } from "./utils/keyframes";
import { SettingsIcon } from "./icons";
import clickOnEnter from "./utils/clickOnEnter";
import Modal from "./components/Modal";
import { ModalProvider } from "./hooks/useModal";
import { SettingsProvider } from "./providers/settings";
import {
  get as getSettings,
  save as saveSettings,
  Settings,
} from "./services/settings";

const AppContainer = styled.div<{
  animationsEnabled: boolean;
  useBrowserFont: boolean;
}>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  ${(props) =>
    !props.useBrowserFont
      ? 'font-family: "Barlow Semi Condensed", sans-serif;'
      : ""}

  ${(props) =>
    !props.animationsEnabled
      ? `
    *, *:after, *:before {
      animation-name: none !important;
      transition: none !important; 
    }`
      : ""}

  *:focus {
    outline: 3px solid orange;
    box-shadow: 2px 2px 15px 2px orange;
  }
`;

const AriaTouchInstructionsContainer = styled.div`
  position: absolute;
  background-color: transparent;
  top: -100%;
`;

const UserSettingsList = styled.div`
  position: absolute;
  right: 1rem;
  flex-direction: column;
  align-items: flex-end;
  background: ${(props) => props.theme.primary};
  border-radius: 5px;
  color: ${(props) => props.theme.dark};
  z-index: 9999;
  animation: ${fadeIn} 0.2s linear 0s 1;
  animation-fill-mode: both;

  ${mobile} {
    right: 0.5rem;
  }
`;

const UserSettingsContainer = styled.div`
  padding: 1rem;
  text-align: right;

  ${mobile} {
    padding: 0.5rem;
  }

  label:not(${ToggleButtonLabel}) {
    text-transform: uppercase;

    svg {
      width: 2.5rem;
      height: 2.5rem;
      fill: ${(props) => props.theme.primary};
    }
  }

  ${ToggleButtonLabel} {
    margin: 1rem;
  }

  input[type="checkbox"]:not(${ToggleButtonInput}) {
    display: none;
  }

  ${UserSettingsList} {
    display: none;
  }

  input[type="checkbox"]:not(${ToggleButtonInput}):checked
    + ${UserSettingsList} {
    display: flex;
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

  const [nextFocus, previousFocus] = useFocus();

  const appRef = useRef<HTMLDivElement>(null);
  const currentFocused = useRef<HTMLElement>();

  const [settings, setSettings] = useState<Settings>(getSettings());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalChildren, setModalChildren] = useState<React.ReactNode>(null);
  const [ariaTouchInstructions, setAriaTouchInstructions] =
    useState<string>("");

  function toggleModal({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    const newValue = !showModal;

    if (newValue) {
      setModalTitle(title);
      setModalChildren(children);
    } else {
      setModalTitle("");
      setModalChildren(null);
    }

    setShowModal(newValue);

    return newValue;
  }

  function updateSettings(values: {
    animationsEnabled?: boolean;
    useBrowserFont?: boolean;
  }) {
    const newSettings = {
      ...settings,
      ...values,
    };
    setSettings(newSettings);
    saveSettings(newSettings);
  }

  function toggleAnimations() {
    updateSettings({
      animationsEnabled: !settings.animationsEnabled,
    });
  }

  function toggleUseBrowserFont() {
    updateSettings({
      useBrowserFont: !settings.useBrowserFont,
    });
  }

  function screenFullScan() {
    appRef.current?.focus();
  }

  useTouch(({ count, doubleTap, swipe, swipeDirection, event }) => {
    if (doubleTap && count === 2) {
      screenFullScan();
    }

    if (swipe) {
      if (swipeDirection.x === 1) {
        currentFocused.current = nextFocus();
      } else if (swipeDirection.x === -1) {
        currentFocused.current = previousFocus();
      }
    }

    if (doubleTap && currentFocused.current) {
      event.preventDefault();
      currentFocused.current.click();
      currentFocused.current.focus();
    }
  });

  useEffect(() => {
    if (isMobileDevice()) {
      setAriaTouchInstructions(t("ariaLabel.touchInstructions"));
    }
  }, []);

  return (
    <AppContainer
      animationsEnabled={settings.animationsEnabled}
      useBrowserFont={settings.useBrowserFont}
      ref={appRef}
    >
      <AriaTouchInstructionsContainer
        aria-live="polite"
        aria-atomic="true"
        aria-hidden="false"
        role="alert"
      >
        {ariaTouchInstructions}
      </AriaTouchInstructionsContainer>

      <UserSettingsContainer>
        <label
          htmlFor="check"
          tabIndex={0}
          aria-label={t("ariaLabel.settings")}
          onKeyDown={clickOnEnter}
        >
          <SettingsIcon />
        </label>
        <input type="checkbox" id="check" tabIndex={-1} />
        <UserSettingsList>
          <ToggleButton
            label={t("label.useBrowserFont")}
            ariaLabel={t("ariaLabel.useBrowserFont")}
            checked={settings.useBrowserFont}
            onChange={toggleUseBrowserFont}
          />
          <ToggleButton
            label={t("label.animationToggle")}
            ariaLabel={t("ariaLabel.animationToggle")}
            checked={settings.animationsEnabled}
            onChange={toggleAnimations}
          />
        </UserSettingsList>
      </UserSettingsContainer>

      <SettingsProvider value={settings}>
        <ModalProvider value={{ toggle: toggleModal }}>
          <Routes />
        </ModalProvider>
      </SettingsProvider>

      <Attribution
        tabIndex={0}
        role="navigation"
        dangerouslySetInnerHTML={{ __html: t("message.attribution") }}
      />

      <Modal
        show={showModal}
        onChange={toggleModal}
        title={modalTitle}
        closeButtonAriaLabel={t("ariaLabel.close")}
      >
        {modalChildren}
      </Modal>
    </AppContainer>
  );
}

export default App;
