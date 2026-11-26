// ============================================================
// Unknown en TypeScript — notions et bonnes pratiques
// ============================================================


// à utiliser quand on ne connait pas à l'avance le type de valeur récupérée 

// Déclaration
let mystere : unknown;

// ---  Assignation : n'importe quel type est accepté ---
mystere = 42;
mystere = "bonjour";
mystere = true;
mystere = {prenom: "Patrice", nom: "Roig"};

mystere = "TypeScript me demande de vérifier le type avant utilisation";
//console.log(mystere.toUpperCase());

if (typeof mystere === "string"){ 
    console.log(mystere.toUpperCase());
}
if (typeof mystere === "number"){
    mystere += 19;
}

function traiterReponseAPI(data: unknown): void{

    if (typeof data === "object" && data !== null && "nom" in data && !("prenom"  in data)){
        console.log(data.nom);
    }else{
        console.log("Format de données inattendu");
    }
}

traiterReponseAPI(mystere);
traiterReponseAPI({nom : "Alice"});
traiterReponseAPI({prenom : "Alice"});
traiterReponseAPI({prenom: "Patrice", nom: "Roig"});
traiterReponseAPI({nom : 42});
traiterReponseAPI(42);
traiterReponseAPI(null);