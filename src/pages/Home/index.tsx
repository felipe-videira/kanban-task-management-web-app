import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import Button from "../../components/Button";
import {
  laptopOrFontSizeLarge,
  mobileXs,
  mobileSm,
} from "../../utils/breakpoints";
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

  ${laptopOrFontSizeLarge} {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 15rem));
  }

  ${mobileXs} {
    width: 100%;
    gap: 0.5rem;
    padding: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(2.5rem, 6.5rem));
  }
`;

const SelectGameButton = styled(Button)`
  padding: 7.5%;
  text-align: left;

  ${LogoImg} {
    ${laptopOrFontSizeLarge} {
      height: 6rem;
    }

    ${mobileSm} {
      height: 3rem;
    }

    ${mobileXs} {
      height: 2.5rem;
    }
  }
`;

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container>
      <List tabIndex={0} role="navigation" aria-label={t("ariaLabel.gameList")}>
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
