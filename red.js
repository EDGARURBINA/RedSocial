class Grafo {
    constructor() {
        this.nodos = new Map(); // Utilizamos un Map para almacenar nodos (persona -> objeto Persona)
    }

    agregarPersona(nombre) {
        if (!this.nodos.has(nombre)) {
            const nuevaPersona = new Persona(nombre);
            this.nodos.set(nombre, nuevaPersona);
        }
    }

    agregarAmistad(nombrePersona1, nombrePersona2, frecuenciaMensajes) {
        const persona1 = this.nodos.get(nombrePersona1);
        const persona2 = this.nodos.get(nombrePersona2);

        if (persona1 && persona2) {
            persona1.agregarAmistad(persona2, frecuenciaMensajes);
        }
    }

    sugerirAmistades(nombrePersona) {
        const persona = this.nodos.get(nombrePersona);
        if (persona) {
            return persona.sugerirAmistades(Array.from(this.nodos.values()));
        }
        return [];
    }
}

class Persona {
    constructor(nombre) {
        this.nombre = nombre;
        this.amistades = new Map(); // Utilizamos un Map para almacenar amistades (Persona -> frecuencia de mensajes)
    }

    agregarAmistad(amigo, frecuenciaMensajes) {
        this.amistades.set(amigo, frecuenciaMensajes);
        amigo.amistades.set(this, frecuenciaMensajes);
    }

    sugerirAmistades(personas) {
        const sugerencias = new Set();

        for (const otraPersona of personas) {
            if (otraPersona !== this && !this.amistades.has(otraPersona)) {
                let similitud = 0;
                let count = 0;

                for (const amigo of this.amistades.keys()) {
                    if (otraPersona.amistades.has(amigo)) {
                        similitud += Math.min(this.amistades.get(amigo), otraPersona.amistades.get(amigo));
                        count++;
                    }
                }

                if (count > 0) {
                    const puntajeSimilitud = similitud / count;

                    if (puntajeSimilitud > 0) {
                        sugerencias.add(otraPersona.nombre);
                    }
                }
            }
        }

        return Array.from(sugerencias);
    }
}

// Crear un grafo
const redSocial = new Grafo();

// Agregar personas al grafo
redSocial.agregarPersona("Persona1");
redSocial.agregarPersona("Persona2");
// ... agregar más personas ...

// Establecer amistades con frecuencia de mensajes
redSocial.agregarAmistad("Persona1", "Persona2", 10);
// ... agregar más amistades ...

// Imprimir sugerencias de amistad
const sugerenciasPersona1 = redSocial.sugerirAmistades("Persona1");
console.log("Sugerencias de amistad para Persona1:", sugerenciasPersona1);

const sugerenciasPersona2 = redSocial.sugerirAmistades("Persona2");
console.log("Sugerencias de amistad para Persona2:", sugerenciasPersona2);