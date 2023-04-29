import "./RegisterPage.scss";

const RegisterPage = () => {
  return (
    <div className="authregister">
      <form className="register">
        <h1 className="register__header">Register</h1>
        <div className="register__container">
          <label className="register__container--label">Name</label>
          <input
            type="text"
            className="register__container--input"
            name="name"
            placeholder="Please enter name..."
            required
          />
        </div>
        <div className="register__container">
          <label className="register__container--label">Email</label>
          <input
            type="email"
            className="register__container--input"
            name="email"
            placeholder="Please enter email..."
            required
          />
        </div>
        <div className="register__container">
          <label className="register__container--label">Password</label>
          <input
            type="password"
            className="register__container--input"
            name="password"
            placeholder="Please enter password..."
            required
          />
        </div>
        <div className="register__container">
          <label className="register__container--label">Confirm Password</label>
          <input
            type="password"
            className="register__container--input"
            name="confirmPassword"
            placeholder="Please enter confirm password..."
            required
          />
        </div>
        <button className="register__submit" type="submit">
          register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
