Vue 並透過 Dockerfile 來部署時，
通常會有兩種主要方式來提供靜態檔案：
```jsx=
1️⃣ 使用 Nginx 提供 Vue 應用的靜態檔案（最常見）<br>
2️⃣ 使用 Node.js（Express 或其他後端框架）來提供靜態檔案
```

基本 render docker部屬
---
```jsx=
選web service 
使用 Dockerfile 方式
Dockerfile Path 填入
~ docker/Dockerfile.dev

#~啟動
docker-compose up -d

#~ 停止所有容器/ 刪除所有映像/ 刪除所有卷
docker-compose down --rmi all --volumes

#~打包
docker save -o node-app-2024.tar node-app-2024
```

nginx01 dockerhub + render 建置流程
---
🚀1. 設定 GitHub 分支
```jsx=
git checkout -b dev
git push origin dev

git checkout -b test
git push origin test
```

🚀2. 寫完 dockerfile 先運行上傳 dockerHub
```jsx=
~[ Portainer ]( http://localhost:9000 )
docker build -f docker/Dockerfile.dev --tag hungcurry/vue-docker-dev:v1 .
docker run -p 4040:80 -d hungcurry/vue-docker-dev:v1
~[ run ]( http://localhost:4040/dev )

~ 打包 images
docker save -o vue-docker-dev.tar hungcurry/vue-docker-dev:v1

~上傳 Docker Hub
docker login
docker push hungcurry/vue-docker-dev:v1

docker build -f docker/Dockerfile.prod --tag hungcurry/vue-docker-prod:v1 .
docker push hungcurry/vue-docker-prod:v1

docker build -f docker/Dockerfile.test --tag hungcurry/vue-docker-test:v1 .
docker push hungcurry/vue-docker-test:v1

~Render 測試部署
使用 hungcurry/vue-docker-dev:v1
來設定你的 Image
```

🚀3. GitHub Actions <br>
~Step 1：設定 GitHub Secrets
```jsx=
1️⃣ 進入 GitHub Repository
2️⃣ 點選 Settings → Secrets and variables → Actions
3️⃣ 新增以下 Secrets： 選專案 Repository secrets

// Docker Hub
DOCKER_USERNAME = ""
DOCKER_PASSWORD = ""

// Render 的 API Key
RENDER_API_KEY = ""
```
```jsx=
取得RenderAPI Key步驟
你可以在 Render Dashboard 
取得 API Key，步驟如下：

1️⃣ 登入 Render 👉 Render 官方網站
2️⃣ 點選右上角的「Settings」⚙️
3️⃣ 找到「API Keys」區塊
4️⃣ 點「Generate API Key」（如果還沒建立）
5️⃣ 複製 API Key
```

~Step 2：建立 GitHub Actions Workflow <br>
專案根目錄 建立 .github/workflows/deploy.yml
```jsx=
看檔案..
```

~Step 3：建立 render 3個環境專案
```jsx=
1️⃣ web service => Existing Image
2️⃣ hungcurry/vue-docker-test:v1

hungcurry/vue-docker-dev:latest
hungcurry/vue-docker-test:v1
hungcurry/vue-docker-prod:v1

記得要補 當時上傳tag :latest 或 :v1

產生環境網址:
~dev
https://vue-docker-dev.onrender.com/dev/
~test
https://vue-docker-test-huvz.onrender.com/test/
~prod
https://vue-docker-prod.onrender.com/prod/
```
