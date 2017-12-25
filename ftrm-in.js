function factory (opts, input, out) {
	input = input[0];
	const topic = input.pipe;
	input.on('update', (payload, timestamp) => opts.node.send({topic, payload, timestamp}));
}

module.exports = function (RED) {
	RED.nodes.registerType('ftrm-in', function (config) {
		RED.nodes.createNode(this, config);
		const node = this;
		const realm = RED.nodes.getNode(config.realm);
		if (!realm) return;
		if (!config || !config.pipe) return;
		realm.ftrm.then((ftrm) => ftrm.run({factory}, {
			input: config.pipe,
			node
		}));
	});
};
