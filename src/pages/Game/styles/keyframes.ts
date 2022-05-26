import { keyframes } from "styled-components/macro";

export const growAndfadeIn = keyframes`
  0%  {
  	opacity: 0;
    transform: scale(0);
  }
  1% {
    transform: scale(1);
  }
  100% {
  	opacity: 1;
    transform: scale(1);
  }
`;

export const moveLeft = keyframes`
  from  {
    transform: translateX(45%);
  }
  to {
    transform: translateX(0);
  }
`;

export const moveRight = keyframes`
  from  {
    transform: translateX(-45%);
  }
  to {
    transform: translateX(0);
  }
`;

export const radialBackgroundEffect = keyframes`
  0% { 
    --result-rg-first: 0; --result-rg-first-border: 0;
    --result-rg-second: 0; --result-rg-second-border: 0;
    --result-rg-third: 0; --result-rg-third-border: 0;
    opacity: 0;
  }
  20% { 
    --result-rg-first: 0.075; --result-rg-first-border: 0;
    --result-rg-second: 0; --result-rg-second-border: 0;
    --result-rg-third: 0; --result-rg-third-border: 0;
  }
  40% { 
    --result-rg-first: 0.075; --result-rg-first-border: 0.045;
    --result-rg-second: 0.05; --result-rg-second-border: 0;
    --result-rg-third: 0; --result-rg-third-border: 0;
  }
  80% { 
    --result-rg-first: 0.075; --result-rg-first-border: 0.045;
    --result-rg-second: 0.05; --result-rg-second-border: 0.02;
    --result-rg-third: 0.025; --result-rg-third-border: 0;
  }
  100% { 
    --result-rg-first: 0.075; --result-rg-first-border: 0.045;
    --result-rg-second: 0.05; --result-rg-second-border: 0.02;
    --result-rg-third: 0.025; --result-rg-third-border: 0.01;
  }
`;
