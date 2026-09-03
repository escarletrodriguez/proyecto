// ==========================================
// CAJA NACIONAL DE SALUD
// SISTEMA DE CITAS MÉDICAS
// ==========================================


// ==========================================
// ESPECIALIDADES Y MÉDICOS
// ==========================================

const especialidadesMedicas = [

    {
        nombre: "Medicina General",

        medicos: [
            "Dra. María Fernández",
            "Dr. José Ramírez",
            "Dra. Carolina Flores"
        ]
    },

    {
        nombre: "Cardiología",

        medicos: [
            "Dr. Carlos Mendoza",
            "Dra. Patricia Vargas"
        ]
    },

    {
        nombre: "Pediatría",

        medicos: [
            "Dra. Ana Rodríguez",
            "Dr. Miguel Torres",
            "Dra. Gabriela Pérez"
        ]
    },

    {
        nombre: "Odontología",

        medicos: [
            "Dr. Luis Herrera",
            "Dra. Gabriela Castro",
            "Dr. Roberto Suárez"
        ]
    },

    {
        nombre: "Dermatología",

        medicos: [
            "Dra. Sofía Morales",
            "Dr. Eduardo Flores"
        ]
    },

    {
        nombre: "Oftalmología",

        medicos: [
            "Dr. Ricardo Gómez",
            "Dra. Elena Pérez"
        ]
    },

    {
        nombre: "Ginecología",

        medicos: [
            "Dra. Laura Méndez",
            "Dra. Valeria Suárez"
        ]
    },

    {
        nombre: "Traumatología",

        medicos: [
            "Dr. Fernando Rojas",
            "Dr. Marco Salinas"
        ]
    },

    {
        nombre: "Neurología",

        medicos: [
            "Dr. Andrés Molina",
            "Dra. Silvia Torres"
        ]
    },

    {
        nombre: "Urología",

        medicos: [
            "Dr. Daniel Cruz"
        ]
    },

    {
        nombre: "Medicina Interna",

        medicos: [
            "Dra. Rosa Jiménez",
            "Dr. Pablo Flores"
        ]
    },

    {
        nombre: "Otorrinolaringología",

        medicos: [
            "Dr. Sergio López",
            "Dra. Verónica Ruiz"
        ]
    },

    {
        nombre: "Psiquiatría",

        medicos: [
            "Dr. Alejandro Vargas",
            "Dra. Natalia Romero"
        ]
    },

    {
        nombre: "Nutrición",

        medicos: [
            "Dra. Daniela Torres",
            "Dr. Miguel Fernández"
        ]
    },

    {
        nombre: "Endocrinología",

        medicos: [
            "Dra. Claudia Rojas"
        ]
    },

    {
        nombre: "Neumología",

        medicos: [
            "Dr. Martín López",
            "Dra. Paola Mendoza"
        ]
    },

    {
        nombre: "Gastroenterología",

        medicos: [
            "Dr. Javier Herrera",
            "Dra. Sonia Morales"
        ]
    },

    {
        nombre: "Nefrología",

        medicos: [
            "Dr. Ricardo Salazar"
        ]
    }

];


// ==========================================
// VARIABLES
// ==========================================

let medicoSeleccionado = null;

let especialidadSeleccionada = null;

let horaSeleccionada = null;

let fechaSeleccionada = null;


// ==========================================
// SISTEMA DE USUARIOS
// ==========================================

let usuarios = JSON.parse(

    localStorage.getItem(
        "usuarios"
    )

) || {};


// ==========================================
// INICIAR SESIÓN
// ==========================================

const formularioLogin =

document.getElementById(
    "formularioLogin"
);


