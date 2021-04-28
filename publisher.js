const mqtt = require('mqtt');
const publisher = mqtt.connect('mqtt://test.mosquitto.org/');

const delay = ms => new Promise(res => setTimeout(res, ms));

const sensorLuzP = 'sensor-luz-publisher';

const setorLuz1P = 'setor-luz-1-publisher';
const setorLuz2P = 'setor-luz-2-publisher';
const setorLuz3P = 'setor-luz-3-publisher';

const autoP = 'auto-publisher';
const resultAutoP = 'result-auto-publisher';

const resultSetorLuz1P = 'result-sentor-luz-1-publisher';
const resultSetorLuz2P = 'result-sentor-luz-2-publisher';
const resultSetorLuz3P = 'result-sentor-luz-3-publisher';

var modoAuto = true;

var setorL1 = false;
var setorL2 = false;
var setorL3 = false;

function sensor(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function apagaSetores() {
    setorL1 = false;
    setorL2 = false;
    setorL3 = false;
}

publisher.on('connect', async () => {
    console.log("Conectado no broker MQTT");

    while (true) {
        const fluxLuminoso = sensor(0, 100);
        console.log(fluxLuminoso);
        
        if (modoAuto == true) {
            if (fluxLuminoso >= 0 && fluxLuminoso < 25) {
                apagaSetores();
                setorL1 = true;
                console.log('Setor L1 ATIVO');
                setorL2 = true;
                console.log('Setor L2 ATIVO');
                setorL3 = true;
                console.log('Setor L3 ATIVO');
            }else if (fluxLuminoso >= 25 && fluxLuminoso < 50) {
                apagaSetores();
                setorL1 = true;
                console.log('Setor L1 ATIVO');
                setorL3 = false;
                console.log('Setor L3 ATIVO');
            }else if (fluxLuminoso >= 50 && fluxLuminoso < 75) {
                apagaSetores();
                setorL2 = true;
                console.log('Setor L2 ATIVO');
            }else {
                apagaSetores();
            }
        }
        
        publisher.publish(sensorLuzP, fluxLuminoso.toString());

        await delay(2500); // 2.5 segundos
        //========================================================
        publisher.subscribe(resultAutoP, (err) => {
            if (!err) {
                publisher.publish(autoP, '');
            }else {
                console.log('\nAlgo deu errado! :\\\n');
            }
        });
        publisher.subscribe(resultSetorLuz1P, (err) => {
            if (!err) {
                publisher.publish(setorLuz1P, '');
            }else {
                console.log('\nAlgo deu errado! :\\\n');
            }
        });
        publisher.subscribe(resultSetorLuz2P, (err) => {
            if (!err) {
                publisher.publish(setorLuz2P, '');
            }else {
                console.log('\nAlgo deu errado! :\\\n');
            }
        });
        publisher.subscribe(resultSetorLuz3P, (err) => {
            if (!err) {
                publisher.publish(setorLuz3P, '');
            }else {
                console.log('\nAlgo deu errado! :\\\n');
            }
        });

        await delay(2500); // 2.5 segundo
    }
});

publisher.on('message', (topic, message) => {
   switch (topic) {
       case resultAutoP:
           if (message == 'true') {
               modoAuto = true;
               console.log('\nModo automatico ATIVO!\n');
           }else if (message == 'false') {
                modoAuto = false;
                console.log('\nModo automatico DESATIVO!\n');
           }
           break;
       case resultSetorLuz1P:
           if (modoAuto == false) {
                if (message == 'true') {
                    setorL1 = true;
                    console.log('\nSetor 1 ATIVO!\n');
                }else if (message == 'false') {
                    setorL1 = false;
                    console.log('\nSetor 1 DESATIVO!\n');
                }
           }
           break;
        case resultSetorLuz2P:
            if (modoAuto == false) {
                if (message == 'true') {
                    setorL2 = true;
                    console.log('\nSetor 2 ATIVO!\n');
                }else if (message == 'false') {
                    setorL2 = false;
                    console.log('\nSetor 2 DESATIVO!\n');
                }
           }
            break;
        case resultSetorLuz3P:
            if (modoAuto == false) {
                if (message == 'true') {
                    setorL3 = true;
                    console.log('\nSetor 3 ATIVO!\n');
                }else if (message == 'false') {
                    setorL3 = false;
                    console.log('\nSetor 3 DESATIVO!\n');
                }
           }
            break;
   } 
});