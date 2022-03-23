import { useMemo } from "react";
import { useParams } from "react-router-dom"
import Option from "../components/Option";
import gameConfig from '../gameConfig.json';

function Game() {
    const { gameName } = useParams();

    const game = useMemo(() => gameConfig.find(config => config.name === gameName), []);

    function onOptionClick (name: string): void {
      console.log(name)
    }

    return (
      <div>
          {game?.options.map(option => (
            <Option
              key={option.name}
              name={option.name}
              icon={option.icon}
              onClick={onOptionClick}
            />
          ))}
      </div>
    )
  }
  
  export default Game
  