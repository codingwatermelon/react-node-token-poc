module.exports = {
  secret: "jacks-secret-key-857ff5bea3f",
  jwtExpiration: 3600,              // 1 hour
  jwtRefreshExpiration: 86400,      // 24 hours

  // For password resets
  jwtTempExpiration: 1800,          // 30 min
  jwtTempRefreshExpiration: 1800,   // 30 min
};
