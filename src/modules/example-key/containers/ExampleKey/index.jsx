import KeyHandler from 'modules/common/containers/KeyHandler/index.jsx';
import Layout from 'modules/common/containers/Layout/index.jsx';
import Key from "modules/example-key/components/Key/index.jsx";
import KeyItem from 'modules/example-key/components/KeyItem/index.jsx';
import keys from 'modules/example-key/data/keys.json';
import React from 'react';

const keyList = Object.keys(keys);

class ExampleKey extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {};

  state = {
    keys: {},
    keyups: {},
  };

  getKeyList() {
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
      keyups: {
        ...state.keyups,
        [e.keyCode]: true,
      },
    }));
    setTimeout(this.clearKeyups);
  };

  hendleKeyChange = (key) => {
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

  renderKey = (key) => <Key id={key} isActive={this.state.keyups[keys[key]]} key={key} />;

  renderKeyItem = (key) => <KeyItem id={key} key={key} onChange={this.hendleKeyChange} value={this.state.keys} />;

  renderMain() {
    return (
      <div>
        {keyList.map(this.renderKey)}
        <KeyHandler keyList={this.getKeyList()} />
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

  clearKeyups = () => {
    this.setState({keyups: {}})
  };
}

export default ExampleKey;
