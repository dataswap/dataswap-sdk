import dotenv from 'dotenv';


function setup() {
    // import test Environmental parameters
    dotenv.config()
}

export function mochaGlobalSetup() {
    setup()
    console.log(`@@@@ Mocha add hooks finished @@@@`)
}
