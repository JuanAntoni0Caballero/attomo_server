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
        image: {
            type: String,
            default: 'https://res.cloudinary.com/dulqf7f1b/image/upload/v1678120897/BuscoAmigos/playa.jpg'
        },
        stars: {
            type: String,
            enum: ['1', '2', '3', '4', '5'],
        },
    },
    {
        timestamps: true
    }
)

const Game = model("game", gameSchema)

module.exports = Game