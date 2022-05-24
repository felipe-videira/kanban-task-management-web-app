import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import Button from "../../components/Button";
import { mobile } from "../../utils/breakpoints";
import AriaLabel from "../../components/AriaLabel";
import Logo, { LogoImg } from "../../components/Logo";
import gameConfig from "../../gameConfig.json";
import DynamicTranslation from "../../components/DynamicTranslation";

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

  ${LogoImg} {
    ${mobile} {
      height: 6rem;
    }
  }
`;

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container>
      <List tabIndex={0} role="navigation">
        <AriaLabel>{t("ariaLabel.gameList")}</AriaLabel>

        {(gameConfig.games as unknown as NonNullable<Game>[]).map((game) => (
          <SelectGameButton
            outlined
            key={game.name}
            onClick={() => navigate(`/${game.name}`)}
          >
            <DynamicTranslation values={game.translations}>
              {({ dt }) => <Logo src={dt("image.logo")} alt={dt("gameName")} />}
            </DynamicTranslation>
          </SelectGameButton>
        ))}
      </List>
    </Container>
  );
}

export default Home;
