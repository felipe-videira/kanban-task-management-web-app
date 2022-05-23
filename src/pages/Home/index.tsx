import { useTranslation } from "react-i18next";
import gameConfig from "../../gameConfig.json";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { mobile } from "../../utils/breakpoints";
import AriaLabel from "../../components/AriaLabel";
import Logo from "../../components/Logo";

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
  padding: 7.5%;
  text-align: left;
`;

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container>
      <List tabIndex={0} role="navigation">
        <AriaLabel live="off">{t("ariaLabel.gameList")}</AriaLabel>
        {gameConfig.games.map((game) => (
          <SelectGameButton
            outlined
            key={game.name}
            onClick={() => navigate(`/${game.name}`)}
          >
            <Logo
              src={t(`image.logo.${game.name}`)}
              alt={t(`gameName.${game.name}`)}
            />
          </SelectGameButton>
        ))}
      </List>
    </Container>
  );
}

export default Home;
