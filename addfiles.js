// Function to handle form submission
document.getElementById("my-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Get user input
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;

  // Create an object to store user details
  var userDetails = {
    name: name,
    email: email,
  };

  // Retrieve existing user data from local storage (if any)
  var existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Add the new user to the array
  existingUsers.push(userDetails);

  // Store the updated user data in local storage
  localStorage.setItem("users", JSON.stringify(existingUsers));

  // Clear the form fields
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";

  // Display a success message
  var messageDiv = document.querySelector(".msg");
  messageDiv.textContent = "User added successfully!";
  setTimeout(function () {
    messageDiv.textContent = "";
  }, 3000); // Clear the message after 3 seconds

  // Refresh the user list
  displayUsers();
});

// Function to display the list of users
function displayUsers() {
  var usersList = document.getElementById("users");
  var users = JSON.parse(localStorage.getItem("users")) || [];

  usersList.innerHTML = ""; // Clear the existing list

  // Loop through the users and create list items
  users.forEach(function (user, index) {
    var li = document.createElement("li");
    li.textContent =
      "Name: " + user.name + ", Email: " + user.email;
    usersList.appendChild(li);
  });
}

// Initial display of users when the page loads
displayUsers();