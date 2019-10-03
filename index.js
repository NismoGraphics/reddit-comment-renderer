const { createCanvas, registerFont } = require("canvas");
const fs = require("fs");

module.exports = (username, comment, upvotes, timestamp="1h", width=1920, height=1080, zoom=3, dark=true, output="out.png") => {
	const canvas = createCanvas(width, height);
	const ctx = canvas.getContext("2d");
	const separator = "•"

	registerFont(__dirname + "/fonts/rfont.ttf", { family: "rfont" });

	var zoom = 3.8;
	var fontSize = 13 * zoom;

	// White/Dark background
	ctx.fillStyle = (dark ? #1A1A1B : "#FFFFFF");
	ctx.fillRect(0, 0, width, height);

	// Username
	var leftPadding = 10 * zoom;
	var topPadding = fontSize + 7 * zoom;
	ctx.font = fontSize + "px Helvetica";
	ctx.fillStyle = "#a5a4a4";
	ctx.fillText(username, leftPadding, topPadding)

	// Separator
	leftPadding += ctx.measureText(username).width + 4 * zoom;
	ctx.fillStyle = "#efefed";
	ctx.fillText(separator, leftPadding, topPadding);

	// Timestamp
	leftPadding += ctx.measureText(separator).width + 4 * zoom;
	ctx.fillStyle = "#a5a4a4";
	ctx.fillText(timestamp, leftPadding, topPadding);

	// Comment
	ctx.fillStyle = "#222222";
	leftPadding = 10 * zoom;
	topPadding += 7 * zoom;
	var lines = getLines(comment);
	for (let line of lines) {
		topPadding += fontSize;
		ctx.fillText(line, leftPadding, topPadding);
	}

	// Downvote

	ctx.font = 24 * zoom + "px rfont";
	ctx.fillStyle = "#ccccca";
	topPadding += fontSize + 18 * zoom;
	leftPadding = width - 8 * zoom - ctx.measureText("\uF115").width;
	ctx.fillText("\uF115", leftPadding, topPadding + 2.3 * zoom); // not sure why 2.3 * zoom is needed but it is

	// Upvotes
	ctx.font = 14 * zoom + "px rfont";
	leftPadding -= ctx.measureText(upvotes).width;
	ctx.fillText(upvotes, leftPadding, topPadding - 7 * zoom + 2.3 * zoom); // not sure about why - 7 * zoom is needed here ALSO not sure why 2.3 * zoom is needed but it is

	// Upvote
	ctx.font = 24 * zoom + "px rfont";
	leftPadding -= ctx.measureText("\uF16E").width;
	ctx.fillText("\uF16E", leftPadding, topPadding + 2.3 * zoom); // not sure why 2.3 * zoom is needed but it is

	// Divider
	leftPadding -= 8 * zoom;
	ctx.lineWidth = 1 * zoom;
	ctx.strokeStyle = "#efefed";
	ctx.beginPath();
	ctx.moveTo(leftPadding, topPadding - 20 * zoom);
	ctx.lineTo(leftPadding, topPadding);
	ctx.stroke();

	// More
	leftPadding -= 9 * zoom + ctx.measureText("\uF159").width;
	ctx.font = 20 * zoom + "px rfont";
	ctx.fillText("\uF159", leftPadding, topPadding);

	// Reply
	leftPadding -= 8 * zoom + ctx.measureText("\uF151").width;
	ctx.fillText("\uF151", leftPadding, topPadding);

	function getLines(text) {
		var words = text.split(" ");
		var lines = [];
		var line = "";

		for (var i = 0; i < words.length; i++) {
			var word = words[i];
			var testLine = line + word + " ";
			var testWidth = ctx.measureText(testLine).width;
			if (testWidth > width - 8 * zoom && i) {

				/* This entire isolated chunk is for wrapping when the entire word is longer than the width.
				 * There is probably a much more efficient way to do this. */
				if (line.match(/ /g).length === 1) {
					var characters = line.split("");
					line = "";
					for (let character of characters) {
						testLine = line + character //+ " ";
						testWidth = ctx.measureText(testLine).width;
						if (testWidth > width - 8 * zoom) {
							lines.push(line);
							line = character;
						} else {
							line = testLine;
						}
					}
					if (line) lines.push(line + " ");
					line = word + " ";
				} else {
					lines.push(line);
					line = word + " ";
				}

			} else {
				line = testLine;
			}
		}
		if (line) lines.push(line);
		return lines.map(i => i.split("\n")).flat();
	}

	fs.writeFileSync(output, canvas.toDataURL().replace("data:image/png;base64,", ""), "base64");
}
