const valid = ({ username, email, fullname, password, cf_password }) => {
  const err = {};
  const type = {};

  if (!username) {
    err.username = "Please enter a user name.";
    type.username = "username";
  } else if (username.length < 8) {
    err.username = "User name must be at least 8 characters.";
    type.username = "username";
  } else if (username.length > 20) {
    err.username = "User name is up to 20 characters long.";
    type.username = "username";
  }

  if (!fullname) {
    err.username = "Please enter a full name.";
    type.fullname = "fullname";
  } else if (username.length < 12) {
    err.username = "User name must be at least 12 characters.";
    type.fullname = "fullname";
  } else if (username.length > 50) {
    err.username = "User name is up to 50 characters long.";
    type.fullname = "fullname";
  }

  if (!email) {
    err.email = "Please enter a email.";
    type.email = "email";
  } else if (!validateEmail(email)) {
    err.email = "Email format is incorrect.";
    type.email = "email";
  }

  if (!password) {
    err.password = "Please enter a password.";
    type.password = "password";
  } else if (password.length < 6) {
    err.password = "Password must be at least 6 characters.";
    type.password = "password";
  }

  if (!cf_password) {
    err.cf_password = "Confirm password did not match.";
    type.cf_password = "cf_password";
  }
  if (cf_password !== password) {
    err.cf_password = "Confirm password did not match.";
    type.cf_password = "cf_password";
  }

  return {
    errType: type,
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;
