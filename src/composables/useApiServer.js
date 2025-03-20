import { ref } from 'vue';
import axios from 'axios';


let apiServer = '';
// VITE_API_URL
let { PROD ,VITE_API } = import.meta.env;
console.log(`env:`, import.meta.env); // api2

if (!PROD) {
  // 開發切換
  console.log(`開發模式`);
  apiServer = '/server/api2';
}else {
  console.log(`壓縮模式`);
  // ~ 方法01 出來會是 /api2/users
  // 需透過 nginx 反向代理 抓/api2
  // 再轉成 https://localdb-1w4g.onrender.com/api2/users
  apiServer = `${VITE_API ?? ''}`;

  // ~ 方法02 直接使用 正式網址
  // https://localdb-1w4g.onrender.com/api2/users
  // apiServer = `${VITE_API_URL ?? ''}${VITE_API ?? ''}`;
}

export const useApiServer = () => {
  const data = ref([]);
  const errorMessage = ref("");

  const FetchInit = async (url) => {
     // 使用 apiServer 拼接 URL
     // apiUrl: /server/api2/users
    const apiUrl = `${apiServer}${url}`;
    console.log(`apiUrl:`, apiUrl);

    try {
      const res = await axios.get(apiUrl);
      data.value = res.data.data;
    } catch (error) {
      console.log('catch', error);
      errorMessage.value = "API 發生錯誤";
    }
  };

  return {
    data,
    errorMessage,
    FetchInit,
  };
};
