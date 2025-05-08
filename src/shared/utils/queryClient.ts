import { QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Отключаем рефетч при смене фокуса окна
      refetchOnWindowFocus: false,
      // Отключаем рефетч при восстановлении соединения
      refetchOnReconnect: false,
      // Отключаем рефетч по таймерам (если это необходимо)
      refetchInterval: false,
    },
  },
});

export default queryClient;
