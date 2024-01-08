const api = require('../../api');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.maintenance = (req, res) => {
  api.getMaintenance()
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
};

exports.maintenanceWithID = (req, res) => {
  api.getMaintenance(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
};
