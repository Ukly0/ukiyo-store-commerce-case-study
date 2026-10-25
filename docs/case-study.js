const steps = {
  discover: {
    wp: 'wordpress-catalogue', angular: 'angular-search',
    wpAlt: 'Original WooCommerce catalogue with product sorting and pagination.',
    angularAlt: 'Angular search results after typing Wave: The Great Wave project sample.',
    wpCaption: 'A familiar product grid and sorting control, populated with the six samples.',
    angularCaption: 'A narrower result set, produced by typing into the real search field.',
    title: 'From browsing pages to narrowing possibilities.',
    description: 'The Angular catalogue puts search beside a persistent filter rail. Typing “Wave” isolates The Great Wave from the six-sample collection. The behaviour is exercised in the actual application, not simulated in this presentation.',
  },
  choose: {
    wp: 'wordpress-product', angular: 'angular-product',
    wpAlt: 'Restored WooCommerce product page with The Great Wave sample, size M and colour White selected.',
    angularAlt: 'Latest reviewed Angular product component with The Great Wave sample, size M and colour White.',
    wpCaption: 'WooCommerce brings image, price and variation selectors together.',
    angularCaption: 'A custom product layout with explicit selectors and a bottom purchase action.',
    title: 'Make the selection part of the decision, not a surprise.',
    description: 'Both captures show the same project-supplied sample shirt and a real size and colour selection. The Angular interface changes the hierarchy and placement of the purchase action. Its visual character is preserved, including the oversized title — a tradeoff to revisit rather than retouch out of the evidence.',
  },
  review: {
    wp: 'wordpress-cart', angular: 'angular-cart',
    wpAlt: 'Actual WooCommerce guest cart containing the product added through its variation form.',
    angularAlt: 'Actual Angular cart containing the product persisted in the local Firebase emulator.',
    wpCaption: 'The selected product arrives in a real WooCommerce guest cart.',
    angularCaption: 'The Angular cart resolves the selected product and calculates the total.',
    title: 'A review step before an irreversible action.',
    description: 'These carts were populated through the applications’ own Add to Cart actions. The local Angular cart writes to Firebase’s database emulator; WordPress uses its own guest session. Payments are deliberately blocked, so these captures validate selection-to-cart, not a completed checkout or order.',
  },
};

const tabs = [...document.querySelectorAll('[data-step]')];
function selectStep(tab, focus = false) {
  const step = steps[tab.dataset.step];
  tabs.forEach(t => { t.setAttribute('aria-selected', String(t === tab)); t.tabIndex = t === tab ? 0 : -1; });
  document.querySelector('#journey-panel').setAttribute('aria-labelledby', tab.id);
  for (const [key, prefix] of [['wp', 'wp'], ['angular', 'angular']]) {
    const image = document.querySelector(`#journey-${prefix}`);
    image.src = `images/runtime/${step[key]}.webp`;
    image.alt = step[`${key}Alt`];
    const link = document.querySelector(`#journey-${prefix}-link`);
    link.href = `images/runtime/${step[key]}.png`;
    link.dataset.caption = `${step[`${key}Caption`]} ${key === 'angular' ? 'Latest reviewed Angular frontend on local Firebase.' : 'Restored WordPress storefront.'} Both use the existing project sample collection; products and prices are demo data.`;
    document.querySelector(`#journey-${prefix}-caption`).textContent = step[`${key}Caption`];
  }
  document.querySelector('#journey-title').textContent = step.title;
  document.querySelector('#journey-description').textContent = step.description;
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStep(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectStep(tabs[next], true); }
  });
});

const dialog = document.querySelector('#image-dialog');
let opener;
document.addEventListener('click', event => {
  const link = event.target.closest('[data-lightbox]');
  if (!link || !dialog.showModal || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  opener = link;
  const source = link.querySelector('img');
  const image = document.querySelector('#dialog-image');
  image.src = link.href;
  image.alt = source?.alt || '';
  document.querySelector('#image-caption').textContent = link.dataset.caption || source?.alt || '';
  document.querySelector('#original-link').href = link.href;
  dialog.showModal();
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => opener?.focus());

const chapterLinks = [...document.querySelectorAll('.chapter-nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.find(entry => entry.isIntersecting);
    if (!visible) return;
    chapterLinks.forEach(link => {
      if (link.hash === `#${visible.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
  chapterLinks.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
}
