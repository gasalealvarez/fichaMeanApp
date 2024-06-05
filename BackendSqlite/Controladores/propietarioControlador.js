const db = require('../Conexion/conexion');


exports.crearPropietario = async (req, res) => {
    try {
        const { nombre, direccion, telefono, email } = req.body;

        sql = "INSERT INTO  propietarios(nombre, direccion, telefono,  email) VALUES (?,?,?,?)"
        db.run(sql, [nombre, direccion, telefono, email], (err) => {
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

exports.obtenerPropietarios = async (req, res) => {
    sql = "SELECT * FROM propietarios";

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

exports.obtenerPropietario = async (req, res) => {
    sql = "SELECT * FROM propietarios WHERE id = ?";

    db.all(sql, [req.params.id], (err, rows) => {
        if (err) return res.json({ status: 300, success: false, error: err });

        if (rows.length < 1)
            return res.json({ status: 300, success: false, error: "Row macth" });

        return res.json({ status: 200, data: rows, success: true });
    })
}

exports.actualizarPropietario = async (req, res) => {
    const id = req.params.id;
    const { nombre, direccion, telefono, email } = req.body;


    const query = `UPDATE propietarios SET nombre = ?, direccion = ?, telefono = ?, email = ? WHERE id = ?`;
    db.run(query, [nombre, direccion, telefono, email, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro actualizado exitosamente', changes: this.changes });
    });
}

exports.eliminarPropietario = async (req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM propietarios WHERE id = ?`;
    db.run(query, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro eliminado exitosamente', changes: this.changes });
    });
}
