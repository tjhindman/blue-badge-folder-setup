// USER SIGNUP
userSignUp = async () => {
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

  try {
    const res = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    const data = await res.json();

    console.log("token: ", data.token);
    let token = data.token;

    // need to read more about localStorage and localStorage.setItem()
    localStorage.setItem("token", token);
    tokenChecker();
    console.log("User signed up!");
  } catch (err) {
    console.log(err);
  }
};

// USER LOGIN
userLogin = async () => {
  let userEmail = document.getElementById("emailLogin").value;
  let userPass = document.getElementById("pwdLogin").value;
  let userData = {
    user: {
      email: userEmail,
      password: userPass,
    },
  };
  console.log(
    `USER DATA ==> ${userData.user.email}    ${userData.user.password}`
  );

  try {
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();

    console.log("token: ", data.token);
    let token = data.token;

    // need to read more about localStorage and localStorage.setItem()
    localStorage.setItem("token", token);
    tokenChecker();
    console.log("User logged in!");
  } catch (err) {
    console.log(err);
  }
};

// USER LOGOUT
userLogout = () => {
  localStorage.setItem("token", undefined);
  console.log(`token ==> ${localStorage.token}`);
  tokenChecker();
};

// TOKEN CHECKER FUNCTION
tokenChecker = () => {
  console.log("tokenChecker function called!", localStorage);
};
tokenChecker();
