import { prisma } from "../../../db/prisma";
import { TestData } from "../../test.data"
import { PersonRepository } from "../../../backend/repository/person.repository";

const personRepository = new PersonRepository();

describe('person repository tests', () => {
  it('exists by id, entity exists, to returns true', async () => {
    prisma.person.count = jest.fn().mockResolvedValue(1);
    expect(await personRepository.existsById(TestData.ID)).toEqual(true)
    expect(prisma.person.count).toHaveBeenCalled()
  })

  it('exists by id, entity does not exist, to returns false', async () => {
    prisma.person.count = jest.fn().mockResolvedValue(0);
    expect(await personRepository.existsById(TestData.ID)).toEqual(false)
    expect(prisma.person.count).toHaveBeenCalled()
  })
}
)