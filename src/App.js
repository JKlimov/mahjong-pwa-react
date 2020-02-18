import React from 'react';
import './App.css';
import Draggable from 'react-draggable';

import MJd1 from './MJ Tiles/MJd1-.svg';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Tile/>
        </header>
      </div>
    );
  }
}

class Tile extends React.Component {
  state = {
    controlledPosition: {
      x: 0, y: 0
    }
  }

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop(e, position);
  };

  onControlledDrag = (e, position) => {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  };

  onStop = (e, position) => {
    const {x, y} = position;
    if (y > 0) {
      this.setState({controlledPosition: {x: 0, y: 0}});
    } else {
      this.setState({controlledPosition: {x: 0, y: -300}});
    }
  };

  render() {
    return (
      <Draggable
      bounds="header"
      position={this.state.controlledPosition}
      onStop={this.onControlledDragStop}>
        <img src={MJd1} width={100} draggable="false" alt="MJd1" />
      </Draggable>
    )
  }
}

export default App;
