document.addEventListener('DOMContentLoaded', () => {
    const tabContainer = document.querySelector('.tab-buttons');
    const formSwitchLinks = document.querySelectorAll('[data-form]');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    let isAnimating = false;

    const showForm = (form) => {
        form.classList.remove('hidden');
        form.classList.add('active-form');
    };

    const hideForm = (form) => {
        form.classList.add('hidden');
        form.classList.remove('active-form');
    };

    const switchView = (targetView) => {
        if (isAnimating) {
            return;
        }
        const currentView = targetView === 'login' ? 'register' : 'login';
        const currentForm = document.getElementById(`${currentView}-form`);
        const targetForm = document.getElementById(`${targetView}-form`);
        if (targetForm.classList.contains('active-form')) {
            return;
        }

        isAnimating = true;
        tabContainer.classList.toggle('register-active', targetView === 'register');
        document.querySelector(`.tab-btn[data-form="${currentView}"]`).classList.remove('active');
        document.querySelector(`.tab-btn[data-form="${targetView}"]`).classList.add('active');
        currentForm.classList.add('animate-form-fade-out');

        const onExitAnimationEnd = () => {
            currentForm.removeEventListener('animationend', onExitAnimationEnd);
            currentForm.classList.remove('animate-form-fade-out');
            hideForm(currentForm);

            showForm(targetForm);
            targetForm.classList.add('animate-form-fade-in');

            const onEnterAnimationEnd = () => {
                targetForm.removeEventListener('animationend', onEnterAnimationEnd);
                targetForm.classList.remove('animate-form-fade-in');
                isAnimating = false;
            };

            targetForm.addEventListener('animationend', onEnterAnimationEnd);
        };

        currentForm.addEventListener('animationend', onExitAnimationEnd);
    };

    formSwitchLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchView(link.dataset.form);
        });
    });

    const initialView = window.location.hash === '#register' ? 'register' : 'login';

    if (initialView === 'register') {
        hideForm(loginForm);
        showForm(registerForm);
        tabContainer.classList.add('register-active');
        document.querySelector('.tab-btn[data-form="login"]').classList.remove('active');
        document.querySelector('.tab-btn[data-form="register"]').classList.add('active');
    } else {
        showForm(loginForm);
        hideForm(registerForm);
    }
});