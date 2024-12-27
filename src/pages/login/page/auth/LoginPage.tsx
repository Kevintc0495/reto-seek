import FormModule from "../../modules/Form/FormModule";
import "./styles.scss";

const prefix = "p-login";

const LoginPage = () => {
  return (
    <div className={prefix}>
      <FormModule />
    </div>
  );
};

export default LoginPage;
