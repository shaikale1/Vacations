class AppConfig {

    public port = 4000;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "vacationsDatabase";
    public imageUrl = "http://localhost:4000/api/vacations/images/";
}

const appConfig = new AppConfig()

export default appConfig;