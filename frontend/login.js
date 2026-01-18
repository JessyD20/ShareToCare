function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Please enter all details ❗");
  } else {
    alert("Login successful 🎉 Welcome!");
    window.location.href = "donate.html";
  }
}