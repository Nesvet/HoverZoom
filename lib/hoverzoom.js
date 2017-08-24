export default class HoverZoom {
	constructor(element, options = {}) {
		if (typeof element == "string") element = document.querySelector(element);
		
		this.padding = Object.assign({
			top:	0,
			right:	0,
			bottom:	0,
			left:	0
		}, options.padding ? typeof options.padding == "number" ? {
			top:	options.padding,
			right:	options.padding,
			bottom:	options.padding,
			left:	options.padding
		} : options.padding : {});
		this.mode = options.mode || "contain";
		
		this.layoutNode = element;
		this.zoomableNode = this.layoutNode.children[0];
		
		this.layoutNode.classList.add("hoverzoom-layout");
		this.zoomableNode.classList.add("hoverzoom-zoomable");
		
		this.transitionDuration = parseFloat(getComputedStyle(this.zoomableNode).transitionDuration) * 1000;
		const layoutComputedStyle = getComputedStyle(this.layoutNode);
		this.layoutPadding = {
			top:	parseFloat(layoutComputedStyle.paddingTop),
			right:	parseFloat(layoutComputedStyle.paddingRight),
			bottom: parseFloat(layoutComputedStyle.paddingBottom),
			left:	parseFloat(layoutComputedStyle.paddingLeft)
		};
		
		this.layoutNode.addEventListener("mouseenter", () => {
			this.noTransitionTimeout = setTimeout(() => this.zoomableNode.classList.add("hoverzoom-no-transition"), this.transitionDuration);
		});
		this.layoutNode.addEventListener("mousemove", event => {
			const layoutWidth = this.layoutNode.clientWidth - this.padding.left - this.padding.right;
			const layoutHeight = this.layoutNode.clientHeight - this.padding.top - this.padding.bottom;
			const translateX = (this.zoomableNode.offsetWidth - (this.layoutNode.clientWidth - this.layoutPadding.left - this.layoutPadding.right)) * (((layoutWidth / 2) - Math.min(Math.max(event.pageX - this.layoutNode.offsetLeft - this.padding.left, 0), layoutWidth)) / layoutWidth);
			const translateY = (this.zoomableNode.offsetHeight - (this.layoutNode.clientHeight - this.layoutPadding.top - this.layoutPadding.bottom)) * (((layoutHeight / 2) - Math.min(Math.max(event.pageY - this.layoutNode.offsetTop - this.padding.top, 0), layoutHeight)) / layoutHeight);
			this.zoomableNode.style.transform = `scale(1) translate(${translateX}px, ${translateY}px)`;
		});
		this.layoutNode.addEventListener("mouseleave", () => {
			clearTimeout(this.noTransitionTimeout);
			this.zoomableNode.classList.remove("hoverzoom-no-transition");
			this.update(false);
		});
		
		this.zoomableNode.classList.add("hoverzoom-no-transition");
		this.update();
		this.zoomableNode.classList.remove("hoverzoom-no-transition");
	}
	
	updateScale() {
		const layoutWidth = this.layoutNode.clientWidth - this.layoutPadding.left - this.layoutPadding.right;
		const layoutHeight = this.layoutNode.clientHeight - this.layoutPadding.top - this.layoutPadding.bottom;
		const { width: zoomableWidth, height: zoomableHeight } = this.zoomableNode.getBoundingClientRect();
		this.scale = (this.mode == "autoHeight" || (this.mode == "contain" && (layoutWidth - zoomableWidth <= layoutHeight - zoomableHeight)) || (this.mode == "cover" && (layoutWidth - zoomableWidth >= layoutHeight - zoomableHeight))) ? layoutWidth / zoomableWidth : layoutHeight / zoomableHeight;
	}
	
	update(updateScale = true) {
		if (updateScale) this.updateScale();
		this.zoomableNode.style.transform = `scale(${this.scale})`;
		if (this.mode == "autoHeight") this.layoutNode.style.height = `${Math.ceil(this.zoomableNode.offsetHeight * this.scale)}px`;
		else if (this.mode == "autoWidth") this.layoutNode.style.width = `${Math.ceil(this.zoomableNode.offsetWidth * this.scale)}px`;
	}
}
