import { Root } from './Root'
import { Portal } from './Portal'
import { Trigger } from './Trigger'
import { Overlay } from './Overlay'
import { Content } from './Content'
import { Title } from './Title'
import { Description } from './Description'
import { Close } from './Close'

export { Root, Portal, Trigger, Overlay, Content, Title, Description, Close }

// import * as Dialog from '@radix-ui/react-dialog'
// import { Divider } from '../Divider'

// export function ConfirmDialog() {
//   return (
//     <>
//       <Dialog.Root>
//         <Dialog.Trigger asChild>
//           <button className="">Edit profile</button>
//         </Dialog.Trigger>
//         <Dialog.Portal>
//           <Dialog.Overlay className="fixed inset-0 z-[3] bg-dark-900 opacity-70" />
//           <Dialog.Content className="fixed left-1/2 top-1/2 z-[4] flex -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded bg-dark-400 shadow">
//             <div className="flex flex-col items-center gap-5 p-10">
//               <Dialog.Title className="text-sm text-white">
//                 Confirmar voto em
//               </Dialog.Title>
//               <Dialog.Description className="text-xl font-bold text-white">
//                 Ricardo Zamboni
//               </Dialog.Description>
//               <Dialog.Description className="text-center text-sm text-white">
//                 para categoria de
//                 <br /> Melhor caixa
//               </Dialog.Description>
//             </div>
//             <div className="w-full">
//               <Divider />
//               <div className="flex">
//                 <Dialog.Close asChild>
//                   <button className="flex flex-1 justify-center px-8 py-5 text-xs text-white">
//                     Cancelar
//                   </button>
//                 </Dialog.Close>
//                 <Divider orientation="vertical" className="h-auto w-px" />
//                 <Dialog.Close asChild>
//                   <button className="flex flex-1 justify-center bg-green-700 px-8 py-5 text-xs text-white">
//                     Votar
//                   </button>
//                 </Dialog.Close>
//               </div>
//             </div>
//           </Dialog.Content>
//         </Dialog.Portal>
//       </Dialog.Root>
//     </>
//   )
// }
