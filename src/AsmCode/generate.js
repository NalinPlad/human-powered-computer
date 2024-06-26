import { $ } from "bun";

await $`gcc -S -masm=intel test.c`;

const objdump_output = await $`objdump -D -M intel --no-show-raw-insn a.out`.text();

let output_data = [];

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
        "instructions": []
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

    output_data.push(block_data);
});

console.log(JSON.stringify(output_data, null, 2));