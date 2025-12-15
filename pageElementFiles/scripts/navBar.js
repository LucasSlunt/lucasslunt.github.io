function setupNavbar(rootPath, bgColour, itemColour) {
  // Create navbar container
  const navbar = document.createElement('div');
  navbar.id = 'navbar';
  navbar.style.backgroundColor = bgColour;
  navbar.style.borderColor = itemColour;

  // Define links
  const links = [
    { text: 'Home', href: rootPath + 'index.html' },
    { text: 'Apples', href: rootPath + 'pages/apples/apples.html' },
    { text: 'Github', href: 'https://github.com/LucasSlunt', target: '_blank' },
    { text: 'LinkedIn', href: 'https://www.linkedin.com/in/lucas-slunt-3a170a330/', target: '_blank' }
  ];

  // Create and append link elements
  links.forEach(link => {
    const a = document.createElement('a');
    a.className = 'navbar-item';
    a.href = link.href;
    a.textContent = link.text;

    if (link.target) {
      a.target = link.target;
    }

    // Apply styling
    a.style.backgroundColor = itemColour;

    navbar.appendChild(a);
  });

  // Insert navbar at the beginning of the body
  document.body.prepend(navbar);
}
