#### 优化扩展
- 底部导航栏，主屏幕（已完成），Setting，Chatbot
- Chatbot：普通模式：调用deepseek api实现聊天，智慧模式：调用本地的后端模型部分基于 Haystack 框架，结合 Elasticsearch 检索与 Hugging Face 上托管的 microsoft/Phi-3.5-mini-instruct 模型，通过 Retrieval-Augmented Generation（RAG）实现了基于课程讲义的智能问答。
- setting：用户信息，preference设置（主题颜色，聊天背景等）
- 用户连续点击发送请求的按钮，只处理一次
- 网页端应用：基于react（已实现），准备用tailwind优化ui界面
- 多语言支持（中英切换）- 账号信息编辑（用户名、头像）- 设置“游客”默认主题、登录用户默认主题
- 使用 react-hook-form 来统一管理输入验证、按钮节流、防重复提交
- 深色 / 浅色主题切换（配合 Setting）- 引入 react-native-reanimated 实现动画 FAB / Tab 交互- 使用 react-native-screens 提升导航性能
- Tailwind + @headlessui/react + shadcn/ui 重构 UI- 使用 React Router 实现 SPA 动画路由过渡
