// src/js/modal.js
import { parseCoordinates } from './coordinates';  // Убрали utils/

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
    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', () => this.handleSubmit());
    }
    if (this.cancelBtn) {
      this.cancelBtn.addEventListener('click', () => this.handleCancel());
    }
    if (this.input) {
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleSubmit();
        }
      });
      this.input.addEventListener('input', () => this.clearError());
    }
  }

  show() {
    if (this.modal) {
      this.modal.style.display = 'flex';
    }
    if (this.input) {
      this.input.value = '';
      this.clearError();
      setTimeout(() => this.input.focus(), 100);
    }
  }

  hide() {
    if (this.modal) {
      this.modal.style.display = 'none';
    }
  }

  clearError() {
    if (this.errorMessage) {
      this.errorMessage.textContent = '';
    }
    if (this.input) {
      this.input.classList.remove('error');
    }
  }

  handleSubmit() {
    if (!this.input) return;

    try {
      const coordinates = parseCoordinates(this.input.value);
      this.hide();
      if (this.onSubmit) {
        this.onSubmit(coordinates);
      }
    } catch (error) {
      if (this.errorMessage) {
        this.errorMessage.textContent = error.message;
      }
      if (this.input) {
        this.input.classList.add('error');
      }
    }
  }

  handleCancel() {
    this.hide();
    if (this.onCancel) {
      this.onCancel();
    }
  }
}