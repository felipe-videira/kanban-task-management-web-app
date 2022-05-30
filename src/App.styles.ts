import styled from "styled-components/macro";
import {
  ToggleButtonInput,
  ToggleButtonLabel,
} from "./components/ToggleButton";
import {
  mobileOrTabletOrFontSizeLarge,
  mobileSm,
  mobileXs,
} from "./utils/breakpoints";
import { fadeIn } from "./utils/keyframes";
import Button from "./components/Button";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  font-family: "Barlow Semi Condensed", sans-serif;

  *:focus {
    outline: 3px solid orange;
    box-shadow: 2px 2px 15px 2px orange;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  position: absolute;
  width: calc(100% - 2rem);
  padding: 2rem 1rem;
  z-index: 1;

  ${mobileOrTabletOrFontSizeLarge} {
    bottom: 0;
    padding: 1rem;
    position: relative;
    order: 2;
  }
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
  width: max-content;

  ${mobileOrTabletOrFontSizeLarge} {
    right: 0.5rem;
  }

  ${mobileSm} {
    width: 100vw;
  }
`;

export const UserSettingsContainer = styled.div`
  position: relative;

  ${UserSettingsList} {
    display: none;
  }

  ${ToggleButtonLabel} {
    margin: 1rem;
  }

  label:not(${ToggleButtonLabel}) {
    text-transform: uppercase;
    cursor: pointer;
    display: block;

    svg {
      fill: ${(props) => props.theme.contrast.low};
      width: 2.5rem;
      height: 2.5rem;

      ${mobileXs} {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }

  input[type="checkbox"]:not(${ToggleButtonInput}) {
    display: none;
  }

  input[type="checkbox"]:not(${ToggleButtonInput}):checked
    + ${UserSettingsList} {
    display: flex;

    ${mobileOrTabletOrFontSizeLarge} {
      bottom: 3rem;
      right: -1rem;
    }
  }
`;

export const GoBackButton = styled(Button).attrs(() => ({
  icon: true,
  small: true,
}))`
  align-self: start;
  display: block;
  width: 2.5rem;
  height: 2.5rem;

  ${mobileXs} {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const Attribution = styled.div`
  font-size: 0.75rem;
  text-align: center;
  bottom: 10px;
  color: #fff;
  width: 100%;
  text-align: center;
  z-index: -1;
  order: 3;

  ${mobileXs} {
    font-size: 0.5rem;
  }

  a {
    color: hsl(228, 45%, 44%);
  }
`;
