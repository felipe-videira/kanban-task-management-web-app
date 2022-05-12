import { useTranslation } from "react-i18next";
import gameConfig from "../../gameConfig.json";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import getFontSize from "../../utils/getFontSize";
import { mobile } from "../../utils/breakpoints";
import AriaLabel from "../../components/AriaLabel";
import useFocus from "../../hooks/focus/useFocus";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const List = styled.div`
  display: grid;
  gap: 2.5em;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 25rem));
  grid-auto-rows: 1fr;
  width: 70%;
  justify-content: center;

  ${mobile} {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 15rem));
  }
`;

const SelectGameButton = styled(Button)`
  line-height: 0.9;
  text-shadow: 1px 1px 5px rgb(0 0 0 / 25%);
  font-weight: normal;
  text-align: left;
  word-spacing: 100vh;
  font-size: ${(props) => getFontSize(props.children, 2)};
  padding: 5% 7.5%;
`;

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [ref, keyRef] = useFocus();

  return (
    <Container>
      <List tabIndex={0} role="navigation" ref={ref}>
        <AriaLabel live="off">{t("label.gameList")}</AriaLabel>
        {gameConfig.map((game) => (
          <SelectGameButton
            outlined
            key={game.name}
            onClick={() => navigate(`/${game.name}`)}
            ref={keyRef}
          >
            {t(`gameName.${game.name}`)}
          </SelectGameButton>
        ))}
      </List>
    </Container>
  );
}

export default Home;
