const db = require('../Conexion/conexion');

exports.crearPaciente = async (req, res)=> {
    try {
        const { nombre, idPropietario, idEspecie, raza, idSexo, pelaje, fechaNacimiento} = req.body;

        
        sql = "INSERT INTO  pacientes(nombre, idPropietario, idEspecie, raza, idSexo, pelaje, fechaNacimiento)  VALUES (?,?,?,?,?,?,?)"
        db.run(sql, [nombre, idPropietario, idEspecie, raza, idSexo, pelaje, fechaNacimiento], (err) => {
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

exports.obtenerPacientes = async (req, res) => {
    sql = "SELECT * FROM pacientes";

    try {
        //const queryObject = url.parse(req.url, true).query;
        //if ( queryObject.type) sql += ` WHERE  id= ${queryObject.type} `

        db.all(sql, [], (err, rows) => {
            if (err) return res.json({ status: 300, success: false, error: err });

            if (rows.length < 1)
                return res.json({ status: 300, success: false, error: "Row macth" });

            return res.json(rows);
        })
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        })
    }
}

exports.obtenerPaciente = async(req, res) => {
    sql = "SELECT * FROM pacientes WHERE idPropietario = ?";

    db.all(sql, [req.params.id], (err, rows) => {
        if (err) return res.json({ status: 300, success: false, error: err });

        if (rows.length < 1)
            return res.json({ status: 300, success: false, error: "Row macth" });

        return res.json({ status: 200, data: rows, success: true });
    })
} 

exports.actualizarPaciente = async (req, res) => {
    const id = req.params.id;
    const { nombre, idPropietario, idEspecie, raza, idSexo, pelaje, fechaNacimiento} = req.body;


    const query = `UPDATE pacientes SET nombre = ?, idPropietario = ?, idEspecie = ?, raza = ?, idSexo = ?, pelaje = ?, fechaNacimiento = ? WHERE id = ?`;
    db.run(query, [nombre, idPropietario, idEspecie, raza, idSexo, pelaje, fechaNacimiento, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro actualizado exitosamente', changes: this.changes });
    });
}

exports.eliminarPacientes = async (req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM pacientes WHERE id = ?`;
    db.run(query, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro eliminado exitosamente', changes: this.changes });
    });
}