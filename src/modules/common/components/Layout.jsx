import 'modules/common/components/Layout.css';
import React from 'react';

class Layout extends React.Component {
  static defaultProps = {
    main: () => <div>Main</div>,
    side: () => <div>Side</div>,
  };

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
