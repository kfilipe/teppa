const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const DataSchema = new mongoose.Schema({
    nome_usuario: String,
    lastname_usuario: String,
    email_usuario: String,
    senha_usuario: String,
}, {
    timestamps: true
})

//Encriptografando a senha

DataSchema.pre('save', function (next) {
    if (!this.isModified("senha_usuario")) {
        return next()
    }
    this.senha_usuario = bcrypt.hashSync(this.senha_usuario, 10)
    next()
})

DataSchema.pre('findOneAndUpdate', function (next) {
    let senha = this.getUpdate().senha_usuario + '';
    if (senha.length < 55) {
        this.getUpdate().senha_usuario = bcrypt.hashSync(senha, 10);
    }
    next();
})

DataSchema.methods.isCorrectsenha = function (senha, callback) {
    bcrypt.compare(senha, this.senha_usuario, function (err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    })
}

const usuarios = mongoose.model('Usuarios', DataSchema);
module.exports = usuarios