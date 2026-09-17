import { prisma } from "../database/client";

import type { Customer } from "../../generated/prisma/client";
import type { CreateCustomerDto } from "../dto/customer/createCustomerDto";
import type { UpdateCustomerDto } from "../dto/customer/updateCustomerDto";

import { NotFoundError } from "../errors/NotFoundError";

export async function findAll(): Promise<Customer[]> {
  return prisma.customer.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function findById(id: number): Promise<Customer> {
  const customer = await prisma.customer.findUnique({
    where: { id },
  });

  if (!customer) {
    throw new NotFoundError("Customer não encontrado.");
  }

  return customer;
}

export async function create(data: CreateCustomerDto): Promise<Customer> {
  return prisma.customer.create({
    data,
  });
}

export async function update(
  id: number,
  data: UpdateCustomerDto,
): Promise<Customer> {
  await findById(id);

  return prisma.customer.update({
    where: { id },
    data,
  });
}

export async function remove(id: number): Promise<Customer> {
  await findById(id);

  return prisma.customer.delete({
    where: { id },
  });
}