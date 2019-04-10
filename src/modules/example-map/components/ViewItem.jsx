import React from 'react';
import 'modules/example-map/components/ViewItem.css';

class ViewItem extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {
    onDelete: () => {
    },
    onSet: () => {
    },
  };

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    const {id} = this.props;
    return (
      <div className="view-item">
        <div>
          {id}
        </div>
        <div>
          <button onClick={this.handleSet}>Set</button>
          {' '}
          <button onClick={this.handleDelete}>Delete</button>
        </div>
      </div>
    );
  }

  handleDelete = () => {
    this.props.onDelete(this.props.id);
  };

  handleSet = () => {
    this.props.onSet(this.props.view);
  };
}

export default ViewItem;
