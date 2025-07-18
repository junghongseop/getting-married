import { color } from '@merried/design-system';
import {
  IconCamera,
  IconEditPencil,
  IconMail,
  IconShare,
  IconTrash,
} from '@merried/icon';
import { Column, Row, Text } from '@merried/ui';
import { flex } from '@merried/utils';
import { styled } from 'styled-components';
import DeleteModal from '../DeleteModal';
import { useOverlay } from '@toss/use-overlay';
import GuestSnapModal from '../GuestSnapModal';
import PreviewModal from '../PreviewModal';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constant';
import { useApplyCardParams } from './Invitation.hook';
import { useCardsQuery } from '@/services/form/queries';

interface Props {
  id: string;
  title: string;
  templateId: string;
  picture: string;
  updateAt: string;
}

const InvitationItem = ({ id, title, templateId, picture, updateAt }: Props) => {
  const overlay = useOverlay();
  const router = useRouter();

  const { applyParams } = useApplyCardParams(id);
  const { data } = useCardsQuery(id);

  const handleOverlayDeleteModal = () => {
    overlay.open(({ isOpen, close }) => (
      <DeleteModal id={id} isOpen={isOpen} onClose={close} />
    ));
  };
  const handleGuestSnapButtonClick = () => {
    overlay.open(({ isOpen, close }) => (
      <GuestSnapModal id={id} isOpen={isOpen} onClose={close} />
    ));
  };

  const handleEditButtonClick = () => {
    if (!data) return;
    router.push(`${ROUTES.FORM}/${templateId}`);
    applyParams(data);
  };

  const handleMailClick = () => {
    if (!data) return;
    overlay.open(({ isOpen, close }) => (
      <PreviewModal data={data} isOpen={isOpen} onClose={close} />
    ));
  };

  const handleShareClick = () => {
    // URL 복사 로직
  };

  return (
    <StyledInvitationItem>
      <InvitationImage imageUrl={picture || `/templateFull${templateId}.png`} />
      <InvitationInfo>
        <Row width="100%" justifyContent="space-between" alignItems="center">
          <Column gap={4} alignItems="flex-start">
            <Text fontType="H3" color={color.G900}>
              {title}
            </Text>
            <Text fontType="P2" color={color.G100}>
              {updateAt}
            </Text>
          </Column>
          <Row gap={18} alignItems="center">
            <IconCamera
              style={{ cursor: 'pointer' }}
              onClick={handleGuestSnapButtonClick}
            />
            <IconEditPencil
              style={{ cursor: 'pointer' }}
              onClick={handleEditButtonClick}
            />
            <IconTrash style={{ cursor: 'pointer' }} onClick={handleOverlayDeleteModal} />
          </Row>
        </Row>
        <Column gap={12}>
          <ClickableRow onClick={handleMailClick}>
            <IconMail />
            <Text fontType="P3" color={color.G80}>
              청접장 확인
            </Text>
          </ClickableRow>
          <ClickableRow onClick={handleShareClick}>
            <IconShare />
            <Text fontType="P3" color={color.G80}>
              URL 복사
            </Text>
          </ClickableRow>
        </Column>
      </InvitationInfo>
    </StyledInvitationItem>
  );
};

export default InvitationItem;

const StyledInvitationItem = styled.div`
  ${flex({ alignItems: 'center' })}
  align-content: 'center';
  width: 588px;
  height: 276px;
  padding: 14px;
  gap: 16px;

  border-radius: 12px;
  background: ${color.G0};
`;

const InvitationImage = styled.div<{ imageUrl: string }>`
  background-image: ${({ imageUrl }) => `url("${imageUrl}")`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 115px;
  height: 248px;
  border-radius: 8px;
  border: 1px solid ${color.G30};
`;

const InvitationInfo = styled.div`
  ${flex({
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  })}
  width: 100%;
  height: 214px;
  flex: 1 0 0;
`;

const ClickableRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;
