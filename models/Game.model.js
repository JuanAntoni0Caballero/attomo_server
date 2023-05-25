const { Schema, model } = require("mongoose")

const gameSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre del juego es obligatorio.'],
            maxlength: [100, 'El título no puede tener más de 15 caracteres'],
            unique: true
        },
        category: {
            type: String,
            required: [true, 'La categoria es obligatoria.'],
            maxlength: [30, 'La categoria no puede tener más de 30 caracteres']
        },
        description: {
            type: String,
            required: [true, 'La descripcion es obligatoria.'],
            maxlength: [300, 'La descripcion no puede tener más de 100 caracteres']
        },
        image: {
            type: String,
            default: 'https://res.cloudinary.com/dhtj3nd92/image/upload/v1688638386/GameScoreHub/images_leorfc.jpg'
        },
        likesBy: [
            {
                user: {
                    ref: 'user',
                    type: Schema.Types.ObjectId
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