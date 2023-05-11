import { consumer } from "@/server"

export default async function () {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(JSON.parse(message.value.toString()))
    },
  })
}