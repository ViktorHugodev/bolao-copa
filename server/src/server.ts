import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'
const prisma = new PrismaClient({
  log: ['query']
})

async function start() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true
  })

  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()
    return { count }
  })

  fastify.get('/bets/count', async () => {
    const count = await prisma.bets.count()
    return { count }
  })

  fastify.get('/users/count', async () => {
    const count = await prisma.user.count()
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

  await fastify.listen({
    port: 3333,
    host: '0.0.0.0'
  })
}

start()