### Summary

This app is based off of a React Router 6 Tutorial [by freeCodeCamp](https://www.youtube.com/watch?v=nDGA3km5He4) (Bob Ziroll). I reskinned the template given in his tutorial, with plans to develop a full fledged property management app. I enjoyed working with React, Express, Postgres, and NodeJS for this project, especially: 

- taking advantage of the powerful routing capabilities of React Router
- using Axios as middleware to intercept requests and responses
- using React powerful hooks, context, and state management system to dynamically/efficiently load resources
- using MUI for styling

Generally, the NodeJS dev experience is pleasant if you can get past the quirks of Javascript. 

Little did I know how complicated authentication can be to integrate! It’s my understanding, that NextJS has a lot more native features for implementing authentication, but I wanted to see if I could create an auth system from scratch.

Although I finished a lot of the core features for getting auth to work in native React (with a lot of help from [bezkoder](https://www.bezkoder.com/node-js-jwt-authentication-postgresql/#Source_Code)), I determined it was too reminiscent of “recreating the wheel” and I didn’t want to continue to support my hacked-together solution with the inevitability of obsoletion, so I scrapped this project for something with auth built-in (PHP Livewire, and I am currently (as of 7/6/24) working on finishing that up).

I’m releasing this version of my app as a proof-of-concept, because it could be useful for others that are trying to do something similar or to learn about token (and refresh token) authentication. I certainly don’t recommend integrating this into your own app, but I think it’s worth displaying as an example of how painful auth can really be to implement. Skim through the references below and reach out to me if you’d like clarification on anything. 

Thanks for checking it out!

### References:

- See [screenshots of app](docs) here
- Implementing token auth with refresh tokens
    - Generally, how this works is that there are tables on the backend which manage tokens (authentication, and refresh) associated to users. Upon a successful first-time authentication request, both tokens are generated when a user authenticates using their username and password. The authentication token allows the user to access restricted resources (which should only be accessed by certain authorized/authenticated users), without the user having to enter their username/password upon every request to access restricted information. This is because the auth token contains a few different identifiers (read more on this separately), and importantly, an expiration date. Once the auth token expires, the user will need to authenticate again UNLESS they have an active refresh token. If the refresh token exists, then the server will receive a request to generate a new auth token, and send it back to the user.
    - Why implement refresh tokens at all if an auth token essentially accomplishes the same? In a typical implementation an auth system, a refresh token typically lasts much longer (can be days, or even months) than an access token (typically ~1 hour). Using refresh token auth offers some unique benefits, such as 1) not needing the user to reinput their credentials if the refresh token is still active, which enhances the user experience, and 2) being able to generate and scope new auth tokens according to the resources being accessed. While its not strictly necessary, it allows for a better experience in general for both the user and backend dev in these respects.
    - General tutorial for implementing auth
        - https://www.bezkoder.com/node-js-jwt-authentication-postgresql/#Source_Code
            - Amazing tutorial, very well documented
            - This is the backend server code
            - https://www.bezkoder.com/react-refresh-token/
                - This is the frontend client code
                - See https://github.com/bezkoder/react-refresh-token-hooks/blob/master/ since I am using hooks and not class based components
    - Using Sequelize for SQL statements
        - https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries
    - General info on jsonwebtokens
        - https://www.bezkoder.com/jwt-json-web-token/
        - https://www.npmjs.com/package/jsonwebtoken
- Implementing a forgot password feature
    - Some great ideas in these posts:
        - [https://melodiessim.netlify.app/Reset Password Flow Using JWT/](https://melodiessim.netlify.app/Reset%20Password%20Flow%20Using%20JWT/)
        - https://blog.logrocket.com/implementing-secure-password-reset-node-js/
    - Ultimately, I ended up allowing the user to generate a token to auth (with short 5 minute expiry) using the password reset utility, which sent to the email on file associated with the username/email address. The email contained a link with an auth token embedded in the URL to reset their password using the auth token.
        - example email (I used Mailtrap for emails)
            
            ```sql
            Hello, click this link to reset your password:
            [http://192.168.64.3:5173/passwordreset?/username=testasd1234&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTcyMDMwMDY4NiwiZXhwIjoxNzIwMzAyNDg2fQ.SK1405V7PBsoDUNqoSww03IatZU8mg4QMdRe3I9pOKo](http://192.168.64.3:5173/passwordreset?//username=testasd1234&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTcyMDMwMDY4NiwiZXhwIjoxNzIwMzAyNDg2fQ.SK1405V7PBsoDUNqoSww03IatZU8mg4QMdRe3I9pOKo)
            ```