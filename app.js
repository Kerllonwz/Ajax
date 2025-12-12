async function loadProfile() {
  // Nome de usuário do GitHub para buscar os dados
  const githubUsername = 'ogiansouza';
  
  try {
    // Requisição para a API do GitHub
    const res = await fetch(`https://api.github.com/users/${githubUsername}`);
    if (!res.ok) throw new Error('Resposta não OK: ' + res.status);
    const data = await res.json();

    const avatar = document.querySelector('.profile-avatar');
    const nameEl = document.querySelector('.profile-name');
    const usernameEl = document.querySelector('.profile-username');
    const reposEl = document.getElementById('repos-count');
    const followersEl = document.getElementById('followers-count');
    const followingEl = document.getElementById('following-count');
    const profileLink = document.getElementById('profile-link');

    // Mapeando os dados da API do GitHub para os elementos da página
    if (avatar) avatar.src = data.avatar_url || avatar.src;
    if (nameEl) nameEl.textContent = data.name || data.login || '';
    if (usernameEl) usernameEl.textContent = data.login ? '@' + data.login : '';
    if (reposEl) reposEl.textContent = data.public_repos != null ? data.public_repos : '-';
    if (followersEl) followersEl.textContent = data.followers != null ? data.followers : '-';
    if (followingEl) followingEl.textContent = data.following != null ? data.following : '-';
    if (profileLink) {
      profileLink.href = data.html_url || '#';
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
