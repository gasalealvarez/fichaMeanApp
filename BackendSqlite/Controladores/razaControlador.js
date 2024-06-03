const db = require('../Conexion/conexion');


exports.crearRaza = async(req, res) => {
    try {
        const { idEspecie, raza } = req.body;

        sql = "INSERT INTO  razas (idEspecie, raza) VALUES (?,?)"
        db.run(sql, [idEspecie, raza], (err) => {
            if (err) return res.json();
        })

        return res.json({
            status: 200,
            success: true,
        })
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        })
    }
}