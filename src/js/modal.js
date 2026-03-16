import { parseCoordinates } from './geolocation';

export class CoordinatesModal {
  constructor(onSubmit, onCancel) {
    this.modal = document.getElementById('coordModal');
    this.input = document.getElementById('coordInput');
    this.submitBtn = document.getElementById('submitCoord');
    this.cancelBtn = document.getElementById('cancelCoord');
    this.errorMessage = document.getElementById('errorMessage');

    this.onSubmit = onSubmit;
    this.onCancel = onCancel;

    this.bindEvents();
  }

  bindEvents() {
    this.submitBtn.addEventListener('click', () => this.handleSubmit());
    this.cancelBtn.addEventListener('click', () => this.handleCancel());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSubmit();
      }
    });
  }

  show() {
    this.modal.classList.add('show');
    this.input.value = '';
    this.errorMessage.textContent = '';
    this.input.classList.remove('error');
    this.input.focus();
  }

  hide() {
    this.modal.classList.remove('show');
  }

  handleSubmit() {
    try {
      const coordinates = parseCoordinates(this.input.value);
      this.hide();
      if (this.onSubmit) {
        this.onSubmit(coordinates);
      }
    } catch (error) {
      this.errorMessage.textContent = error.message;
      this.input.classList.add('error');
    }
  }

  handleCancel() {
    this.hide();
    if (this.onCancel) {
      this.onCancel();
    }
  }
}