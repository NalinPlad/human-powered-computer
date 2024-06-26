import { $ } from "bun";

await $`gcc test.c`;

const objdump_output = await $`objdump -D -M intel --no-show-raw-insn a.out`.text();

let output_data = {
    "blocks": [],
    "raw_full": "",
};

const blocks = objdump_output.split("\n\n");
blocks.shift();
blocks.shift();

blocks.pop();
blocks.pop();

blocks.forEach((block) => {
    block = block.split("\n");
    console.log(block[0]);
    let block_name = block[0].split(" ")[1];
    
    let block_data = {
        "name": block_name,
        "instructions": [],
        "raw": ""
    }

    block.forEach((line, ind) => {
        // skip first line
        if(ind === 0) return;

        const address = line.split(":")[0];
        let instruction = line.split("\t");
        instruction.shift();
        instruction = instruction.join(" ");

        block_data.instructions.push({
            "address": line.split(":")[0],
            "instruction": instruction
        
        });
    });

    block_data.raw += block_name + "\n";
    block_data.instructions.forEach((instruction) => {
        block_data.raw += "\t" + instruction.instruction + "\n";
    });

    output_data.raw_full += block_data.raw + "\n";

    output_data.blocks.push(block_data);
});

console.log(JSON.stringify(output_data, null, 2));

// write json to output.json
await $`echo '${JSON.stringify(output_data, null, 2)}' > output.json`;

await $`rm a.out`;