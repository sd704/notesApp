# Note API

## Api routes:

- ### GET http://127.0.0.1:3000/user

    Returns list of all users (name and email).
    
    Example:
    ```
    GET http://127.0.0.1:3000/user
    ```

- ### POST http://127.0.0.1:3000/user

    Create a new user. Returns a token that can be used for session or modifying this user.
    
    Request Body: name, email, password

    Example:
    ```
    POST http://127.0.0.1:3000/user
    Content-Type: application/json

    {
        "name": "Dexter",
        "email": "dexter@google.co",
        "password": "dexter8712"
    } 
    ```

- ### GET http://127.0.0.1:3000/user/:id

    Returns the user info where id matches

    Example:
    ```
    GET http://127.0.0.1:3000/user/64ca52f7fc78d2fc0bfab9ea
    ```

- ### PUT http://127.0.0.1:3000/user/:id

    Edit user name, email or password.

    Request Body: name, email, password, token

    Example:
    ```
    PUT http://127.0.0.1:3000/user/64ca52f7fc78d2fc0bfab9ea
    Content-Type: application/json

    {
        "name": "Dexter Junior",
        "email": "dexter@google.co",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNhNTJmN2ZjNzhkMmZjMGJmYWI5ZWEiLCJpYXQiOjE2OTA5ODExMTJ9.qvtWE2u4RfQ4sc9ix6LVugSBTF8l_UqaKjHOCu24hJI"
    }
    ```

- ### POST http://127.0.0.1:3000/validateuser

    Validate user, will return token if email and password validates.

    Request Body: email, password

    Example:
    ```
    POST http://127.0.0.1:3000/validateuser
    Content-Type: application/json

    {
        "email": "dexter@google.co",
        "password": "dexter8712"
    }
    ```

- ### GET http://127.0.0.1:3000/user/:userId/note

    Returns all notes a specific user has

    Example:
    ```
    GET http://127.0.0.1:3000/user/64ca52f7fc78d2fc0bfab9ea/note
    ```

- ### GET http://127.0.0.1:3000/user/:userId/note/:noteId

    Returns a specific note

    Example:
    ```
    GET http://127.0.0.1:3000/user/64ca52f7fc78d2fc0bfab9ea/note/64ca52f7fc78d2fc0bfab9e9
    ```

- ### POST http://127.0.0.1:3000/user/:userId/note/

    Add a new note

    Request Body: title, text, token

    Example:
    ```
    POST http://127.0.0.1:3000/user/64ca52f7fc78d2fc0bfab9ea/note/
    Content-Type: application/json

    {
        "title": "Office Work",
        "text": "Submit report to manager",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNhNTJmN2ZjNzhkMmZjMGJmYWI5ZWEiLCJpYXQiOjE2OTA5ODExMTJ9.qvtWE2u4RfQ4sc9ix6LVugSBTF8l_UqaKjHOCu24hJI"
    }
    ```

- ### PUT http://127.0.0.1:3000/user/:userId/note/:noteId

    Update a note

    Request Body: title, text, completed, token

    Example:
    ```
    PUT http://127.0.0.1:3000/user/64ca52f7fc78d2fc0bfab9ea/note/64ca52f7fc78d2fc0bfab9e9
    Content-Type: application/json

    {
        "completed": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNhNTJmN2ZjNzhkMmZjMGJmYWI5ZWEiLCJpYXQiOjE2OTA5ODExMTJ9.qvtWE2u4RfQ4sc9ix6LVugSBTF8l_UqaKjHOCu24hJI"
    }
    ```

- ### DELETE  http://127.0.0.1:3000/user/:userId/note/:noteId

    Delete a specific note

    Request Body: token

    Example:
    ```
    DELETE  http://127.0.0.1:3000/user/64ca52f7fc78d2fc0bfab9ea/note/64cba094b6fbc899a4a44b94
    Content-Type: application/json

    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNhNTJmN2ZjNzhkMmZjMGJmYWI5ZWEiLCJpYXQiOjE2OTA5ODExMTJ9.qvtWE2u4RfQ4sc9ix6LVugSBTF8l_UqaKjHOCu24hJI"
    }
    ```