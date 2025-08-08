# Microsoft公式のdevcontainerイメージを使用
FROM mcr.microsoft.com/devcontainers/javascript-node:20

# 作業ディレクトリを設定（devcontainerと同じパス）
WORKDIR /workspaces/

# create-react-appをグローバルインストール
RUN npm install -g create-react-app

# nodeユーザーに切り替え
USER node
