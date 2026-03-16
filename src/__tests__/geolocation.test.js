import { parseCoordinates } from '../js/geolocation.js';  // Добавьте .js расширение

describe('parseCoordinates function', () => {
  test('should parse coordinates with space after comma', () => {
    const input = '51.50851, -0.12572';
    const result = parseCoordinates(input);
    expect(result).toEqual({
      latitude: 51.50851,
      longitude: -0.12572
    });
  });

  test('should parse coordinates without space after comma', () => {
    const input = '51.50851,-0.12572';
    const result = parseCoordinates(input);
    expect(result).toEqual({
      latitude: 51.50851,
      longitude: -0.12572
    });
  });

  test('should parse coordinates with square brackets', () => {
    const input = '[51.50851, -0.12572]';
    const result = parseCoordinates(input);
    expect(result).toEqual({
      latitude: 51.50851,
      longitude: -0.12572
    });
  });

  test('should parse coordinates with square brackets and no space', () => {
    const input = '[51.50851,-0.12572]';
    const result = parseCoordinates(input);
    expect(result).toEqual({
      latitude: 51.50851,
      longitude: -0.12572
    });
  });

  test('should throw error for empty string', () => {
    expect(() => parseCoordinates('')).toThrow('Неверный формат координат');
  });

  test('should throw error for null input', () => {
    expect(() => parseCoordinates(null)).toThrow('Неверный формат координат');
  });

  test('should throw error for undefined input', () => {
    expect(() => parseCoordinates(undefined)).toThrow('Неверный формат координат');
  });

  test('should throw error for invalid format (one number)', () => {
    expect(() => parseCoordinates('51.50851')).toThrow('Должны быть указаны широта и долгота через запятую');
  });

  test('should throw error for invalid format (three numbers)', () => {
    expect(() => parseCoordinates('51.50851, -0.12572, 10')).toThrow('Должны быть указаны широта и долгота через запятую');
  });

  test('should throw error for non-numeric values', () => {
    expect(() => parseCoordinates('abc, def')).toThrow('Координаты должны быть числами');
  });

  test('should throw error for latitude out of range', () => {
    expect(() => parseCoordinates('100, -0.12572')).toThrow('Широта должна быть в диапазоне от -90 до 90');
  });

  test('should throw error for longitude out of range', () => {
    expect(() => parseCoordinates('51.50851, 200')).toThrow('Долгота должна быть в диапазоне от -180 до 180');
  });

  test('should parse negative coordinates', () => {
    const input = '-33.8688, 151.2093';
    const result = parseCoordinates(input);
    expect(result).toEqual({
      latitude: -33.8688,
      longitude: 151.2093
    });
  });

  test('should parse coordinates with leading/trailing spaces', () => {
    const input = '  51.50851  ,  -0.12572  ';
    const result = parseCoordinates(input);
    expect(result).toEqual({
      latitude: 51.50851,
      longitude: -0.12572
    });
  });
});