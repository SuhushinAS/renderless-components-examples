import 'modules/example-map/components/TileLayerField.css';
import React from 'react';

class TileLayerField extends React.Component {
  static defaultProps = {
    onChange: () => {
    },
  };

  render() {
    const {id, value} = this.props;
    return (
      <div className="tile-radio">
        <input
          id={id}
          name="tile"
          onChange={this.handleChange}
          checked={value === id}
          type="radio"
        />
        <label htmlFor={id}>{id}</label>
      </div>
    );
  }

  handleChange = () => {
    this.props.onChange(this.props.id);
  };
}

export default TileLayerField;
