<script>
    import {sizes} from './CPURegisterData.json';


	const register_data = sizes;
	
	const special_initializations = {
		// "EIP":
	}

	register_data.forEach((s) => {
		s.registers.forEach((r) => {
			switch (s.bits) {
				case 64:
					r.data = Uint8Array
			}
		});
	});

	

	// const register_data = sizes;

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

    const tab_names = ["64-bit", "32-bit", "16-bit", "8-bit Low", "8-bit High"];

    let tab = "64-bit";
    let tab_data = register_data.filter((s) => s.name == tab)[0];
</script>
<div class="flex flex-col bg-cyan-900 p-2 rounded-xl w-96 h-fit shadow-xl">
    <h1 class="text-2xl font-serif text-yellow-300 mb-2 text-center drop-shadow-lg"><b>CPYOU</b> <i class="text-yellow-400">Registers</i></h1>

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
                    tab = name; tab_data = register_data.filter((s) => s.name == name)[0];
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
                </div>
            {/each}
        </div>
    </div>
    

</div>