<script>
    import {stack} from '../stackStore';
    import {register_data} from '../registerStore';
    
    String.prototype.isNumber = function(){return /^\d+$/.test(this);}

    let value = "";

    const registers = Object.keys(register_data.get());
</script>
<div class="bg-green-200 border-green-500 border-8 rounded-xl p-5 shadow-xl h-fit flex flex-col items-center font-mono">
    <h1 class="text-green-950 bg-green-400 p-2 mb-3">CPYOU <b class="italic">STACK</b></h1>
    <b class="text-3xl text-black drop-shadow-xl mb-3">{$stack}</b>
    <input
        type="text"
        bind:value={value}
        placeholder="Enter register or value"
        class=" rounded-lg p-2 bg-green-700 {(registers.includes(value.toUpperCase()) | value.isNumber()) ? "text-green-200" : "text-red-200"} font-bold placeholder:text-xs placeholder:text-white text-center mb-3"
    />
    <div class="flex justify-center w-full gap-x-3">
        <button class="btn">PUSH</button>
        <button class="btn">POP</button>
    </div>
</div>