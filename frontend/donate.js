function donate() {
  const item = document.getElementById("item").value;
  const quantity = document.getElementById("quantity").value;

  if (item === "" || quantity === "") {
    alert("Please fill all donation details 📦");
  } 
  else if (quantity <= 0) {
    alert("Quantity must be greater than zero ❌");
  } 
  else {
    document.getElementById("result").innerHTML =
      `🙏 Thank you for donating <b>${quantity}</b> ${item}(s)! 💖`;
  }
}