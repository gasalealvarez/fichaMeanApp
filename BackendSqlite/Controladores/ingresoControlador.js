const db = require('../Conexion/conexion');

exports.crearIngreso = async (req, res) => {
    try {
        const { idPaciente, paciente, propietario, fecha, comentarios, tipo_ingreso} = req.body;

        
        sql = "INSERT INTO  ingresos(idPaciente, paciente, propietario, fecha, comentarios, tipo_ingreso)  VALUES (?,?,?,?,?,?)"
        db.run(sql, [idPaciente, paciente, propietario, fecha, comentarios, tipo_ingreso], (err) => {
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

exports.obtenerIngresos = async (req, res) => {
    sql = "SELECT * FROM ingresos";

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

exports.obtenerIngresosPorPaciente = async (req, res)=> {
    sql = "SELECT * FROM ingresos WHERE idPaciente = ?";



    db.all(sql, [req.params.id], (err, rows) => {
        if (err) return res.json({ status: 300, success: false, error: err });

        if (rows.length < 1)
            return res.json({ status: 300, success: false, error: "Row macth" });

        return res.json({ status: 200, data: rows, success: true });
    })
}


exports.actualizarIngreso = async (req, res) => {
    const id = req.params.id;
    const {  fecha, comentarios, tipo_ingreso} = req.body;


    const query = `UPDATE ingresos SET fecha = ? , comentarios = ? , tipo_ingreso = ? WHERE id = ?`;
    db.run(query, [ fecha, comentarios, tipo_ingreso, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro actualizado exitosamente', changes: this.changes });
    });
}

exports.eliminarIngreso = async (req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM ingresos WHERE id = ?`;
    db.run(query, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro eliminado exitosamente', changes: this.changes });
    });
}