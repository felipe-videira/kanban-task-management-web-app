import Routes from "./Routes";
import React, { useEffect, useRef, useState } from "react";
import ToggleButton from "./components/ToggleButton";
import { useNavigate, useMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isMobileDevice from "./utils/isMobileDevice";
import useTouch from "./hooks/useTouch";
import useFocus from "./hooks/useFocus";
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
import { ArrowBackIcon } from "./icons";
import {
  AppContainer,
  AriaTouchInstructionsContainer,
  Toolbar,
  GoBackButton,
  UserSettingsContainer,
  UserSettingsList,
  Attribution,
} from "./App.styles";

function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inHomePage = useMatch("/");

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

  function goBack() {
    navigate("/");
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

      <Toolbar>
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

        {!inHomePage ? (
          <GoBackButton onClick={goBack} aria-label={t("ariaLabel.goBack")}>
            <ArrowBackIcon />
          </GoBackButton>
        ) : null}
      </Toolbar>

      <SettingsProvider value={settings}>
        <ModalProvider value={{ toggle: toggleModal }}>
          <Routes />
        </ModalProvider>
      </SettingsProvider>

      {inHomePage || !isMobileDevice() ? (
        <Attribution
          tabIndex={0}
          role="navigation"
          dangerouslySetInnerHTML={{ __html: t("message.attribution") }}
        />
      ) : null}

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
