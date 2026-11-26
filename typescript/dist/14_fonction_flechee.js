"use strict";
// ============================================================
// FONCTIONS FLÉCHÉES en TypeScript
// ============================================================
// Les fonctions fléchées (arrow functions) sont une syntaxe
// compacte introduite en ES6. En TypeScript, on y ajoute
// le typage des paramètres et du retour.
// Rappel syntaxe : (params) => expression  OU  (params) => { bloc }
Object.defineProperty(exports, "__esModule", { value: true });
// ============================================================
// CAS 1 : Syntaxe de base
// ============================================================
// Forme longue avec bloc et "return" explicite
function multiplier(a, b) {
    return a * b;
}
const multiplierCourte = (a, b) => a * b;
console.log(multiplier(4, 5));
console.log(multiplierCourte(4, 5));
// ============================================================
// CAS 2 : Un seul paramètre => parenthèses optionnelles
// ============================================================
const doubler = (n) => n * 2;
console.log(doubler(7)); //14
// ============================================================
// CAS 3 : Sans paramètre 
// ============================================================
const direBonjour = () => "Bonjour tout le monde !";
console.log(direBonjour());
// ============================================================
// CAS 4 : Retour d'un objet littéral
// ============================================================
// ATTENTION : sans parenthèses, les accolades seraient interprétées
// comme un bloc de code, pas comme un objet. Il faut donc englober
// l'objet dans des parenthèses.
const creerUtilisateur = (nom, age) => ({ nom, age }); //{return {nom,age}};
console.log(creerUtilisateur("Alice", 30));
// ============================================================
// CAS 5 : Fonctions fléchées dans les tableaux (map, filter, reduce)
// ============================================================
// C'est l'usage le plus fréquent des fonctions fléchées.
const notes = [12, 8, 17, 5, 14, 9];
// map : transforme chaque élément en son triple
const notesSur60 = notes.map((n) => n * 3);
// console.log(notesSur60);
console.log("Affichage du map :");
notesSur60.forEach(n => console.log(n));
// filter : garde uniquement les éléments qui passent le test
// On ne veut garder que les notes supérieures à 10
const notesSuperieures10 = notes.filter((n) => n > 10);
// reduce : accumule les éléments en une valeur unique
// Calculer la moyenne des notes
const moyenne = notes.reduce((acc, n) => acc + n, 0) / notes.length;
console.log(notesSuperieures10); // [12, 17, 14]
console.log(moyenne.toFixed(2)); // "10.83"
// ============================================================
// CAS 7 : Typer une variable de type fonction fléchée
// ============================================================
// On peut annoter explicitement le type d'une variable qui
// contiendra une fonction fléchée.
const diviser = (a, b) => a / b;
const diviser2 = (a, b) => a / b;
console.log(diviser(10, 4)); // 2.5
