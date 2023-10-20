# gestion de session distante avec express et angular 

## installation :  

#### redis : gestion de session
```bash
docker-compose up -d 
```


#### sqlite : gestion des utilisateurs

```bash
cd serveur
npm install
```

décommenter les lignes de création et approvisionnement de la base de données sqlite puis effectuer deux fois la manipulation suivante :
```bash 
node index.js 
ctrl + c 
``` 

#### démarrer le serveur de développement :  

```bash
node index.js
```

#### installation et démarrage du serveur front angular de développement

```bash
cd front
npm install
ng serve
```  

#### utilisation :  

aller sur la page http://localhost:4200   

Deux pages sont diponibles : 

- / : vérification de la session  
- /auth : autentification, logout  

Le serveur enregistre une session par défaut. Si bonne identification, une nouvelle entrée dans redis indique que l'utilisateur est bien autentifié.  

Le logout ne supprime pas le cookie, simplement la ligne d'autentification dans redis.   

Le temps de vie du cookie est à affiner dans serveur/middleware.
