document.addEventListener('DOMContentLoaded', function() {
    // Elements DOM
    const fetchButton = document.getElementById('fetchHoroscope');
    const loader = document.getElementById('loader');
    const errorContainer = document.getElementById('errorContainer');
    const errorMessage = document.getElementById('errorMessage');
    const retryButton = document.getElementById('retryButton');
    const horoscopeContainer = document.getElementById('horoscopeContainer');
    
    // Configuration API
    const API_URL = 'https://oracles-api.sidathsoeun.fr/oracle_api.php';
    const API_KEY = 'SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!';
    
    // Événements
    fetchButton.addEventListener('click', fetchHoroscope);
    retryButton.addEventListener('click', fetchHoroscope);
    
    // Fonction principale
    async function fetchHoroscope() {
        // Réinitialiser l'affichage
        horoscopeContainer.innerHTML = '';
        errorContainer.classList.add('hidden');
        loader.classList.remove('hidden');
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ api_key: API_KEY })
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.horoscope) {
                displayHoroscope(data.horoscope);
            } else {
                throw new Error('Format de données inattendu');
            }
        } catch (error) {
            showError(`Une erreur est survenue: ${error.message}`);
        } finally {
            loader.classList.add('hidden');
        }
    }
    
    // Afficher les horoscopes
    function displayHoroscope(horoscopeData) {
        horoscopeContainer.innerHTML = '';
        
        // Ordre des signes du zodiaque
        const zodiacSigns = [
            'Bélier', 'Taureau', 'Gémeaux', 'Cancer', 
            'Lion', 'Vierge', 'Balance', 'Scorpion', 
            'Sagittaire', 'Capricorne', 'Verseau', 'Poissons'
        ];
        
        zodiacSigns.forEach(sign => {
            const message = horoscopeData[sign] || 'Message non disponible';
            
            const card = document.createElement('div');
            card.className = 'horoscope-card';
            
            const title = document.createElement('h3');
            title.textContent = sign;
            
            const content = document.createElement('p');
            content.textContent = message;
            
            card.appendChild(title);
            card.appendChild(content);
            horoscopeContainer.appendChild(card);
        });
    }
    
    // Afficher les erreurs
    function showError(message) {
        errorMessage.textContent = message;
        errorContainer.classList.remove('hidden');
    }
});

// Gestion des modaux du footer
document.querySelectorAll('.modal-btn').forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
    });
});

// Fermeture des modaux
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

// Fermer en cliquant en dehors du modal
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Gestion des modals du footer
document.querySelectorAll('.modal-btn').forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Empêche le défilement
    });
});

// Fermeture des modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
        document.body.style.overflow = 'auto'; // Rétablit le défilement
    });
});

// Fermer en cliquant en dehors du modal
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Fermer avec la touche ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
});