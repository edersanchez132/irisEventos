// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Evento, Reservacion, Taller, Sala, Perfil, Estatus, Usuarios } = initSchema(schema);

export {
  Evento,
  Reservacion,
  Taller,
  Sala,
  Perfil,
  Estatus,
  Usuarios
};