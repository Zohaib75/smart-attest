export COMPOSER_PROVIDERS='{
    "google": {
        "provider": "google",
        "module": "passport-google-oauth2",
        "clientID": "1076018451281-hbiieg3hjdh92gg3qqe2r9789fcjtj85.apps.googleusercontent.com",
        "clientSecret": "",
        "authPath": "/auth/google",
        "callbackURL": "/auth/google/callback",
        "scope": "https://www.googleapis.com/auth/plus.login",
        "successRedirect": "http://localhost:3002/check?loggedIn=true",
        "failureRedirect": "/"
    }
}'

composer-rest-server -c admin@smart-attest -w true -n never -m true -p 3001