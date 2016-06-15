/**
 * A template basic message for sending a single instruction (header.type) and a key-value pair dataset.
 */
function SimpleMessage() {

	// message header
	this.header = {}
	this.header.type = "undefined";
	this.header.id = -1;

	// message payload - key-value pairs
	this.data = [];
}