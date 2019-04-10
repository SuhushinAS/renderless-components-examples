import 'modules/common/components/Layout.css';
import React from 'react';

class Layout extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {
    main: () => <div>Main</div>,
    side: () => <div>Side</div>,
  };

  /**
   * Отображение компонента
   * @return {*} Представление компонента.
   */
  render() {
    return (
      <div className="layout">
        <div className="layout__side">{this.props.side}</div>
        <div className="layout__main">{this.props.main}</div>
      </div>
    );
  }
}

export default Layout;
