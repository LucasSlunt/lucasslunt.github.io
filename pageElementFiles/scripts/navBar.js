function setupNavbar(rootPath, bgColour, itemColour) {
  // Create navbar container
  const navbar = document.createElement('div');
  navbar.id = 'navbar';
  navbar.style.backgroundColor = bgColour;
  navbar.style.borderColor = itemColour;

  // Define Icons
  // For PNGs we use the rootPath to ensure they load correctly from any page depth.
  // We reuse 'nav-svg' class for images to maintain consistent size and animation.
  const icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" class="nav-svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
    apple: '<svg viewBox="0 0 24 24" fill="none" class="nav-svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 1 2 2 2 5"/></svg>',
    github: `<img src="${rootPath}pageElementFiles/navbar_icons/github.png" class="nav-svg" alt="GitHub">`,
    linkedin: `<img src="${rootPath}pageElementFiles/navbar_icons/linkedin.png" class="nav-svg" alt="LinkedIn">`
  };

  // Define links
  const links = [
    { text: 'Home', icon: icons.home, href: rootPath + 'index.html' },
    { text: 'Apples', icon: icons.apple, href: rootPath + 'apples/index.html' },
    { text: 'Github', icon: icons.github, href: 'https://github.com/LucasSlunt', target: '_blank' },
    { text: 'LinkedIn', icon: icons.linkedin, href: 'https://www.linkedin.com/in/lucas-slunt-3a170a330/', target: '_blank' }
  ];

  // Create and append link elements
  links.forEach(link => {
    const a = document.createElement('a');
    a.className = 'navbar-item';
    a.href = link.href;

    if (link.target) {
      a.target = link.target;
    }

    // Apply styling for item background (using itemColour from args)
    a.style.backgroundColor = itemColour;

    // Inner HTML: Icon wrapper and Label wrapper
    a.innerHTML = `
            <div class="nav-icon-wrapper">${link.icon}</div>
            <span class="nav-label">${link.text}</span>
        `;

    navbar.appendChild(a);
  });

  // Insert navbar at the beginning of the body
  document.body.prepend(navbar);
}
