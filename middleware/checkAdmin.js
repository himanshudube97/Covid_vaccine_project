import Errorhandler from "../utils/errorhandler.js";


const checkAdmin  =(req, res, next) =>{
    console.log(req.user, "user");
    if(req.user.role !== "admin"){
        return next(new Errorhandler("You are not admin", 400));
    }
    next();
};
export default checkAdmin;