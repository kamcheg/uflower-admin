export function useCreate() {
  const isModalVisible = ref(false)
  const value = ref('')

  function onOpenModal() {
    isModalVisible.value = true
  }

  return {
    isModalVisible,
    value,
    onOpenModal
  }
}
