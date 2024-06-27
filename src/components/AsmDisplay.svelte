<script>
    import asm_data from '../AsmCode/output.json'

    import Highlight from "svelte-highlight";
    import x86asm from "svelte-highlight/languages/x86asm";

    import { register_data, setRegisterValue, getRegisterValue, initRegisters} from '../registerStore';
    import { ini } from 'svelte-highlight/languages';

    // find address of _main first instruction
    const main = asm_data.blocks.find((block) => block.name.match(/main/)).instructions[0].address;
    
    // set RIP to main
    // initRegisters();

    setRegisterValue("RIP", main, 16);
    
    // console.log(main.instructions[0].address,16);

</script>

<div class="flex flex-col items-center bg-slate-900 p-5 gap-y-5 rounded-xl">
    <b class="font-mono">x86 INSTRUCTIONS</b>
    <!-- <div class="rounded"> -->
    <div class="flex">
        <div class=" bg-slate-800 py-4 px-4 flex flex-col gap-0 font-mono text-right">
            {#each asm_data.blocks as block }
                <br/>
                {#each block.instructions as instruction}
                    {#if instruction.address == $register_data["RIP"].data}
                        <span class="bg-slate-500 text-white px-3"><b class="text-yellow-400 drop-shadow-md">RIP </b>0x{instruction.address.replace("1000", "…")+"\n"}</span>
                    {:else}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a class="hover:bg-slate-600 cursor-pointer" on:click={() => {setRegisterValue("RIP", instruction.address, 16)}}>0x{instruction.address.replace("1000","…")+"\n"}</a>
                    {/if}
                {/each}
                <br/>
            {/each}
        </div>
        <Highlight language={x86asm} code={asm_data.raw_full} class="!p-0 bg-slate-800"/>
        
    </div>
    <!-- </div> -->
</div>