import React from 'react';
import './style.css';

class KeyItem extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {
    onChange: () => {
    },
    value: {},
  };

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    const {id, value} = this.props;
    return (
      <label className="key-item" htmlFor={id}>
        <input id={id} name="tile" onChange={this.handleChange} defaultChecked={value[id]} type="checkbox" />
        {id}
      </label>
    );
  }

  handleChange = () => {
    this.props.onChange(this.props.id);
  };
}

export default KeyItem;
