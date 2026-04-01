// src/js/coordinates.js

const LATITUDE_MIN = -90;
const LATITUDE_MAX = 90;
const LONGITUDE_MIN = -180;
const LONGITUDE_MAX = 180;
const COORDINATES_PARTS_COUNT = 2;
const BRACKET_START = '[';
const BRACKET_END = ']';

export function parseCoordinates(input) {
  if (!input || typeof input !== 'string') {
    throw new Error('Неверный формат координат');
  }

  let cleaned = input.trim();

  if (cleaned.startsWith(BRACKET_START) && cleaned.endsWith(BRACKET_END)) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  const parts = cleaned.split(',').map(part => part.trim());

  if (parts.length !== COORDINATES_PARTS_COUNT) {
    throw new Error('Должны быть указаны широта и долгота через запятую');
  }

  const latitude = parseFloat(parts[0]);
  const longitude = parseFloat(parts[1]);

  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error('Координаты должны быть числами');
  }

  if (latitude < LATITUDE_MIN || latitude > LATITUDE_MAX) {
    throw new Error(`Широта должна быть в диапазоне от ${LATITUDE_MIN} до ${LATITUDE_MAX}`);
  }

  if (longitude < LONGITUDE_MIN || longitude > LONGITUDE_MAX) {
    throw new Error(`Долгота должна быть в диапазоне от ${LONGITUDE_MIN} до ${LONGITUDE_MAX}`);
  }

  return { latitude, longitude };
}