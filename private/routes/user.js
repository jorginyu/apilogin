const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const modelo = require('../models/models.js');

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  console.log(password);
  if (password === '' || email === '') {
    res.send('<h1>Error... </h1>');
  }

  modelo.User.findOne({
    where: { email }
  })
    .then(user => {
      //comparamos el password recibido con el password del usuario guardado en bdd, ambos encriptados
      if (bcrypt.compareSync(password, user.password)) {
        //si ok, devolvemos usuario a siguiente "then"
        return user;
      } else {
        // si no coinciden pasamos msg error a "catch"
        throw 'password no coincide';
      }
    })
    .then(user => {
      //ok, login correcto, creamos un token aleatorio
      console.log(user);
      let token = '';
      const caractersPossibles =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const longitud = 15;
      for (var i = 0; i < longitud; i++) {
        token += caractersPossibles.charAt(
          Math.floor(Math.random() * caractersPossibles.length)
        );
      }
      //devolvemos un nuevo objeto "token" al siguiente then, que incluye id y nombre de usuario
      return Token.create({
        token,
        user: user
      });
    })
    .then(token => console.log(token))
    .then(token => res.json({ ok: true, data: token })) //enviamos respuesta con el token completo en json
    .catch(error => res.json({ ok: false, error: error }));
});

router.post('/newUser', (req, res, next) => {
  let body = req.body;

  if (body.nombre === '' || body.password === '' || body.email === '') {
    res.json({ ok: false, error: "faltan datos" });
  }

  if (body.password === body.passwordCheck) {
    const hash = bcrypt.hashSync(body.password, 10);
    body.password = hash;

    modelo.User.findOne({ where: { email: body.email } })
      .then(personaje => {
        if (!personaje) {
          console.log('New user');
          return modelo.User.create(body);
        } else {
          console.log('Usuario ya existe');
          throw 'usuario ya existe';
        }
      })
      .then(user => {
        console.log('user essssss', user.dataValues);
        //ok, login correcto, creamos un token aleatorio
        let token = '';
        const caractersPossibles =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const longitud = 15;
        for (var i = 0; i < longitud; i++) {
          token += caractersPossibles.charAt(
            Math.floor(Math.random() * caractersPossibles.length)
          );
        }
        //devolvemos un nuevo objeto "token" al siguiente then, que incluye id y nombre de usuario
        return modelo.Token.create({
          token,
          nombre: user.dataValues.nombre
        });
      })
      .then(token => res.json({ ok: true, data: token })) //enviamos respuesta con el token completo en json
      .catch(err => res.json({ ok: false, error: err }));
  } else {
    res.json({ ok: false, error: "password no coincide" });
  }
});

module.exports = router;
