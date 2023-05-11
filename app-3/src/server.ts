import { fastify } from 'fastify'
import { Kafka } from 'kafkajs'
import * as consumers from './consumers/index'

const kafka = new Kafka({
  clientId: 'track-lead',
  brokers: ['localhost:29092']
})

const app = fastify()
export const consumer = kafka.consumer({
  groupId: 'track-lead',
  retry: {
    retries: 3
  },
})

app.listen({
  host: '0.0.0.0',
  port: 3335
}).then(async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'sso.user.created', fromBeginning: false })
  await consumers.SsoUserCreate()
  console.log('Server 2 running')
})