if (formularioLogin) {


    formularioLogin.addEventListener(

        "submit",

        function(evento) {


            evento.preventDefault();


            const usuario =

            document
            .getElementById(
                "usuario"
            )
            .value
            .trim();


            const password =

            document
            .getElementById(
                "password"
            )
            .value;


            if (

                usuario === "" ||
                password === ""

            ) {


                alert(
                    "Complete todos los campos."
                );


                return;

            }


            // ==============================
            // USUARIO YA EXISTE
            // ==============================

            if (usuarios[usuario]) {


                if (

                    usuarios[usuario].password ===
                    password

                ) {


                    localStorage.setItem(

                        "sesionActiva",

                        "true"

                    );


                    localStorage.setItem(

                        "nombreUsuario",

                        usuario

                    );


                    window.location.href =
                    "sistema.html";

                }


                else {


                    alert(
                        "La contraseña es incorrecta."
                    );

                }

            }


            // ==============================
            // NUEVO USUARIO
            // ==============================

            else {


                usuarios[usuario] = {

                    password: password,

                    fechaRegistro:
                    new Date()
                    .toLocaleDateString()

                };


                localStorage.setItem(

                    "usuarios",

                    JSON.stringify(
                        usuarios
                    )

                );


                localStorage.setItem(

                    "sesionActiva",

                    "true"

                );


                localStorage.setItem(

                    "nombreUsuario",

                    usuario

                );


                alert(
                    "¡Usuario creado correctamente!"
                );


                window.location.href =
                "sistema.html";

            }

        }

    );

}


// ==========================================
// CERRAR SESIÓN
// ==========================================

function cerrarSesion() {


    localStorage.removeItem(
        "sesionActiva"
    );


    localStorage.removeItem(
        "nombreUsuario"
    );

}


// ==========================================
// VERIFICAR SESIÓN
// ==========================================

function verificarSesion() {


    const paginaActual =
    window.location.pathname;


    const paginasPrivadas = [

        "sistema.html",

        "horarios.html",

        "historial.html"

    ];


    const esPaginaPrivada =

    paginasPrivadas.some(

        pagina =>

        paginaActual.includes(
            pagina
        )

    );


    if (esPaginaPrivada) {


        const sesion =

        localStorage.getItem(
            "sesionActiva"
        );


        if (

            sesion !== "true"

        ) {


            window.location.href =
            "login.html";

        }

    }

}


verificarSesion();


// ==========================================
// USUARIO ACTUAL
// ==========================================

const usuarioActual =

localStorage.getItem(
    "nombreUsuario"
);


// ==========================================
// CITAS DEL USUARIO ACTUAL
// ==========================================

const claveCitasUsuario =

"misCitas_" +

usuarioActual;


let citasUsuario =

JSON.parse(

    localStorage.getItem(
        claveCitasUsuario
    )

)

|| [];


// ==========================================
// CITAS GENERALES DEL SISTEMA
// ==========================================

// Estas citas son utilizadas para saber
// qué horarios están ocupados para TODOS
// los usuarios.

let citasSistema =

JSON.parse(

    localStorage.getItem(
        "citasSistema"
    )

)

|| [];


// ==========================================
// MOSTRAR ESPECIALIDADES
// ==========================================

const contenedorEspecialidades =

document.getElementById(
    "especialidades"
);


if (contenedorEspecialidades) {


    especialidadesMedicas.forEach(

        function(especialidad) {


            const tarjeta =

            document.createElement(
                "div"
            );


            tarjeta.className =
            "especialidad-card";


            tarjeta.innerHTML = `

                <h3>
                    🏥 ${especialidad.nombre}
                </h3>

                <p>
                    ${especialidad.medicos.length}
                    médico(s) disponible(s)
                </p>

                <div class="lista-medicos">

                    ${

                        especialidad.medicos
                        .map(

                            medico => `

                                <div
                                    class="medico"
                                    onclick="
                                        seleccionarMedico(
                                            '${medico}',
                                            '${especialidad.nombre}'
                                        )
                                    "
                                >

                                    <span>
                                        👨‍⚕️
                                    </span>

                                    <div>

                                        <strong>
                                            ${medico}
                                        </strong>

                                        <small>
                                            Ver disponibilidad
                                        </small>

                                    </div>

                                </div>

                            `

                        )

                        .join("")

                    }

                </div>

            `;


            contenedorEspecialidades.appendChild(
                tarjeta
            );

        }

    );

}


// ==========================================
// SELECCIONAR MÉDICO
// ==========================================

function seleccionarMedico(
    medico,
    especialidad
) {


    localStorage.setItem(

        "medicoSeleccionado",

        medico

    );


    localStorage.setItem(

        "especialidadSeleccionada",

        especialidad

    );


    window.location.href =
    "horarios.html";

}


