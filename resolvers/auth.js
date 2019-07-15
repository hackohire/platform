const connectToMongoDB = require('./../helpers/db');
// const CognitoIdentityServiceProvider = require('aws-sdk');
global.fetch = require('node-fetch');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var { CognitoUser } = require('amazon-cognito-identity-js');
const auth = require('./../helpers/auth');
const User = require('./../models/user')();

const { AWS_COGNITO_USERPOOL_ID } = process.env;
const { AWS_COGNITO_CLIENT_ID } = process.env;

/** Useful Variables */
let conn;

var authenticationData = {
    Username: '',
    Password: '',
};

var poolData = {
    UserPoolId: AWS_COGNITO_USERPOOL_ID,
    ClientId: AWS_COGNITO_CLIENT_ID
};

/** Useful Variables Ends Here */

/** Handler Functions */
async function login(_, { email, password }, { db }) {

    let decodeToken;
    // const decodedToken = await auth.auth(headers);
    if (!db) {
        console.log('Creating new mongoose connection.');
        conn = await connectToMongoDB();
    } else {
        console.log('Using existing mongoose connection.');
    }


    const userAuthenticationData = { ...authenticationData }
    userAuthenticationData.Username = email;
    userAuthenticationData.Password = password;

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(userAuthenticationData);

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: email,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return new Promise(async (resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: async function (result) {
                // var accessToken = result.getAccessToken().getJwtToken();

                /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
                var idToken = result.idToken.jwtToken;

                console.log(idToken);
                if (idToken) {
                    let user;
                    await auth.decodeIdToken(idToken).then((decoded) => {
                        user = decoded
                    })
                    await User.findOne({ 'email': user.email }, (err, u) => {
                        if (err) {
                            reject('No User Found');
                        }
                        return resolve(u);
                    })
                }
                reject('Auth Error');
            },

            onFailure: function (err) {
                reject(err);
            },
        });
    });
}

async function signup(_, { email, password, name }, { db }) {

    let decodeToken;
    // const decodedToken = await auth.auth(headers);
    if (!db) {
        console.log('Creating new mongoose connection.');
        conn = await connectToMongoDB();
    } else {
        console.log('Using existing mongoose connection.');
    }

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name: 'email',
        Value: email
    };
    var dataName = {
        Name: 'name',
        Value: name
    };
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);

    attributeList.push(attributeEmail);
    attributeList.push(attributeName);

    return new Promise(async (resolve, reject) => {
        userPool.signUp(email, password, attributeList, null, function(err, result){
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            CognitoUser = result.user;
            console.log('user name is ', CognitoUser);
            resolve(CognitoUser.getUsername());
        });
    });
}

async function confirmResgistration(_, { email, code }, { db }) {

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: email,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return new Promise(async (resolve, reject) => {
        cognitoUser.confirmRegistration(code, true, function(err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

async function resendConfirmationCode(_, { email }, { db }) {

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: email,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return new Promise(async (resolve, reject) => {
        cognitoUser.resendConfirmationCode(function(err, result) {
            if (err) {
                reject(err);
                return;
            }
            console.log(result)
            resolve(result.CodeDeliveryDetails);
        });
    });
}

async function changePassword(_, { email, oldPassword, newPassword }, { db }) {

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: email,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData).getSignInUserSession();

    return new Promise(async (resolve, reject) => {
        cognitoUser.changePassword(oldPassword, newPassword, function(err, result) {
            if (err) {
                reject(err);
                return;
            }
            console.log(result)
            resolve(result);
        });
    });
}

async function forgotPassword(_, { email, newPassword, verificationCode }, { db }) {

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: email,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return new Promise(async (resolve, reject) => {
        cognitoUser.forgotPassword({
            onSuccess: function (result) {
                console.log('call result: ' + result);
            },
            onFailure: function(err) {
                reject(err);
            },
            inputVerificationCode() {
                resolve('Password Reset Initiated');
            }
        });
    });
}

async function confirmPassword(_, { email, newPassword, verificationCode }, { db }) {

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: email,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return new Promise(async (resolve, reject) => {
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess: function () {
                resolve('Password Successfully Changed');
            },
            onFailure: function(err) {
                reject(err);
            }
        });
    });
}



module.exports = {
    login,
    signup,
    confirmResgistration,
    resendConfirmationCode,
    changePassword,
    forgotPassword,
    confirmPassword
};