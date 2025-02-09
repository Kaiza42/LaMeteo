const parametre = {
    // la clé de l'API
    access_key: "d7e2efec8e229410dab2668c72b62277",
    // les unités pour la température
    units: "m",
};

function laMeteo(ville) {
    // L'url de l'API qui prends en compte les parametre donc parametre.aceess_Key et units 
    const url = `http://api.weatherstack.com/current?access_key=${parametre.access_key}&query=${ville}&units=${parametre.units}`;
    
    fetch(url)
        .then(reponseServeur => {
            // verifie la reponse serveur
            if (!reponseServeur) {
                throw new Error("Erreur de connexion au serveur");
            } else {
                return reponseServeur.json();
            }
        })
        .then(data => {
            const { current, location } = data;

             // affiche les information du pays 
            document.getElementById('pays').textContent = `Pays : ${location.country}`;
            // Affiche les informations de la ville
            document.getElementById('ville').textContent = `Ville : ${location.name}`;
            // affiche les information de la region
            document.getElementById('region').textContent = `Région : ${location.region}`;
            // affiche les information de la température
            document.getElementById('temperature').textContent = `Température : ${current.temperature}°C`;
            // vitesse du vent 
            document.getElementById('vitVent').textContent = `Vitesse du vent : ${current.wind_speed} km/h`;
            // Taux d'humidité en % 
            document.getElementById('humidite').textContent =`Humidité  : ${current.humidity}%`;

            // traduction faite a la main de la descrition météo
            let meteo = current.weather_descriptions[0];
            
            if (meteo === "Overcast") {
                meteo = "Nuageux";
            } else if (meteo === "Clear") {
                meteo = "Dégagé";
            } else if (meteo === "Rain") {
                meteo = "Pluie";
            } else if (meteo === "Sunny") {
                meteo = "Ensoleillé";
            } else if (meteo === "Cloudy") {
                meteo = "Nuageux";
            } else if (meteo === "Windy") {
                meteo = "Venteux";
            } else if (meteo === "Snow") {
                meteo = "Neige";
            } else if (meteo === "Partly cloudy") {
                meteo = "Partiellement nuageux";
            } else if (meteo === "Light Rain") {
                meteo = "Pluie légère";
            }else if (meteo == "Light Rain Shower"){
                meteo = "pluie légère";
            }else{
                meteo = "Il y a une erreur de traduction !"
            }
           // affiche la desxption météo avec la variable météo a l'interieur 
            document.getElementById('description').textContent = `Description météo : ${meteo}`;
           // affiche la date actuel avec le toLocaleString pour de pas afficher les seconde 
            document.getElementById('derniereMiseAJour').textContent = `Dernière mise à jour : ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
        })
}


function chargerVille() {
    // charge le json 
    fetch('conf.json')  
        .then(reponse => {
            return reponse.json();
        })
        .then(data => {
            const villes = data.villes;

            // choisir les ville inscrite dans le json l'index commence a 0 donc id -1 
            const villeChoisie = villes[8].ville;  
            laMeteo(villeChoisie);  
        });
}
// Fonction pour mettre à jour la météo en miliseconde
function miseAJourTemp() {
    chargerVille();  
    // setInterval va prendre un paramettre dans notre cas "charger ville" et va la mettre a jour selon le temp que j'ai fixer dans notre cas 1h 
    setInterval(() => {
        chargerVille();  
    }, 3600000);  // 3600000 = 1 heure / 60000 = 1 minute
}

// au lancement de la page va faire la mise a jour 
window.onload = () => {
    miseAJourTemp();
};
