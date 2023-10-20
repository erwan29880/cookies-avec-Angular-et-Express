const sqlite3 = require("sqlite3").verbose();
const Pwd = require('../crypt/crypt');

/**
 * connexion à la base de données, ou création si elle n'existe pas
 *  
 */
class Bdd extends Pwd {

    // variable de classe pour la connection à la base de données
    db = null;

    constructor() {
        super();
        // initialisation de la connexion à la base de données
        this.db = new sqlite3.Database('bdd.db', err => {
            if (err) {
                console.error(err.message);
                return;
            }
        });
    }


    /**
     * création de la table lors du lancement du programme
     * décommenter la ligne de création dans le fichier index.js
     */
    createTable () {
        const sql_create = `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pseudo TEXT NOT NULL,
            password TEXT NOT NULL 
          );`;
          
          this.db.run(sql_create, err => {
            if (err) {
              return console.error(err.message);
            }
            console.log("Création réussie de la table posts");
          });
    }

    /**
     * ajouter une ligne dans la table
     * décommenter la ligne correspondante dans le fichier index.js
     */
    insertInitialData() {
        const sql_insert = `INSERT INTO users (pseudo, password) VALUES (?, ?);`;
        this.db.run(sql_insert, ['pseudo', this.encrypt('pwd')],  err => {
          if (err) {
            console.error(err.message);
            return;
          }
          console.log("Alimentation réussie de la table posts");
        });
    }

    /**
     * selectionner toutes les données
     * @returns promise
     */
    async getData() {
        const sql = "SELECT id, pseudo, password FROM users ORDER BY id";        
        const promise = new Promise((resolve) => {
            this.db.all(sql, (err, rows) => {
                if (err) {
                  console.error(err.message);
                  return;
                }
                resolve(rows);
            })
        });

        return promise.then(val => val);
    }

    /**
     * récupérer le couple pseudo/pwd en bdd
     * @param {string} pseudo 
     * @param {string} pwd 
     */
    async getPseudoPwd(pseudo, pwd) {
      const sql = "SELECT pseudo, password FROM users where pseudo=? and password=?";        
        const promise = new Promise((resolve) => {
            this.db.get(sql, [pseudo, this.encrypt(pwd)], (err, rows) => {
                if (err) {
                  console.error(err.message);
                  return;
                }
                resolve(rows);
            })
        });

        return promise.then(val => val);
    }


    /**
     * insére une ligne dans la table
     * @param {array} data 
     * @returns Promise
     */
    async postData(data) {
        const sql = "INSERT INTO users (pseudo, password) VALUES (?, ?);";
        const promise = new Promise((resolve) => {
            const dataEnc = [data[0], this.encrypt(data[1])];
            this.db.run(sql, dataEnc, (err, rows) => {
                if (err) {
                  console.error(err.message);
                  return;
                }
                resolve(rows);
            })
        });
        return promise.then(val => val);
    }

    /**
     * supprime une entrée de la table
     * @param {int} id 
     * @returns Promise
     */
    async deleteData(id) {
        const sql = "DELETE FROM users where id = ?;";
        const promise = new Promise((resolve) => {
            this.db.run(sql, id, (err, rows) => {
                if (err) {
                  console.error(err.message);
                  return;
                }
                resolve(rows);
            })
        });
        return promise.then(val => val);
    }
}

module.exports = Bdd