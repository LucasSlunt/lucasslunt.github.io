function buildSidebar({ rootPath, activePage, pages }) {
  const sidebar = document.createElement('aside');
  sidebar.className = 'apple-page-sidebar';
  sidebar.setAttribute('aria-label', 'Apple pages');

  const toggle = document.createElement('button');
  toggle.className = 'sidebar-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-controls', 'apple-page-menu');
  toggle.innerHTML = '<span class="sidebar-toggle-icon" aria-hidden="true">&#9776;</span><span class="sidebar-toggle-label">Pages</span>';

  const menu = document.createElement('nav');
  menu.id = 'apple-page-menu';
  menu.className = 'apple-page-menu';
  menu.setAttribute('aria-label', 'Page menu');

  pages.forEach((page) => {
    const link = document.createElement('a');
    link.className = 'apple-page-menu-link';
    link.href = page.href;
    link.textContent = page.label;
    if (page.id === activePage) {
      link.classList.add('is-active');
    }
    menu.appendChild(link);
  });

  toggle.addEventListener('click', () => {
    const isCollapsed = sidebar.classList.toggle('is-sidebar-collapsed');
    toggle.setAttribute('aria-expanded', String(!isCollapsed));
    toggle.setAttribute('aria-label', isCollapsed ? 'Open page menu' : 'Collapse page menu');
  });

  sidebar.append(toggle, menu);
  return sidebar;
}

function setupSidebar(rootPath, activePage) {
  const pages = [
    { id: 'index', label: 'Index', href: `${rootPath}index.html` },
    { id: 'similarity-graph', label: 'Similarity graph', href: `${rootPath}similarity-graph.html` }
  ];

  const sidebar = buildSidebar({ rootPath, activePage, pages });
  document.body.appendChild(sidebar);
}

function initializeApplePageBootstrap() {
  if (!document.body || !document.body.dataset.page) {
    return;
  }

  if (typeof setupNavbar === 'function') {
    if (document.body.dataset.page === 'apple-index') {
      setupNavbar('../', '#cee89d', '#e6f8bf');
    }
    if (document.body.dataset.page === 'similarity-graph') {
      setupNavbar('../', '#cee89d', '#e6f8bf');
    }
  }

  if (typeof setupSidebar === 'function') {
    if (document.body.dataset.page === 'apple-index') {
      const existingSidebar = document.querySelector('.apple-page-sidebar');
      if (!existingSidebar) {
        setupSidebar('./', 'index');
      }
    }

    if (document.body.dataset.page === 'similarity-graph') {
      const existingSidebar = document.querySelector('.apple-page-sidebar');
      if (!existingSidebar) {
        setupSidebar('./', 'similarity-graph');
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', initializeApplePageBootstrap);