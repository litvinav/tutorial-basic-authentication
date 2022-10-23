# Summary

This is minimal example demonstrating basic authentication behaviour using client side sessions and server side AES encryption using Next, Prisma and Tailwind.

In this example / tutorial the following behaviour is covered. Some things have been simplified to simplify the example.
For this reason JsonWebTokens (JWTs) have been replaced with normal json's and global (user)states have been not implemented.

```mermaid
sequenceDiagram

alt sing up
Client ->> Server: email, username, password, confirm_password
Server ->> Server: hash password
Note right of Server: Password's should not be stored as clear text!<br/>One way hashing is used to make password unreadable.
Server ->> Database: creating a user
Database ->> Server: 
Server ->> Client: Redirect to /login
end

alt login
Client ->> Server: email, password
Server ->> Server: hash password
Server ->> Database: find existing user
Database ->> Server: 
Note right of Server: Make sure not to send the password back to client!
Server ->> Client: Save a encrypted data as a cookie called "identity" and redirect to /
end

alt get user data
Client ->> Server: Request user data
Server ->> Server: Decrypt the data on the server and check if identity is not expired
Server ->> Database: Verify that the user exists
Database ->> Server: User data
alt valid and exists
Server ->> Client: Display user data
else not valid
Server ->> Client: Remove cookie from browser
end
end
```
