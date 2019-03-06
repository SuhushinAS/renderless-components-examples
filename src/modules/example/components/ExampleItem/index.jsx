import React from 'react';

/**
 * Пример компонента.
 * @param {*} props Свойства компонента.
 * @return {*} Представление компонента.
 */
export default function ExampleItem(props) {
  const {item} = props;
  return <li key={item.id}>{item.name}</li>;
}

ExampleItem.defaultProps = {
  item: {
    id: 0,
    name: '',
  },
};