// ==========================================
// CARGAR MÉDICO EN HORARIOS
// ==========================================

const nombreMedico =

document.getElementById(
    "nombreMedico"
);


if (nombreMedico) {


    medicoSeleccionado =

    localStorage.getItem(
        "medicoSeleccionado"
    );


    especialidadSeleccionada =

    localStorage.getItem(
        "especialidadSeleccionada"
    );


    nombreMedico.textContent =
    medicoSeleccionado;


    document
    .getElementById(
        "especialidadMedico"
    )
    .textContent =

    "Especialidad: " +
    especialidadSeleccionada;


    const fechaInput =

    document.getElementById(
        "fechaCita"
    );


    // ==============================
    // FECHA MÍNIMA
    // ==============================

    const hoy =
    new Date();


    const fechaMinima =

    hoy.getFullYear() +

    "-" +

    String(
        hoy.getMonth() + 1
    ).padStart(2, "0")

    +

    "-" +

    String(
        hoy.getDate()
    ).padStart(2, "0");


    fechaInput.min =
    fechaMinima;


    // ==============================
    // CUANDO CAMBIA LA FECHA
    // ==============================

    fechaInput.addEventListener(

        "change",

        function() {


            fechaSeleccionada =
            fechaInput.value;


            horaSeleccionada =
            null;


            document
            .getElementById(
                "confirmacion"
            )
            .style.display =
            "none";


            mostrarHorarios();

        }

    );


    // No mostramos horarios hasta
    // que el usuario seleccione fecha.

}


// ==========================================
// VERIFICAR SI UNA HORA ESTÁ OCUPADA
// ==========================================

function horaOcupada(
    medico,
    fecha,
    hora
) {


    return citasSistema.some(

        cita =>

        cita.medico === medico &&

        cita.fecha === fecha &&

        cita.hora === hora &&

        cita.estado === "Pendiente"

    );

}


// ==========================================
// MOSTRAR HORARIOS
// ==========================================

function mostrarHorarios() {


    const contenedor =

    document.getElementById(
        "horarios"
    );


    if (!contenedor) {


        return;

    }


    // Si todavía no eligió fecha

    if (!fechaSeleccionada) {


        contenedor.innerHTML = `

            <p class="mensaje-fecha">

                📅 Primero selecciona
                el día de tu cita.

            </p>

        `;


        return;

    }


    const horas = [

        "08:00",

        "09:00",

        "10:00",

        "11:00",

        "14:00",

        "15:00",

        "16:00"

    ];


    contenedor.innerHTML =
    "";


    horas.forEach(

        function(hora) {


            const elemento =

            document.createElement(
                "div"
            );


            elemento.className =
            "hora";


            // ==============================
            // VERIFICAR DISPONIBILIDAD REAL
            // ==============================

            const ocupado =

            horaOcupada(

                medicoSeleccionado,

                fechaSeleccionada,

                hora

            );


            // ==============================
            // HORA OCUPADA
            // ==============================

            if (ocupado) {


                elemento.classList.add(
                    "ocupado"
                );


                elemento.innerHTML = `

                    <strong>
                        ${hora}
                    </strong>

                    <span>
                        ❌ No disponible
                    </span>

                `;

            }


            // ==============================
            // HORA DISPONIBLE
            // ==============================

            else {


                elemento.classList.add(
                    "disponible"
                );


                elemento.innerHTML = `

                    <strong>
                        ${hora}
                    </strong>

                    <span>
                        ✓ Disponible
                    </span>

                `;


                elemento.addEventListener(

                    "click",

                    function() {


                        seleccionarHora(
                            hora
                        );

                    }

                );

            }


            contenedor.appendChild(
                elemento
            );

        }

    );

}


// ==========================================
// SELECCIONAR HORA
// ==========================================

