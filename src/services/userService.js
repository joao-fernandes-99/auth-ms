const getUserByEmail = (email) => {
    return userCollectionMock.find((mockUser) => mockUser.email === email);
}

const userCollectionMock = [{ email: 'joao@joao.com', password: '$2b$10$dzLr6afO6bRMY6fA0qVG0eOlryu2H.cR169pcRMlZijrkfxCXd7mC' }];

export default { getUserByEmail };