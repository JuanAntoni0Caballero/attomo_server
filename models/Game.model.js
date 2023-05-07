const User = require("./User.model")

const { Schema, model } = require("mongoose")

const gameSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre del juego es obligatorio.'],
            maxlength: [15, 'El título no puede tener más de 15 caracteres']
        },
        category: {
            type: String,
            required: [true, 'La categoria es obligatoria.'],
            maxlength: [15, 'La categoriano puede tener más de 15 caracteres']
        },
        description: {
            type: String,
            required: [true, 'La descripcion es obligatoria.'],
            maxlength: [100, 'La descripcion no puede tener más de 100 caracteres']
        },
        image: {
            type: String,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuqjfzhEAvw2nYYQfOg0mbV5221_yuKzdbkA&usqp=CAU'
        },
        likes: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

const Game = model("game", gameSchema)

module.exports = Game