function seleccionarHora(
    hora
) {


    const fecha =

    document
    .getElementById(
        "fechaCita"
    )
    .value;


    if (!fecha) {


        alert(
            "Primero selecciona una fecha."
        );


        return;

    }


    // Volver a verificar antes de seleccionar

    const ocupado =

    horaOcupada(

        medicoSeleccionado,

        fecha,

        hora

    );


    if (ocupado) {


        alert(
            "Este horario ya no está disponible."
        );


        mostrarHorarios();


        return;

    }


    horaSeleccionada =
    hora;


    const confirmacion =

    document.getElementById(
        "confirmacion"
    );


    confirmacion.style.display =
    "block";


    document
    .getElementById(
        "informacionCita"
    )
    .textContent =

    "Médico: " +
    medicoSeleccionado +

    " | Especialidad: " +
    especialidadSeleccionada +

    " | Fecha: " +
    fecha +

    " | Hora: " +
    horaSeleccionada;

}


// ==========================================
// CONFIRMAR CITA
// ==========================================

function confirmarCita() {


    const motivo =

    document
    .getElementById(
        "motivo"
    )
    .value
    .trim();


    const fecha =

    document
    .getElementById(
        "fechaCita"
    )
    .value;


    // ==============================
    // VALIDACIONES
    // ==============================

    if (!fecha) {


        alert(
            "Seleccione una fecha."
        );


        return;

    }


    if (!horaSeleccionada) {


        alert(
            "Seleccione una hora."
        );


        return;

    }


    if (!motivo) {


        alert(
            "Ingrese el motivo de consulta."
        );


        return;

    }


    // ==============================
    // VERIFICACIÓN FINAL
    // ==============================

    const ocupado =

    horaOcupada(

        medicoSeleccionado,

        fecha,

        horaSeleccionada

    );


    if (ocupado) {


        alert(
            "Otra persona acaba de reservar este horario."
        );


        horaSeleccionada =
        null;


        mostrarHorarios();


        return;

    }


    // ==============================
    // CREAR NUEVA CITA
    // ==============================

    const nuevaCita = {

        usuario:
        usuarioActual,

        fecha:
        fecha,

        hora:
        horaSeleccionada,

        medico:
        medicoSeleccionado,

        especialidad:
        especialidadSeleccionada,

        motivo:
        motivo,

        estado:
        "Pendiente"

    };


    // ==============================
    // GUARDAR PARA EL USUARIO
    // ==============================

    citasUsuario.push(
        nuevaCita
    );


    localStorage.setItem(

        claveCitasUsuario,

        JSON.stringify(
            citasUsuario
        )

    );


    // ==============================
    // GUARDAR EN EL SISTEMA GENERAL
    // ==============================

    citasSistema.push(
        nuevaCita
    );


    localStorage.setItem(

        "citasSistema",

        JSON.stringify(
            citasSistema
        )

    );


    alert(
        "¡Su cita fue registrada correctamente!"
    );


    window.location.href =
    "historial.html";

}


// ==========================================
// MOSTRAR HISTORIAL
// ==========================================

const tablaCitas =

document.getElementById(
    "tablaCitas"
);


if (tablaCitas) {


    tablaCitas.innerHTML =
    "";


    // ==============================
    // SI NO HAY CITAS
    // ==============================

    if (citasUsuario.length === 0) {


        tablaCitas.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="text-align:center"
                >

                    No tienes citas registradas.

                </td>

            </tr>

        `;

    }


    // ==============================
    // MOSTRAR CITAS
    // ==============================

    citasUsuario.forEach(

        function(cita) {


            let claseEstado =
            "";


            if (

                cita.estado ===
                "Pendiente"

            ) {


                claseEstado =
                "estado-pendiente";

            }


            else if (

                cita.estado ===
                "Atendida"

            ) {


                claseEstado =
                "estado-atendida";

            }


            const fila =

            document.createElement(
                "tr"
            );


            fila.innerHTML = `

                <td>
                    ${cita.fecha}
                </td>

                <td>
                    ${cita.hora}
                </td>

                <td>
                    ${cita.medico}
                </td>

                <td>
                    ${cita.especialidad}
                </td>

                <td>
                    ${cita.motivo}
                </td>

                <td
                    class="${claseEstado}"
                >

                    ${cita.estado}

                </td>

            `;


            tablaCitas.appendChild(
                fila
            );

        }

    );

}