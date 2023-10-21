const user = require("../models/User");
const jwt = require("jsonwebtoken");
const { httpErrorServer } = require("../helpers/httpError.helper");

const signin = async (req, res) => {
    const { email, password } = req.body;

    let userFound;
    try {
        userFound = await user
            .findOne({ email })
            .select("password name permissions")
            .populate("permissions", { _id: 0 });
    } catch (error) {
        return httpErrorServer(res, error.message);
    }

    if (!userFound) return res.status(403).send("Incorrect credentials");

    const correctPassword = await user.checkPassword(
        userFound.password,
        password
    );

    if (!correctPassword) return res.status(403).send("Incorrect credentials");

    const token = jwt.sign(
        {
            id: userFound._id,
        },
        process.env.SECRET,
        {
            expiresIn: 43200, //12 hours
        }
    );

    res.status(200).json({
        name: userFound.name,
        access_token: `Bearer ${token}`,
        permissions: userFound.permissions.map((perm) => perm.name)
    });
};

module.exports = {
    signin,
};
