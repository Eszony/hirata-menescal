    document.addEventListener('DOMContentLoaded', function() {
        // Inicializar AOS Animation
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
        
        // Menu Mobile Toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        const header = document.getElementById('header');
        
        mobileToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
        
        // Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Fechar menu mobile se estiver aberto
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                }
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
    // Form Validation + Web3Forms Submit
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            if (!name.value.trim()) {
                isValid = false;
                name.style.borderColor = 'red';
            } else {
                name.style.borderColor = '#ddd';
            }

            if (!email.value.trim() || !email.value.includes('@')) {
                isValid = false;
                email.style.borderColor = 'red';
            } else {
                email.style.borderColor = '#ddd';
            }

            if (!message.value.trim()) {
                isValid = false;
                message.style.borderColor = 'red';
            } else {
                message.style.borderColor = '#ddd';
            }

            if (isValid) {
                const formData = new FormData(this);

                fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                })
                    .then(response => {
                        if (response.ok) {
                            alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
                            contactForm.reset();
                        } else {
                            alert("Ocorreu um erro no envio. Tente novamente mais tarde.");
                        }
                    })
                    .catch(() => {
                        alert("Erro de conexão. Verifique sua internet e tente novamente.");
                    });
            } else {
                alert("Por favor, preencha todos os campos obrigatórios corretamente.");
            }
        });
    }
});
