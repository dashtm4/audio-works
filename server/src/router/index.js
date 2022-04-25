const express = require('express');
const audioRoute = require('./audio.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/audio',
    route: audioRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
