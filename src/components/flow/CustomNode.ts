import { HtmlNode, HtmlNodeModel } from "@logicflow/core";
import { createApp, h } from "vue";
import VueNode from "./VueNode.vue";

// 自定义节点
class UmlModel extends HtmlNodeModel {
  setAttributes() {
    this.text.editable = false; // 禁止节点文本编辑
    const width = 240;
    const height = 35;
    this.width = width;
    this.height = height;
    this.radius = 5;
    this.anchorsOffset = [
      [width / 2, 0],
      [0, height / 2],
      [-width / 2, 0],
      [0, -height / 2],
    ];
  }
}

class UmlNode extends HtmlNode {
  isMounted: boolean;
  r: any;
  app: any;
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.r = h(VueNode, {
      text: props.model.text.value,
    });
    this.app = createApp({
      render: () => this.r,
    });
  }
  setHtml(rootEl) {
    if (!this.isMounted) {
      this.isMounted = true;
      const node = document.createElement("div");
      node.style.width = "99%";
      node.style.height = "94%";
      rootEl.appendChild(node);
      this.app.mount(node);
    } else {
      this.r.component.props.text = this.props.model.text.value;
    }
  }
  getText() {
    return null;
  }
}

export default {
  type: "CustomNode",
  view: UmlNode,
  model: UmlModel,
};
