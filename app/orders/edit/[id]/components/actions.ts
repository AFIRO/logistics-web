"use server"

import { AdressDto } from "../../../../../backend/dto/adres.dto";
import { AddressRepository } from "../../../../../backend/repository/address.repository";
import { CustomerOrderRepository } from "../../../../../backend/repository/customerorder.repository";

export async function updateAddress(addressId: string, address: AdressDto) {
    await new AddressRepository().updateAddress(addressId, address);
}

export async function updateBox(orderId: string, boxId: string) {
    await new CustomerOrderRepository().updateBoxOrder(orderId, boxId);
}