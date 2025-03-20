render docker部屬
---

Dockerfile Path 填入
~ 1.docker/Dockerfile.dev
~ 2.然後貼上 各環境 / 環境變數


#~啟動
docker-compose up -d

#~ 停止所有容器/ 刪除所有映像/ 刪除所有卷
docker-compose down --rmi all --volumes

#~打包
docker save -o node-app-2024.tar node-app-2024


Vue 並透過 Dockerfile 來部署時，
通常會有兩種主要方式來提供靜態檔案：

1️⃣ 使用 Nginx 提供 Vue 應用的靜態檔案（最常見）<br>
2️⃣ 使用 Node.js（Express 或其他後端框架）來提供靜態檔案
