import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";





type EagerEvento = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Evento, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Taller?: Taller | null;
  readonly Sala?: Sala | null;
  readonly Estatus?: Estatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly eventoTallerId?: string | null;
  readonly eventoSalaId?: string | null;
  readonly eventoEstatusId?: string | null;
}

type LazyEvento = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Evento, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Taller: AsyncItem<Taller | undefined>;
  readonly Sala: AsyncItem<Sala | undefined>;
  readonly Estatus: AsyncItem<Estatus | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly eventoTallerId?: string | null;
  readonly eventoSalaId?: string | null;
  readonly eventoEstatusId?: string | null;
}

export declare type Evento = LazyLoading extends LazyLoadingDisabled ? EagerEvento : LazyEvento

export declare const Evento: (new (init: ModelInit<Evento>) => Evento) & {
  copyOf(source: Evento, mutator: (draft: MutableModel<Evento>) => MutableModel<Evento> | void): Evento;
}

type EagerReservacion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reservacion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Evento?: Evento | null;
  readonly Usuarios?: Usuarios | null;
  readonly Estatus?: Estatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly reservacionEventoId?: string | null;
  readonly reservacionUsuariosId?: string | null;
  readonly reservacionEstatusId?: string | null;
}

type LazyReservacion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reservacion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Evento: AsyncItem<Evento | undefined>;
  readonly Usuarios: AsyncItem<Usuarios | undefined>;
  readonly Estatus: AsyncItem<Estatus | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly reservacionEventoId?: string | null;
  readonly reservacionUsuariosId?: string | null;
  readonly reservacionEstatusId?: string | null;
}

export declare type Reservacion = LazyLoading extends LazyLoadingDisabled ? EagerReservacion : LazyReservacion

export declare const Reservacion: (new (init: ModelInit<Reservacion>) => Reservacion) & {
  copyOf(source: Reservacion, mutator: (draft: MutableModel<Reservacion>) => MutableModel<Reservacion> | void): Reservacion;
}

type EagerTaller = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Taller, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nombre?: string | null;
  readonly Descripcion?: string | null;
  readonly Objetivo?: string | null;
  readonly Espectativa?: string | null;
  readonly Duracion?: number | null;
  readonly Estatus?: Estatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly tallerEstatusId?: string | null;
}

type LazyTaller = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Taller, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nombre?: string | null;
  readonly Descripcion?: string | null;
  readonly Objetivo?: string | null;
  readonly Espectativa?: string | null;
  readonly Duracion?: number | null;
  readonly Estatus: AsyncItem<Estatus | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly tallerEstatusId?: string | null;
}

export declare type Taller = LazyLoading extends LazyLoadingDisabled ? EagerTaller : LazyTaller

export declare const Taller: (new (init: ModelInit<Taller>) => Taller) & {
  copyOf(source: Taller, mutator: (draft: MutableModel<Taller>) => MutableModel<Taller> | void): Taller;
}

type EagerSala = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Sala, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nombre?: string | null;
  readonly Descripcion?: string | null;
  readonly Capacidad?: number | null;
  readonly Estatus?: Estatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly salaEstatusId?: string | null;
}

type LazySala = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Sala, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nombre?: string | null;
  readonly Descripcion?: string | null;
  readonly Capacidad?: number | null;
  readonly Estatus: AsyncItem<Estatus | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly salaEstatusId?: string | null;
}

export declare type Sala = LazyLoading extends LazyLoadingDisabled ? EagerSala : LazySala

export declare const Sala: (new (init: ModelInit<Sala>) => Sala) & {
  copyOf(source: Sala, mutator: (draft: MutableModel<Sala>) => MutableModel<Sala> | void): Sala;
}

type EagerPerfil = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Perfil, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombre?: string | null;
  readonly descripcion?: string | null;
  readonly Estatus?: Estatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly perfilEstatusId?: string | null;
}

type LazyPerfil = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Perfil, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombre?: string | null;
  readonly descripcion?: string | null;
  readonly Estatus: AsyncItem<Estatus | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly perfilEstatusId?: string | null;
}

export declare type Perfil = LazyLoading extends LazyLoadingDisabled ? EagerPerfil : LazyPerfil

export declare const Perfil: (new (init: ModelInit<Perfil>) => Perfil) & {
  copyOf(source: Perfil, mutator: (draft: MutableModel<Perfil>) => MutableModel<Perfil> | void): Perfil;
}

type EagerEstatus = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Estatus, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombre?: string | null;
  readonly descripcion?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEstatus = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Estatus, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombre?: string | null;
  readonly descripcion?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Estatus = LazyLoading extends LazyLoadingDisabled ? EagerEstatus : LazyEstatus

export declare const Estatus: (new (init: ModelInit<Estatus>) => Estatus) & {
  copyOf(source: Estatus, mutator: (draft: MutableModel<Estatus>) => MutableModel<Estatus> | void): Estatus;
}

type EagerUsuarios = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Usuarios, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombreCompleto?: string | null;
  readonly correo?: string | null;
  readonly Estatus?: Estatus | null;
  readonly Perfil?: Perfil | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly usuariosEstatusId?: string | null;
  readonly usuariosPerfilId?: string | null;
}

type LazyUsuarios = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Usuarios, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombreCompleto?: string | null;
  readonly correo?: string | null;
  readonly Estatus: AsyncItem<Estatus | undefined>;
  readonly Perfil: AsyncItem<Perfil | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly usuariosEstatusId?: string | null;
  readonly usuariosPerfilId?: string | null;
}

export declare type Usuarios = LazyLoading extends LazyLoadingDisabled ? EagerUsuarios : LazyUsuarios

export declare const Usuarios: (new (init: ModelInit<Usuarios>) => Usuarios) & {
  copyOf(source: Usuarios, mutator: (draft: MutableModel<Usuarios>) => MutableModel<Usuarios> | void): Usuarios;
}