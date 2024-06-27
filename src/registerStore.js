import { atom, map } from 'nanostores';
import { sizes } from './components/CPURegisterData.json';

// let register_data = sizes;

const special_initializations = {
    // "EIP":
}

/**
 * @typedef {Object} register
 * @property {string} data
 * @property {number} bits
 * @property {number} base
*/

/** @type {import('nanostores').MapStore<Record<string, register>>} */

export const register_data = map({});



export function setRegisterValue(register, value, base = 10) {
    // console.log(register, value);
    register_data.setKey(register, {
        "data": value,
        "bits": register_data.get()[register].bits,
        "base": base
    });
}

export function getRegisterValue(register) {
    // console.log(register_data.get(register));
    return register_data.get()[register].data;
}


export function initRegisters() {
    sizes.forEach((s) => {
        s.registers.forEach((r) => {
            let val = "0"
            if (r.mnemonic in special_initializations) {
                val = special_initializations[r.mnemonic];
            }
    
            // console.log(r.mnemonic, val, s.bits);
    
            register_data.setKey(r.mnemonic, {
                "data": val,
                "bits": s.bits,
                "base": 10,
            });
        });
    });
}

initRegisters();

// registers data format
// let registers = {
//     "RAX": {
//         "data": "0",
//         "size": 64
//     }
// }



// export const RIP = atom(0x0);

