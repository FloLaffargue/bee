export default {
    wss: {
        ip: '192.168.1.84',
        port: 3003
    },
    serialPort1: {
        port: '/dev/ttyACM0',
        baudRate: 9600,
        delimiter: "\r\n"
    },
    serialPort2: {
        port: '/dev/ttyACM1',
        baudRate: 57600,
        delimiter: "\r\n",
        weightCalibration: '190'
    }
}