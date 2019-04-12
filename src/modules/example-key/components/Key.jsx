import 'modules/example-key/components/Key.css';
import React from 'react';

class Key extends React.Component {
  static defaultProps = {
    isActive: false,
  };

  render() {
    const {id, isActive} = this.props;
    const classList = ['key'];

    if (isActive) {
      classList.push('key_active');
    }

    return (
      <div className={classList.join(' ')}>
        {id}
      </div>
    );
  }
}

export default Key;
