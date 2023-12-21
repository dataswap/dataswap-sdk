import dotenv from 'dotenv';


function setup() {
    // import test Environmental parameters
    dotenv.config()
}

export const testf = mochaGlobalSetup()

export function mochaGlobalSetup() {
    setup()
    console.log(`@@@@ Mocha add hooks finished @@@@`)
}
