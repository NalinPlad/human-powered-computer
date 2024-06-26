<script>
    import asm_data from '../AsmCode/output.json'

    import Highlight from "svelte-highlight";
    import x86asm from "svelte-highlight/languages/x86asm";

</script>

<div class="flex flex-col items-center bg-slate-900 p-5 gap-y-5 rounded-xl">
    <b class="font-mono">x86 INSTRUCTIONS</b>
    <!-- <div class="rounded"> -->
    <div class="flex">
        <div class=" bg-slate-800 py-4 px-4 flex flex-col align-top gap-0 font-mono">
            {#each asm_data.blocks as block }
                <br/>
                {#each block.instructions as instruction}
                    <span class="">0x{instruction.address.replace("10000","…")+"\n"}</span>
                {/each}
                <br/>
            {/each}
        </div>
        <Highlight language={x86asm} code={asm_data.raw_full} class="!p-0 bg-slate-800"/>
        
    </div>
    <!-- </div> -->
</div>