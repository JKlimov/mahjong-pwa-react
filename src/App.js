import React, { useState } from 'react';
//import React, { useState, useContext } from 'react';
//import { TilesContext } from './tilesContext'
import './App.css';
import Draggable from 'react-draggable';
import SvgIcon from '@material-ui/core/SvgIcon';
import MJd1 from './MJ Tiles/MJd1-.svg';
import MJd2 from './MJ Tiles/MJd2-.svg';
import MJd3 from './MJ Tiles/MJd3-.svg';
import MJf1 from './MJ Tiles/MJf1-.svg';
import MJf2 from './MJ Tiles/MJf2-.svg';
import MJf3 from './MJ Tiles/MJf3-.svg';
import MJf4 from './MJ Tiles/MJf4-.svg';
import MJs1 from './MJ Tiles/MJs1-.svg';
import MJs2 from './MJ Tiles/MJs2-.svg';
import MJs3 from './MJ Tiles/MJs3-.svg';
import MJs4 from './MJ Tiles/MJs4-.svg';
import MJs5 from './MJ Tiles/MJs5-.svg';
import MJs6 from './MJ Tiles/MJs6-.svg';
import MJs7 from './MJ Tiles/MJs7-.svg';
import MJs8 from './MJ Tiles/MJs8-.svg';
import MJs9 from './MJ Tiles/MJs9-.svg';
import MJt1 from './MJ Tiles/MJt1-.svg';
import MJt2 from './MJ Tiles/MJt2-.svg';
import MJt3 from './MJ Tiles/MJt3-.svg';
import MJt4 from './MJ Tiles/MJt4-.svg';
import MJt5 from './MJ Tiles/MJt5-.svg';
import MJt6 from './MJ Tiles/MJt6-.svg';
import MJt7 from './MJ Tiles/MJt7-.svg';
import MJt8 from './MJ Tiles/MJt8-.svg';
import MJt9 from './MJ Tiles/MJt9-.svg';
import MJw1 from './MJ Tiles/MJw1-.svg';
import MJw2 from './MJ Tiles/MJw2-.svg';
import MJw3 from './MJ Tiles/MJw3-.svg';
import MJw4 from './MJ Tiles/MJw4-.svg';
import MJw5 from './MJ Tiles/MJw5-.svg';
import MJw6 from './MJ Tiles/MJw6-.svg';
import MJw7 from './MJ Tiles/MJw7-.svg';
import MJw8 from './MJ Tiles/MJw8-.svg';
import MJw9 from './MJ Tiles/MJw9-.svg';
import MJ0 from './MJ Tiles/MJ0.svg';

export const tilesArr = [
  MJd1,
  MJd2,
  MJd3,
  MJf1,
  MJf2,
  MJf3,
  MJf4,
  MJs1,
  MJs2,
  MJs3,
  MJs4,
  MJs5,
  MJs6,
  MJs7,
  MJs8,
  MJs9,
  MJt1,
  MJt2,
  MJt3,
  MJt4,
  MJt5,
  MJt6,
  MJt7,
  MJt8,
  MJt9,
  MJw1,
  MJw2,
  MJw3,
  MJw4,
  MJw5,
  MJw6,
  MJw7,
  MJw8,
  MJw9
];

const MAX_HAND_SIZE = 14;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function drawHand(deck) {
  let hand = [];
  for (let i = 0; i < MAX_HAND_SIZE; i++) {
    hand.push(deck.pop())
  }
  return hand;
}

/*function checkForWinningHand(tileGroup) {
  if (tileGroup.length != MAX_HAND_SIZE) {
    return false;
  } else {
    return true;
  }
}*/

const App = () => {
  // The deck has 4 copies of every tile
  let deck = Array(4).fill(tilesArr).flat();
  shuffleArray(deck);

  const [p1hand, setp1hand] = useState(drawHand(deck));
  const [p2hand, setp2hand] = useState(drawHand(deck));
  const [p3hand, setp3hand] = useState(drawHand(deck));
  const [p4hand, setp4hand] = useState(drawHand(deck));
  const [centerTiles, setCenterTiles] = useState([]);

  // TileGroups are sorted by location
  const tileUseStates = {
    tileGroups: [p1hand, p2hand, p3hand, p4hand, centerTiles],
    setTileGroups: [setp1hand, setp2hand, setp3hand, setp4hand, setCenterTiles]
  }

  /*if (checkForWinningHand(p1hand)) {
    console.log(p1hand.length);
  }*/

  return (
    <div className="App">
     <header className="App-header">
        <div className="P1hand">
          <TileGroup location={0} tiles={tileUseStates}/>
        </div>

        <div className="P2hand">
          <TileGroup location={1} tiles={tileUseStates}/>
        </div>

        <div className="P3hand">
          <TileGroup location={2} tiles={tileUseStates}/>
        </div>

        <div className="P4hand">
          <TileGroup location={3} tiles={tileUseStates}/>
        </div>

        <div className="CenterTiles">
          <TileGroup location={4} tiles={tileUseStates}/>
        </div>
        </header>
    </div>
  );
}

// Location refers to area of the board (in a hand, in the center, etc.)
// Locations 0-3 are player hands 1-4, and location 4 is center tiles
// Index refers to the tile number within a group
// Tiles are the useStates for all tile groups
const Tile = ({name, location, index, tiles}) => {
  
  const [controlledPosition, setControlledPosition] = useState({x: 0, y: 0});

  const onStop = (e, position) => {
    const {x, y} = position;

    if (y < -50) {
      if (index > -1) {
        // Adds the newly played tile to centerTiles
        tiles.setTileGroups[4](tiles.tileGroups[4].concat(tiles.tileGroups[0][index]));

        // Removes the newly played tile from p1hand
        tiles.setTileGroups[0]([...tiles.tileGroups[0].slice(0, index), ...tiles.tileGroups[0].slice(index + 1)]);
      }
    } else {
      setControlledPosition({x: 0, y: 0});
    }
  };

  const tileWidth = location == 1 || location == 3 ? 3 : 4.5;

  return (
    <Draggable
    bounds={null}
    position={controlledPosition}
    onStop={onStop}
    disabled={(location != 0) ? true : false}>
      <img src={location == 0 || location == 4 ? name : MJ0} style={{width: `${tileWidth}vw`}} draggable="false" alt=""/>
    </Draggable>
  )
}

// Represents a group of tiles at a particular location
// TileGroups are given useStates for all tiles
const TileGroup = ({location, tiles}) => {
  return (
    <div>
      {tiles.tileGroups[location].map((name, index) =>
        <Tile name={name} location={location} index={index} tiles={tiles} key={name + " " + index}/>
      )} 
    </div>
  ) 
}

export default App;
