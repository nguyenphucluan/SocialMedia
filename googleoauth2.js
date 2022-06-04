const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('./models/Users')

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: "507699291037-qd15fcc8d6cncol089bg92q1sq6dr3mt.apps.googleusercontent.com",
        clientSecret: "X9TcZv6GPKMDb2fdFeHB5Stl",
        callbackURL: "https://congthongtinsinhvientdtu.herokuapp.com/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        if (profile._json.hd == 'student.tdtu.edu.vn') {
            Users.findOne({ email: profile.emails[0].value }, function(err, data) {
                if (!data) {
                    let student = new Users({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        role: 'student'
                    })
                    student.save()
                }
                //console.log(data)
                return done(null, data)
            })
        } else {
            err = 'Please login using TDTU gmail'
            return done(err)
        }
    }
));