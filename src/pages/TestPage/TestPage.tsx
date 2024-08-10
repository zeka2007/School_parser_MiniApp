import { Button, Modal, Placeholder } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import type { FC } from 'react';



export const TestPage: FC = () => {

  return (
    <Modal
    header={<ModalHeader>Only iOS header</ModalHeader>}
    trigger={<Button size="m">Open modal</Button>}
  >
      <Placeholder
        description="Description"
        header="Title"
      >
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{
            display: 'block',
            height: '144px',
            width: '144px'
          }}
        />
      </Placeholder>
  </Modal>
  );
};
