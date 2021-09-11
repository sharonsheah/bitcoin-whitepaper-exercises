"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// Insert each line into blockchain
for (let line of poem) {
	createBlock(line);
}

function createBlock(_data) {
	let block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
		data: _data,
		timestamp: Date.now(),
	};
	block.hash = blockHash(block);
	Blockchain.blocks.push(block);

	return block;
}

function verifyBlock(block) {
	if (block.data == null) return false;
	if (block.index === 0) {
		if (block.hash !== "000000") return false;
	}
	else {
		if (!block.prevHash) return false;
		if (!(
			typeof block.index === "number" &&
			Number.isInteger(block.index) &&
			block.index > 0
		)) {
			return false;
		}
		if (block.hash !== blockHash(block)) return false;
	}

	return true;
}

function verifyChain(blockchain) {
	const prevHash;
	for (let block of blockchain.blocks) {
		if (prevHash && block.prevHash !== prevHash) return false;
		if (!verifyBlock(block)) return false;
		prevHash = block.hash;
	}

	return true;
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

function blockHash(bl) {
	let block = JSON.stringify(bl);
	return crypto.createHash("sha256").update(block).digest("hex");
}
