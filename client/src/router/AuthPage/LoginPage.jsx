import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <div className="authlogin">
      <form className="login">
        <h1 className="login__header">Login</h1>
        <div className="login__container">
          <label className="login__container--label">Email</label>
          <input
            type="email"
            className="login__container--input"
            name="email"
            placeholder="Please enter email..."
            required
          />
        </div>
        <div className="login__container">
          <label className="login__container--label">Password</label>
          <input
            type="password"
            className="login__container--input"
            name="password"
            placeholder="Please enter password..."
            required
          />
        </div>
        <button className="login__submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
