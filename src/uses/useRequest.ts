// axios.js
import { getCurrentInstance, ref } from 'vue';

export function useRequest(url, data) {
  const error = ref(null);
  const response = ref(null);

  const { proxy } = getCurrentInstance();
  proxy.$_POST(url, data).then((res) => {
    if (res.status === 1) {
      response.value = res.data;
    } else {
      error.value = res;
    }
  });

  return {
    error,
    response,
  };
}
