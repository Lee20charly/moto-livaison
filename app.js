// Menu mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('active');
        });
    });
}

// Gestion des onglets dans la page compte
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            // Masquer tous les contenus
            tabContents.forEach(content => content.classList.remove('active'));
            // Afficher le contenu correspondant
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Estimation du prix dans le formulaire de commande
const typeColis = document.getElementById('type-colis');
const prixEstimation = document.querySelector('.prix');

if (typeColis && prixEstimation) {
    typeColis.addEventListener('change', () => {
        let prix = 0;
        switch(typeColis.value) {
            case 'petit':
                prix = 9.99;
                break;
            case 'moyen':
                prix = 12.99;
                break;
            case 'grand':
                prix = 15.99;
                break;
            default:
                prix = 0;
        }
        prixEstimation.textContent = prix.toFixed(2) + ' €';
    });
}

// Fonction de recherche de suivi
function searchTracking() {
    const trackingNumber = document.getElementById('tracking-number').value;
    if (!trackingNumber) {
        alert('Veuillez entrer un numéro de suivi');
        return;
    }
    
    // Simulation d'une requête API
    // Dans une vraie application, ceci serait remplacé par un appel API
    const trackingResult = document.querySelector('.tracking-result');
    if (trackingResult) {
        trackingResult.style.display = 'block';
    }
}

// Gestion du formulaire de commande
const commandeForm = document.querySelector('.commande-form');
if (commandeForm) {
    commandeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collecter les données du formulaire
        const formData = {
            typeColis: document.getElementById('type-colis').value,
            description: document.getElementById('description').value,
            adresseDepart: document.getElementById('adresse-depart').value,
            adresseArrivee: document.getElementById('adresse-arrivee').value,
            nomDestinataire: document.getElementById('nom-destinataire').value,
            telDestinataire: document.getElementById('tel-destinataire').value
        };
        
        // Validation basique
        if (Object.values(formData).some(value => !value)) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        
        // Simulation d'envoi à l'API
        alert('Commande enregistrée avec succès !');
        // Redirection vers la page de suivi
        window.location.href = 'suivi.html';
    });
}

// Animation au scroll
document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .service-card, .how-it-works-step, .testimonial-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial state
    document.querySelectorAll('.feature-card, .service-card, .how-it-works-step, .testimonial-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});

// Animation de notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Animation des boutons
document.querySelectorAll('button, .cta-button').forEach(button => {
    button.addEventListener('mousedown', function(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);
    });
});

// Gestion de la navigation et du menu burger
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    function toggleMenu() {
        // Toggle de la navigation
        nav.classList.toggle('nav-active');
        
        // Animation des liens
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Animation du burger
        burger.classList.toggle('active');
        
        // Toggle du scroll sur le body
        document.body.classList.toggle('no-scroll');
    }

    // Gestionnaire d'événement pour le burger
    if (burger && nav) {
        burger.addEventListener('click', toggleMenu);

        // Fermer le menu quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('nav-active')) {
                    toggleMenu();
                }
            });
        });

        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('nav-active') && 
                !nav.contains(e.target) && 
                !burger.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    // Mise à jour de la navigation active
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Animation des cartes au hover
document.querySelectorAll('.feature-card, .service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Animation de chargement des images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.animation = 'fadeIn 0.5s ease-out';
    });
});

// Animation du formulaire de connexion/inscription
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Gestion des adresses
const addAddressButton = document.querySelector('.add-address-button');
if (addAddressButton) {
    addAddressButton.addEventListener('click', () => {
        // Dans une vraie application, ceci ouvrirait un modal pour ajouter une adresse
        alert('Fonctionnalité à venir : Ajout d\'adresse');
    });
}

// Gestion des paramètres du compte
const settingsForm = document.querySelector('.settings-form');
if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Dans une vraie application, ceci enverrait les données à une API
        alert('Paramètres enregistrés avec succès !');
    });
}

// Gestion des onglets de connexion/inscription
const authTabs = document.querySelectorAll('.auth-tabs .tab-button');
const authForms = document.querySelectorAll('.auth-form');

