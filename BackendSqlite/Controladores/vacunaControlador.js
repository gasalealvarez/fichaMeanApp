const db = require('../Conexion/conexion');

exports.crearVacuna = async (req, res)=> {
    try {
        const { vacuna } = req.body;

        sql = "INSERT INTO  vacunas(vacuna) VALUES (?)"
        db.run(sql, [vacuna], (err) => {
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

exports.obtenerVacunas = async (req, res)=> {
    sql = "SELECT * FROM vacunas";

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

exports.editarVacuna = async (req, res)=> {
    const id = req.params.id;
    const { vacuna } = req.body;


    const query = `UPDATE vacunas SET vacuna = ? WHERE id = ?`;
    db.run(query, [vacuna, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro actualizado exitosamente', changes: this.changes });
    });
}

exports.eliminarVacuna = async (req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM vacunas WHERE id = ?`;
    db.run(query, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro eliminado exitosamente', changes: this.changes });
    });
}