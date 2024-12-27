import logo from "@/assets/images/wallpaper.png";
import "./styles.scss";

const prefix = "c-loading";

const Loading = () => {
  return (
    <div className={prefix}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Loading;
