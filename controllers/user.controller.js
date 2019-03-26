const User = require('../persistence/models/user.model');

//Criar novo usuario.
exports.UserCreate = function (req, res, next) {
    let user = new User (
        {
          name: req.body.name,
          age: req.body.age,
          phone: req.body.phone,
          is_admin: req.body.is_admin
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send({id: user.id});
    })
};

//Ler os atributos de um usuario.
exports.GetUser = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if(err) {
            return next (err);
        }
        res.send(user);
    })
};

//Atualizar os atributos de um usuario.
exports.UserUpdate = function(req, res, next) {
    User.findOneAndUpdate({"_id":req.params.id}, {$set: req.body}, function(err, user) {
        if(err) {
            return next(err);
        }
        res.send("User updated successfully!");
    });
};

//Deletar um usuario.
exports.UserDelete = function(req, res, next) {
    User.findOneAndDelete({"_id":req.params.id}, function (err) {
        if(err) {
            return next (err);
        }
        res.send("User deleted successfully!");
    })
};



