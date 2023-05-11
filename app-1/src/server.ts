import { fastify } from 'fastify'
import { Kafka } from 'kafkajs'

const app = fastify()

const kafka = new Kafka({
  clientId: 'sso',
  brokers: ['localhost:29092']
})

const producer = kafka.producer({
  allowAutoTopicCreation: true
})

app.get('/register', async (req, res) => {

  const data = req.query

  const result = await producer.send({
    topic: 'sso.user.created',
    messages: [
      { value: JSON.stringify(data) },
    ]
  })

  return result
})

app.listen({
  host: '0.0.0.0',
  port: 3333
}).then(async () => {
  await producer.connect()
  console.log('Server 1 running')
})