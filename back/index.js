const express = require('express');
const curp = require('curp');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/curp', (req, res) => {
    const datos = req.body;

    console.log(datos);
    console.log(datos.fechaNacimiento.replace(/\//g, "-"))

    let persona = curp.getPersona();
    persona.nombre = datos.nombre;
    persona.apellidoPaterno = datos.apellidoPaterno;
    persona.apellidoMaterno = datos.apellidoMaterno;

    (datos.genero === 'm') ? 
        persona.genero = curp.GENERO.MASCULINO : 
        persona.genero = curp.GENERO.FEMENINO;

    persona.fechaNacimiento = datos.fechaNacimiento.replace(/\//g, "-");
    persona.estado = curp.ESTADO.CHIAPAS

    const generatedCurp = curp.generar(persona);
    console.log(generatedCurp);
    res.json({ curp: generatedCurp });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});