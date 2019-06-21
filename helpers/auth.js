const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');


// Set in `environment` of serverless.yml
const { AUTH0_CLIENT_ID } = process.env;
const { AUTH0_DOMAIN } = process.env;

const client = jwksClient({
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header, cb) {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.publicKey || key.rsaPublicKey;
        cb(null, signingKey);
    });
}

const options = {
    audience: AUTH0_CLIENT_ID,
    issuer: `https://${AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
async function auth(headers) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!headers.Authorization) {
                return reject('Unauthorized');
            }

            const tokenParts = headers.Authorization.split(' ');
            const tokenValue = tokenParts[1];

            if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
                // no auth token!
                return reject('Unauthorized');
            }


            jwt.verify(tokenValue, getKey, options, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded.email);
            });
        } catch (e) {
            return reject('Unauthorized');
        }
    });
}


module.exports = {
    auth,
};

