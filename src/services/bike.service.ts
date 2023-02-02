/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { v4 as uuid } from "uuid";
import { AluguelService } from "../externalServices/AluguelService";

export const createBike = async (
  db: any,
  numero: number,
  marca: string,
  modelo: string,
  ano: number
): Promise<any | null> => {
  try {
    const newBikeID = uuid();

    await db.push("/tb_bicicleta[]", {
      id: newBikeID,
      marca,
      modelo,
      ano,
      numero,
      status: "NOVA",
    });

    const bikeCreatedIndex = await db.getIndex("/tb_bicicleta", newBikeID);
    const bikeCreated = await db.getData(`/tb_bicicleta[${bikeCreatedIndex}]`);

    return bikeCreated;
  } catch (error) {
    return console.error(error);
  }
};

export const addRelBikeToLock = async (
  db: any,
  idTranca: string,
  idBicicleta: string
): Promise<any | null> => {
  const bikeIndex = await db.getIndex("/tb_bicicleta", idBicicleta);

  if (bikeIndex === -1) {
    return -1;
  }

  const bikeIndexOnRel = await db.getIndex(
    "/rel_tranca_bicicleta",
    idBicicleta,
    "idBicicleta"
  );

  if (bikeIndexOnRel !== -1) {
    // SE A BICICLETA JÁ ESTIVER RELACIONADA A UMA TRANCA
    return -600;
  }

  const bike = await db.getData(`/tb_bicicleta[${bikeIndex}]`);

  if (
    bike.status !== "NOVA" &&
    bike.status !== "EM_REPARO" &&
    bike.status !== "EM_USO"
  ) {
    // SE A BICICLETA NÃO ESTIVER COM STATUS NOVA OU EM REPARO OU EM USO
    return -500;
  }

  const trancaIndex = await db.getIndex("/tb_tranca", idTranca);

  if (trancaIndex === -1) {
    return -1;
  }

  const lock = await db.getData(`/tb_tranca[${trancaIndex}]`);

  if (lock.status !== "DISPONÍVEL") {
    // SE A BICICLETA NÃO ESTIVER COM STATUS DISPONÍVEL
    return -700;
  }

  await db.push(`/tb_bicicleta[${bikeIndex}]/status`, "DISPONÍVEL", true);

  await db.push(`/tb_tranca[${trancaIndex}]/status`, "OCUPADA", true);

  await db.push("/rel_tranca_bicicleta[]", {
    idTranca,
    idBicicleta,
  });

  return bike;
};

export const deleteRelBikeToLock = async (
  db: any,
  idTranca: string,
  idBicicleta: string,
  acao: string
): Promise<any | null> => {
  const bikeIndex = await db.getIndex("/tb_bicicleta", idBicicleta);

  const trancaIndex = await db.getIndex("/tb_tranca", idTranca);

  const bike = await db.getData(`/tb_bicicleta[${bikeIndex}]`);

  if (bikeIndex === -1) {
    // BICICLETA NÃO EXISTE
    return -1;
  }

  if (trancaIndex === -1) {
    // TRANCA NÃO EXISTE
    return -1;
  }

  if (bike.status !== "REPARO_SOLICITADO") {
    // BICICLETA SEM REPARO SOLICITADO
    return -500;
  }

  const bikeIndexOnRel = await db.getIndex(
    "/rel_tranca_bicicleta",
    idBicicleta,
    "idBicicleta"
  );

  if (bikeIndexOnRel === -1) {
    // SE A BICICLETA NÃO ESTIVER RELACIONADA A NENHUMA TRANCA
    return -600;
  }

  await db.delete(`/rel_tranca_bicicleta[${bikeIndexOnRel}]`);

  const newStatus = acao;

  await db.push(`/tb_bicicleta[${bikeIndex}]/status`, newStatus, true);

  await db.push(`/tb_tranca[${trancaIndex}]/status`, "DISPONÍVEL", true);

  return bike;
};

export const getBikes = async (db: any): Promise<any | null> => {
  const allBikes = await db.getData("/tb_bicicleta");
  return allBikes;
};

export const getBikeRentedByCyclist = async (
  db: any,
  cyclistId: string
): Promise<any | null> => {
  const aluguelService = new AluguelService();

  const cyclistDataWithBikeRented =
    await aluguelService.getBikeRentedByCyclistId(cyclistId);

  if (cyclistDataWithBikeRented === null || cyclistDataWithBikeRented === -1) {
    return -1;
  }

  const idBicicleta = cyclistDataWithBikeRented.bicicleta;

  const bikeIndex = await db.getIndex("/tb_bicicleta", idBicicleta);

  if (bikeIndex === -1) {
    return -1;
  }
  const bike = await db.getData(`/tb_bicicleta[${bikeIndex}]`);
  return bike;
};

export const getBike = async (db: any, id: string): Promise<any | null> => {
  const bikeIndex = await db.getIndex("/tb_bicicleta", id);

  if (bikeIndex === -1) {
    return -1;
  }
  const bike = await db.getData(`/tb_bicicleta[${bikeIndex}]`);
  return bike;
};

export const deleteBike = async (db: any, id: string): Promise<any | null> => {
  const bikeIndex = await db.getIndex("/tb_bicicleta", id);

  if (bikeIndex === -1) {
    return -1;
  }

  const bike = await db.push(
    `/tb_bicicleta[${bikeIndex}]/status`,
    "EXCLUIDA",
    true
  );

  return bike;
};

export const updateBikes = async (
  db: any,
  numero: number,
  marca: string,
  modelo: string,
  ano: number,
  id: string
): Promise<any | null> => {
  const bikeIndex = await db.getIndex("/tb_bicicleta", id);

  if (bikeIndex === -1) {
    return -1;
  }

  const newNumber = numero;
  await db.push(`/tb_bicicleta[${bikeIndex}]/numero`, newNumber, true);

  const newBrand = marca;
  await db.push(`/tb_bicicleta[${bikeIndex}]/marca`, newBrand, true);

  const newModel = modelo;
  await db.push(`/tb_bicicleta[${bikeIndex}]/modelo`, newModel, true);

  const newYear = ano;
  await db.push(`/tb_bicicleta[${bikeIndex}]/ano`, newYear, true);

  const bike = await db.getData(`/tb_bicicleta[${bikeIndex}]`);
  return bike;
};

export const updateBikeStatus = async (
  db: any,
  id: string,
  acao: string
): Promise<any | null> => {
  const bikeIndex = await db.getIndex("/tb_bicicleta", id);

  if (bikeIndex === -1) {
    return -1;
  }

  const newStatus = acao;
  await db.push(`/tb_bicicleta[${bikeIndex}]/status`, newStatus, true);

  const bike = await db.getData(`/tb_bicicleta[${bikeIndex}]`);
  return bike;
};
