# Démarrer avec TypeScript : de l'installation au premier projet

Ce support vous guide pas à pas : installer les outils, comprendre le rôle de chacun, créer et configurer un projet, puis compiler et exécuter du code.

Les commandes sont à saisir dans le terminal de VS Code (menu **Terminal > Nouveau terminal**). Les résultats affichés ont été obtenus sous Windows avec Node.js 26, npm 11 et TypeScript 7. Vos numéros de version peuvent différer.

## Sommaire

1. [Comprendre les outils](#1-comprendre-les-outils)
2. [Installer l'environnement](#2-installer-lenvironnement)
3. [Créer son premier projet](#3-créer-son-premier-projet)
4. [Configurer le projet : tsconfig.json](#4-configurer-le-projet--tsconfigjson)
5. [Écrire, compiler, exécuter](#5-écrire-compiler-exécuter)
6. [Travailler en mode watch](#6-travailler-en-mode-watch)
7. [Simplifier avec les scripts npm](#7-simplifier-avec-les-scripts-npm)
8. [Exécuter les fichiers de la formation](#8-exécuter-les-fichiers-de-la-formation)
9. [Dépannage](#9-dépannage)
10. [Aide-mémoire](#10-aide-mémoire)

---

## 1. Comprendre les outils

### TypeScript en une phrase

TypeScript, c'est **JavaScript + des types**. Les types permettent de repérer des erreurs *avant* d'exécuter le programme.

Les navigateurs ne comprennent que le JavaScript. On **compile** donc le TypeScript : le compilateur vérifie les types, les retire, puis produit du JavaScript.

```text
   src/index.ts   ──────────►   dist/index.js   ──────────►   résultat
   (TypeScript)       tsc        (JavaScript)       node      (terminal)
                    compile                        exécute
```

### Qui fait quoi ?

| Outil | Rôle | Exemple |
|:------|:-----|:--------|
| **node** | **Exécute** du JavaScript en dehors du navigateur | `node dist/index.js` |
| **npm** | **Installe** des paquets (bibliothèques, outils) et lance des scripts. Fourni avec Node.js | `npm install --save-dev typescript` |
| **npx** | **Lance** un outil installé par npm dans le projet. Fourni avec npm | `npx tsc` |
| **tsc** | **Compile** le TypeScript en JavaScript (*TypeScript Compiler*) | `tsc` |
| **VS Code** | Éditeur : autocomplétion, erreurs soulignées en direct | |

> **À retenir :** `tsc` compile, mais n'exécute rien. `node` exécute, mais ne vérifie pas les types. Il faut les deux.

> **Et `node fichier.ts` ?** Les versions récentes de Node savent lancer directement certains fichiers `.ts`, en effaçant les types **sans les vérifier**. Certaines syntaxes sont refusées, comme `enum` (`TypeScript enum is not supported in strip-only mode`). Dans cette formation, on passe toujours par `tsc`.

---

## 2. Installer l'environnement

### Étape 1 : VS Code

Téléchargez et installez l'éditeur depuis <https://code.visualstudio.com>. La prise en charge de TypeScript y est intégrée, aucune extension n'est nécessaire.

### Étape 2 : Node.js et npm

1. Allez sur <https://nodejs.org>.
2. Téléchargez la version **LTS** (*Long Term Support*), la version stable maintenue dans la durée.
3. Lancez l'installateur et gardez les options par défaut. npm est installé en même temps.
4. **Fermez puis rouvrez VS Code**, pour que le terminal trouve les nouvelles commandes.

Vérifiez l'installation :

```powershell
node --version
npm --version
```

```text
v26.13.1
11.18.0
```

Si deux numéros de version s'affichent, tout est en place.

### Étape 3 : TypeScript

Il y a deux façons d'installer TypeScript :

| | Installation globale | Installation locale |
|:--|:--|:--|
| Commande | `npm install -g typescript` | `npm install --save-dev typescript` |
| Portée | Tout l'ordinateur | Le projet courant uniquement |
| Utilisation | `tsc` | `npx tsc` |
| Intérêt | Pratique pour s'exercer partout | Toute l'équipe utilise la même version |

**Pour la formation**, installez TypeScript globalement :

```powershell
npm install -g typescript
tsc --version
```

```text
Version 7.0.2
```

**Pour un vrai projet**, préférez l'installation locale : c'est ce que nous faisons à la section suivante.

---

## 3. Créer son premier projet

### Étape 1 : créer le dossier

```powershell
mkdir mon-projet-ts
cd mon-projet-ts
code .
```

`code .` ouvre le dossier courant dans VS Code. Si la commande n'est pas reconnue, utilisez **Fichier > Ouvrir le dossier**.

### Étape 2 : initialiser le projet npm

```powershell
npm init -y
```

Cette commande crée `package.json`, la **carte d'identité du projet** : nom, version, scripts et dépendances. L'option `-y` (*yes*) accepte les réponses par défaut.

Ouvrez `package.json` et remplacez :

```json
"type": "commonjs"
```

par :

```json
"type": "module"
```

Cela active les modules JavaScript modernes, donc les mots-clés `import` et `export`. Si la ligne `"type"` est absente, ajoutez-la.

### Étape 3 : installer TypeScript dans le projet

```powershell
npm install --save-dev typescript
```

`--save-dev` (ou `-D`) indique une dépendance **de développement** : TypeScript sert à fabriquer le programme, pas à le faire tourner.

Trois éléments sont apparus ou ont changé :

| Élément | Contenu | À versionner avec Git ? |
|:--------|:--------|:------------------------|
| `package.json` | TypeScript figure dans `devDependencies` | Oui |
| `package-lock.json` | Les versions exactes installées | Oui |
| `node_modules/` | Le code des paquets téléchargés | **Non** |

> `node_modules` peut être supprimé sans risque : `npm install`, sans rien d'autre, le recrée à partir de `package.json` et de `package-lock.json`. C'est aussi la première commande à lancer quand on récupère un projet existant.

### Étape 4 : créer la configuration TypeScript

```powershell
npx tsc --init
```

Cette commande crée `tsconfig.json`, que nous configurons juste après.

### Étape 5 : créer le dossier des sources

```powershell
mkdir src
```

Voici la structure visée. `dist` sera créé par le compilateur :

```text
mon-projet-ts/
├── node_modules/       paquets installés par npm
├── src/                votre code TypeScript (.ts)
├── dist/               JavaScript généré (.js), à ne jamais modifier à la main
├── package.json        configuration npm
├── package-lock.json   versions exactes des paquets
└── tsconfig.json       configuration TypeScript
```

---

## 4. Configurer le projet : tsconfig.json

Le fichier généré par `tsc --init` est déjà bien réglé. Faites les trois premières modifications ci-dessous ; la quatrième est facultative.

**1. Indiquer où sont les sources et où va le résultat.** Retirez les `//` devant ces deux lignes :

```jsonc
"rootDir": "./src",
"outDir": "./dist",
```

**2. Limiter la compilation au dossier `src`.** Ajoutez `include` **avant** `compilerOptions`, au premier niveau :

```jsonc
{
  "include": ["src"],
  "compilerOptions": {
    // ...
  }
}
```

Sans `include`, `tsc` prend **tous** les `.ts` du dossier, y compris ceux qui sont en dehors de `src`.

**3. Désactiver les fichiers annexes**, inutiles pour débuter :

```jsonc
"sourceMap": false,
"declaration": false,
"declarationMap": false,
```

**4. Facultatif : ne rien générer en cas d'erreur.** Ajoutez dans `compilerOptions` :

```jsonc
"noEmitOnError": true,
```

### Les options à connaître

| Option | Signification |
|:-------|:--------------|
| `include` | Dossiers à compiler |
| `rootDir` | Dossier racine des sources |
| `outDir` | Dossier de sortie du JavaScript |
| `target` | Version de JavaScript générée (`esnext` = la plus récente) |
| `module` | Système de modules (`nodenext` = les règles de Node.js) |
| `strict` | Active les vérifications strictes. **À laisser à `true`** |
| `noUncheckedIndexedAccess` | Considère que `tableau[0]` peut valoir `undefined` |
| `noEmitOnError` | Ne génère pas de `.js` si le code contient des erreurs |

---

## 5. Écrire, compiler, exécuter

### Écrire

Créez `src/outils.ts` :

```typescript
export function saluer(prenom: string): string {
    return `Bonjour ${prenom} !`;
}
```

Puis `src/index.ts` :

```typescript
import { saluer } from "./outils.js";

const prenom: string = "Alice";
console.log(saluer(prenom));
```

> **Pourquoi `./outils.js` alors que le fichier s'appelle `outils.ts` ?** Le chemin désigne le fichier qui existera *à l'exécution*, donc le `.js`. TypeScript fait lui-même le lien avec le `.ts`.

### Compiler

```powershell
npx tsc
```

**Aucun message = aucune erreur.** Le dossier `dist` contient maintenant `index.js` et `outils.js`.

Ouvrez `dist/index.js` : c'est le même code, sans les types.

```javascript
import { saluer } from "./outils.js";
const prenom = "Alice";
console.log(saluer(prenom));
```

### Exécuter

```powershell
node dist/index.js
```

```text
Bonjour Alice !
```

### Que se passe-t-il en cas d'erreur ?

Dans `src/index.ts`, remplacez `saluer(prenom)` par `saluer(42)`, enregistrez, puis relancez `npx tsc` :

```text
src/index.ts(4,20): error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
```

Le message se lit ainsi :

| Partie | Signification |
|:-------|:--------------|
| `src/index.ts` | Le fichier concerné |
| `(4,20)` | Ligne 4, colonne 20 |
| `TS2345` | Le code de l'erreur, utile pour une recherche |
| `Argument of type...` | On a fourni un `number` là où un `string` est attendu |

> **Attention :** par défaut, `tsc` génère le `.js` **même s'il y a des erreurs**. `node dist/index.js` affiche alors `Bonjour 42 !`. L'option `noEmitOnError` évite cette surprise.

Remettez `saluer(prenom)` avant de continuer.

---

## 6. Travailler en mode watch

En mode normal, il faut relancer `tsc` puis `node` à chaque modification. Le mode **watch** (*surveiller*) le fait automatiquement à chaque enregistrement.

| | Mode normal | Mode watch |
|:--|:--|:--|
| Compiler | `npx tsc` | `npx tsc --watch` (ou `-w`) |
| Exécuter | `node dist/index.js` | `node --watch dist/index.js` |
| Comportement | S'exécute une fois, puis rend la main | Reste actif et recommence à chaque changement |
| Arrêt | Automatique | **Ctrl + C** |
| Usage | Vérification ponctuelle, livraison | Développement au quotidien |

### Compiler en continu

```powershell
npx tsc --watch
```

```text
11:52:40 AM - Starting compilation in watch mode...

11:52:40 AM - Found 0 errors. Watching for file changes.
```

Le terminal reste **occupé** : c'est normal, `tsc` attend vos modifications. À chaque enregistrement (**Ctrl + S**), il recompile :

```text
11:52:46 AM - File change detected. Starting incremental compilation...

11:52:46 AM - Found 0 errors. Watching for file changes.
```

> `tsc --watch` **compile** en continu, mais n'exécute pas le programme.

### Exécuter en continu

`node --watch` relance le programme dès que le fichier `.js` change :

```powershell
node --watch dist/index.js
```

```text
Bonjour Alice !
Completed running 'dist/index.js'. Waiting for file changes before restarting...
```

### La bonne méthode : deux terminaux côte à côte

Compilez une première fois avec `npx tsc`, pour que `dist/index.js` existe. Puis, dans VS Code, scindez le terminal (icône **Fractionner le terminal**) :

```text
┌───────── Terminal 1 ─────────┬───────────── Terminal 2 ─────────────┐
│ npx tsc --watch              │ node --watch dist/index.js           │
│                              │                                      │
│ surveille src/*.ts           │ surveille dist/index.js              │
│ et génère dist/*.js          │ et relance le programme              │
└──────────────────────────────┴──────────────────────────────────────┘
```

Modifiez un `.ts` et enregistrez : le terminal 1 recompile, puis le terminal 2 affiche le nouveau résultat.

Vérifiez toujours qu'il n'y a pas d'erreur dans le terminal 1 : le terminal 2 ne connaît pas les types.

---

## 7. Simplifier avec les scripts npm

Plutôt que de retenir ces commandes, donnez-leur un nom dans la partie `scripts` de `package.json` :

```json
"scripts": {
  "build": "tsc",
  "watch": "tsc --watch",
  "start": "node dist/index.js",
  "dev": "node --watch dist/index.js"
}
```

| Commande | Effet |
|:---------|:------|
| `npm run build` | Compile une fois |
| `npm run watch` | Compile en continu |
| `npm start` | Exécute une fois (raccourci de `npm run start`) |
| `npm run dev` | Exécute en continu |

Dans un script, on écrit `tsc` sans `npx` : npm trouve tout seul l'outil installé dans le projet.

> Vous retrouverez ce principe avec Angular, où `npm start` lance l'application.

### Les commandes npm essentielles

| Commande | Effet |
|:---------|:------|
| `npm init -y` | Crée `package.json` |
| `npm install` | Installe tout ce qui est listé dans `package.json` |
| `npm install <paquet>` | Ajoute une dépendance nécessaire à l'exécution |
| `npm install -D <paquet>` | Ajoute une dépendance de développement |
| `npm install -g <paquet>` | Installe un outil sur tout l'ordinateur |
| `npm uninstall <paquet>` | Retire un paquet |
| `npm list` | Liste les paquets du projet |
| `npm outdated` | Liste les paquets qui ont une version plus récente |

---

## 8. Exécuter les fichiers de la formation

Le dossier `typescript` de la formation contient notamment :

```text
typescript/
├── src/                exemples complets, de 01_helloworld.ts à 15_TP_Correction_Arnaud.ts
├── src_holed/          les mêmes fichiers, dans une version à compléter
├── dist/               JavaScript généré
└── tsconfig.json       configuration TypeScript
```

Il n'a pas de `package.json` : on utilise donc le `tsc` **global**, sans `npx`.

### Préparation

1. Placez-vous dans le dossier `typescript`, celui qui contient `tsconfig.json` :

   ```powershell
   cd typescript
   ```

2. Vérifiez que `tsconfig.json` contient bien `include`. Sinon, ajoutez la ligne :

   ```jsonc
   {
     "include": ["src"],
     "compilerOptions": {
       // ...
     }
   }
   ```

   Sans elle, `tsc` compile aussi `src_holed` : il affiche des erreurs `TS6059 ... is not under 'rootDir'` et dépose des `.js` au milieu des sources.

3. Compilez :

   ```powershell
   tsc
   ```

> **Si `tsc` affiche `src/03_array.ts ... Cannot find name 'fruits'`** : la variable `fruits` est utilisée sans avoir été déclarée. Ajoutez `const fruits: string[] = ["pomme"];` juste avant `fruits.push("poire");`. Les autres fichiers sont générés malgré cette erreur.

### Exemple 1 : `01_helloworld.ts`, les bases

```powershell
node dist/01_helloworld.js
```

```text
HelloWorld depuis TypeScript !
false
Bonjour Vincent
Au revoir Vincent
Bonjour depuis la fonction Vincent
```

On y voit des variables typées (`boolean`, `number`, `string`), un *template string* et une fonction typée.

### Exemple 2 : `07_enum.ts`, les énumérations

```powershell
node dist/07_enum.js
```

```text
0
Haut
On monte !
200
404
Succès !
Erreur interne du serveur !
Ressource introuvable !
Code non-géré: 405
```

`Direction.Haut` vaut `0`, et `Direction[0]` redonne `Haut` : un enum numérique se lit dans les deux sens.

### Exemple 3 : `09_objet.ts`, les objets

```powershell
node dist/09_objet.js
```

```text
Clavier est au prix de : 59.99
5000
house
Bob gagne 3500 €/mois
Designer
Lead Designer
```

Les deux dernières lignes montrent que l'opérateur *spread* (`...`) crée un **nouvel** objet : l'original n'est pas modifié.

### Exemple 4 : en mode watch

**Terminal 1**, pour compiler en continu :

```powershell
tsc --watch
```

**Terminal 2**, pour exécuter un fichier en continu :

```powershell
node --watch dist/01_helloworld.js
```

Dans `src/01_helloworld.ts`, remplacez `"Vincent"` par votre prénom et enregistrez. Le terminal 2 affiche aussitôt le nouveau résultat.

Pour changer de fichier, faites **Ctrl + C** dans le terminal 2 et relancez avec un autre nom. Laissez tourner le terminal 1 : il surveille tout le dossier `src`.

### Exemple 5 : provoquer une erreur

Le terminal 1 toujours actif, remplacez `height = 12;` par :

```typescript
height = "douze";
```

Le terminal 1 signale :

```text
src/01_helloworld.ts(21,1): error TS2322: Type 'string' is not assignable to type 'number'.
```

TypeScript a détecté l'erreur sans même exécuter le programme. Remettez ensuite `height = 12;`.

### Compiler un seul fichier

Le plus simple est de compiler tout le projet avec `tsc`, puis d'exécuter le fichier voulu. Avec TypeScript 7, `tsc src/09_objet.ts` échoue si un `tsconfig.json` est présent :

```text
error TS5112: tsconfig.json is present but will not be loaded if files are specified on commandline. Use '--ignoreConfig' to skip this error.
```

Si vous en avez vraiment besoin :

```powershell
tsc --ignoreConfig src/09_objet.ts --outDir dist
```

Dans ce cas, les réglages de `tsconfig.json` ne sont **pas** appliqués.

---

## 9. Dépannage

| Message ou symptôme | Cause | Solution |
|:--------------------|:------|:---------|
| `node`, `npm` ou `tsc` n'est pas reconnu | Outil absent, ou terminal ouvert avant l'installation | Fermer et rouvrir VS Code, sinon réinstaller |
| *L'exécution de scripts est désactivée sur ce système* | PowerShell bloque les scripts `.ps1` | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, ou utiliser un terminal **Invite de commandes** |
| `Cannot find module '...dist\xxx.js'` | Fichier non compilé, nom erroné ou mauvais dossier | Compiler, vérifier le nom et le dossier courant |
| Mes modifications n'apparaissent pas | Fichier non enregistré ou non recompilé | **Ctrl + S**, puis relancer `tsc` |
| `TS6059 ... is not under 'rootDir'` | Des `.ts` existent hors de `src` | Ajouter `"include": ["src"]` dans `tsconfig.json` |
| `TS5112 tsconfig.json is present...` | Un fichier est passé à `tsc` | Lancer `tsc` sans nom de fichier |
| `TS1287 A top-level 'export' modifier cannot be used...` | Projet en CommonJS | `"type": "module"` dans `package.json` |
| `TS2835 Relative import paths need explicit file extensions` | Extension absente dans l'import | Écrire `"./outils.js"` |
| `TS2591 Cannot find name 'process'` | Types de Node.js absents | `npm install -D "@types/node"`, puis `"types": ["node"]` dans `tsconfig.json` |
| Le terminal ne répond plus | Un mode watch est actif | **Ctrl + C**, ou ouvrir un autre terminal |

> Sous PowerShell, les guillemets autour d'un nom de paquet qui commence par `@` sont nécessaires.

---

## 10. Aide-mémoire

**Créer un projet**

```powershell
mkdir mon-projet-ts
cd mon-projet-ts
npm init -y
npm install --save-dev typescript
npx tsc --init
mkdir src
```

Ensuite, réglez `"type": "module"` dans `package.json`, puis `include`, `rootDir` et `outDir` dans `tsconfig.json`.

**Au quotidien**

| Je veux... | Mode normal | Mode watch |
|:-----------|:------------|:-----------|
| Compiler (TypeScript local) | `npx tsc` | `npx tsc --watch` |
| Compiler (TypeScript global) | `tsc` | `tsc --watch` |
| Exécuter | `node dist/index.js` | `node --watch dist/index.js` |
| Vérifier les types sans générer de fichier | `npx tsc --noEmit` | `npx tsc --noEmit --watch` |

**Pour aller plus loin**

- Documentation TypeScript : <https://www.typescriptlang.org/docs/>
- Options de `tsconfig.json` : <https://www.typescriptlang.org/tsconfig/>
- Tester en ligne, sans installation : <https://www.typescriptlang.org/play>
- Documentation Node.js : <https://nodejs.org/docs/latest/api/>
