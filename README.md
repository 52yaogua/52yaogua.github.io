# 易经开卦 · Yijing Resonance Lab

一个基于 Vue 3、Vite、Tailwind CSS 的响应式开卦体验。点击「摇卦」即可从 64 卦中随机抽取，并获得卦辞洞见、象传观照、现代应用策略与五行启示，适用于产品策划、团队协作或个人决策的灵感提示。

## 运行方式

```bash
npm install
npm run dev      # 启动本地开发服务器
npm run build    # 生成生产环境静态文件
npm run preview  # 预览打包结果
```

## 主要特性

- **64 卦数据集**：包含卦名、拼音、关键字、卦辞、象传、现代建议与五行属性。
- **多重解卦方式**：同屏呈现卦辞洞见、象传观照、应用策略与元素启示，方便横向比较。
- **摇卦交互**：单击按钮即可触发抽卦、记录最近抽卦历史，并提供时间戳。
- **响应式美学**：自定义字体、渐变背景、网格纹理与有机光斑，桌面与移动端一致体验。
- **技术栈**：Vue 3 `<script setup>`, TypeScript, Tailwind CSS, Rolldown Vite。

## 目录速览

- `src/data/hexagrams.ts`：六十四卦数据源。
- `src/components/YijingCaster.vue`：摇卦与解读主界面。
- `src/App.vue`：页面骨架与介绍区块。

欢迎根据自身需求扩展更多占筮方法、解读层级或 API 接入能力。

