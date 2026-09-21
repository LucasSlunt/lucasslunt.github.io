document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.apple-guide').forEach((page) => {
        const toggle = page.querySelector('.sidebar-toggle');

        toggle.addEventListener('click', () => {
            const isCollapsed = page.classList.toggle('is-sidebar-collapsed');
            toggle.setAttribute('aria-expanded', String(!isCollapsed));
            toggle.setAttribute('aria-label', isCollapsed ? 'Open page menu' : 'Collapse page menu');
        });
    });
});