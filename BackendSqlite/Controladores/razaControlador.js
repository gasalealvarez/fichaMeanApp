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

exports.obtenerRazas = async (req, res) => {
    sql = "SELECT * FROM razas";

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

exports.obtenerRazasEspecie = async (req, res) => {
    sql = "SELECT * FROM razas WHERE idEspecie = ?";

    db.all(sql, [req.params.id], (err, rows) => {
        if (err) return res.json({ status: 300, success: false, error: err });

        if (rows.length < 1)
            return res.json({ status: 300, success: false, error: "Row macth" });

        return res.json({ status: 200, data: rows, success: true });
    })
}

exports.actualizarRaza = async (req, res) => {
    const id = req.params.id;
    const { idEspecie, raza } = req.body;


    const query = `UPDATE razas SET idEspecie = ?,  raza = ? WHERE id = ?`;
    db.run(query, [idEspecie, raza, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro actualizado exitosamente', changes: this.changes });
    });
}

exports.eliminarRaza = async (req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM razas WHERE id = ?`;
    db.run(query, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro eliminado exitosamente', changes: this.changes });
    });
}