if (authTabs.length > 0) {
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Retirer la classe active de tous les onglets et formulaires
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            // Ajouter la classe active à l'onglet cliqué et au formulaire correspondant
            tab.classList.add('active');
            const formId = tab.getAttribute('data-tab');
            document.getElementById(formId).classList.add('active');
        });
    });
}

// Gestion de l'affichage des mots de passe
const togglePasswordButtons = document.querySelectorAll('.toggle-password');

if (togglePasswordButtons.length > 0) {
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            button.classList.toggle('fa-eye');
            button.classList.toggle('fa-eye-slash');
        });
    });
}

// Gestion des formulaires
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Ici, vous ajouteriez la logique de connexion
        console.log('Tentative de connexion');
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Ici, vous ajouteriez la logique d'inscription
        console.log('Tentative d\'inscription');
    });
}

// Gestion des paramètres utilisateur
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du thème sombre/clair
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        themeToggle.checked = savedTheme === 'dark';

        themeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', this.checked ? 'dark' : 'light');
        });
    }

    // Gestion des notifications
    const notifToggle = document.querySelector('#notifications-toggle');
    if (notifToggle) {
        notifToggle.checked = localStorage.getItem('notifications') === 'true';
        notifToggle.addEventListener('change', function() {
            localStorage.setItem('notifications', this.checked);
            if (this.checked) {
                Notification.requestPermission();
            }
        });
    }

    // Gestion du formulaire de profil
    const profileForm = document.querySelector('#profile-form');
    if (profileForm) {
        // Charger les données sauvegardées
        const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        Object.keys(savedProfile).forEach(key => {
            const input = profileForm.querySelector(`[name="${key}"]`);
            if (input) input.value = savedProfile[key];
        });

        // Sauvegarder les modifications
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const profileData = {};
            formData.forEach((value, key) => {
                profileData[key] = value;
            });
            localStorage.setItem('userProfile', JSON.stringify(profileData));
            
            // Animation de confirmation
            const saveBtn = this.querySelector('button[type="submit"]');
            saveBtn.innerHTML = '<i class="fas fa-check"></i> Sauvegardé!';
            saveBtn.classList.add('success');
            setTimeout(() => {
                saveBtn.innerHTML = 'Sauvegarder';
                saveBtn.classList.remove('success');
            }, 2000);
        });
    }

    // Gestion des adresses
    const addressForm = document.querySelector('#address-form');
    const addressList = document.querySelector('#address-list');
    if (addressForm && addressList) {
        // Charger les adresses sauvegardées
        const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
        renderAddresses(addresses);

        // Ajouter une nouvelle adresse
        addressForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const address = {
                id: Date.now(),
                name: formData.get('address-name'),
                street: formData.get('street'),
                city: formData.get('city'),
                postal: formData.get('postal'),
                default: formData.get('default') === 'on'
            };

            const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
            if (address.default) {
                addresses.forEach(a => a.default = false);
            }
            addresses.push(address);
            localStorage.setItem('addresses', JSON.stringify(addresses));
            
            renderAddresses(addresses);
            this.reset();
        });
    }

    // Gestion des préférences de livraison
    const deliveryPrefs = document.querySelector('#delivery-preferences');
    if (deliveryPrefs) {
        const savedPrefs = JSON.parse(localStorage.getItem('deliveryPrefs') || '{}');
        Object.keys(savedPrefs).forEach(key => {
            const input = deliveryPrefs.querySelector(`[name="${key}"]`);
            if (input) input.value = savedPrefs[key];
        });

        deliveryPrefs.addEventListener('change', function(e) {
            const formData = new FormData(this);
            const prefs = {};
            formData.forEach((value, key) => {
                prefs[key] = value;
            });
            localStorage.setItem('deliveryPrefs', JSON.stringify(prefs));
        });
    }

    // Navigation des paramètres
    const settingsLinks = document.querySelectorAll('.settings-nav a');
    const sections = document.querySelectorAll('.settings-section');

    // Gérer le changement de section
    settingsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            // Mettre à jour les classes actives
            settingsLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');

            // En mobile, scroll jusqu'à la section
            if (window.innerWidth <= 768) {
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Gérer le changement de photo de profil
    const editAvatarBtn = document.querySelector('.edit-avatar');
    if (editAvatarBtn) {
        editAvatarBtn.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        document.querySelector('.user-avatar img').src = event.target.result;
                        localStorage.setItem('userAvatar', event.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });

        // Charger l'avatar sauvegardé
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
            document.querySelector('.user-avatar img').src = savedAvatar;
        }
    }
});

