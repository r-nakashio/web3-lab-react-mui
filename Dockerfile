# Version 20のNode.jsをベースにする
FROM node:20-alpine
# Docker接続時に入るリポジトリ
WORKDIR /home/react-mui/app
# ビルド時に実行されるコマンド
RUN npm install -g npm create-react-app