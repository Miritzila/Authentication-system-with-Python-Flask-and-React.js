# Authentication system with Python Flask and React.js

Implementation of an authentication system.

- Signup: The user is able to pick their email, a password and submit the form; a new user can be created in the database, then the user must be redirected to the login form afterwards.
- 
- Login: The user fills out their email and password, then it's redirected to the private dashboard after a successful authentication.
- 
- Validation: Any page considered "private" is always validating that the current user is valid; if not, the page will redirect the user back to the login page.
- 
- Logout: At any moment the user is able to press "logout" in the navbar, and it will get redirected back to the login path.
