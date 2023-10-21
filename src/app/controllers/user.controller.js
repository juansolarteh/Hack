const user = require("../models/User");
const { httpErrorServer } = require("../helpers/httpError.helper");

const getPermissions = async (req, res) => {
  let permissions;
  try {
    permissions = await user.findById(req.userId).populate('permissions', { _id: 0 })
    .select("permissions").transform(resp => resp.permissions.map(perm => perm.name))
  } catch (error) {
    return httpErrorServer(res, error.message);
  }
  res.status(200).json({permissions: permissions});
};

module.exports = {
  getPermissions
};
