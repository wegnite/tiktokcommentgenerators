# 设置身份验证

目前登录功能未启用，因为 Google 和 GitHub OAuth 都没有配置。您有以下选项：

## 选项 1: 启用 Google 登录（推荐）

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 凭据：
   - 转到"凭据"页面
   - 点击"创建凭据" > "OAuth 客户端 ID"
   - 选择"Web 应用程序"
   - 添加授权重定向 URI：
     - 开发环境：`http://localhost:3000/api/auth/callback/google`
     - 生产环境：`https://yourdomain.com/api/auth/callback/google`

5. 更新 `.env` 文件：
```env
AUTH_GOOGLE_ID = "你的客户端ID.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET = "你的客户端密钥"
NEXT_PUBLIC_AUTH_GOOGLE_ID = "你的客户端ID.apps.googleusercontent.com"
NEXT_PUBLIC_AUTH_GOOGLE_ENABLED = "true"
```

## 选项 2: 启用 GitHub 登录

1. 访问 [GitHub Settings > Developer settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - Application name: TikTok Comment Generator
   - Homepage URL: `http://localhost:3000` (开发) 或您的域名
   - Authorization callback URL: 
     - 开发：`http://localhost:3000/api/auth/callback/github`
     - 生产：`https://yourdomain.com/api/auth/callback/github`

4. 更新 `.env` 文件：
```env
AUTH_GITHUB_ID = "你的客户端ID"
AUTH_GITHUB_SECRET = "你的客户端密钥"
NEXT_PUBLIC_AUTH_GITHUB_ENABLED = "true"
```

## 选项 3: 使用测试模式（仅用于开发）

如果您只是想测试支付流程，我可以创建一个临时的测试登录功能。

## 重启服务器

配置完成后，重启开发服务器：
```bash
npm run dev
```

然后点击 "Pay with Creem" 按钮时，会弹出登录框，您可以使用 Google 或 GitHub 登录。