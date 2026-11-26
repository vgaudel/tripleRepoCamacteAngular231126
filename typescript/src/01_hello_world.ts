// ============================================================
// INTRODUCTION & BASES de TypeScript
// ============================================================
// Objectif : présenter rapidement la syntaxe de base et les
// annotations de type utiles pour démarrer un projet.


// Exécutez ce fichier après compilation pour voir les exemples.
console.log("HelloWorld depuis TypeScript !");

// --------------------
// Variables et types
// --------------------
// Ajoutez des annotations pour bénéficier de la vérification statique
// et d'une meilleure autocomplétion dans l'éditeur.

let isDone: boolean = false;
console.log(isDone);

let height: number = 6;
// height = "12"; 
height = 12;

let firstName: string = "Vincent";
//Concaténation classique
let phrase1: string = "Bonjour " + firstName;
//Template String (meilleur lisibilité)
let phrase2: string = `Au revoir ${firstName} !! avec firstname ajouté dans le template string`;

console.log(phrase1);
console.log(phrase2);


// --------------------
// Fonctions simples
// --------------------
// Typage des paramètres et du retour : utile pour détecter
// les erreurs dès la compilation.

function greeterString(person: string): string{
    return "Bonjour depuis la fonction " + person;
}