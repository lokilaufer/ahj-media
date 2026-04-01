const GEOLOCATION_TIMEOUT = 10000;
const GEOLOCATION_MAXIMUM_AGE = 0;
const GEOLOCATION_ENABLE_HIGH_ACCURACY = true;

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
        enableHighAccuracy: GEOLOCATION_ENABLE_HIGH_ACCURACY,
        timeout: GEOLOCATION_TIMEOUT,
        maximumAge: GEOLOCATION_MAXIMUM_AGE
      }
    );
  });
}