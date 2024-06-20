const db = require('../Conexion/conexion');

exports.crearPlan = async (req, res) => {
    try {
        const { idPaciente, idVacuna, idAntiparasitario, fecha, fechaProxima, recordatorio, comentarios } = req.body;


        sql = "INSERT INTO planes(idPaciente, idVacuna,  idAntiparasitario, fecha, fechaProxima, recordatorio, comentarios)  VALUES (?,?,?,?,?,?,?)"
        db.run(sql, [idPaciente, idVacuna, idAntiparasitario, fecha, fechaProxima, recordatorio, comentarios], (err) => {
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


exports.obtenerPlan = async (req, res) => {

    const id = req.params.id;

    sql = `SELECT p.ID, p.idVacuna, v.vacuna, p.idAntiparasitario, a.antiparasitario, p.fecha, p.fechaProxima, p.comentarios, p.recordatorio
       FROM planes p 
             JOIN vacunas v on p.idVacuna=v.ID
             JOIN antiparasitarios a on p.idantiparasitario=a.ID
            where p.idpaciente = ?;`;

    try {
        
        db.all(sql, [id], (err, rows) => {
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

exports.editarPlan = async (req, res) => {
    const id = req.params.id;
    const {  fecha, fechaProxima, idVacuna, idAntiparasitario,  recordatorio, comentarios} = req.body;

    const query = `UPDATE planes SET fecha = ? , fechaProxima = ?, idVacuna = ?, idAntiparasitario = ?, recordatorio = ?, comentarios = ? WHERE id = ?`;
    db.run(query, [ fecha, fechaProxima, idVacuna, idAntiparasitario  , recordatorio, comentarios, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro actualizado exitosamente', changes: this.changes });
    });
}



exports.eliminarPlan = async (req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM planes WHERE id = ?`;
    db.run(query, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro eliminado exitosamente', changes: this.changes });
    });
}