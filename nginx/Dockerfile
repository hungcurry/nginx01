FROM nginx:alpine

# 複製自定義配置
COPY nginx-share.conf /etc/nginx/conf.d/default.conf

# 創建存放不同環境靜態文件的目錄
RUN mkdir -p /usr/share/nginx/html/dev
RUN mkdir -p /usr/share/nginx/html/test
RUN mkdir -p /usr/share/nginx/html/prod

EXPOSE 90

CMD ["nginx", "-g", "daemon off;"]
