import React, { useState } from 'react';
//import React, { useState, useContext } from 'react';
//import { TilesContext } from './tilesContext'
import './App.css';
import Draggable from 'react-draggable';
//import SvgIcon from '@material-ui/core/SvgIcon';
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

// src: svg source for each tile
// suit: 1 -> dots, 2 -> bamboo, 3 -> characters, 4-7 -> ESWN winds, 8-10 -> RGW dragons
// value: numeric value for tile; winds and dragons have value 1 
export const tilesArr = [
  {src: MJd1, suit: 8, value: 1},
  {src: MJd2, suit: 9, value: 1},
  {src: MJd3, suit: 10, value: 1},
  {src: MJf1, suit: 4, value: 1},
  {src: MJf2, suit: 5, value: 1},
  {src: MJf3, suit: 6, value: 1},
  {src: MJf4, suit: 7, value: 1},
  {src: MJs1, suit: 2, value: 1},
  {src: MJs2, suit: 2, value: 2},
  {src: MJs3, suit: 2, value: 3},
  {src: MJs4, suit: 2, value: 4},
  {src: MJs5, suit: 2, value: 5},
  {src: MJs6, suit: 2, value: 6},
  {src: MJs7, suit: 2, value: 7},
  {src: MJs8, suit: 2, value: 8},
  {src: MJs9, suit: 2, value: 9},
  {src: MJt1, suit: 1, value: 1},
  {src: MJt2, suit: 1, value: 2},
  {src: MJt3, suit: 1, value: 3},
  {src: MJt4, suit: 1, value: 4},
  {src: MJt5, suit: 1, value: 5},
  {src: MJt6, suit: 1, value: 6},
  {src: MJt7, suit: 1, value: 7},
  {src: MJt8, suit: 1, value: 8},
  {src: MJt9, suit: 1, value: 9},
  {src: MJw1, suit: 3, value: 1},
  {src: MJw2, suit: 3, value: 2},
  {src: MJw3, suit: 3, value: 3},
  {src: MJw4, suit: 3, value: 4},
  {src: MJw5, suit: 3, value: 5},
  {src: MJw6, suit: 3, value: 6},
  {src: MJw7, suit: 3, value: 7},
  {src: MJw8, suit: 3, value: 8},
  {src: MJw9, suit: 3, value: 9}
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

function drawTile(deck) {
  return deck.pop();
}

// Check if three tiles form a pong or chow
function checkForTriplets(tiles, minValue, maxValue) {
  // Exactly 3 tiles
  if (tiles.length != 3) {
    return false;
  } else {
    return (tiles[0].suit == tiles[1].suit && 
      tiles[0].suit == tiles[2].suit && 
      tiles[1].suit == tiles[2].suit) &&
      
      // Either all three values match, which forms a pong
      ((tiles[0].value == tiles[1].value && 
        tiles[0].value == tiles[2].value && 
        tiles[1].value == tiles[2].value) ||
      
      // Or the values are sequential, which forms a chow
      // Values must be distinct
      (tiles[0].value != tiles[1].value && 
        tiles[0].value != tiles[2].value && 
        tiles[1].value != tiles[2].value &&
      // Check for consecutive values by making sure max and min differ by 2
      maxValue - minValue == 2))
  }
}

// Checks if a tileGroup is a winning hand
function checkForWinningHand(tileGroup) {
  // Hand must have 14 tiles
  if (tileGroup.length != MAX_HAND_SIZE) {
    return false;
  }
  const markedTiles = Array(MAX_HAND_SIZE).fill(false);
  return backtrackingCheck(tileGroup, markedTiles, false);
}

// Recursive backtracking function used to check for winning hand
function backtrackingCheck(tileGroup, markedTiles, pairAlreadyFound) {
  // If every tile is marked as true (winning), the hand is winning
  if (markedTiles.every(e => e)) {
    return true;
  }
  // If we haven't found a pair yet, look for one
  if (!pairAlreadyFound) {
    // First, check tiles one by one
    for (let firstIndex = 0; firstIndex < tileGroup.length; firstIndex++) {
      // For each tile, check if it has a twin
      // No need to look at previous elements because those have already been paired
      for (let secondIndex = firstIndex + 1; secondIndex < tileGroup.length; secondIndex++) {
        // Exclude tiles which have already been marked as winning
        if (!markedTiles[firstIndex] && !markedTiles[secondIndex]) {
          // If the tiles match suit and value they are twins
          if (tileGroup[firstIndex].suit == tileGroup[secondIndex].suit && tileGroup[firstIndex].value == tileGroup[secondIndex].value) {
            // Mark indices for paired tiles as winning
            markedTiles[firstIndex] = true;
            markedTiles[secondIndex] = true;
            // Call recursively with the pair marked; if true, the hand is winning
            if (backtrackingCheck(tileGroup, markedTiles, true)) {
              return true;
            }
            // Otherwise we didn't find a win, so we unmark those indices
            markedTiles[firstIndex] = false;
            markedTiles[secondIndex] = false;
          }
        }
      }
    }
  } else {
    // Otherwise, look for triplets
    for (let firstIndex = 0; firstIndex < tileGroup.length; firstIndex++) {
      for (let secondIndex = firstIndex + 1; secondIndex < tileGroup.length; secondIndex++) {
        for (let thirdIndex = secondIndex + 1; thirdIndex < tileGroup.length; thirdIndex++) {
          // Exclude tiles which have already been marked as winning
          if (!markedTiles[firstIndex] && !markedTiles[secondIndex] && !markedTiles[thirdIndex]) {
            // Save min and max values to check for sequential values
            const minValue = Math.min(tileGroup[firstIndex].value, tileGroup[secondIndex].value, tileGroup[thirdIndex].value);
            const maxValue = Math.max(tileGroup[firstIndex].value, tileGroup[secondIndex].value, tileGroup[thirdIndex].value);

            // Make an array for each triplet to be checked
            const triplet = [tileGroup[firstIndex], tileGroup[secondIndex], tileGroup[thirdIndex]];

            // For any triplet, the suits must all match
            if (checkForTriplets(triplet, minValue, maxValue)) {
              // Mark indices for grouped tiles as winning
              markedTiles[firstIndex] = true;
              markedTiles[secondIndex] = true;
              markedTiles[thirdIndex] = true;
              // Recursive call; we have already found a pair by this point
              if (backtrackingCheck(tileGroup, markedTiles, true)) {
                console.log(tileGroup[firstIndex].value + " " + tileGroup[secondIndex].value + " " + tileGroup[thirdIndex].value);
                return true;
              }
              // Otherwise we didn't find a win, so we unmark those indices
              markedTiles[firstIndex] = false;
              markedTiles[secondIndex] = false;
              markedTiles[thirdIndex] = false;
            }
          }
        }
      }
    }
  }
  return false;
}

const App = () => {
  // The deck has 4 copies of every tile
  let initialDeck = Array(4).fill(tilesArr).flat();
  shuffleArray(initialDeck);

  // Test for winning hand
  /*let testArray = [tilesArr[0], tilesArr[0],
    tilesArr[1], tilesArr[1], tilesArr[1],
    tilesArr[10], tilesArr[11], tilesArr[12],
    tilesArr[11], tilesArr[12], tilesArr[13],
    tilesArr[20], tilesArr[21], tilesArr[22]];
  shuffleArray(testArray);
  console.log(testArray);*/

  //const [p1hand, setp1hand] = useState(testArray);
  const [p1hand, setp1hand] = useState(drawHand(initialDeck));
  const [p2hand, setp2hand] = useState(drawHand(initialDeck));
  const [p3hand, setp3hand] = useState(drawHand(initialDeck));
  const [p4hand, setp4hand] = useState(drawHand(initialDeck));
  const [centerTiles, setCenterTiles] = useState([]);

  // Allows the deck to be modified by child components
  const [deck, setDeck] = useState(initialDeck);

  // TileGroups are sorted by location
  const tileUseStates = {
    tileGroups: [p1hand, p2hand, p3hand, p4hand, centerTiles],
    setTileGroups: [setp1hand, setp2hand, setp3hand, setp4hand, setCenterTiles]
  }

  let isGameActive = true;
  if (checkForWinningHand(p1hand)) {
    console.log("P1 win");
    console.log(p1hand);
    isGameActive = false;
  }

  return (
    <div className="App">
     <header className="App-header">
        <div className="P1hand">
          <TileGroup location={0} tileUseStates={tileUseStates} deck={deck} isGameActive={isGameActive}/>
        </div>

        <div className="P2hand">
          <TileGroup location={1} tileUseStates={tileUseStates} deck={deck} isGameActive={isGameActive}/>
        </div>

        <div className="P3hand">
          <TileGroup location={2} tileUseStates={tileUseStates} deck={deck} isGameActive={isGameActive}/>
        </div>

        <div className="P4hand">
          <TileGroup location={3} tileUseStates={tileUseStates} deck={deck} isGameActive={isGameActive}/>
        </div>

        <div className="CenterTiles">
          <TileGroup location={4} tileUseStates={tileUseStates} deck={deck} isGameActive={isGameActive}/>
        </div>
        </header>
    </div>
  );
}

// Location refers to area of the board (in a hand, in the center, etc.)
// Locations 0-3 are player hands 1-4, and location 4 is center tiles
// Index refers to the tile number within a group
const Tile = ({src, location, index, tileUseStates, deck, isGameActive}) => {

  const [controlledPosition, setControlledPosition] = useState({x: 0, y: 0});

  const onStop = (e, position) => {
    const {x, y} = position;

    // When the tile is played
    if (y < -50 && index >= 0 && deck.length > 0) {
      // Adds the newly played tile to centerTiles
      tileUseStates.setTileGroups[4](tileUseStates.tileGroups[4].concat(tileUseStates.tileGroups[0][index]));
      // Removes the newly played tile from p1hand and draws a new tile if possible
      tileUseStates.setTileGroups[0]([...tileUseStates.tileGroups[0].slice(0, index), ...tileUseStates.tileGroups[0].slice(index + 1), drawTile(deck)]);
      // Return false to mitigate warning for React state update on an unmounted component (from react-draggable)
      return false;
    } else {
      // Snap tile back to starting position
      setControlledPosition({x: 0, y: 0});
      return true;
    }
  };

  const tileWidth = location == 1 || location == 3 ? 3 : 4.5;

  return (
    <Draggable
    bounds={null}
    position={controlledPosition}
    onStop={onStop}
    disabled={(location != 0 || !isGameActive) ? true : false}>
      <img src={location == 0 || location == 4 ? src : MJ0} style={{width: `${tileWidth}vw`}} draggable="false" alt=""/>
    </Draggable>
  )
}

// Represents a group of tiles at a particular location
// TileGroups are given useStates for all tiles
// Key is a unique identifier for each tile
const TileGroup = ({location, tileUseStates, deck, isGameActive}) => {
  return (
    <div>
      {tileUseStates.tileGroups[location].map((tile, index) =>
        <Tile src={tile.src} location={location} index={index} tileUseStates={tileUseStates} 
        deck={deck} isGameActive={isGameActive} key={tile.suit + " " + tile.value + " " + location + " " + index}/>
      )} 
    </div>
  ) 
}

export default App;
