import {
  drawerStore,
  modalStore,
  type ModalComponent,
  type ModalSettings
} from '@skeletonlabs/skeleton'
import type { ModId } from 'shared'
import PickCollectionModal from '../components/modals/PickCollectionModal.svelte'
import VpkExtractorModal from '../components/modals/VpkExtractorModal.svelte'
import { modIdToExtractFrom } from '../stores/drawers'

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

export function openVpkExtractionModal(modId: ModId): void {
  modIdToExtractFrom.set(modId)
  drawerStore.close()

  const modalComponent: ModalComponent = {
    ref: VpkExtractorModal,
    props: { background: 'bg-red-500' },
    // Provide default slot content as a template literal
    slot: '<p>aw</p>'
  }
  const d: ModalSettings = {
    type: 'component',
    title: 'Extract vpk',
    component: modalComponent
  }
  modalStore.trigger(d)
}
