import type {IFilterItem} from "@/page-modules/filters/model/types";

export function useUpdate() {
  // region DATA
  const isModalVisible = ref(false)
  const value = ref<IFilterItem>({
    id: 0,
    name: ''
  })
  // endregion

  function onOpenModal(e: IFilterItem) {
    value.value = {...e}
    isModalVisible.value = true
  }

  return {
    isModalVisible,
    value,
    onOpenModal
  }
}
