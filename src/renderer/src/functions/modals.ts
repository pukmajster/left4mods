import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton'
import PickCollectionModal from '../components/modals/PickCollectionModal.svelte'

type PickCollectionCallback = (collectionName: string) => void

export function pickCollection(callback: PickCollectionCallback): void {
  const modalComponent: ModalComponent = {
    ref: PickCollectionModal,
    props: { background: 'bg-red-500' },
    // Provide default slot content as a template literal
    slot: '<p>aw</p>'
  }
  const d: ModalSettings = {
    type: 'component',
    title: 'Pick a collection',
    component: modalComponent,
    response: callback
  }
  modalStore.trigger(d)
}
