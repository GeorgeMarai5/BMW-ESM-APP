'use strict';

const Hapi = require('@hapi/hapi');
const Nexmo = require('nexmo');
const {
    Console
} = require('console');

const nexmo = new Nexmo({
    apiKey: '0e7ad0e0',
    apiSecret: 'PDLMvS4qmBEzkaPg'
}, {
    debug: true
});

const init = async () => {

    const server = Hapi.server({
        port: 7163,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });
    server.route({
        method: 'POST',
        path: '/view/service-progress',
        options: {
            cors: true,
            handler: async (request, h) => {
                const payload = request.payload;
                const result = await new Promise((resolve, reject) => {
                    nexmo.message.sendSms(payload.from, payload.to, payload.text, (error, response) => {
                        if (error) {
                            return reject(error)
                        } else {
                            return resolve(response);
                        }
                    });
                });

                console.log(JSON.stringify(result));

                if (result.messages[0].status === '0') {
                    return { message: 'It Worked!' };
                } else {
                    return { message: result.messages[0]['error-text'] };
                }
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
