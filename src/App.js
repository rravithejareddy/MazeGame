import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  drawGrid(w, h) {
    const ctx = this.refs.grid.getContext('2d')

    ctx.canvas.width = w
    ctx.canvas.height = h
    for (var x = 0; x <= w; x += 20) {
      for (var y = 0; y <= h; y += 20) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
    }
  }
  render() {
    this.drawGrid(800, 400)
    return (
      <div className="App">
        <header>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <canvas ref='grid'></canvas>
      </div>

    );
  }
}

export default App;
