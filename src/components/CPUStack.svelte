<script>
    import {stack} from '../stackStore';
    import {register_data, getRegisterValue, setRegisterValue} from '../registerStore';
    
    String.prototype.isNumber = function(){return /^\d+$/.test(this);}
    String.prototype.isHex = function(){return /^0x[0-9A-Fa-f]+$/.test(this);}

    let value = "";
    let stack_base = 10;

    const registers = Object.keys(register_data.get());

    function push() {
        if (registers.includes(value.toUpperCase())) {
            stack.set(getRegisterValue(value.toUpperCase()));
            stack_base = register_data.get()[value.toUpperCase()].base;
        } else if (value.isNumber()) {
            stack.set(value);
            stack_base = 10;
        } else if (value.isHex()) {
            stack.set(value.slice(2));
            stack_base = 16;
        } else {
            return
        }
        value = "";
    }

    function pop() {
        if (registers.includes(value.toUpperCase())) {
            setRegisterValue(value.toUpperCase(), stack.get(), stack_base);
        } else {
            return
        }
        value = "";
    
    }
</script>
<div class="bg-green-200 border-green-500 border-8 rounded-xl p-5 shadow-xl h-fit flex flex-col items-center font-mono">
    <h1 class="text-green-950 bg-green-400 p-2 mb-3">CPYOU <b class="italic">STACK</b></h1>
    <b class="text-3xl text-black drop-shadow-xl mb-3"><span class="text-gray-600">{stack_base == 16 ? "0x" : ""}</span>{$stack}</b>
    <input
        type="text"
        bind:value={value}
        placeholder="Enter register or value"
        class=" {value.isHex() ? "normal-case" : "uppercase"} rounded-lg p-2 bg-green-700 {(registers.includes(value.toUpperCase()) | value.isNumber() | value.isHex()) ? "text-green-200" : "text-red-200"} font-bold placeholder:text-xs placeholder:text-white text-center mb-3"
    />
    <div class="flex justify-center w-full gap-x-3">
        <button on:click={push} class="btn {(registers.includes(value.toUpperCase()) | value.isNumber() | value.isHex()) ? "text-green-200" : "text-red-200 cursor-not-allowed"}">PUSH</button>
        <button on:click={pop} class="btn {registers.includes(value.toUpperCase()) ? "text-green-200" : "text-red-200 cursor-not-allowed"}">POP</button>
    </div>
</div>