import ExampleApi from 'modules/example/api/index.js';

/**
 * Функция для получения Api.
 * @param {string} host Хост сервера.
 * @return {*} Объекты Api
 */
export default function getApi(host) {
  return {
    example: new ExampleApi(host),
  };
}
