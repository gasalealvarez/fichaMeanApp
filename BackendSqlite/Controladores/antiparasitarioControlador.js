const db = require('../Conexion/conexion');

exports.crearAntiparasitario = async (req, res) => {
    try {
        const { antiparasitario } = req.body;

        sql = "INSERT INTO  antiparasitarios(antiparasitarios) VALUES (?)"
        db.run(sql, [antiparasitario], (err) => {
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

exports.obtenerAntiparasitarios = async (req, res) => {
    sql = "SELECT * FROM antiparasitarios";

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

exports.editarAntiparasitario = async (req, res)=> {
    const id = req.params.id;
    const { antiparasitario } = req.body;


    const query = `UPDATE antiparasitarios SET antiparasitario = ? WHERE id = ?`;
    db.run(query, [antiparasitario, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro actualizado exitosamente', changes: this.changes });
    });
}

exports.eliminarAntiparasitario = async (req, res)=> {
    const id = req.params.id;

    const query = `DELETE FROM antiparasitarios WHERE id = ?`;
    db.run(query, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro eliminado exitosamente', changes: this.changes });
    });
}