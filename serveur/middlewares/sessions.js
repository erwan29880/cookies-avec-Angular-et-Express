// sql : vérification pseudo/pwd
const bdd = require('../bdd/bdd');
const db = new bdd();
const cors = require("cors");
const session = require('express-session');
const redis = require('redis');
const exTime = 100000;

// -----------------------------------------
// middlewares redis, session

// redis
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient({
    url: 'redis://redis_cookie:6379',
    legacyMode: true
});
redisClient.connect();
const sessionStore = new RedisStore({ client: redisClient });

exports.corsExp = cors(
    {
        origin: 'http://localhost:4201',
        credentials: true
    }
);


// session
exports.sessionExp = session({
    store: sessionStore,
    secret: "thisis",
    name: "expresssession",
    httpOnly: false,
    saveUninitialized: true,
    cookie: { maxAge: exTime, secure: false },
    resave: true, 
    sameSite: "none"
});



// -----------------------------------------
// middlewares gestion de session


/**
 * vérification pseudo/pwd dans la base de données sqlite 
 */
exports.checkAuthentification = (req, res, next) => {
    db.getPseudoPwd(req.body.pseudo, req.body.pwd).then(resp => {
        if (resp === undefined) {
            res.header("Content-Type", "application/json");
            res.status(200).send({message :"pas d'identification en base de données"});
        }
        else next();
    })
};


/**
 * vérification que l'identifiant de session (cookie) est dans redis
 */
exports.checkSession = (req, res, next) => {
    redisClient.get('sess:' + req.session.id, function(err, reply) {
        if (reply !== null) {
            next();
        }
        else {
            res.header("Content-Type", "application/json");
            res.status(200).send({message :'nosession'});
        }
    });
};


/**
 * vérifie que l'identifiant de session est associé à une permission dans redis 
 */
exports.checkPermission = (req, res, next) => {
    redisClient.get(req.session.id, (err, reply) => {
        if (reply === "auth") {
            res.status(200).send({message : "session"});
        }
        else {
            res.status(200).send({message :'nosession'});        
        }
    })
}


/* 
* rentrer l'identifiant de session dans redis
* ce middleware vient après la vérification sqlite
*/
exports.setSession = async (req, res, next) => {
    // ajout autre clé/valeur dans redis avec "auth"
    redisClient.set(req.session.id, 'auth', 'EX', exTime, (err, reply) => {
        if (err) res.status(200).send({message : "nous n'avons pas pu vous autoriser"});
    });
    // ajout d'une date de péremption pour la permission
    redisClient.expire(req.session.id, parseInt(exTime/1000));

    res.status(200).send({message : "vous êtes autentifié(e)"});
}


/**
 * supprimer l'identifiant de session dans redis 
 */
exports.logout = (req, res) => {
    redisClient.del(req.session.id, (err, reply) => {
        if (err) res.status(200).send({message : "erreur de déconnection"}); 
        if (reply === 1) {
            res.status(200).send({message : "vous êtes bien déconnecté"});
        } else {
            res.status(200).send({message : "vous n'êtes pas connecté"});
        }
    });
}