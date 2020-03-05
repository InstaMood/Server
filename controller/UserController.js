class UserController {
    static login(req, res, next) {
        res.status(200).json("ok");
    }
};

module.exports = UserController;