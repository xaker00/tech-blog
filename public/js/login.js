const loginButton = document.querySelector("#login-button");

if (loginButton) {
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("logging in...");
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const body = { email: email, password: password };
    // console.log("logging in...", body);
    fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        // logged in
        location.assign("/");
      } else {
        showModal("Unauthorized", "User or password is incorrect.");
      }
      console.log("response", response);
    });
  });
}

const logoutButton = document.querySelector("#logout-button");
if (logoutButton) {
  logoutButton.addEventListener("click", (event) => {
    event.preventDefault();
    fetch("/api/users/logout", { method: "POST" }).then(() => {
      location.assign("/");
      // location.reload();
    });
    console.log("logging out...");
  });
}else{
  console.log("logoutButton not found");
}

const registerButton = document.querySelector("#register-button");

if (registerButton) {
  registerButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("registering...");
  });
}
