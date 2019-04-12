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
      <label className="tile-radio" htmlFor={id}>
        <input
          id={id}
          name="tile"
          onChange={this.handleChange}
          checked={value === id}
          type="radio"
        />
        {id}
      </label>
    );
  }

  handleChange = () => {
    this.props.onChange(this.props.id);
  };
}

export default TileLayerField;
