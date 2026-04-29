import { auth, onAuthStateChanged, signOut } from './firebaseConfig.js';

document.addEventListener('DOMContentLoaded', () => {
  // Auth State Listener
  const loginLink = document.getElementById('loginLink');
  if (loginLink) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        loginLink.textContent = "Logout";
        loginLink.href = "#";
        loginLink.addEventListener('click', async (e) => {
          e.preventDefault();
          try {
            await signOut(auth);
            alert("Logged out successfully");
            window.location.reload();
          } catch (err) {
            console.error(err);
          }
        });
      } else {
        loginLink.textContent = "Login";
        loginLink.href = "Signup.html";
      }
    });
  }

  // Dropdown
  const dropdown = document.querySelector('.dropdown');
  const toggle = document.querySelector('.dropdown-toggle');
  const menu = document.querySelector('.dropdown-menu');
  function setOpen(state){
    dropdown?.classList.toggle('open', state);
    toggle?.setAttribute('aria-expanded', String(state));
  }
  toggle?.addEventListener('click', (e)=>{
    e.stopPropagation(); setOpen(!dropdown.classList.contains('open'));
  });
  document.addEventListener('click', ()=> setOpen(false));
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') setOpen(false); });

  // Hover light for buttons
  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('pointermove', (e)=>{
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--x', `${e.clientX - r.left}px`);
      btn.style.setProperty('--y', `${e.clientY - r.top}px`);
    });
  });

  // Reveal on scroll
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('is-visible'); io.unobserve(en.target);} });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

  // Search form logic
  const form = document.getElementById('searchForm');
  const from = document.getElementById('from');
  const to = document.getElementById('to');
  const date = document.getElementById('date');
  const quota = document.getElementById('quota');
  const cls = document.getElementById('class');
  const errors = document.querySelector('.form-errors');
  const swap = document.querySelector('.swap');

  // min date = today
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = `${today.getMonth()+1}`.padStart(2,'0');
  const dd = `${today.getDate()}`.padStart(2,'0');
  date.min = `${yyyy}-${mm}-${dd}`;

  swap?.addEventListener('click', ()=>{
    const a = from.value;
    from.value = to.value;
    to.value = a;
    from.focus();
  });

  const stationRegex = /^[A-Za-z\s()\-.,]{3,}$/;

  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    errors.textContent = '';

    let valid = true;
    if(!stationRegex.test(from.value.trim())) { valid=false; }
    if(!stationRegex.test(to.value.trim())) { valid=false; }
    if(!date.value) { valid=false; }

    if(!valid){
      errors.textContent = 'Please enter valid From/To stations (e.g., Mumbai (CSTM)) and a journey date.';
      return;
    }

    // Demo navigate (replace with your results page / API call)
    const params = new URLSearchParams({
      from: from.value.trim(),
      to: to.value.trim(),
      date: date.value,
      class: cls.value,
      quota: quota.value
    });
    window.location.href = `RESERVATIONS.html?${params.toString()}`;
  });

  // Newsletter mock
  const nlBtn = document.getElementById('nlBtn');
  const nlInput = document.getElementById('nl');
  const nlMsg = document.getElementById('nlMsg');
  nlBtn?.addEventListener('click', ()=>{
    const val = (nlInput?.value || '').trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    nlMsg.textContent = ok ? 'Subscribed! 🎉' : 'Enter a valid email to subscribe.';
    nlMsg.style.color = ok ? '#86efac' : '#fecaca';
  });
});