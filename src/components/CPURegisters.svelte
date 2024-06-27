<script>
    import { register_data, getRegisterValue, setRegisterValue, initRegisters } from '../registerStore';
    import {sizes} from './CPURegisterData.json';

    // included in tailwind.config.mjs in safelist, to force inclusion in bundle
    const colors = {
        "8": "bg-yellow-600",
        "16": "bg-yellow-500",
        "32": "bg-yellow-400",
        "64": "bg-yellow-300",
        "general-purpose": "text-amber-100 bg-black",
        "general-purpose_SYMBOL": "text-green-300",
        "reserved": "text-white bg-gray-800",
        "reserved_SYMBOL": "text-red-300",
    }

    // long tab names
    const tab_names = ["64-bit", "32-bit", "16-bit", "8-bit Low", "8-bit High"];

    let tab = "64-bit";
    let tab_data = sizes.filter((s) => s.name == tab)[0];
</script>
<div class="flex flex-col bg-cyan-900 p-2 rounded-xl w-96 h-fit shadow-xl justify-center items-center">
    <h1 class="text-2xl font-serif text-yellow-300 text-center drop-shadow-lg mb-0"><b>CPYOU</b> <i class="text-yellow-400">Registers</i></h1>
    <b class="text-center mb-1 text-white bg-cyan-800 w-fit">BASE 10</b>
    <!-- svelte-ignore a11y-missing-attribute -->
    <div role="tablist" class="tabs tabs-lifted">

        {#each tab_names as name}
            <!-- svelte-ignore a11y-interactive-supports-focus -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <a 
                role="tab" 
                class="tab h-fit font-mono text-sm m-0
				{
                    tab == name ? 'tab-active' : ''
                }" 
                on:click={() => {
                    tab = name; tab_data = sizes.filter((s) => s.name == name)[0];
                }}
            >
                {tab == name ? name : name.replaceAll("-bit", "B").replaceAll("Low", "L").replaceAll("High", "H")}
            </a>
        {/each}
    </div>

    <div class="{colors[tab_data.bits]} p-1 h-fit rounded-b-md">
        <!-- <h1 class="text-center text-black font-mono">{tab_data.bits}B</h1> -->
        <div class="flex flex-wrap">
            {#each tab_data.registers as register}
                <div class="p-2 text-xs {colors[register.type]} border-green-100 border">
                    <span>{register.mnemonic} <i class="text-xs {colors[register.type+"_SYMBOL"]}">{register.type=="general-purpose" ? "G" : "R"}</i></span>
                    <br/>
                    <span class="text-yellow-300">{$register_data[register.mnemonic].data}</span>
                </div>
            {/each}
        </div>
    </div>
    

</div>