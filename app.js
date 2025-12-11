async function loadProfile() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error('Resposta não OK: ' + res.status);
    const data = await res.json();

    const avatar = document.querySelector('.profile-avatar');
    const nameEl = document.querySelector('.profile-name');
    const usernameEl = document.querySelector('.profile-username');
    const reposEl = document.getElementById('repos-count');
    const followersEl = document.getElementById('followers-count');
    const followingEl = document.getElementById('following-count');
    const profileLink = document.getElementById('profile-link');

    if (avatar) avatar.src = data.avatar || avatar.src;
    if (nameEl) nameEl.textContent = data.name || '';
    if (usernameEl) usernameEl.textContent = data.username ? '@' + data.username : '';
    if (reposEl) reposEl.textContent = data.repos != null ? data.repos : '-';
    if (followersEl) followersEl.textContent = data.followers != null ? data.followers : '-';
    if (followingEl) followingEl.textContent = data.following != null ? data.following : '-';
    if (profileLink) {
      profileLink.href = data.profileUrl || '#';
      profileLink.target = '_blank';
    }

  } catch (err) {
    console.error('Erro ao carregar perfil:', err);
    const container = document.querySelector('.container');
    if (container) {
      const p = document.createElement('p');
      p.textContent = 'Erro ao carregar os dados: ' + (err.message || err);
      p.style.color = 'crimson';
      container.appendChild(p);
    }
  }
}

// Inicia carregamento quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadProfile);
} else {
  loadProfile();
}
