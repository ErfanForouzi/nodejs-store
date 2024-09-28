const createError = require("http-errors");
const Controller = require("../controller");

class HomeController extends Controller {
    async indexPage(req,res,next){
        try {
            return res.status(200).send("This is Index Page")
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new HomeController();