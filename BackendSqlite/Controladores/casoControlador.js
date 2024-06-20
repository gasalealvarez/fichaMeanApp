const db = require('../Conexion/conexion');

exports.crearCaso = async (req, res)=> {
    try {
        const { ID, sintomas, diagnostico, tratamiento} = req.body;

        
        sql = "INSERT INTO casos(idIngreso, sintomas, diagnostico, tratamiento)  VALUES (?,?,?,?)"
        db.run(sql, [ID, sintomas, diagnostico, tratamiento], (err) => {
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

exports.obtenerCaso = async (req, res)=> {
    sql = "SELECT * FROM casos WHERE idIngreso = ?";



    db.all(sql, [req.params.id], (err, rows) => {
        if (err) return res.json({ status: 300, success: false, error: err });

        if (rows.length < 1)
            return res.json({ status: 300, success: false, error: "Row macth" });

        return res.json({ status: 200, data: rows, success: true });
    })
}

exports.actualizarCaso = async (req, res) => {
    const id = req.params.id;
    const {  sintomas, diagnostico, tratamiento} = req.body;


    const query = `UPDATE casos SET sintomas = ? , diagnostico = ? , tratamiento = ? WHERE idIngreso = ?`;
    db.run(query, [ sintomas, diagnostico, tratamiento, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro actualizado exitosamente', changes: this.changes });
    });
}

exports.eliminarCaso = async(req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM casos WHERE idEntrada = ?`;
    db.run(query, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro eliminado exitosamente', changes: this.changes });
    });
}