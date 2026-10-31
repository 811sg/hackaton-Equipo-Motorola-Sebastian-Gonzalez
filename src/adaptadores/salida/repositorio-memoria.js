/**
 * ADAPTADOR DE SALIDA · repositorio en memoria                             (ETAPA 2 · tu trabajo)
 *
 * Cumple el puerto de ../../aplicacion/puerto-repositorio.js guardando las evaluaciones en un arreglo.
 * Es el adaptador más simple: sirve para las pruebas y para arrancar sin configurar nada.
 *
 * Lo importante es el CONTRATO (lee el puerto): ids que asigna él mismo (mayor + 1), copias en vez de las referencias
 * originales y los cuatro métodos con el significado exacto. Las pruebas de la Etapa 2 son las MISMAS para el
 * adaptador de archivo: si los dos las pasan, son intercambiables y el resto de la aplicación no se entera.
 *
 * Comprueba con:   npm run verificar -- 2
 */

const copia = (evaluacion) => ({ ...evaluacion });

export function crearRepositorioMemoria() {
  let evaluaciones = [];

  return {
    listar() {
      return evaluaciones.map(copia);
    },
    obtener(id) {
      const encontrada = evaluaciones.find((e) => e.id === id);
      return encontrada ? copia(encontrada) : undefined;
    },
    guardar(evaluacion) {
      if (evaluacion.id === undefined || evaluacion.id === null) {
        const mayor = evaluaciones.reduce((max, e) => Math.max(max, e.id), 0);
        const nueva = { ...evaluacion, id: mayor + 1 };
        evaluaciones.push(nueva);
        return copia(nueva);
      }
      const guardada = copia(evaluacion);
      const posicion = evaluaciones.findIndex((e) => e.id === evaluacion.id);
      if (posicion === -1) evaluaciones.push(guardada);
      else evaluaciones[posicion] = guardada;
      return copia(guardada);
    },
    eliminar(id) {
      const antes = evaluaciones.length;
      evaluaciones = evaluaciones.filter((e) => e.id !== id);
      return evaluaciones.length < antes;
    },
  };
}