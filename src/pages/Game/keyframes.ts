import { keyframes } from "styled-components/macro";

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }`;

export const stepFadeIn = keyframes`
  0% {
    display: none;
    opacity: 0;
  }
  50% {
    display: block;
  }
  100% {
    opacity: 1;
  }
`;

export const growAndfadeIn = keyframes`
  0%  {
   	width: 0;
  	height: 0;
  	opacity: 0;
  }
  25% {
   width: 100px;
   height: 100px;
   opacity: 0;
  }
  100% {
  	opacity: 1;
  }
`;

export const radialBackgroundEffect = keyframes`
   0% {
      background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0) 38%);
      opacity: 0;
  }
  25% {
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0.025) 56%,  rgba(255,255,255,0) 56%);
    opacity: 0.25;
  }
 50% {
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.05) 56%,  rgba(255,255,255,0) 56%);
    opacity: 0.5;
  }
   75% {
     background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.025) 56%, rgba(255,255,255,0.012.5) 75%, rgba(255,255,255,0.0) 76%);
     opacity: 0.75;
  }
  100% {
     background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.05) 56%, rgba(255,255,255,0.025) 75%, rgba(255,255,255,0.0) 76%);
     opacity: 1;
  }
`;
