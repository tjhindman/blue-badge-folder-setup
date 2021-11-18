// USER SIGNUP
userSignUp = () => {
  let userEmail = document.getElementById("emailSignup").value;
  let userPass = document.getElementById("pwdSignup").value;
  let newUserData = {
    user: {
      email: userEmail,
      password: userPass,
    },
  };
  console.log(
    `NEW USER DATA ==> ${newUserData.user.email}    ${newUserData.user.password}`
  );

  fetch("http://localhost:3000/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.sessionToken);
      let token = data.sessionToken;

      // need to read more about localStorage and localStorage.setItem()
      localStorage.setItem("SessionToken", token);
      tokenChecker();
    })
    .catch((err) => console.log(err));
};

// USER LOGIN
userLogin = () => {
  console.log("userLogin function called!");
};

// USER LOGOUT
userLogout = () => {
  console.log("userLogout function called!");
};

// TOKEN CHECKER FUNCTION
tokenChecker = () => {
  console.log("tokenChecker function called!");
};
tokenChecker();
