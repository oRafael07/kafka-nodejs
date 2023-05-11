import { fastify } from 'fastify'
import { Kafka } from 'kafkajs'
import * as consumers from './consumers/index'

const kafka = new Kafka({
  clientId: 'event-monitor',
  brokers: ['localhost:29092']
})

const app = fastify()
export const consumer = kafka.consumer({
  groupId: 'event-monitor',
})

app.listen({
  host: '0.0.0.0',
  port: 3334
}).then(async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'sso.user.created', fromBeginning: true })
  await consumers.SsoUserCreate()
  console.log('Server 2 running')
})