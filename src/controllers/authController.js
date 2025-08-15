import authOperation from "../operations/authOperation.js";

export const login = async (req, res) => {
    console.log('[AuthController.login]');

    const { body } = req;

    const response = await authOperation.login(body);

    if (response.error) {
        return res.status(response.errorCode).json(response);
    }

    return res.status(200).json(response);

}

export const validate = async (req, res) => {
    console.log('[AuthController.valdate]');

    const { body } = req;
    const { accessToken } = body;

    const response = await authOperation.validate(accessToken);

    if (response.error) {
        return res.status(response.errorCode).json(response);
    }

    return res.status(200).json(response);
}



