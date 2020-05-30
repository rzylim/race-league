const { Role } = require("../models/Role");
const assembleRoles = require("../client/src/authorisation/roles");

const getAndAssembleRoles = () =>
  Role.find({}).then((data) => {
    global.roles = assembleRoles(data);
  });

// assemble roles on server startup
getAndAssembleRoles();

// reassemble roles on changes to database
Role.watch().on("change", (_) => getAndAssembleRoles());
