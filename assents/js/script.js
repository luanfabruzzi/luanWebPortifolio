/* CURSOR */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
(function loop(){
    rx += (mx-rx)*.18; ry += (my-ry)*.18;
    cursor.style.left = mx+'px'; cursor.style.top = my+'px';
    ring.style.left   = rx+'px'; ring.style.top  = ry+'px';
    requestAnimationFrame(loop);
})();
document.querySelectorAll('a,button,.stack-chip').forEach(el=>{
    el.addEventListener('mouseenter',()=>{
        cursor.style.transform='translate(-50%,-50%) scale(1.8)';
        ring.style.width='56px'; ring.style.height='56px';
        ring.style.borderColor='rgba(0,255,136,.8)';
    });
    el.addEventListener('mouseleave',()=>{
        cursor.style.transform='translate(-50%,-50%) scale(1)';
        ring.style.width='38px'; ring.style.height='38px';
        ring.style.borderColor='var(--accent)';
    });
});

/* SCROLL PROGRESS */
const bar = document.getElementById('progress');
window.addEventListener('scroll', ()=>{
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct+'%';
});

/* NAV DRAWER */
const navToggle = document.getElementById('navToggle');
const navDrawer = document.getElementById('navDrawer');
const navClose = document.getElementById('navClose');
const navMask = document.getElementById('navMask');

function closeNav() {
    if (navDrawer) navDrawer.classList.remove('open');
    if (navMask) navMask.classList.remove('visible');
    if (navDrawer) navDrawer.setAttribute('aria-hidden', 'true');
}

function openNav() {
    if (navDrawer) navDrawer.classList.add('open');
    if (navMask) navMask.classList.add('visible');
    if (navDrawer) navDrawer.setAttribute('aria-hidden', 'false');
}

if (navToggle) {
    navToggle.addEventListener('click', openNav);
}
if (navClose) {
    navClose.addEventListener('click', closeNav);
}
if (navMask) {
    navMask.addEventListener('click', closeNav);
}

const navLinks = document.querySelectorAll('.nav-drawer .nav-links a');
if (navLinks.length) {
    navLinks.forEach(link => link.addEventListener('click', closeNav));
}

/* WHATSAPP FORM */
const whatsappTarget = '5511963081053'; // substitua pelo seu número com DDI+DDD
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', e => {
        e.preventDefault();

        const name = document.getElementById('clientName').value.trim();
        const role = document.getElementById('clientRole').value.trim();
        const project = document.getElementById('projectName').value.trim();
        const type = document.getElementById('projectType').value;
        const description = document.getElementById('projectDescription').value.trim();

        if (!name || !role || !project || !type || !description) {
            alert('Por favor, preencha todos os campos antes de enviar.');
            return;
        }

        const message = `Olá Luan! Gostaria de solicitar um orçamento para o meu projeto. Seguem os detalhes:
*Nome / Empresa:* ${name}
*Cargo / Função:* ${role}
*Projeto:* ${project}
*Tipo:* ${type}
*Descrição:* ${description}`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappTarget}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}

/* ACCORDION */
document.querySelectorAll('.acc-trigger').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        const expanded = btn.getAttribute('aria-expanded')==='true';
        // Close siblings
        btn.closest('.edu-group').querySelectorAll('.acc-trigger').forEach(b=>{
            b.setAttribute('aria-expanded','false');
            b.nextElementSibling.classList.remove('open');
        });
        if(!expanded){
            btn.setAttribute('aria-expanded','true');
            btn.nextElementSibling.classList.add('open');
        }
    });
});

/* REVEAL ON SCROLL */
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
        if(e.isIntersecting){
            setTimeout(()=>e.target.classList.add('visible'), i*80);
            obs.unobserve(e.target);
        }
    });
},{ threshold:.12 });
reveals.forEach(el=>obs.observe(el));