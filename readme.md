# gestion de session distante avec express et angular 

## installation :  

```bash
docker-compose up -d --build
```

Les éléments qui peuvent être changés pour les configurations d'url : 
- proxy/default.conf
- front/src/app/fetch.service.ts
- serveur/middlewares/session.js

#### utilisation :  

aller sur la page http://localhost:4200   

Deux pages sont diponibles : 

- / : vérification de la session  
- /auth : autentification, logout  

Le serveur enregistre une session par défaut. Si bonne identification, une nouvelle entrée dans redis indique que l'utilisateur est bien autentifié.  

Le logout ne supprime pas le cookie, simplement la ligne d'autentification dans redis.   

Le temps de vie du cookie est à affiner dans serveur/middleware.
