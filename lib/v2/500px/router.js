module.exports = (router) => {
    router.get('/hot', require('./index'));
    router.get('/tribe/set/:id', require('./tribeSet'));
    router.get('/user/works/:id', require('./user'));
};
