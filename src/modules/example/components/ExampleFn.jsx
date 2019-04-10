import React from 'react';

/**
 * Пример компонента.
 * @param {*} props Свойства компонента.
 * @return {*} Представление компонента.
 */
export default function ExampleFn(props) {
  return <div>{props.text}</div>;
}

ExampleFn.defaultProps = {
  text: 'ExampleFn',
};
