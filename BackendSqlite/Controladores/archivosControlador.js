const db = require('../Conexion/conexion');


exports.crearArchivo = async (req, res) => {
    /* try {

        const file = req.file;
        const idPaciente = req.body.idPaciente;
        const comentarios = req.body.comentarios;
        const fecha = req.body.fecha;

        if (!file) {
            return res.status(400).send('Se requiere un archivo');
        }

        console.log('idPaciente ', idPaciente);
        console.log('file path:', file.path);
        console.log('comentarios:', comentarios);
        console.log('fecha:', fecha);
        res.send('Archivo y texto recibidos correctamente');
    } catch (err) {
        console.error('Error al subir el archivo:', err);
        res.status(500).json({ error: 'Error al subir el archivo' });
    } */

    try {
        
        const file = req.file;
        const idPaciente = req.body.idPaciente;
        const comentarios = req.body.comentarios;
        const fecha = req.body.fecha;

        
        sql = "INSERT INTO archivos(idPaciente, fecha, comentarios, ruta)  VALUES (?,?,?,?)"
        db.run(sql, [idPaciente, fecha, comentarios, file.path], (err) => {
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

exports.obtenerArchivos = async(req, res) => {
    sql = "SELECT * FROM archivos WHERE idPaciente = ?";


    db.all(sql, [req.params.id], (err, rows) => {
        if (err) return res.json({ status: 300, success: false, error: err });

        if (rows.length < 1)
            return res.json({ status: 300, success: false, error: "Row macth" });

        return res.json({ status: 200, data: rows, success: true });
    })
}


exports.eliminarArchivo = async(req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM archivos WHERE id = ?`;
    db.run(query, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Registro eliminado exitosamente', changes: this.changes });
    });
}