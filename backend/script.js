const loginBox = document.getElementById("loginBox");
const donateBox = document.getElementById("donateBox");
const dashboardBox = document.getElementById("dashboardBox");
const totalDonationsSpan = document.getElementById("totalDonations");

// Login function
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(email === "" || password === "") {
    alert("Please enter all details ❗");
    return;
  }

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, password})
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    if(data.status === 'success') {
      loginBox.style.display = 'none';
      donateBox.style.display = 'block';
      updateDashboard();
    }
  });
}

// Donate function
function donate() {
  const item = document.getElementById("item").value;
  const quantity = document.getElementById("quantity").value;

  if(item === "" || quantity === "") {
    alert("Please fill all donation details 📦");
    return;
  }

  fetch('http://localhost:3000/donate', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({item, quantity})
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").innerHTML = data.message;
    updateDashboard();
  });
}

// Update Dashboard count
function updateDashboard() {
  fetch('http://localhost:3000/donations')
  .then(res => res.json())
  .then(data => {
    totalDonationsSpan.innerText = data.length;
    donateBox.style.display = 'none';
    dashboardBox.style.display = 'block';
  });
}

// Logout function
function logout() {
  dashboardBox.style.display = 'none';
  loginBox.style.display = 'block';
}