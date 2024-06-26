# 方案一：使用官方 Node.js 镜像并指定版本
FROM node:20.14.0

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件，并忽略 .dockerignore 中指定的目录
COPY . .

# 构建 Next.js 项目
RUN npm run build

# 暴露应用运行的端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
