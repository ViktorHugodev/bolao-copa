import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

export async function poolRoutes(fastify: FastifyInstance){
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()
    return { count }
  })

  fastify.post('/pool', async (request, response) => {
    const createdBet = z.object({
      title: z.string()
    })
    const { title } = createdBet.parse(request.body)
    const generateId = new ShortUniqueId()
    const code = String(generateId()).toUpperCase()
    const createdPool = await prisma.pool.create({
      data: {
        title: title,
        code: code
      }
    })
    return response.status(201).send({ createdPool })
  })
}