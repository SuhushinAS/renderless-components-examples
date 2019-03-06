import Item from 'modules/example/components/ExampleItem/index.jsx';
import React from 'react';

/**
 * Пример компонента.
 * @param {*} props Свойства компонента.
 * @return {*} Представление компонента.
 */
export default function ExampleList(props) {
  return (
    <ul>
      {props.list.map((item) => <Item item={item} key={item.id} />)}
    </ul>
  );
}

ExampleList.defaultProps = {
  list: [],
};
