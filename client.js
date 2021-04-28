const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org/');

const delay = ms => new Promise(res => setTimeout(res, ms));

const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const sensorLuzC = 'sensor-luz-client';
var luz = 0;

const setorLuz1C = 'setor-luz-1-client';
const setorLuz2C = 'setor-luz-2-client';
const setorLuz3C = 'setor-luz-3-client';

const autoC = 'auto-client'; 

const resultSensorLuz = 'result-sensor-luz';

const resultSetorLuz1C = 'result-sentor-luz-1-client';
const resultSetorLuz2C = 'result-sentor-luz-2-client';
const resultSetorLuz3C = 'result-sentor-luz-3-client';

const resultAutoC = 'result-auto-client';

const menu = '\nOlá, este projeto monitora e controla o luz ambiente\nPara saber a quantidade de Luz que se incide no ambiente digite: L\nPara ter controle das fontes luminosas digite: C\nPara ativar ou desativar um setor digite: S1 ou S2 ou S3\nLembrando que existe três setores para serem iluminados\nOu digite M para acessar o menu a qualquer momento.\n';

client.on('connect', () => {
    console.log(menu);
    rl.addListener('line', line => {
        const comando = line.toUpperCase();

        switch (comando[0]) {
            case 'M':
                console.log(menu);
                break;
            case 'L':
                client.subscribe(resultSensorLuz, (err) => {
                    if (!err) {
                        client.publish(sensorLuzC, '');
                    }else {
                        console.log('\nAlgo deu errado! :\\\n');
                    }
                });
                break;
                case 'C':
                    client.subscribe(resultAutoC, (err) => {
                        if (!err) {
                            client.publish(autoC, '');
                        }else {
                            console.log('\nAlgo deu errado! :\\\n');
                        }
                    });
                    break;
                case 'S':
                    if (comando[1] == '1') {
                        client.subscribe(resultSetorLuz1C, (err) => {
                            if (!err) {
                                client.publish(setorLuz1C, '');
                            }else {
                                console.log('\nAlgo deu errado! :\\\n');
                            }
                        });
                    }else if (comando[1] == '2') {
                        client.subscribe(resultSetorLuz2C, (err) => {
                            if (!err) {
                                client.publish(setorLuz2C, '');
                            }else {
                                console.log('\nAlgo deu errado! :\\\n');
                            }
                        });
                    }else if (comando[1] == '3') {
                        client.subscribe(resultSetorLuz3C, (err) => {
                            if (!err) {
                                client.publish(setorLuz3C, '');
                            }else {
                                console.log('\nAlgo deu errado! :\\\n');
                            }
                        });
                    }
                    break;
                default:
                    console.log('\nDesculpa! :\\\nComando não aceito!\n');
                    break;
            }
    });
});
client.on('message', (topic, message) => {
    switch (topic) {
        case resultSensorLuz:
            luz = message;
            console.log(`\n>>>> Luz ambiente esteve com:\n ${message} \nvalores em lux\n`);
            break;
        case resultSetorLuz1C:
            if (message != 'error') {
                if (message == 'true') {
                    console.log('\n>>>>Fontes luminosas do setor 1. LIGADAS!\n');
                }else if (message == 'false') {
                    console.log('\n>>>>Fontes luminosas do setor 1. DESLIGADAS!\n');
                }
            }else {
                console.log('\nImpossivel ligar as fontes luminosas do setor 1!:\\\n');
            }
            break;
        case resultSetorLuz2C:
            if (message != 'error') {
                if (message == 'true') {
                    console.log('\n>>>>Fontes luminosas do setor 2. LIGADAS!\n');
                }else if (message == 'false') {
                    console.log('\n>>>>Fontes luminosas do setor 2. DESLIGADAS!\n');
                }
            }else {
                console.log('\nImpossivel ligar as fontes luminosas do setor 2!:\\\n');
            }
            break;
        case resultSetorLuz3C:
            if (message != 'error') {
                if (message == 'true') {
                    console.log('\n>>>>Fontes luminosas do setor 3. LIGADAS!\n');
                }else if (message == 'false') {
                    console.log('\n>>>>Fontes luminosas do setor 3. DESLIGADAS!\n');
                }
            }else {
                console.log('\nImpossivel ligar as fontes luminosas do setor 3!:\\\n');
            }
            break;
        case resultAutoC:
            if (message == 'true') {
                console.log('\n>>>>Modo automatico. LIGADA!\n');
            }else if (message == 'false') {
                console.log('\n>>>>Modo automatico. DESLIGADA!\n');
            }
            break;
    }
});