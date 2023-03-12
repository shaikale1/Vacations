class AppConfig {

    public usersVacationUrl = "http://localhost:4000/api/users/vacations/";
    public adminVacationUrl= "http://localhost:4000/api/admin/vacations/";
    
    public imagesVacationUrl= "http://localhost:4000/api/vacations/images/";
    
    public followUrl = "http://localhost:4000/api/users/follow/";
    public unfollowUrl = "http://localhost:4000/api/users/unfollow/";
    
    public editVacationUrl= "http://localhost:4000/api/admin/vacations/";
    public addVacationUrl= "http://localhost:4000/api/add/vacations";
    public loginUrl= "http://localhost:4000/api/auth/login/";
    public registerUrl= "http://localhost:4000/api/auth/register/";

}

const appConfig = new AppConfig()

export default appConfig;