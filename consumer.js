const mqtt = require('mqtt');
const broker = mqtt.connect('mqtt://test.mosquitto.org/');

const sensorLuzP = 'sensor-luz-publisher';
const sensorLuzC = 'sensor-luz-client';
var intLuz = [];

const setorLuz1C = 'setor-luz-1-client';
const setorLuz2C = 'setor-luz-2-client';
const setorLuz3C = 'setor-luz-3-client';
const setorLuz1P = 'setor-luz-1-publisher';
const setorLuz2P = 'setor-luz-2-publisher';
const setorLuz3P = 'setor-luz-3-publisher';

var setorL1 = false;
var setorL2 = false;
var setorL3 = false;

const autoC = 'auto-client';
const autoP = 'auto-publisher';
var modoAuto = true; // modo automático

const resultSensorLuz = 'result-sensor-luz';

const resultSetorLuz1C = 'result-sentor-luz-1-client';
const resultSetorLuz2C = 'result-sentor-luz-2-client';
const resultSetorLuz3C = 'result-sentor-luz-3-client';
const resultSetorLuz1P = 'result-sentor-luz-1-publisher';
const resultSetorLuz2P = 'result-sentor-luz-2-publisher';
const resultSetorLuz3P = 'result-sentor-luz-3-publisher';

const resultAutoC = 'result-auto-client';
const resultAutoP = 'result-auto-publisher';

broker.on('connect', () => {
    broker.subscribe(sensorLuzP, (err) => {
        if (!err) {
            console.log(`Subscrito o tópico ${sensorLuzP} com sucesso!`);
        }
    });
    broker.subscribe(sensorLuzC, (err) => {
        if (!err) {
            console.log(`Subscrito o tópico ${sensorLuzC} com sucesso!`);
        }
    });
    broker.subscribe(setorLuz1C, (err) => {
        if (!err) {
            console.log(`Subscrito o tópico ${setorLuz1C} com sucesso!`);
        }
    });
    broker.subscribe(setorLuz1P, (err) => {
        if (!err) {
            console.log(`Subscrito o tópico ${setorLuz1P} com sucesso!`);
        }
    });
    broker.subscribe(setorLuz2C, (err) => {
        if (!err) {
            console.log(`Subscrito o tópico ${setorLuz2C} com sucesso!`);
        }
    });
    broker.subscribe(setorLuz2P, (err) => {
        if (!err) {
            console.log(`Subscrito o tópico ${setorLuz2P} com sucesso!`);
        }
    });
    broker.subscribe(setorLuz3C, (err) => {
        if (!err) {
            console.log(`Subscrito o tópico ${setorLuz3C} com sucesso!`);
        }
    });
    broker.subscribe(setorLuz3P, (err) => {
        if (!err) {
            console.log(`Subscrito o tópico ${setorLuz3P} com sucesso!`);
        }
    });
    broker.subscribe(autoC, (err) => {
        if (!err) {
            console.log(`Subscrito o tópico ${autoC} com sucesso!`);
        }
    });
    broker.subscribe(autoP, (err) => {
        if (!err) {
            console.log(`Subscrito o tópico ${autoP} com sucesso!`);
        }
    });
});

broker.on('message', (topic, message) => {
    //Topicos do cliente
    if (topic == sensorLuzC) {
        broker.publish(resultSensorLuz, intLuz.toString());
        intLuz = [];
    }else if (topic == setorLuz1C) {
        if (modoAuto == false) {
            if (setorL1 == false) {
                setorL1 = true;
                broker.publish(resultSetorLuz1C, 'true');
            }else {
                setorL1 = false;
                broker.publish(resultSetorLuz1C, 'false');
            }
        }else {
            broker.publish(resultSetorLuz1C, 'error');
        }
    }else if (topic == setorLuz2C) {
        if (modoAuto == false) {
            if (setorL2 == false) {
                setorL2 = true;
                broker.publish(resultSetorLuz2C, 'true');
            }else {
                setorL2 = false;
                broker.publish(resultSetorLuz2C, 'false');
            }
        }else {
            broker.publish(resultSetorLuz2C, 'error');
        }
    }else if (topic == setorLuz3C) {
        if (modoAuto == false) {
            if (setorL3 == false) {
                setorL3 = true;
                broker.publish(resultSetorLuz3C, 'true');
            }else {
                setorL3 = false;
                broker.publish(resultSetorLuz3C, 'false');
            }
        }else {
            broker.publish(resultSetorLuz3C, 'error');
        }
    }else if (topic == autoC) {
        if (modoAuto === false) {
            modoAuto = true;
            broker.publish(resultAutoC, 'true');
        }else {
            modoAuto = false;
            broker.publish(resultAutoC, 'false');
        }
    }
    //Topicos do publisher
    else if (topic == sensorLuzP) {
        intLuz.push(message);
        console.log(intLuz.toString());
    }else if (topic == setorLuz1P) {
        broker.publish(resultSetorLuz1P, setorL1.toString());
    }else if (topic == setorLuz2P) {
        broker.publish(resultSetorLuz2P, setorL2.toString());
    }else if (topic == setorLuz3P) {
        broker.publish(resultSetorLuz3P, setorL3.toString());
    }else if (topic == autoP) {
        broker.publish(resultAutoP, modoAuto.toString());
    }
});