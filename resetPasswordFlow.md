If user is not logged in, then user will initiate password reset request from Login
    Redirect to /submitpasswordreset

If user is logged in already, then allow user to initiate reset password from Profile
    Redirect to /submitpasswordreset?email={currentuser}

From /submitpasswordreset, User enters email address and clicks send request
    - Limit requests from same browser to once every 5 minutes to prevent spam
    - (Temporarily) Limit global password reset requests to < 1000 month to comply with MailTrap usage
    - If email address is verified to be a valid user, then email is sent to given email address
        Generate token from backend to allow user to authenticate into their account via an 8 digit code given via email for a brief amount of time (access/refresh token expires within 10 minutes of issuance) (basically, use flow similar to Signin to generate and issue access token via email)
        
        Message will be "check your email for password reset instructions" in any case to prevent unnecessary leakage of information for users

User receives email and clicks link to be directed to /passwordreset?token={}
    User enters new password with confirmation, then backend does work to remove previous token(?) and change stored password to new one

    To reset password, user will need to be authenticated (and the aforementioned flow will allow user to auth without password). Reset password page will be like Register page but user name is already known.


/submitpasswordreset
Form which allows user to enter email address to send email to reset password with
Updates with "Check your email for password reset instructions"

/passwordreset?token={asdf}
Form which requires user to use authenticated link from email to prompt user to change their password