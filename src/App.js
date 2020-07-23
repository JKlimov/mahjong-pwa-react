import React, { useState, useContext } from 'react';
import { TilesContext } from './tilesContext'
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
  MJs1,
  MJs2,
  MJs3,
  MJs4,
  MJs9,
  MJt1,
  MJt2,
  MJt3,
  MJt4,
  MJt1,
  MJt2,
  MJt3,
  MJt4,
  MJt9,
  MJw1,
  MJw2,
  MJw3,
  MJw4,
  MJw1,
  MJw2,
  MJw3,
  MJw4,
  MJw9,
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

const App = () => {
  let deck = tilesArr.concat(tilesArr).concat(tilesArr).concat(tilesArr);
  shuffleArray(deck);

  const [p1hand, setp1hand] = useState(drawHand(deck));
  const [centerTiles, setCenterTiles] = useState([]);

  const tileLocations = {
    p1hand: p1hand,
    setp1hand: setp1hand
  }

  return (
    <div className="App">
      <header className="App-header">
        <TilesContext.Provider value={tileLocations}>
          <Hand/>
        </TilesContext.Provider>
      </header>
    </div>
  );
}

const Tile = ({name, location}) => {
  let yInitial;
  if (location == 1) {
    yInitial = 300;
  } else {
    yInitial = 0;
  }
  const [controlledPosition, setControlledPosition] = useState({x: 0, y: yInitial});

  const tiles = useContext(TilesContext)

  const onStop = (e, position) => {
    const {x, y} = position;
    if (y < 200) {
      //setControlledPosition({x:0, y:0});
      const tileIndex = tiles.p1hand.indexOf(name);
      tiles.setp1hand(tileIndex > -1 ? [...tiles.p1hand.slice(0, tileIndex), ...tiles.p1hand.slice(tileIndex + 1)] : tiles.p1hand);
    } else {
      setControlledPosition({x:0, y:300});
    }
  };

  return (
    <Draggable
    bounds="header"
    position={controlledPosition}
    onStop={onStop}
    disabled={(controlledPosition.y == 0) ? true : false}>
      <img src={name} width={75} draggable="false" />
    </Draggable>
  )
}

const Hand = () => {
  const tiles = useContext(TilesContext)

  return (
    <div>
      {tiles.p1hand.map(name =>
        <Tile name={name} location={1}/>
      )} 
    </div>
  ) 
}

const centerTiles = ({tiles}) => {
  return (
    <div>
    {tiles.map(name =>
      <Tile name={name} location={0}/>
    )}
    </div>
  )
}

export default App;
