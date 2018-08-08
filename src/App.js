import React, { Component } from 'react';
import { GameSnake } from './GameSnake';
import { ChangeLanguage } from './ChangeLanguage';
import './css/AppStyles.css';

export class App extends Component {
  render() {
    return (
      <div className="App">
      	<GameSnake />
      	<ChangeLanguage />
      </div>
    );
  }
}
