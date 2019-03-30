import KeyHandler from 'modules/common/containers/KeyHandler/index.jsx';
import Layout from 'modules/common/containers/Layout/index.jsx';
import Key from "modules/example-key/components/Key/index.jsx";
import KeyItem from 'modules/example-key/components/KeyItem/index.jsx';
import keys from 'modules/example-key/data/keys.json';
import React from 'react';

const keyList = Object.keys(keys);

class ExampleKey extends React.Component {
  state = {
    keyEvents: {},
    keys: {},
  };

  get keyList() {
    return {
      keydown: Object.keys(this.state.keys).reduce(this.getKey, {}),
    };
  }

  getKey = (prev, key) => {
    if (this.state.keys[key]) {
      return {
        ...prev,
        [key]: this.handleKey,
      };
    }

    return prev;
  };

  handleKey = (e) => {
    this.setState((state) => ({
      ...state,
      keyEvents: {
        ...state.keyEvents,
        [e.keyCode]: true,
      },
    }));
    setTimeout(this.clearKeyEvents);
  };

  handleKeyChange = (key) => {
    const keyCode = keys[key];
    this.setState((state) => ({
      ...state,
      keys: {
        ...state.keys,
        [keyCode]: !state.keys[keyCode],
      },
    }));
  };

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <Layout main={this.renderMain()} side={this.renderSide()} />
    );
  }

  renderKey = (key) => <Key id={key} isActive={this.state.keyEvents[keys[key]]} key={key} />;

  renderKeyItem = (key) => <KeyItem id={key} key={key} onChange={this.handleKeyChange} value={this.state.keys} />;

  renderMain() {
    return (
      <div>
        {keyList.map(this.renderKey)}
        <KeyHandler keyList={this.keyList} />
      </div>
    );
  }

  renderSide() {
    return (
      <fieldset>
        <legend>Keys</legend>
        {keyList.map(this.renderKeyItem)}
      </fieldset>
    );
  }

  clearKeyEvents = () => {
    this.setState({keyEvents: {}})
  };
}

export default ExampleKey;
