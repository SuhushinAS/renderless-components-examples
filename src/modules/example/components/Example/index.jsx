import React from 'react';

/**
 * Пример компонента.
 * @param {*} props Свойства компонента.
 * @return {*} Представление компонента.
 */
export default function Example(props) {
  return <div>{props.text}</div>;
}

Example.defaultProps = {
  text: 'Example',
};
