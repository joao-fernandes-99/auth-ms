import userService from "../services/userService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'super-secret-can-someone-discover-this-secret-i-dont-belive-it';

const login = async (credentials) => {
    try {
        console.log('[AuthOperation.login]');
        const { email, password } = credentials;

        const user = userService.getUserByEmail(email);

        if (!user) {
            return {
                error: true,
                errorCode: 401,
                errorMessage: 'Invalid email or password'
            };
        }
        const verifiedPassword = await bcrypt.compare(password, user.password);
        if (!verifiedPassword) {
            return {
                error: true,
                errorCode: 401,
                errorMessage: 'Invalid email or password'
            };
        }

        const accessToken = jwt.sign({
            userId: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            scopes: user.scopes
        }, JWT_SECRET, { expiresIn: '15m', issuer: 'auth-ms', audience: 'api' });

        return {
            accessToken: accessToken,
            tokenType: 'Bearer',
            expiresIn: 60
        }

    } catch (error) {
        console.error('[AuthOperation.login.error]', error);
        return {
            error: true,
            errorCode: 500,
            errorType: 'server_error',
            errorMessage: 'Authentication Failed'
        }
    }
}

const validate = async(accessToken) => {
    try {
        const decodedToken = jwt.decode(accessToken, JWT_SECRET);

        return {
            valid: true,
            expiresAt: new Date(decodedToken.exp * 1000).toISOString()
        }
    } catch (error) {
        console.error('[AuthOperation.validate.error]', error);
        return {
            error: true,
            errorMessage: 'Invalid token',
            errorCode: 401
        }
    }
}

export default {
    login,
    validate
}


