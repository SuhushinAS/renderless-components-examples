import 'modules/example-key/components/Key.css';
import React from 'react';

class Key extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {
    isActive: false,
  };

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
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
