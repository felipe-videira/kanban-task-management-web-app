import { useTranslation } from "react-i18next";
import gameConfig from "../../gameConfig.json";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import getFontSize from "../../utils/getFontSize";
import { mobile } from "../../utils/breakpoints";

const Container = styled.div`
  gap: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;

  ${mobile} {
    width: 90%;
    padding: 5%;
    justify-content: space-evenly;
  }
`;

const SelectGameButton = styled(Button)`
  text-align: left;
  word-spacing: 100vh;
  font-weight: bold;
  padding: 15px 35px;
  font-size: ${(props) => getFontSize(props.children, 2)};
  line-height: 0.9;
  text-shadow: 1px 1px 5px rgb(0 0 0 / 25%);
  height: 175px;

  ${mobile} {
    font-size: ${(props) => getFontSize(props.children, 1)};
    height: 125px;
    width: 125px;
    padding: 15px 20px;
  }
`;

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container>
      {gameConfig.map((game) => (
        <SelectGameButton
          outlined
          key={game.name}
          onClick={() => navigate(`/${game.name}`)}
        >
          {t(`gameName.${game.name}`)}
        </SelectGameButton>
      ))}
    </Container>
  );
}

export default Home;
