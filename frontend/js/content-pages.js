(function () {
  const DB = 'camarao_tarrafa_content_db';
  const VERSION = 1;
  const STORE = 'contents';

  const seed = [
    {
      id: 'local_piacaguera',
      title: 'Piaçaguera',
      destination: 'guia',
      category: 'local',
      authorGroup: 'Guia Turístico — conteúdo revisado',
      summary: 'Comunidade pesqueira de Paranaguá, em frente à Ilha da Cotinga, com forte relação com a pesca artesanal, a cultura caiçara e o turismo de base comunitária.',
      bodyText: 'Conheça a comunidade, o trapiche, a escola do campo, a igreja e o sambaqui, além das trilhas e conexões com outras comunidades caiçaras.',
      keywords: ['Piaçaguera', 'comunidade caiçara', 'turismo'],
      status: 'published',
      url: './locais/piacaguera.html'
    },
    {
      id: 'local_amparo',
      title: 'Amparo',
      destination: 'guia',
      category: 'local',
      authorGroup: 'Guia Turístico — conteúdo revisado',
      summary: 'Comunidade tradicional de Paranaguá, conhecida como Ilha do Amparo, marcada pela pesca artesanal, festas, educação do campo e vida comunitária.',
      bodyText: 'Conheça o trapiche, as escolas, a cozinha comunitária, as festas, a igreja sobre sambaqui, o Rio das Ostras e os caminhos usados pelos moradores.',
      keywords: ['Amparo', 'pesca artesanal', 'comunidade'],
      status: 'published',
      url: './locais/amparo.html'
    },
    {
      id: 'historia_piacaguera',
      title: 'História de Piaçaguera',
      destination: 'guia',
      category: 'historia',
      authorGroup: 'Conteúdo histórico revisado',
      summary: 'Da ocupação pré-colonial e dos sambaquis aos contatos coloniais na Baía de Paranaguá, à formação das comunidades costeiras e à memória ambiental do navio Vicuña.',
      bodyText: 'Texto organizado por tempos históricos, com distinção entre fatos documentados especificamente em Piaçaguera e acontecimentos do contexto regional da Baía de Paranaguá.',
      keywords: ['história', 'território', 'memória'],
      status: 'published',
      url: './conteudos/historia-piacaguera.html'
    },
    {
      id: 'igreja_sambaqui_piacaguera',
      title: 'Igreja e sambaqui de Piaçaguera',
      destination: 'guia',
      category: 'historia',
      authorGroup: 'Patrimônio e arqueologia — conteúdo revisado',
      summary: 'O conjunto formado pela igreja católica e pelo sambaqui de Piaçaguera, com revisão crítica das informações históricas, arqueológicas e ambientais.',
      bodyText: 'A página confirma o que está documentado, separa pontos ainda em pesquisa e esclarece a confusão com o Sambaqui de Piaçaguera de Cubatão, em São Paulo.',
      keywords: ['igreja', 'sambaqui', 'patrimônio'],
      status: 'published',
      url: './conteudos/igreja-sambaqui-piacaguera.html'
    },
    {
      id: 'gastronomia_piacaguera_amparo',
      title: 'Gastronomia de Piaçaguera e Amparo',
      destination: 'guia',
      category: 'gastronomia',
      authorGroup: 'Gastronomia caiçara — conteúdo revisado',
      summary: 'Café caiçara, cozinha comunitária, frutos do mar, Festa do Camarão e preparos documentados nas comunidades de Piaçaguera e Amparo.',
      bodyText: 'A página diferencia pratos confirmados por documentos e registros locais de receitas que ainda precisam ser documentadas diretamente com cozinheiras, pescadores e famílias.',
      keywords: ['gastronomia', 'café caiçara', 'camarão'],
      status: 'published',
      url: './conteudos/gastronomia-piacaguera-amparo.html'
    },
    {
      id: 'fauna_flora_piacaguera',
      title: 'Fauna e flora de Piaçaguera',
      destination: 'guia',
      category: 'fauna',
      authorGroup: 'Conteúdo de biodiversidade revisado',
      summary: 'Manguezais, Mata Atlântica, fauna marinha e terrestre, espécies ameaçadas e espécies exóticas registradas no Complexo Estuarino de Paranaguá.',
      bodyText: 'O conteúdo diferencia registros locais, ocorrências regionais e espécies que ainda precisam de confirmação em pesquisa de campo.',
      keywords: ['fauna', 'flora', 'biodiversidade'],
      status: 'published',
      url: './conteudos/fauna-flora-piacaguera.html'
    },
    {
      id: 'fauna_flora_piacaguera_flora',
      title: 'Fauna e flora de Piaçaguera',
      destination: 'guia',
      category: 'flora',
      authorGroup: 'Conteúdo de biodiversidade revisado',
      summary: 'Manguezais, Mata Atlântica, fauna marinha e terrestre, espécies ameaçadas e espécies exóticas registradas no Complexo Estuarino de Paranaguá.',
      bodyText: 'O conteúdo diferencia registros locais, ocorrências regionais e espécies que ainda precisam de confirmação em pesquisa de campo.',
      keywords: ['fauna', 'flora', 'biodiversidade'],
      status: 'published',
      url: './conteudos/fauna-flora-piacaguera.html'
    },
    {
      id: 'seed_saberes',
      title: 'Conteúdo de exemplo de Saberes e Ciência',
      destination: 'saberes',
      category: 'ciencia',
      authorGroup: 'Exemplo demonstrativo',
      summary: 'Espaço para biodiversidade, marés, qualidade do pescado, sustentabilidade e saberes tradicionais.',
      bodyText: 'Cadastre materiais produzidos pelos estudantes e publique somente após revisão.',
      keywords: ['ciência', 'saberes'],
      status: 'published'
    },
    {
      id: 'seed_pesquisas',
      title: 'Pesquisa estudantil de exemplo',
      destination: 'pesquisas',
      category: 'historia',
      authorGroup: 'Grupo responsável',
      summary: 'Exemplo de como uma pesquisa selecionada poderá aparecer na biblioteca pública depois da curadoria.',
      bodyText: 'Prefira identificar trabalhos por turma ou grupo responsável.',
      keywords: ['pesquisa', 'memória'],
      status: 'published'
    }
  ];

  function openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB, VERSION);

      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: 'id' });
          store.createIndex('status', 'status', { unique: false });
          store.createIndex('destination', 'destination', { unique: false });
        }
      };

      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function all() {
    try {
      const db = await openDB();
      return await new Promise((resolve, reject) => {
        const request = db.transaction(STORE, 'readonly').objectStore(STORE).getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      return [];
    }
  }

  async function published() {
    return [...seed, ...(await all()).filter(item => item.status === 'published')];
  }

  function card(item) {
    const keywords = (item.keywords || [])
      .slice(0, 2)
      .map(keyword => `<span class="tag">${esc(keyword)}</span>`)
      .join('');

    const details = item.bodyText
      ? `<details><summary>Ler resumo ampliado</summary><p>${esc(item.bodyText)}</p></details>`
      : '';

    const link = item.url
      ? `<a class="btn btn-secondary content-link" href="${esc(item.url)}">Ler conteúdo completo</a>`
      : '';

    return `
      <article class="content-card">
        <div class="meta">
          <span class="tag">${label(item.category)}</span>
          ${keywords}
        </div>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.summary)}</p>
        <small>${esc(item.authorGroup || 'Conteúdo revisado')}</small>
        ${details}
        ${link}
      </article>
    `;
  }

  async function renderGuide() {
    const grid = document.getElementById('guideGrid');
    if (!grid) return;

    const items = (await published()).filter(item => item.destination === 'guia');
    let filter = 'all';

    function draw() {
      const visible = items.filter(item => filter === 'all' || item.category === filter);
      grid.innerHTML = visible.map(card).join('');
      document.getElementById('guideEmpty').classList.toggle('hidden', visible.length !== 0);
    }

    document.querySelectorAll('[data-guide-filter]').forEach(button => {
      button.addEventListener('click', () => {
        filter = button.dataset.guideFilter;
        document.querySelectorAll('[data-guide-filter]').forEach(item => {
          item.classList.toggle('active', item === button);
        });
        draw();
      });
    });

    draw();
  }

  async function renderSaberes() {
    const grid = document.getElementById('knowledgeGrid');
    if (!grid) return;

    const items = (await published()).filter(item => item.destination === 'saberes');
    grid.innerHTML = items.map(card).join('');
    document.getElementById('knowledgeEmpty').classList.toggle('hidden', items.length !== 0);
  }

  async function renderPesquisas() {
    const grid = document.getElementById('researchGrid');
    if (!grid) return;

    const search = document.getElementById('researchSearch');
    const category = document.getElementById('researchCategory');
    const items = (await published()).filter(item => item.destination === 'pesquisas');

    function draw() {
      const query = (search.value || '').toLowerCase();
      const selectedCategory = category.value;

      const visible = items.filter(item => {
        const searchableText = [
          item.title,
          item.summary,
          item.bodyText,
          (item.keywords || []).join(' ')
        ].join(' ').toLowerCase();

        return (
          (!query || searchableText.includes(query)) &&
          (selectedCategory === 'all' || item.category === selectedCategory)
        );
      });

      grid.innerHTML = visible.map(card).join('');
      document.getElementById('researchEmpty').classList.toggle('hidden', visible.length !== 0);
    }

    search.addEventListener('input', draw);
    category.addEventListener('change', draw);
    draw();
  }

  function label(value) {
    return ({
      trilha: 'Trilha',
      local: 'Local',
      gastronomia: 'Gastronomia',
      historia: 'História e memória',
      fauna: 'Fauna',
      flora: 'Flora',
      cultura: 'Cultura',
      ciencia: 'Ciência e Natureza',
      pesca: 'Pesca artesanal',
      turismo: 'Turismo'
    })[value] || value;
  }

  function esc(value) {
    return String(value || '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[char]);
  }

  renderGuide();
  renderSaberes();
  renderPesquisas();
})();
