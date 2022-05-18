import styled from "styled-components/macro";
import {
  ToggleButtonInput,
  ToggleButtonLabel,
} from "./components/ToggleButton";
import { mobile, phone, phoneSm, tablet } from "./utils/breakpoints";
import { fadeIn } from "./utils/keyframes";
import Button from "./components/Button";

export const AppContainer = styled.div<{
  animationsEnabled: boolean;
  useBrowserFont: boolean;
}>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;

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

export const AriaTouchInstructionsContainer = styled.div`
  position: absolute;
  background-color: transparent;
  top: -100%;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  padding: 1rem;
`;

export const UserSettingsList = styled.div`
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

export const UserSettingsContainer = styled.div`
  label:not(${ToggleButtonLabel}) {
    text-transform: uppercase;
    cursor: pointer;

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

export const GoBackButton = styled(Button).attrs(() => ({
  icon: true,
  small: true,
}))`
  align-self: start;
  z-index: 2;
  display: block;
  width: 2.5rem;
  height: 2.5rem;
`;

export const Attribution = styled.div`
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
