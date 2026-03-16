export class Timeline {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.posts = [];
  }

  addPost(text, coordinates) {
    const post = {
      id: Date.now() + Math.random(),
      text,
      coordinates,
      timestamp: new Date().toISOString()
    };

    this.posts.push(post);
    this.renderPost(post);
    return post;
  }

  renderPost(post) {
    const postElement = document.createElement('div');
    postElement.className = 'timeline-item';
    postElement.dataset.id = post.id;

    const date = new Date(post.timestamp);
    const formattedDate = date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    postElement.innerHTML = `
      <div class="text">${this.escapeHtml(post.text)}</div>
      <div class="coordinates">
        📍 ${post.coordinates.latitude.toFixed(6)}, ${post.coordinates.longitude.toFixed(6)}
      </div>
      <div class="timestamp">${formattedDate}</div>
    `;

    this.container.appendChild(postElement);
    this.container.scrollTop = this.container.scrollHeight;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}