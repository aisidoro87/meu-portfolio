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

    function closeMenu() {
        toggleBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('ativado');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('ativado');

        const icon = toggleBtn.querySelector('i');
        if (navMenu.classList.contains('ativado')) {
            if (icon) icon.className = 'fa-solid fa-xmark';
        } else {
            if (icon) icon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('ativado') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('ativado')) {
            closeMenu();
        }
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

/* PORTFOLIO DATA & DYNAMIC MODAL SYSTEM */
const PORTFOLIO_PROJECTS = [
    {
        id: "medcare-connect",
        nome: "MedCare Connect",
        categoria: "em-andamento",
        categoriaRotulo: "Em andamento",
        descricao: "Plataforma web para agendamento de consultas médicas e integração de cuidados de saúde.",
        imagem: "imgs/logotipo_mc.png",
        tecnologias: ["React", "TypeScript", "TailwindCSS", "Supabase"],
        demo: "https://medcare-connect.vercel.app/",
        github: "https://github.com/aisidoro87/medcare-connect",
        detalhes: {
            visaoGeral: {
                oQueE: "O MedCare Connect é uma aplicação web moderna voltada para a área da saúde, desenvolvida para conectar pacientes a médicos e clínicas, facilitando a gestão de agendamentos e informações médicas.",
                problemaResolvido: [
                    "Burocracia e demora no agendamento de consultas médicas presenciais.",
                    "Falta de um canal centralizado e intuitivo para escolha de especialidades e médicos disponíveis em tempo real."
                ],
                funcionalidades: [
                    "Busca e filtragem de médicos por especialidade e localização",
                    "Agendamento de consultas online em poucos cliques",
                    "Cadastro completo de pacientes e acompanhamento de perfil",
                    "Interface responsiva com foco em acessibilidade e usabilidade médica"
                ]
            },
            arquitetura: {
                stack: [
                    { label: "Front-end", value: "React + TypeScript + Vite" },
                    { label: "Estilização", value: "TailwindCSS (Design System Médico)" },
                    { label: "Back-end & DB", value: "Supabase (PostgreSQL + Auth)" },
                    { label: "Deploy", value: "Vercel" }
                ],
                decisoes: [
                    "React e TypeScript garantem alta tipagem e prevenção de erros em dados sensíveis de saúde.",
                    "Supabase proporciona autenticação segura e persistência em banco relacional PostgreSQL com RLS.",
                    "Componentização focada em reutilização e performance de carregamento."
                ]
            }
        }
    },
    {
        id: "kallos-barbearia",
        nome: "Kallos Barbearia",
        categoria: "em-andamento",
        categoriaRotulo: "Em andamento",
        descricao: "Sistema inteligente de agendamento online de serviços e horários para barbearias.",
        imagem: "imgs/kallos_icon.png",
        tecnologias: ["React", "TypeScript", "Vite", "CSS Modules"],
        demo: "https://kallos-appointment-booker.vercel.app/",
        github: "https://github.com/aisidoro87/kallos-appointment-booker",
        detalhes: {
            visaoGeral: {
                oQueE: "O Kallos Appointment Booker é uma solução de agendamento em tempo real pensada para barbearias modernas, otimizando o fluxo de atendimento e a gestão de horários.",
                problemaResolvido: [
                    "Agenda de papel ou WhatsApp que geram choques de horários e perda de clientes.",
                    "Falta de visibilidade imediata dos serviços oferecidos e disponibilidade dos barbeiros."
                ],
                funcionalidades: [
                    "Seleção de barbeiro e serviços (cabelo, barba, tratamentos)",
                    "Escolha de data e horário dinâmicos sem sobreposição de agenda",
                    "Confirmação imediata com resumo do agendamento",
                    "Design focado na experiência mobile do cliente"
                ]
            },
            arquitetura: {
                stack: [
                    { label: "Front-end", value: "React + TypeScript" },
                    { label: "Gerenciador", value: "Vite + React Context API" },
                    { label: "Estilos", value: "CSS Modules / Modern Vanilla CSS" },
                    { label: "Deploy", value: "Vercel" }
                ],
                decisoes: [
                    "Algoritmo de checagem de horários no front-end impedindo agendamentos duplicados.",
                    "Interface responsiva otimizada para smartphones (mobile-first)."
                ]
            }
        }
    },
    {
        id: "dashboard-sst",
        nome: "Dashboard Segurança do Trabalho",
        categoria: "em-andamento",
        categoriaRotulo: "Em andamento",
        descricao: "SaaS para gestão de Segurança e Saúde do Trabalho (SST) com indicadores e suporte à IA.",
        imagem: "imgs/logotipo_tst.png",
        tecnologias: ["React", "TypeScript", "Supabase", "Recharts", "IA API"],
        demo: "https://saudeocupacional-dashboard.vercel.app/",
        github: "https://github.com/aisidoro87/saude-ocupacional",
        detalhes: {
            visaoGeral: {
                oQueE: "Um ecossistema SaaS completo desenvolvido para profissionais e empresas de SST, unindo gestão de ASOs, exames, treinamentos de NRs e gráficos analíticos com auxílio de Inteligência Artificial.",
                problemaResolvido: [
                    "Complexidade na gestão manual de conformidade de NRs e controle de vencimentos de exames ocupacionais.",
                    "Falta de dashboards gerenciais claros para tomadas de decisão rápidas na prevenção de acidentes."
                ],
                funcionalidades: [
                    "Painel interativo de indicadores (ASOs vencidos, pendentes e treinamentos)",
                    "Gráficos em tempo real com estatísticas de saúde ocupacional",
                    "Módulo de assistência e automação via IA para elaboração de relatórios",
                    "Controle de perfis e permissões por empresa e unidade"
                ]
            },
            arquitetura: {
                stack: [
                    { label: "Front-end", value: "React + TypeScript + Recharts" },
                    { label: "Back-end", value: "Supabase (PostgreSQL + RLS)" },
                    { label: "Inteligência Artificial", value: "Antigravity Gemini CLI / OpenAI APIs" },
                    { label: "Deploy", value: "Vercel" }
                ],
                decisoes: [
                    "União de 17+ anos de experiência na área de SST com desenvolvimento web moderno.",
                    "Uso do Recharts para renderização fluida de dados estatísticos complexos.",
                    "Integração com Supabase Auth e Banco Relacional para alta performance e segurança."
                ]
            }
        }
    },
    {
        id: "buscar-clima",
        nome: "Buscar Clima & Tempo",
        categoria: "concluidos",
        categoriaRotulo: "Concluído",
        descricao: "Aplicação meteorológica com consulta em tempo real e previsão detalhada para cidades.",
        imagem: "imgs/busca_clima.png",
        tecnologias: ["JavaScript", "HTML5", "CSS3", "OpenWeather API"],
        demo: "https://buscar-clima-tempo.vercel.app/",
        github: "https://github.com/aisidoro87/clima-tempo",
        detalhes: {
            visaoGeral: {
                oQueE: "Aplicação web interativa para consulta de dados meteorológicos globais em tempo real, fornecendo informações precisas sobre temperatura, umidade, vento e condições do tempo.",
                problemaResolvido: [
                    "Necessidade de uma ferramenta leve e direta para checagem do tempo sem anúncios poluídos.",
                    "Visualização clara de métricas climáticas essenciais no dia a dia."
                ],
                funcionalidades: [
                    "Pesquisa por nome de cidade com consumo de API externa REST",
                    "Exibição de temperatura atual, sensação térmica, umidade e vento",
                    "Alteração temática de background conforme a condição do clima (sol, chuva, nuvens)",
                    "Tratamento de erros para cidades não encontradas ou falha na conexão"
                ]
            },
            arquitetura: {
                stack: [
                    { label: "Linguagem", value: "JavaScript (ES6+ Async/Await)" },
                    { label: "API Externa", value: "OpenWeatherMap REST API" },
                    { label: "Interface", value: "HTML5 + CSS3 Glassmorphism" },
                    { label: "Deploy", value: "Vercel" }
                ],
                decisoes: [
                    "Uso de Fetch API assíncrono para garantir respostas rápidas sem recarregar a página.",
                    "Design minimalista com efeito glassmorphism moderno."
                ]
            }
        }
    },
    {
        id: "lista-tarefas",
        nome: "Lista de Tarefas (To-Do List)",
        categoria: "concluidos",
        categoriaRotulo: "Concluído",
        descricao: "Gerenciador de tarefas diárias com persistência local e filtros por status.",
        imagem: "imgs/lista_tarefas.png",
        tecnologias: ["JavaScript", "HTML5", "CSS3", "LocalStorage"],
        demo: "https://tarefasemdia.vercel.app/",
        github: "https://github.com/aisidoro87/Lista-de-tarefas",
        detalhes: {
            visaoGeral: {
                oQueE: "Aplicação web de produtividade voltada para a organização diária de pendências, permitindo cadastrar, filtrar e acompanhar a conclusão de tarefas.",
                problemaResolvido: [
                    "Esquecimento de compromissos e falta de controle de prioridades no cotidiano."
                ],
                funcionalidades: [
                    "Criação, edição e exclusão de tarefas",
                    "Marcação de tarefas como concluídas com feedback visual",
                    "Filtro de exibição (Todas, Ativas, Concluídas)",
                    "Salvamento automático das tarefas no navegador (LocalStorage)"
                ]
            },
            arquitetura: {
                stack: [
                    { label: "Front-end", value: "JavaScript Vanilla" },
                    { label: "Persistência", value: "Browser LocalStorage API" },
                    { label: "Estilização", value: "CSS Flexbox / Grid Customizado" },
                    { label: "Deploy", value: "Vercel" }
                ],
                decisoes: [
                    "Persistência offline local para que as tarefas não se percam ao fechar a aba.",
                    "Manipulação direta do DOM garantindo máxima velocidade de execução."
                ]
            }
        }
    },
];

function initPortfolioFilter() {
    const gridContainer = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.project_navegacao li');
    const modal = document.getElementById('project-modal');
    if (!gridContainer) return;

    let currentFilter = 'all';

    function renderCards(filter = 'all') {
        gridContainer.innerHTML = '';

        const filtered = PORTFOLIO_PROJECTS.filter(project => {
            if (filter === 'all') return true;
            return project.categoria === filter;
        });

        filtered.forEach(project => {
            const card = document.createElement('article');
            card.className = 'modern-project-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Ver detalhes de ${project.nome}`);

            const badgeClass = project.categoria === 'em-andamento' ? 'em-andamento' : 'concluidos';

            const tagsHTML = project.tecnologias.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

            card.innerHTML = `
                <div class="modern-card-cover">
                    <img src="${project.imagem}" alt="Capa de ${project.nome}" loading="lazy">
                </div>
                <div class="modern-card-body">
                    <div class="modern-card-header">
                        <span class="category-badge ${badgeClass}">
                            <span class="category-badge-dot"></span> ${project.categoriaRotulo}
                        </span>
                    </div>
                    <h3 class="modern-card-title">${project.nome}</h3>
                    <p class="modern-card-desc">${project.descricao}</p>
                    <div class="modern-card-tags">${tagsHTML}</div>
                    <span class="modern-card-more">
                        Ver detalhes <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </span>
                </div>
            `;

            // Open modal on click or Enter key
            card.addEventListener('click', () => openProjectModal(project));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProjectModal(project);
                }
            });

            gridContainer.appendChild(card);
        });
    }

    // Filter tab handler
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');

            currentFilter = btn.getAttribute('data-filter');
            renderCards(currentFilter);
        });
    });

    renderCards('all');

    // MODAL LOGIC
    function openProjectModal(project) {
        if (!modal) return;

        const img = document.getElementById('modal-project-img');
        const badge = document.getElementById('modal-project-badge');
        const title = document.getElementById('modal-project-title');
        const shortDesc = document.getElementById('modal-project-short-desc');
        const tagsContainer = document.getElementById('modal-project-tags');
        const tabVisaoGeral = document.getElementById('tab-visao-geral');
        const tabArquitetura = document.getElementById('tab-arquitetura');
        const demoLink = document.getElementById('modal-demo-link');
        const githubLink = document.getElementById('modal-github-link');

        img.src = project.imagem;
        img.alt = `Capa de ${project.nome}`;

        badge.className = `category-badge ${project.categoria === 'em-andamento' ? 'em-andamento' : 'concluidos'}`;
        badge.innerHTML = `<span class="category-badge-dot"></span> ${project.categoriaRotulo}`;

        title.innerText = project.nome;
        shortDesc.innerText = project.descricao;

        tagsContainer.innerHTML = project.tecnologias.map(t => `<span class="tech-tag">${t}</span>`).join('');

        // Fill Visão Geral
        const vg = project.detalhes.visaoGeral;
        let problemasHTML = '';
        if (Array.isArray(vg.problemaResolvido)) {
            problemasHTML = `<ul>${vg.problemaResolvido.map(p => `<li>${p}</li>`).join('')}</ul>`;
        } else {
            problemasHTML = `<p>${vg.problemaResolvido}</p>`;
        }

        let funcsHTML = '';
        if (vg.funcionalidades && vg.funcionalidades.length > 0) {
            funcsHTML = `<h4>Principais Funcionalidades</h4><ul>${vg.funcionalidades.map(f => `<li>${f}</li>`).join('')}</ul>`;
        }

        tabVisaoGeral.innerHTML = `
            <h4>O que é</h4>
            <p>${vg.oQueE}</p>
            <h4>Problema Resolvido</h4>
            ${problemasHTML}
            ${funcsHTML}
        `;

        // Fill Arquitetura
        const arq = project.detalhes.arquitetura;
        let stackRowsHTML = '';
        if (arq.stack && arq.stack.length > 0) {
            stackRowsHTML = `
                <h4>Stack Principal</h4>
                <div class="arch-stack-grid">
                    ${arq.stack.map(s => `
                        <div class="arch-stack-row">
                            <span class="arch-stack-label">${s.label}:</span>
                            <span class="arch-stack-val">${s.value}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        let decisoesHTML = '';
        if (arq.decisoes && arq.decisoes.length > 0) {
            decisoesHTML = `<h4>Decisões Técnicas & Boas Práticas</h4><ul>${arq.decisoes.map(d => `<li>${d}</li>`).join('')}</ul>`;
        }

        tabArquitetura.innerHTML = `
            ${stackRowsHTML}
            ${decisoesHTML}
        `;

        // Configure links
        if (project.demo && project.demo !== '#') {
            demoLink.href = project.demo;
            demoLink.style.display = 'inline-flex';
        } else {
            demoLink.style.display = 'none';
        }

        if (project.github && project.github !== '#') {
            githubLink.href = project.github;
            githubLink.style.display = 'inline-flex';
        } else {
            githubLink.style.display = 'none';
        }

        // Reset tabs state
        const tabBtns = modal.querySelectorAll('.modal-tab-btn');
        const tabPanes = modal.querySelectorAll('.tab-pane');

        tabBtns.forEach(b => {
            b.classList.remove('ativo');
            b.setAttribute('aria-selected', 'false');
        });
        tabPanes.forEach(p => p.classList.remove('ativo'));

        if (tabBtns[0] && tabPanes[0]) {
            tabBtns[0].classList.add('ativo');
            tabBtns[0].setAttribute('aria-selected', 'true');
            tabPanes[0].classList.add('ativo');
        }

        // Tab click handler inside modal
        tabBtns.forEach(btn => {
            btn.onclick = () => {
                tabBtns.forEach(b => {
                    b.classList.remove('ativo');
                    b.setAttribute('aria-selected', 'false');
                });
                tabPanes.forEach(p => p.classList.remove('ativo'));

                btn.classList.add('ativo');
                btn.setAttribute('aria-selected', 'true');
                const targetTab = btn.getAttribute('data-tab');
                const targetPane = document.getElementById(`tab-${targetTab}`);
                if (targetPane) targetPane.classList.add('ativo');
            };
        });

        // Open modal
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Modal Close Listeners
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close-btn');

    if (overlay) overlay.onclick = closeProjectModal;
    if (closeBtn) closeBtn.onclick = closeProjectModal;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
            closeProjectModal();
        }
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