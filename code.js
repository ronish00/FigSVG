figma.showUI(__html__, { width: 440, height: 480 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "generate-svg") {
    try {
      const node = figma.createNodeFromSvg(msg.svg);
      figma.currentPage.appendChild(node);
      node.x = figma.viewport.center.x;
      node.y = figma.viewport.center.y;
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);

      figma.ui.postMessage({
        type: "success",
        message: "SVG inserted successfully!",
      });
    } catch (err) {
      figma.ui.postMessage({ type: "error", message: "Invalid SVG code." });
      console.error("Error creating node from SVG:", err);
    }
  }
};
