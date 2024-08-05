import { Vonage } from '@vonage/server-sdk'

//@ts-ignore
const vonage = new Vonage({
    apiKey: "b701e175",
    apiSecret: "vAH8lDujGFZVFbxd"
})

export async function sendSMS(to: string, text: string) {
    let res = false
    await vonage.sms.send({ to, from: "Anvima Code", text })
        .then(resp => {
            console.log('SMS Enviada com sucesso');
            console.log(resp);
            res = true
        })
        .catch(err => {
            console.log('Erro ao enviar a mensagem.');
            console.error(err);
            res = false
        });

    return res
}
