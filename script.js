'use strict';
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
    menu.classList.toggle('open', !expanded);
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  }));
}
document.getElementById('year').textContent = new Date().getFullYear();
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');
const prepared = document.getElementById('prepared-message');
const copy = document.getElementById('copy-message');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = document.getElementById('nome').value.trim();
  const service = document.getElementById('servico').value;
  const details = document.getElementById('mensagem').value.trim();
  if (!name || !service || !details) return;
  prepared.textContent = `Olá! Meu nome é ${name}.\nGostaria de solicitar um orçamento para: ${service}.\nDetalhes: ${details}`;
  result.hidden = false;
  copy.textContent = 'Copiar mensagem';
  result.scrollIntoView({behavior:'smooth',block:'nearest'});
});
copy.addEventListener('click', async () => {
  const content = prepared.textContent;
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(content);
    else {
      const temp = document.createElement('textarea');
      temp.value = content; temp.style.position='fixed'; temp.style.opacity='0';
      document.body.appendChild(temp); temp.select();
      if (!document.execCommand('copy')) throw new Error('Cópia indisponível');
      temp.remove();
    }
    copy.textContent = 'Mensagem copiada!';
  } catch {
    copy.textContent = 'Selecione e copie o texto acima';
  }
});
