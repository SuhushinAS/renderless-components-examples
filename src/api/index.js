const optionsDefault = {
  data: null,
  headers: {},
  isCors: false,
};

export default class Api {
  /**
   * Конструктор.
   * @param host Хост.
   */
  constructor(host = '') {
    this.host = host;
  }

  /**
   * Получить Опции запроса.
   * @param {boolean} isCors Кроссдоменный запрос.
   * @param data Данные
   * @param headers Заголовки
   * @param {string} method Метод.
   * @param {*} mode Режим.
   * @param {*} options Опции запроса.
   * @return {*} Опции запроса.
   */
  static getOptions(isCors, {data, headers, method, mode, ...options}) {
    return {
      body: isCors ? JSON.stringify(data) : null,
      credentials: 'include',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'X-HTTP-Method-Override': method,
      },
      method: isCors ? 'POST' : 'GET',
      ...options,
      mode: isCors ? 'cors' : mode,
    };
  }

  /**
   * Приостановить выполнение.
   * @param {*} ms Задержка.
   * @return {*} Приостановить выполнение.
   */
  sleeper(ms) {
    return function (...rest) {
      return new Promise((resolve) => setTimeout(() => resolve(...rest), ms));
    };
  }

  /**
   * Отправить запрос.
   * @param {string} url Адрес.
   * @param {string} method Метод.
   * @param {boolean} isCors Кроссдоменный запрос.
   * @param {*} options Опции запроса.
   * @returns {*} Данными сервера.
   */
  async request(url, method = 'GET', {isCors, ...options} = optionsDefault) {
    const requestUrl = isCors ? this.host + url : url;
    const response = await fetch(requestUrl, Api.getOptions(isCors, options));
    return await response.json();
  }
}
