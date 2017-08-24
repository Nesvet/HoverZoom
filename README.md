# HoverZoom

Dependency free zoom element on hover

## Setup

```
npm install hoverzoom
```

```html
<div id="container">
	<div>Some content for zooming</div>
</div>
```

```javascript
import HoverZoom from "hoverzoom";

const hoverZoom = new HoverZoom("#container", options);
```

## Options
Option | Type | Default | Description
------ | ---- | ------- | -----------
`mode` | `string` | `contain` | `contain`, `cover`, `autoHeight` or `autoWidth`
`padding` | `number` \| `object` | `{top: 0, right: 0, bottom: 0, left: 0}` | Sets padding for hover

## Methods
Method | Argument | Description
------ | -------- | -----------
`updateScale` | | Update `scale` value according to sizes of container and it's content
`update` | `updateScale` = `true` | Redraw

## License

MIT

Copyright © 2017 [Eugene Nesvetaev](https://vk.com/evgeniynesvetaev)
