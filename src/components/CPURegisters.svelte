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
    <!-- <b class="text-center mb-2 text-white bg-cyan-800 w-fit text-xs"><span class="font-serif italic">Now in... </span>BASE 10!</b> -->
     <input 
        type="text"
        class="font-mono"
        max=10
        size="3"
     />
    <!-- svelte-ignore a11y-missing-attribute -->
    <div role="tablist" class="tabs tabs-lifted w-full">

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

    <div class="{colors[tab_data.bits]} p-1 h-fit rounded-b-md w-full">
        <!-- <h1 class="text-center text-black font-mono">{tab_data.bits}B</h1> -->
        <div class="flex flex-wrap">
            {#each tab_data.registers as register}
                <div class="p-2 text-xs {colors[register.type]} border-green-100 border">
                    <span class="cursor-default">{register.mnemonic} <i class="text-xs {colors[register.type+"_SYMBOL"]}">{register.type=="general-purpose" ? "G" : "R"}</i></span>
                    <br/>
                    {#if register.type == "general-purpose"}
                        <span class="text-yellow-300 flex">
                            <span class="text-yellow-100">
                                {#if $register_data[register.mnemonic].base == 16}
                                    0x
                                {:else if $register_data[register.mnemonic].base == 2}
                                    0b
                                {/if}
                            </span>
                            <input 
                                type="text" 
                                class="font-mono cursor-text"
                                max="{parseInt("1".repeat(tab_data.bits),2)}" 
                                style="/*max-width: {parseInt("1".repeat(tab_data.bits),2).toString().length}ch;*/"
                                size={$register_data[register.mnemonic].data.length+1}
                                value={$register_data[register.mnemonic].data}
                                on:keydown={(e) => {
                                    // check if its a digit
                                    if (e.key.match(/[0-9]/)) {
                                        // check if it exceeds the max value
                                        if (parseInt(e.target.value + e.key, $register_data[register.mnemonic].base) > parseInt("1".repeat(tab_data.bits),2)) {
                                            e.preventDefault();
                                            return false;
                                        } else {
                                            // set the register value
                                            e.preventDefault();
                                            setRegisterValue(register.mnemonic, e.target.value + e.key);
                                        }
                                    } else if (e.key == "Backspace") {
                                        // set the register value
                                        setRegisterValue(register.mnemonic, e.target.value.slice(0, -1));
                                    } else {
                                        e.preventDefault();
                                        return false;
                                    }
                                }}
                            />
                        </span>
                    {:else}
                        <span class="text-yellow-300 flex font-mono cursor-default">
                            <span class="text-yellow-100">
                                {#if $register_data[register.mnemonic].base == 16}
                                    0x
                                {:else if $register_data[register.mnemonic].base == 2}
                                    0b
                                {/if}
                            </span>
                            {$register_data[register.mnemonic].data}
                        </span>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
    

</div>