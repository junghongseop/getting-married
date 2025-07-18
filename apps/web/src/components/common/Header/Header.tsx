import { styled } from 'styled-components';
import { flex } from '@merried/utils';
import { color } from '@merried/design-system';
import Image from 'next/image';
import { DesktopButton, Row } from '@merried/ui';
import { useOverlay } from '@toss/use-overlay';
import LoginModal from '../LoginModal';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constant';
import { useUsers } from '@/services/user/queries';
import { useBooleanState, useOutsideClick } from '@merried/hooks';
import ProfileInfo from '../ProfileInfo';
import { useCreateCardMutation, usePutCardMutation } from '@/services/form/mutations';
import { usePostCardParams } from './header.hook';
import { useCallback } from 'react';

const Header = () => {
  const overlay = useOverlay();
  const router = useRouter();
  const pathname = usePathname();

  const isFormPage = pathname?.startsWith('/form');

  const profileDropdown = useBooleanState(false);
  const profileRef = useOutsideClick(profileDropdown.setFalse);

  const { createCardMutate } = useCreateCardMutation();
  const { putCardMutate } = usePutCardMutation();
  const buildPostCardParams = usePostCardParams();

  const handleOverlayLoginModal = () => {
    overlay.open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />);
  };

  const handleMoveLibrary = () => {
    router.push(ROUTES.LIBRARY);
  };

  const handleMoveMain = () => {
    router.push(ROUTES.MAIN);
  };

  const handleSaveForm = useCallback(async () => {
    const param = await buildPostCardParams();

    if ('id' in param) {
      putCardMutate(param);
      console.log('수정 작동');
    } else {
      createCardMutate(param);
      console.log('생성 작동');
    }
  }, [buildPostCardParams, createCardMutate, putCardMutate]);

  const { data: userData } = useUsers();

  return (
    <StyledHeader>
      <Image
        src="/LogoFull.svg"
        style={{ cursor: 'pointer' }}
        width={64}
        height={64}
        alt="logo"
        onClick={() => {
          router.push(ROUTES.MAIN);
        }}
      />
      <Row gap={32}>
        {userData ? (
          <>
            <Row gap={8}>
              <DesktopButton
                width={146}
                styleType="SECOND"
                size="SMALL"
                onClick={handleMoveLibrary}
              >
                저장된 청접장
              </DesktopButton>
              {isFormPage ? (
                <DesktopButton
                  width={117}
                  styleType="DEFAULT"
                  size="SMALL"
                  onClick={handleSaveForm}
                >
                  저장하기
                </DesktopButton>
              ) : (
                <DesktopButton
                  width={133}
                  styleType="DEFAULT"
                  size="SMALL"
                  onClick={handleMoveMain}
                >
                  청접장 제작
                </DesktopButton>
              )}
            </Row>
            <div ref={profileRef}>
              <Image
                src={userData.profileImg}
                width={46}
                height={46}
                alt="profile"
                style={{
                  borderRadius: '99px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onClick={profileDropdown.toggle}
              />
              {profileDropdown.value && (
                <ProfileInfoWrapper>
                  <ProfileInfo
                    nickname={userData.nickname}
                    email={userData.email}
                    provider={userData.provider}
                  />
                </ProfileInfoWrapper>
              )}
            </div>
          </>
        ) : (
          <DesktopButton
            styleType="SECOND"
            size="SMALL"
            onClick={handleOverlayLoginModal}
          >
            로그인
          </DesktopButton>
        )}
      </Row>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  padding: 8px 120px;
  border-bottom: 1px solid ${color.G30};
  background: ${color.G0};
  z-index: 1000;
`;

const ProfileInfoWrapper = styled.div`
  position: absolute;
  top: 66px;
  right: 120px;
  z-index: 1010;
`;
