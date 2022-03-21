import { useMemo } from "react";
import { useParams } from "react-router-dom"
import gameConfig from '../gameConfig.json';

function Game() {
    const { gameName } = useParams();

    const game = useMemo(() => gameConfig.find(config => config.name === gameName), []);

    return (
      <div>
          {game?.options.map(option => (
            <div>{option.name}</div> 
          ))}
      </div>
    )
  }
  
  export default Game
  