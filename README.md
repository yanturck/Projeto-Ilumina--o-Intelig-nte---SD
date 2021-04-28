# Sensor de Luminosidade

O presente projeto visava a implementa de um sistema com uso de MQTT e Arduíno, capaz de gerenciar a luz artificial, tendo em vista o conforto visual e a utilização máxima da luz natural, além da utilização dos conceitos de automação por meio de serviços distribuídos.

Usando LDR, para saber a quantidade de luz que está presente no ambiente, juntamente com o ESP32, para fazer a integração do protótipo com o broker MQTT. Com isso a iluminação artificial só será acionada caso a luz natural seja insuficiente ou o usuário do sistema ative mais fontes, fazendo assim, também com que se economize energia ou poupe trabalho desnecessário.

No entanto, não fora possível a implementação completa do projeto, por falta do módulo ESP32 onde o Arduíno conseguiria se entrar na rede. Por conta disso, será apresentado apenas o códido JS tentando substuir certos parâmetros, como o sensor LDR e o ESP32.