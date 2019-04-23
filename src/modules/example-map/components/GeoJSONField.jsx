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
      <div className="geo-json">
        <input
          id={id}
          name="tile"
          onChange={this.handleChange}
          defaultChecked={value[id]}
          type="checkbox"
        />
        <label htmlFor={id}>{id}</label>
      </div>
    );
  }

  handleChange = () => {
    this.props.onChange(this.props.id);
  };
}

export default GeoJSONField;
