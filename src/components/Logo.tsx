import React, { useState } from "react";
import styled from "styled-components/macro";
import { phone, phoneSm, tablet } from "../utils/breakpoints";

export const LogoImg = styled.img`
  margin: 0 0 0 1rem;
  height: 8rem;
  object-fit: contain;
  object-position: left center;

  ${tablet} {
    height: 6rem;
  }

  ${phone} {
    height: 3rem;
  }

  ${phoneSm} {
    height: 3rem;
  }
`;

export const LogoAltText = styled.span`
  color: #fff;
  text-transform: uppercase;
  line-height: 0.8;
  text-shadow: 1px 1px 5px rgb(0 0 0 / 25%);
  font-weight: normal;
  word-spacing: 100vh;
  font-size: 3rem;
  margin: 0 0 0 1rem;
  box-decoration-break: clone;
`;

export default function Logo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [showAlt, setShowAlt] = useState(false);

  function onError() {
    setShowAlt(!showAlt);
  }

  return !showAlt ? (
    <LogoImg {...props} onError={onError} />
  ) : (
    // eslint-disable-next-line react/prop-types
    <LogoAltText>{props.alt}</LogoAltText>
  );
}
