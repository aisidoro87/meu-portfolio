document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initTypingAnimation();
    initMobileMenu();
    initResumeTabs();
    initPortfolioFilter();
    initContactForm();
    initScrollActive();
    initAndersonAI();

});

/* DYNAMIC TYPING ANIMATION */
function initTypingAnimation() {
    const element = document.querySelector('.digitando');
    if (!element) return;

    const phrases = ["Desenvolvedor Front-end", "Freelancer", "Criador de Soluções", "Entusiasta de Tecnologia"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            element.innerText = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.innerText = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = 100;

        if (isDeleting) {
            typingSpeed /= 2; // erase twice as fast
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* MOBILE BURGER MENU */
function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.navegacao-primaria');
    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', !expanded);
        navMenu.classList.toggle('ativado');

        const icon = toggleBtn.querySelector('i');
        if (navMenu.classList.contains('ativado')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('ativado');
            toggleBtn.querySelector('i').className = 'fa-solid fa-bars';
        });
    });
}

/* RESUME TIMELINE SLIDESHOW SWITCHER */
function initResumeTabs() {
    const resumeBlocks = document.querySelectorAll('.resume_block');

    resumeBlocks.forEach(block => {
        const slides = block.querySelectorAll('.resume_slide');
        const dots = block.querySelectorAll('.resume_dots li');

        if (slides.length > 0 && dots.length > 0) {
            // Reset active states
            slides.forEach(s => s.classList.remove('ativo'));
            dots.forEach(d => d.classList.remove('ativo'));

            // Activate first slide
            slides[0].classList.add('ativo');
            dots[0].classList.add('ativo');
        }

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const targetIndex = parseInt(dot.getAttribute('data-index'), 10);

                slides.forEach(s => s.classList.remove('ativo'));
                dots.forEach(d => d.classList.remove('ativo'));

                if (slides[targetIndex]) {
                    slides[targetIndex].classList.add('ativo');
                }
                dot.classList.add('ativo');
            });
        });
    });
}

/* PORTFOLIO GRID FILTERING */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.project_navegacao li');
    const projectCards = document.querySelectorAll('.projects_armazenamento .project-card');

    // Initially show all
    projectCards.forEach(card => card.classList.add('ativo'));

    filterButtons.forEach(btn => {
        // Keyboard support for interactive li elements
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });

        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.add('ativo');
                } else {
                    card.classList.remove('ativo');
                }
            });
        });
    });
}

/* CONTACT FORM HANDLER WITH FEEDBACK SCREEN */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerText;

        // Show loading spinner / state
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending…'; // Vercel rule: end with ellipsis

        // Mock server POST request
        setTimeout(() => {
            submitBtn.innerText = 'Sent!';
            form.reset();

            // Create nice feedback toast
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'polite');

            // Style properties directly (avoid layout shifts)
            Object.assign(toast.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: 'rgba(76, 175, 80, 0.95)',
                color: '#fff',
                padding: '15px 30px',
                borderRadius: '8px',
                zIndex: '10000',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: '500',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease'
            });

            toast.innerText = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
            document.body.appendChild(toast);

            // Clear toast after 4 seconds
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    toast.remove();
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                }, 300);
            }, 4000);

        }, 1500);
    });
}

/* INTERACTIVE ACTIVE HEADER LINK SPOTTER ON SCROLL */
function initScrollActive() {
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('header .navegacao-primaria li a');
    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Compensate for fixed header height offset
            if (window.scrollY >= (sectionTop - 130)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('ativo');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('ativo');
            }
        });
    });
}

/* ANDERSON AI - CHAT INTERACTION */
function initAndersonAI() {
    const toggleBtn = document.querySelector('#ai-toggle');
    const chat = document.querySelector('#ai-chat');
    const closeBtn = document.querySelector('#ai-close');
    const input = document.querySelector('#ai-input');
    const welcomeMessage = document.querySelector('#ai-welcome');
    const form = document.querySelector('#ai-form');
    const messages = document.querySelector('#ai-messages');

    if (
        !toggleBtn ||
        !chat ||
        !closeBtn ||
        !input ||
        !welcomeMessage ||
        !form ||
        !messages
    ) {
        return;
    }

    const welcomeText = `Olá! 👋

Sou o Anderson AI. Posso responder perguntas sobre o Anderson, seus projetos, tecnologias e experiência profissional.`;

    let typingStarted = false;

    function typeWelcomeMessage() {
        if (typingStarted) return;

        typingStarted = true;

        let index = 0;

        function type() {
            if (index < welcomeText.length) {
                if (welcomeText[index] === '\n') {
                    welcomeMessage.innerHTML += '<br>';
                } else {
                    welcomeMessage.innerHTML += welcomeText[index];
                }

                index++;

                setTimeout(type, 25);
            }
        }

        type();
    }

    function toggleChat() {
        const isOpen = chat.classList.toggle('ativo');

        chat.setAttribute('aria-hidden', !isOpen);

        if (isOpen) {
            input.focus();
            typeWelcomeMessage();
        }
    }

    function showTypingIndicator() {
        const typing = document.createElement('div');

        typing.classList.add('ai-typing');

        typing.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        messages.appendChild(typing);

        messages.scrollTop = messages.scrollHeight;

        return typing;
    }

    toggleBtn.addEventListener('click', toggleChat);

    closeBtn.addEventListener('click', () => {
        chat.classList.remove('ativo');
        chat.setAttribute('aria-hidden', 'true');
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const question = input.value.trim();

        if (!question) return;

        // Mensagem do usuário
        const userMessage = document.createElement('div');

        userMessage.classList.add(
            'ai-message',
            'ai-message-user'
        );

        userMessage.textContent = question;

        messages.appendChild(userMessage);

        input.value = '';
        input.focus();

        messages.scrollTop = messages.scrollHeight;

        // Indicador de carregamento
        const typingIndicator = showTypingIndicator();

        try {
            // Envia a pergunta para o backend
            const response = await fetch('/api/chat', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    message: question
                })
            });

            const data = await response.json();

            // Remove o indicador
            typingIndicator.remove();

            // Verifica se o backend retornou erro
            if (!response.ok) {
                throw new Error(
                    data.error || 'Erro ao obter resposta da IA.'
                );
            }

            // Cria a mensagem da IA
            const botMessage = document.createElement('div');

            botMessage.classList.add(
                'ai-message',
                'ai-message-bot'
            );

            botMessage.textContent = data.response;

            messages.appendChild(botMessage);

            messages.scrollTop = messages.scrollHeight;

        } catch (error) {

            console.error('Erro no Anderson AI:', error);

            typingIndicator.remove();

            const botMessage = document.createElement('div');

            botMessage.classList.add(
                'ai-message',
                'ai-message-bot'
            );

            botMessage.textContent =
                'Desculpe, não consegui processar sua pergunta no momento. 😕';

            messages.appendChild(botMessage);

            messages.scrollTop = messages.scrollHeight;
        }
    });
}