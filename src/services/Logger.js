export class Logger {
    log(message) {
        console.log(`INFO : ${message}`)
    }

    info(message) {
        console.log(`\x1b[34mINFO : ${message}\x1b[37m`)
    }

    error(message) {
        console.log(`\x1b[31mERROR : ${message}\x1b[37m`)
    }
}