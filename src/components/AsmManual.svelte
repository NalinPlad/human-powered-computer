<script>
    import man from './AsmManualData.json';

    let search = "";
</script>

<div class="w-80 h-96 bg-amber-900 p-3 font-mono rounded-lg shadow-xl text-right flex flex-col">
    <div class="flex flex-col items-end">
        <h1 class="text-amber-100 text-md w-2/3">The x86 Assembly Instruction Set</h1>
        <p class="text-xs">INTEL, 1995</p>
    </div>
    
    <hr class="w-full h-1 bg-amber-100 my-2 rounded-full"/>

    <input type="text" placeholder="Search..." bind:value={search} class="input mb-2"/>

    <div class="flex w-full flex-col text-left h-full overflow-scroll bg-amber-950 p-5 gap-y-5 rounded-xl">
        {#each man.instructions.filter((i) => (search=='' | (i.mnemonic.toUpperCase().search(search.toUpperCase()) != -1) | (i.name.toUpperCase().search(search.toUpperCase()) != -1) | (i.description.toUpperCase().search(search.toUpperCase()) != -1) )) as instruction}
                <div>
                    <div class="text-lg text-amber-100 flex gap-x-3 items-center ">
                        <span>{instruction.mnemonic}</span>
                        <div class="w-1 h-1 bg-neutral-500"></div>
                        <span class="text-amber-500 text-xs h-fit">{instruction.syntax}</span>
                    </div>
                    <p class="text-sm">{instruction.description}</p>
                </div>
            
        {/each}
    </div>
    <!-- <p class="">hello</p> -->
    <!-- <img class="self-end justify-self-end w-10" src="https://www.hatchwise.com/wp-content/uploads/2023/03/image-18.png.webp"/> -->
</div>