<script>
    let output = "0";
    let base = 10;
</script>

<div class="bg-yellow-100 p-5 rounded-xl">
    <h1 class="bg-red-950 text-red-400 p-3 font-mono text-xl"><span class="text-red-900">{"0".repeat(15-output.length)}</span>{output}</h1>
    <div class="bg-gray-900">
        <div class="w-full flex justify-around font-sans text-xs p-1">
            <b>TI</b>
            <b>Arithmetic Logic Unit</b>
        </div>
        <input type="radio"/>
        <div class="grid grid-cols-3">
            {#each ((base == 16 ? "DEFABC": "")+"7894561230").split("") as char}
                        <button class="bg-gray-800 text-white p-2 m-1 rounded-md" on:click={() => {
                            if(output != "0") output += char;
                            if(output == "0") output = char;
                        }}>
                            {char}
                        </button>
            {/each}
        </div>
    </div>
</div>