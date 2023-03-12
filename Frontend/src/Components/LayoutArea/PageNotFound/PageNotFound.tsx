import "./PageNotFound.css";
import imageSource from "../../../Assets/Images/page-not-found.gif"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <img src={imageSource} />			
        </div>
    );
}

export default PageNotFound;
