const session = require('express-session');

const frontendSession = session({
    name: "FSID", // Eindeutiger Name für Kunden-Session
    secret: "geheimes_passwort", // Geheimes Passwort für die Verschlüsselung
    resave: false, // Session wird nicht bei jeder Anfrage gespeichert
    saveUninitialized: false, //leere Session wird nicht gespeichert
    rolling: true, // Session wird bei jeder Anfrage verlängert
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 Stunde
  });

const backendSession = session({
  name: "BSID", 
  secret: "geheimes_passwort", 
  resave: false, 
  saveUninitialized: false, 
  //rolling: true, 
  cookie: { maxAge: 1000 * 60 * 60 }, 
});

module.exports = {
    frontendSession,
    backendSession,
  };



