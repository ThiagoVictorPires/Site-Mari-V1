/**
 * Site da Psicóloga Mariana Marcato
 * JavaScript
 */

// Espera o DOM ser carregado completamente
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todos os componentes
    initPreloader();
    initMobileMenu();
    initStickyHeader();
    initScrollSpy();
    initBackToTop();
    initAccordion();
    initDepoimentosSlider();
    initFormValidation();
    initCookieConsent();
    initAnimations();
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    // Esconde o preloader após o carregamento da página
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hide');
            // Remove o preloader do DOM após a animação
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    });
}

// ===== MENU MOBILE =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu ao clicar no botão
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
    });
    
    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('show');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }
    });
}

// ===== HEADER FIXO AO ROLAR =====
function initStickyHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== SCROLL SPY (MENU ATIVO) =====
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== BOTÃO VOLTAR AO TOPO =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ACCORDION (PERGUNTAS FREQUENTES) =====
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Fecha todos os itens
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-header').classList.remove('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = null;
            });
            
            // Abre o item clicado (se não estava ativo)
            if (!isActive) {
                accordionItem.classList.add('active');
                this.classList.add('active');
                const content = accordionItem.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

// ===== SLIDER DE DEPOIMENTOS =====
function initDepoimentosSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.depoimento-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const slideWidth = 100; // 100%
    
    // Função para atualizar o slider
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        
        // Atualiza os dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Event listeners para os botões
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });
    
    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Auto slide a cada 5 segundos
    let autoSlide = setInterval(function() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }, 5000);
    
    // Pausa o auto slide quando o mouse está sobre o slider
    const sliderContainer = document.querySelector('.depoimentos-slider');
    sliderContainer.addEventListener('mouseenter', function() {
        clearInterval(autoSlide);
    });
    
    sliderContainer.addEventListener('mouseleave', function() {
        autoSlide = setInterval(function() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 5000);
    });
    
    // Touch events para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderTrack.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe para a esquerda (próximo slide)
            currentIndex = (currentIndex + 1) % slides.length;
        } else if (touchEndX > touchStartX) {
            // Swipe para a direita (slide anterior)
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        }
        updateSlider();
    }
}

// ===== VALIDAÇÃO DE FORMULÁRIOS =====
function initFormValidation() {
    const contatoForm = document.getElementById('formulario-contato');
    const newsletterForm = document.getElementById('newsletter-form');
    
    // Validação do formulário de contato
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const mensagem = document.getElementById('mensagem').value;
            const politica = document.getElementById('politica').checked;
            
            if (!nome || !email || !telefone || !mensagem || !politica) {
                showFormStatus('error', 'Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (!validateEmail(email)) {
                showFormStatus('error', 'Por favor, insira um e-mail válido.');
                return;
            }
            
            if (!validatePhone(telefone)) {
                showFormStatus('error', 'Por favor, insira um telefone válido.');
                return;
            }
            
            // Simulação de envio bem-sucedido
            showFormStatus('success', 'Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contatoForm.reset();
        });
    }
    
    // Validação do formulário de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (!email || !validateEmail(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Simulação de inscrição bem-sucedida
            alert('Inscrição realizada com sucesso!');
            newsletterForm.reset();
        });
    }
    
    // Função para mostrar status do formulário
    function showFormStatus(type, message) {
        const formStatus = document.getElementById('form-status');
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Esconde a mensagem após 5 segundos
        setTimeout(function() {
            formStatus.style.display = 'none';
        }, 5000);
    }
    
    // Funções de validação
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
    
    function validatePhone(phone) {
        // Aceita formatos: (XX) XXXXX-XXXX ou XX XXXXX-XXXX ou XXXXXXXXXXX
        const re = /^(?:\(?([0-9]{2})\)?\s?)?(?:9[0-9]{4}|[0-9]{4})-?[0-9]{4}$/;
        return re.test(phone);
    }
    
    // Máscara para o campo de telefone
    const telefoneInputs = document.querySelectorAll('input[type="tel"]');
    telefoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            if (value.length > 7) {
                value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
            } else if (value.length > 2) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            }
            
            e.target.value = value;
        });
    });
}

// ===== COOKIE CONSENT =====
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptBtn = document.querySelector('.btn-cookie-accept');
    const settingsBtn = document.querySelector('.btn-cookie-settings');
    
    // Verifica se o usuário já aceitou os cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Mostra o banner após 2 segundos
        setTimeout(function() {
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    // Aceita os cookies
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.remove('show');
    });
    
    // Abre configurações (simulado)
    settingsBtn.addEventListener('click', function() {
        alert('Configurações de cookies (em desenvolvimento)');
    });
}

// ===== ANIMAÇÕES AO ROLAR =====
function initAnimations() {
    // Elementos que serão animados
    const animatedElements = document.querySelectorAll('.servico-card, .sintoma-item, .sobre-mim-image');
    
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Função para animar elementos visíveis
    function animateOnScroll() {
        animatedElements.forEach(el => {
            if (isElementInViewport(el) && !el.classList.contains('animated')) {
                el.classList.add('animated');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializa os estilos dos elementos
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Adiciona o evento de scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Verifica elementos visíveis no carregamento inicial
    animateOnScroll();
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 140; // Ajustado para o novo header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
