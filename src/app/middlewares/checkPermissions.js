const user = require("../models/User");
const { httpErrorServer } = require("../helpers/httpError.helper");

const checkPermissions = function (permitedPermission, errorMessage) {
  return async (req, res, next) => {
    try {
      const userFond = await user
        .findById(req.userId, { contrasenia: 0 })
        .populate("permissions").select('permissions');

      const permissions = userFond.permissions;

      for (const perm of permissions) {
        if (permitedPermission.includes(perm.name)) {
          return next();
        }
      }
    } catch (error) {
      return httpErrorServer(res, error.message);
    }

    return res.status(403).send(errorMessage);
  };
};

module.exports = checkPermissions
