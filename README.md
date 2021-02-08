# VUE + SOCKET IO CHAT
Our future company internal chat

## Sitemap
- Login
- Home
- Chats
  - Private Chats (will show all company users)
  - Project Chats (will show all company projects)
  - Groups Chats (will show all group chats)
- Meetings
- Activity
- Profile
  - Logout
    
## Technology

#### 1) MYSQL SERVER
AWS RDS MYSQL SERVER, Nothing special here.
#### 2) API WEBSITE
Built in PHP, will be used for authentication + interacting with the MYSQL SERVER
#### 3) SOCKET SERVER
Using socket.io, will allow to realtime messaging between users
#### 4) CLIENT APP
Will use VUE.JS and makes calls to both the API WEBSITE and the SOCKET SERVER
