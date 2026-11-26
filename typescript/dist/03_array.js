"use strict";
// ============================================================
// ARRAY (tableaux) en TypeScript
// ============================================================
// Objectif : comprendre les différentes syntaxes, opérations
// courantes et pièges pour manipuler des tableaux typés.
Object.defineProperty(exports, "__esModule", { value: true });
// Deux syntaxes : `type[]` ou `Array<type>` — choisissez celle
// qui vous semble la plus lisible pour votre équipe.
// --------------------
// Déclaration et affectation
// --------------------
let myNumbers;
myNumbers = [1, 2, 3];
// myNumbers = [1, "deux"];
console.log(myNumbers);
//Méthodes courantes 
myNumbers.forEach(anonyme);
function anonyme(n) {
    console.log(n);
}
let anonyme2 = (n) => {
    console.log(n);
};
let fruits = ["pomme", "banane", "cerise"];
fruits.forEach(f => console.log("Je mange une " + f));
// ajouter un élément dans un tableau
fruits.push("poire");
myNumbers.push(4);
let myDoubles = myNumbers.map(n => n * 2); //[ 2, 4, 6, 8 ]
console.log(myNumbers);
console.log(myDoubles);
let myBigNumbers = myNumbers.filter(n => n > 2);
console.log(myBigNumbers);
let trouve = myNumbers.find(n => n === 3);
console.log(trouve);
// --------------------
// Immutabilité et readonly
// --------------------
// Pour éviter les modifications accidentelles, utilisez `readonly`.
const jours = ["lundi", "mardi", "mercredi"];
//jours.push("jeudi"); // ERREUR : readonly interdit les mutations
// Exemples de duplication de tableau readOnly toujours possible
let jours2 = ["dimanche", ...jours, "jeudi"];
let jours3 = jours.map(n => n);
jours2.push("jeudi");
jours3.push("vendredi");
console.log(jours2);
console.log(jours3);
// --------------------
// Astuces pédagogiques
// --------------------
// - Préférez des types précis pour les tableaux publics.
// - Utilisez `ReadonlyArray<T>` si vous souhaitez exposer sans
//   permettre la modification.
// - Pour des collections hétérogènes, envisagez les tuples plutôt
//   que `Array<any>` pour garder de la sécurité de type.
