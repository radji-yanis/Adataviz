 export const comparerTexte = (titre, texteRecherche) => { 
    if (titre.toLowerCase().includes(texteRecherche.toLowerCase())) {
         return true
         }
          else { return false
}}

// const comparTexte = (titre, texteRecherche) => {
//   return titre.toLowerCase().includes(texteRecherche.toLowerCase());
// };

export const estCarteCachee = (index) => {
  return index >= 50;
};


export const nombreEvents = (tableau) => 
{ return tableau.length };
    
 