function factory (opts, input, out) {
	input = input[0];
	const topic = input.pipe;
	input.on('update', (payload, timestamp, ctx) => opts.node.send({
		topic: ctx.event,
		payload,
		timestamp,
		source: ctx.source.info.subject.commonName
	}));
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
