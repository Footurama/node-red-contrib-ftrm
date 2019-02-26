const FTRM = require('ftrm');

module.exports = function (RED) {
	RED.nodes.registerType('ftrm-config', function (config) {
		RED.nodes.createNode(this, config);

		// TODO: Catch errors
		this.ftrm = FTRM({
			key: Buffer.from(config.key),
			cert: Buffer.from(config.cert),
			ca: Buffer.from(config.ca),
			noSignalListeners: true,
			autoRunDir: false
		});

		this.ftrm.then((ftrm) => {
			this.on('close', (done) => {
				ftrm.shutdown().catch().then(() => setTimeout(done, 500));
			});
			ftrm._bus.hood.on('foundNeigh', (neigh) => {
				this.log('+ ' + neigh.info.subject.commonName);
			}).on('lostNeigh', (neigh) => {
				this.log('- ' + neigh.info.subject.commonName);
			});
		});
	});
};
