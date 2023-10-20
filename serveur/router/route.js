const express = require('express');
const router = express.Router();
const sess = require('../middlewares/sessions')

// middlewares
router.use(sess.corsExp);
router.use(sess.sessionExp);
router.use(express.json());
router.use(express.urlencoded({extended: false}));


// test : pas d'accès à cette page si pas identifié (sql/redis)
router.get('/checkSession', sess.checkSession, sess.checkPermission);

// vérification pseudo/pwd et éventuellement enregistrement de la session dans redis
router.post('/auth', sess.checkAuthentification, sess.setSession)

// suppression de la session dans redis
router.get('/logout', sess.logout)

module.exports = router