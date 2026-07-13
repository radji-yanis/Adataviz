import { comparerTexte, estCarteCachee, nombreEvents } from "./utils.js";

const données = async () => {
  try {
    const data = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=100",
    );
    const response = await data.json();
    return response;
  } catch (error) {
    console.error("erreur de chargement :", error.message);
  }
};

const grid = document.querySelector(".grid");

   // Affichage des Données

const lireData = async () => {
  const resultData = await données();
  const evenements = resultData.results;

const compteur = document.querySelector(".count")
compteur.textContent = `${nombreEvents(evenements)} événements trouvés`;

  grid.innerHTML = "";

  for (let i = 0; i < evenements.length; i++) {
    const events = evenements[i];
    const article = document.createElement("article");
    article.className = "card";

    if (estCarteCachee(i)) {
      article.classList.add("carte-cachee");
    }

    const img = document.createElement("img");
    img.className = "card-image";
    img.src = events.cover_url;
    const section = document.createElement("section");
    section.className = "card-body";
    const b = document.createElement("b");
    b.className = "card-tag-eyebrow";
    const h2 = document.createElement("h2");
    h2.className = "card-title";
    const footer = document.createElement("footer");
    footer.className = "card-details";
    footer.classList.add("cachee");
    const address = document.createElement("address");
    const bPrix = document.createElement("b");
    bPrix.className = "tag";
    const button = document.createElement("button");
    button.className = "btn-voir-plus";
    button.textContent = " voir plus";
    const p = document.createElement("p");
    p.className = "card-lead";
    p.textContent = events.lead_text;

    b.textContent = events.qfap_tags;
    h2.textContent = events.title;
    address.textContent = events.address_name;
    bPrix.textContent = events.price_type;

    grid.appendChild(article);
    article.appendChild(img);
    article.appendChild(section);
    section.appendChild(b);
    section.appendChild(h2);
    section.appendChild(footer);
    section.appendChild(bPrix);
    footer.appendChild(address);
    section.appendChild(button);
    footer.appendChild(p);

    // Voir plus par carte
      
    button.addEventListener("click", () => {
      footer.classList.toggle("cachee");
    });
  }
};
    //Voir plus global

const boutonVoirPlusGlobal = document.querySelector(".btn-voir-plus-global");
boutonVoirPlusGlobal.addEventListener("click", () => {
  const cartesCachees = document.querySelectorAll(".carte-cachee");
  cartesCachees.forEach((carte) => {
    carte.classList.remove("carte-cachee");
  });
});

//SearchBarre

const recherche = document.querySelector("#recherche");
recherche.addEventListener("input", () => {
  const texteRecherche = recherche.value;
  const cartes = document.querySelectorAll(".card");
  cartes.forEach((carte) => {
    const titre = carte.querySelector(".card-title").textContent;

    if (comparerTexte(titre, texteRecherche)) {
      carte.classList.remove("carte-cachee");
    } else {
      carte.classList.add("carte-cachee");
    }
  });
});

  // Filters

const caseACocher = document.querySelectorAll(".filtres input");
caseACocher.forEach((uneCase) => {
  uneCase.addEventListener("change", () => {
    const valeursCochees = [];

    for (let i = 0; i < caseACocher.length; i++) {
      if (caseACocher[i].checked === true) {
        valeursCochees.push(caseACocher[i].value);
      }
    }

    const cartes = document.querySelectorAll(".card");
    cartes.forEach((carte) => {
      const tarif = carte.querySelector(".tag").textContent;
      if (valeursCochees.length === 0 || valeursCochees.includes(tarif)) {
        carte.classList.remove("carte-cachee");
      } else {
        carte.classList.add("carte-cachee");
      }
    });
  });

//      methodes avec .filter

// const caseACocher = document.querySelectorAll(".filtres input");
// caseACocher.forEach((uneCase) => {
//   uneCase.addEventListener("change", () => {
//     const valeursCochees = [];

//     for (let i = 0; i < caseACocher.length; i++) {
//       if (caseACocher[i].checked === true) {
//         valeursCochees.push(caseACocher[i].value);
//       }
//     }

//     const evenementsFiltres = tousLesEvenements.filter((events) => {
//       return valeursCochees.length === 0 || valeursCochees.includes(events.price_type);
//     });

//     grid.innerHTML = "";
//     evenementsFiltres.forEach((events, index) => {
//       creerCarte(events, index);
//     });
//   });
// });


});

lireData();

// Mode Sombre/Clair
const toggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

const saved = localStorage.getItem('theme');
if (saved === 'dark') {
  root.setAttribute('data-theme', 'dark');
  toggleBtn.textContent = '☀️';
}

toggleBtn.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  if (isDark) {
    root.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    toggleBtn.textContent = '🌙';
  } else {
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    toggleBtn.textContent = '☀️';
  }
});