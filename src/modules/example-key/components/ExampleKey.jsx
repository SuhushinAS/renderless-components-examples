import KeyHandler from 'modules/common/components/KeyHandler.jsx';
import Key from "modules/example-key/components/Key.jsx";
import keys from 'modules/example-key/data/keys.json';
import React from 'react';

const keyList = Object.keys(keys);

class ExampleKey extends React.Component {
  state = {
    keys: {},
  };

  handleKey = (e) => {
    this.setState((state) => ({
      ...state,
      keys: {
        ...state.keys,
        [e.keyCode]: true,
      },
    }));
    setTimeout(this.clearKeyEvents);
  };

  clearKeyEvents = () => {
    this.setState({keys: {}})
  };

  /**
   * Конструктор компонента.
   * @param {*} props Свойства переданые в компонент.
   * @return {undefined}
   */
  constructor(props) {
    super(props);
    this.keyList = {
      keydown: {
        [keys.Alt]: this.handleKey,
        [keys.Backspace]: this.handleKey,
        [keys.Control]: this.handleKey,
        [keys.Delete]: this.handleKey,
        [keys.Down]: this.handleKey,
        [keys.End]: this.handleKey,
        [keys.Enter]: this.handleKey,
        [keys.Esc]: this.handleKey,
        [keys.Home]: this.handleKey,
        [keys.Insert]: this.handleKey,
        [keys.Left]: this.handleKey,
        [keys.PageDown]: this.handleKey,
        [keys.PageUp]: this.handleKey,
        [keys.Right]: this.handleKey,
        [keys.Shift]: this.handleKey,
        [keys.Up]: this.handleKey,
      },
    };
  }

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <div>
        {keyList.map(this.renderKey)}
        <KeyHandler keyList={this.keyList} />
      </div>
    );
  }

  renderKey = (key) => <Key id={key} isActive={this.state.keys[keys[key]]} key={key} />;
}

export default ExampleKey;
