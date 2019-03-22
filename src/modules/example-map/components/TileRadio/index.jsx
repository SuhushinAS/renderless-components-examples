import tileLayerData from "modules/example-map/data/tile-layer.json";
import React from 'react';
import './style.css';

class TileRadio extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {
    onChange: () => {},
  };

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    const {id, value} = this.props;
    return (
      <label className="tile-radio" htmlFor={id}>
        <input id={id} name="tile" onChange={this.handleChange} checked={value === id} type="radio" />
        {tileLayerData[id].name}
      </label>
    );
  }

  handleChange = () => {
    this.props.onChange(this.props.id);
  };
}

export default TileRadio;
