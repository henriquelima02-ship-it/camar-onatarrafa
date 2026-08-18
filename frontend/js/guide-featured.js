(function () {
  const featured = document.querySelectorAll('[data-featured-categories]');
  const filters = document.querySelectorAll('[data-guide-filter]');

  if (!featured.length || !filters.length) return;

  filters.forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.dataset.guideFilter;

      featured.forEach(card => {
        const categories = (card.dataset.featuredCategories || '').split(' ');
        card.classList.toggle(
          'hidden',
          selected !== 'all' && !categories.includes(selected)
        );
      });
    });
  });
})();
