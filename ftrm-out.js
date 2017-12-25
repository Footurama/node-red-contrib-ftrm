function factory (opts, input, output) {
	output = output[0];
	opts.node.on('input', (msg) => {
		output.value = msg.payload;
	});
}

module.exports = function (RED) {
	RED.nodes.registerType('ftrm-out', function (config) {
		RED.nodes.createNode(this, config);
		const node = this;
		const realm = RED.nodes.getNode(config.realm);
		if (!realm) return;
		if (!config || !config.pipe) return;
		realm.ftrm.then((ftrm) => ftrm.run({factory}, {
			output: config.pipe,
			node
		}));
	});
};
