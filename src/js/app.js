import { Timeline } from './timeline';
import { getGeolocation } from './geolocation';
import { CoordinatesModal } from './modal';

export class App {
  constructor() {
    this.timeline = new Timeline('timeline');
    this.modal = new CoordinatesModal(
      (coordinates) => this.handleManualCoordinates(coordinates),
      () => this.handleModalCancel()
    );

    this.messageInput = document.getElementById('messageInput');
    this.pendingMessage = null;

    this.bindEvents();
  }

  bindEvents() {
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleMessageSubmit();
      }
    });
  }

  async handleMessageSubmit() {
    const text = this.messageInput.value.trim();
    if (!text) return;

    this.pendingMessage = text;
    this.messageInput.value = '';

    try {
      const coordinates = await getGeolocation();
      this.timeline.addPost(text, coordinates);
      this.pendingMessage = null;
    } catch (error) {
      console.log('Geolocation error:', error.message);
      this.modal.show();
    }
  }

  handleManualCoordinates(coordinates) {
    if (this.pendingMessage) {
      this.timeline.addPost(this.pendingMessage, coordinates);
      this.pendingMessage = null;
    }
  }

  handleModalCancel() {
    this.pendingMessage = null;
  }
}