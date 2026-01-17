//your code here
const userName = document.getElementById("userName");
const userImage = document.getElementById("userImage");
const infoDisplay = document.getElementById("additionalInfo");
const buttons = document.querySelectorAll("[data-attr]");
const getUserBtn = document.getElementById("getUser");

let currentUser = null;

// Fetch random user
async function fetchUser() {
  infoDisplay.textContent = ""; // clear additional info
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  currentUser = data.results[0];

  const { first, last } = currentUser.name;
  userName.textContent = `${first} ${last}`;
  userImage.src = currentUser.picture.large;
}

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (!currentUser) return;

    const attr = button.getAttribute("data-attr");

    let value = "";
    if (attr === "age") value = currentUser.dob.age;
    if (attr === "email") value = currentUser.email;
    if (attr === "phone") value = currentUser.phone;

    infoDisplay.textContent = value;
  });
});

// Get new user
getUserBtn.addEventListener("click", fetchUser);

// Initial load
fetchUser();
