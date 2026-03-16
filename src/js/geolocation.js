/**
 * Парсит строку с координатами
 * @param {string} input - строка с координатами
 * @returns {Object} объект с широтой и долготой
 * @throws {Error} если формат неверный
 */
export function parseCoordinates(input) {
  if (!input || typeof input !== 'string') {
    throw new Error('Неверный формат координат');
  }

  // Удаляем квадратные скобки и пробелы по краям
  let cleaned = input.trim();

  // Удаляем квадратные скобки если есть
  if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  // Разделяем по запятой
  const parts = cleaned.split(',').map(part => part.trim());

  if (parts.length !== 2) {
    throw new Error('Должны быть указаны широта и долгота через запятую');
  }

  const latitude = parseFloat(parts[0]);
  const longitude = parseFloat(parts[1]);

  // Проверяем что это числа
  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error('Координаты должны быть числами');
  }

  // Проверяем диапазон значений
  if (latitude < -90 || latitude > 90) {
    throw new Error('Широта должна быть в диапазоне от -90 до 90');
  }

  if (longitude < -180 || longitude > 180) {
    throw new Error('Долгота должна быть в диапазоне от -180 до 180');
  }

  return { latitude, longitude };
}

/**
 * Получает координаты через Geolocation API
 * @returns {Promise<Object>} промис с координатами
 */
export function getGeolocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation не поддерживается браузером'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        let message = 'Ошибка получения геолокации';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            message = 'Доступ к геолокации запрещён';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Информация о местоположении недоступна';
            break;
          case error.TIMEOUT:
            message = 'Время ожидания геолокации истекло';
            break;
        }
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}