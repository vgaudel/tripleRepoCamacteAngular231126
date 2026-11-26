"use strict";
// ============================================================
// FONCTIONS en TypeScript
// ============================================================
// TypeScript permet de typer les paramètres ET la valeur de
// retour d'une fonction. Si le type de retour ne correspond pas,
// une erreur est signalée dès la compilation.
Object.defineProperty(exports, "__esModule", { value: true });
// ============================================================
// CAS 1 : Fonction basique typée
// ============================================================
// On déclare le type de chaque paramètre et le type de retour
// après les parenthèses (ici "number").
function additionner(a, b) {
    return a + b; // TypeScript vérifie que le retour est bien un number
}
console.log(additionner(3, 5)); // 8
// ============================================================
// CAS 2 : Paramètres optionnels
// ============================================================
// Le "?" rend un paramètre optionnel. S'il est absent, il vaut
// "undefined" à l'intérieur de la fonction.
function saluer(prenom, titre) {
    if (titre) { // une condition sur un nom de variable vérifie si la variable existe : undefined ou null vaudront false
        return `Bonjour ${titre} ${prenom}`;
    }
    else {
        return `Bonjour ${prenom}`;
    }
}
console.log(saluer("Gérald"));
console.log(saluer("Cassoulet", "Sir"));
// ============================================================
// CAS 3 : Paramètres avec valeur par défaut
// ============================================================
// Si le paramètre est absent ou undefined, la valeur par défaut
// est utilisée. Plus besoin du "?" car le défaut couvre le cas.
function puissance(base, exposant = 2) {
    return Math.pow(base, exposant);
}
console.log(puissance(3)); //9
console.log(puissance(3, 3)); //27
// ============================================================
// CAS 4 : Paramètre rest (nombre variable d'arguments)
// ============================================================
// "...nombres" regroupe tous les arguments restants dans un tableau.
// Le type est "number[]" car on reçoit plusieurs numbers.
function somme(...nombres) {
    return nombres.reduce((total, n) => total + n, 0);
}
console.log(somme(1, 2, 3, 4, 5, 6));
// ============================================================
// CAS 5 : Type de retour void
// ============================================================
// "void" indique que la fonction ne retourne aucune valeur utile.
// Utilisé pour les fonctions qui ont des effets de bord (console, DOM...).
function afficherMessage(message) {
    console.log(`[INFO] ${message}`);
    // pas de "return valeur" ici
}
afficherMessage("Démarrage de l'application");
function formater(valeur) {
    if (typeof valeur === "number") {
        return valeur.toFixed(2);
    }
    return valeur.trim().toUpperCase();
}
// ============================================================
// CAS 7 : Typage d'une variable de type fonction
// ============================================================
// On peut typer une variable pour qu'elle n'accepte QUE des
// fonctions ayant une signature précise.
