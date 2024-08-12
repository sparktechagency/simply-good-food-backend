import { IDeliveryCharge } from './deliveryCharge.interface';
import { DeliveryCharge } from './deliveryCharge.model';

const createDeliveryChargeToDB = async (payload: IDeliveryCharge) => {
  const createCharge = await DeliveryCharge.create(payload);
  return createCharge;
};

const getDeliveryChargeFromDB = async () => {
  const createCharge = await DeliveryCharge.findOne();
  return createCharge;
};

const updateDeliveryChargeToDB = async (
  id: string,
  payload: IDeliveryCharge
) => {
  const createCharge = await DeliveryCharge.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return createCharge;
};

const deleteDeliveryChargeToDB = async () => {
  const createCharge = await DeliveryCharge.deleteOne();
  return createCharge;
};

export const DeliveryService = {
  createDeliveryChargeToDB,
  getDeliveryChargeFromDB,
  updateDeliveryChargeToDB,
  deleteDeliveryChargeToDB,
};
