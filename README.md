# reddit-comment-renderer

Renders a Reddit comment as a png file.

# Usage
```javascript
const render = require("reddit-comment-renderer");
render(
		"AWildSketchAppeared" /* Username */,
		"Lorem ipsum dolor sit amet" /* Comment */,
		"16.5k" /* Upvotes */, "8h" /* Timestamp */,
		1920 /* Image Width */,
		1080 /* Image Height */,
		3 /* "Zoom" */,
		"out.png" /* Output File */
	);
```

# Example
![Example](https://raw.githubusercontent.com/AndrewYatzkan/reddit-comment-renderer/master/comment.png)

### Expect future updates, planning on adding:
- dark mode + custom colors
- desktop theme (currently mobile theme)
- replies to comments