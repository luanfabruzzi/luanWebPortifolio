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