import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function betsRoutes(fastify: FastifyInstance){
  fastify.get('/bets/count', async () => {
    const count = await prisma.bets.count()
    return { count }
  })
}