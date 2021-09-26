const loginButton = document.querySelector("#login-button");

if (loginButton) {
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
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
        if(1){
          const interval = setInterval(() => {
            clearInterval(interval);
            location.assign("/");
          }, 1000);
        }
      } else {
        showModal("Unauthorized", "User or password is incorrect.");
      }
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
} else {
}

const registerButton = document.querySelector("#register-button");

if (registerButton) {
  registerButton.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.querySelector("#reg-email").value;
    const password = document.querySelector("#reg-password").value;
    const name = document.querySelector("#reg-name").value;
    const body = { email: email, password: password, name:name };
    // console.log("logging in...", body);
    fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        // logged in
        if(1){
          const interval = setInterval(() => {
            clearInterval(interval);
            location.assign("/");
          }, 1000);
        }
      } else {
        showModal("Error", "Something went wrong");
      }
    });
  });
}
