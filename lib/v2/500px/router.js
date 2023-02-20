module.exports = (router) => {
    router.get(/([\w-/]+)?/, require('./index'));
    router.get('/tribe/set/:id', require('./tribeSet'));
    router.get('/user/works/:id', require('./user'));
};
