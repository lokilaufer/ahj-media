// src/js/app.js
import { CoordinatesModal } from './modal';
import { getGeolocation } from './geolocation';
import { parseCoordinates } from './coordinates';

export default class App {
  constructor() {
    console.log('App started');
    this.init();
  }

  init() {
    // Создаем модальное окно
    this.modal = new CoordinatesModal(
      (coordinates) => this.handleCoordinates(coordinates),
      () => console.log('Modal closed')
    );

    // Добавляем обработчик для текстового поля
    this.messageInput = document.getElementById('messageInput');
    if (this.messageInput) {
      this.messageInput.addEventListener('keydown', (e) => {
        // Если нажат Enter без Shift
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); // Отменяем перенос строки
          this.handleMessage();
        }
      });
    }
  }

  handleMessage() {
    const text = this.messageInput.value.trim();
    if (!text) return;

    console.log('Message:', text);

    // Проверяем, есть ли в тексте координаты
    const coordinates = this.extractCoordinates(text);

    if (coordinates) {
      // Если есть координаты, добавляем сообщение с ними
      this.addMessageToTimeline(text, coordinates);
      this.messageInput.value = '';
    } else {
      // Если нет координат, открываем модальное окно
      this.pendingMessage = text;
      this.modal.show();
    }
  }

  extractCoordinates(text) {
    // Ищем координаты в формате "55.75, 37.62"
    const regex = /(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/;
    const match = text.match(regex);

    if (match) {
      try {
        const latitude = parseFloat(match[1]);
        const longitude = parseFloat(match[2]);

        // Проверяем диапазон
        if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
          return { latitude, longitude };
        }
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  handleCoordinates(coordinates) {
    console.log('Coordinates received:', coordinates);

    // Если есть отложенное сообщение, добавляем его с координатами
    if (this.pendingMessage) {
      this.addMessageToTimeline(this.pendingMessage, coordinates);
      this.pendingMessage = null;
    }

    this.messageInput.value = '';
  }

  addMessageToTimeline(text, coordinates) {
    const timeline = document.getElementById('timeline');
    if (timeline) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'timeline-message';

      // Удаляем координаты из текста, если они там были
      let displayText = text;
      const coordPattern = /(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/;
      displayText = displayText.replace(coordPattern, '').trim();

      if (!displayText) {
        displayText = '📍 Геометка';
      }

      const date = new Date().toLocaleString();

      messageDiv.innerHTML = `
        <div class="message-header">
          <span class="message-time">${date}</span>
        </div>
        <div class="message-text">${this.escapeHtml(displayText)}</div>
        <div class="message-coords">
          📍 ${coordinates.latitude}, ${coordinates.longitude}
        </div>
      `;

      timeline.appendChild(messageDiv);
      timeline.scrollTop = timeline.scrollHeight;
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}