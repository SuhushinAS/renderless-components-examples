import 'modules/example-map/components/GeoJSONField.css';
import React from 'react';

class GeoJSONField extends React.Component {
  static defaultProps = {
    onChange: () => {
    },
    value: {},
  };

  render() {
    const {id, value} = this.props;
    return (
      <label className="geo-json" htmlFor={id}>
        <input
          id={id}
          name="tile"
          onChange={this.handleChange}
          defaultChecked={value[id]}
          type="checkbox"
        />
        {id}
      </label>
    );
  }

  handleChange = () => {
    this.props.onChange(this.props.id);
  };
}

export default GeoJSONField;