// Fonction pour afficher les adresses
function renderAddresses(addresses) {
    const addressList = document.querySelector('#address-list');
    if (!addressList) return;

    addressList.innerHTML = addresses.map(address => `
        <div class="address-card ${address.default ? 'default' : ''}">
            <div class="address-content">
                <h4>${address.name}</h4>
                <p>${address.street}</p>
                <p>${address.city}, ${address.postal}</p>
                ${address.default ? '<span class="default-badge">Par défaut</span>' : ''}
            </div>
            <div class="address-actions">
                <button onclick="editAddress(${address.id})" class="btn-edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteAddress(${address.id})" class="btn-delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Fonction pour supprimer une adresse
function deleteAddress(id) {
    if (!confirm('Voulez-vous vraiment supprimer cette adresse ?')) return;
    
    let addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
    addresses = addresses.filter(a => a.id !== id);
    localStorage.setItem('addresses', JSON.stringify(addresses));
    renderAddresses(addresses);
}

// Fonction pour éditer une adresse
function editAddress(id) {
    const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
    const address = addresses.find(a => a.id === id);
    if (!address) return;

    const form = document.querySelector('#address-form');
    if (!form) return;

    form.querySelector('[name="address-name"]').value = address.name;
    form.querySelector('[name="street"]').value = address.street;
    form.querySelector('[name="city"]').value = address.city;
    form.querySelector('[name="postal"]').value = address.postal;
    form.querySelector('[name="default"]').checked = address.default;

    // Changer le bouton submit
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = 'Modifier';
    form.dataset.editId = id;

    // Scroll jusqu'au formulaire
    form.scrollIntoView({ behavior: 'smooth' });
}

// Animation au scroll améliorée
document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .service-card, .how-it-works-step, .testimonial-card, .about-section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});

// Gestion des formulaires améliorée
document.addEventListener('DOMContentLoaded', function() {
    // Formulaire de commande
    const commandeForm = document.querySelector('.commande-form');
    if (commandeForm) {
        commandeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            try {
                const formData = {
                    typeColis: document.getElementById('type-colis')?.value,
                    description: document.getElementById('description')?.value,
                    adresseDepart: document.getElementById('adresse-depart')?.value,
                    adresseArrivee: document.getElementById('adresse-arrivee')?.value,
                    nomDestinataire: document.getElementById('nom-destinataire')?.value,
                    telDestinataire: document.getElementById('tel-destinataire')?.value
                };
                
                if (Object.values(formData).some(value => !value)) {
                    showNotification('Veuillez remplir tous les champs', 'error');
                    return;
                }
                
                showNotification('Commande enregistrée avec succès !', 'success');
                setTimeout(() => {
                    window.location.href = 'suivi.html';
                }, 1500);
            } catch (error) {
                showNotification('Une erreur est survenue', 'error');
                console.error('Erreur lors de la soumission du formulaire:', error);
            }
        });
    }

    // Estimation du prix
    const typeColis = document.getElementById('type-colis');
    const prixEstimation = document.querySelector('.prix');
    if (typeColis && prixEstimation) {
        const prices = {
            petit: 9.99,
            moyen: 12.99,
            grand: 15.99
        };

        typeColis.addEventListener('change', () => {
            const prix = prices[typeColis.value] || 0;
            prixEstimation.textContent = prix.toFixed(2) + ' €';
        });
    }
});

// Fonction de notification améliorée
function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    // Animation d'entrée
    notification.style.animation = 'slideIn 0.5s forwards';

    // Suppression automatique
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}