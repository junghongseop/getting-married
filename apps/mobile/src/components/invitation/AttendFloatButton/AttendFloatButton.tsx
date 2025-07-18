import { color } from '@merried/design-system';
import { Text } from '@merried/ui';
import { flex } from '@merried/utils';
import { useOverlay } from '@toss/use-overlay';
import styled from 'styled-components';
import AttendBottomSheet from '../AttendBottomSheet/AttendBottomSheet';

interface AttendFloatButtonProps {
  pointColor: string;
  id: string;
}

const AttendFloatButton = ({ pointColor, id }: AttendFloatButtonProps) => {
  const overlay = useOverlay();

  const handleOpenBottomSheet = () => {
    overlay.open(({ isOpen, close }) => (
      <AttendBottomSheet isOpen={isOpen} onClose={close} pointColor={pointColor} id={id} />
    ));
  };

  return (
    <StyledAttendFloatButton onClick={handleOpenBottomSheet}>
      <ActionButton $pointColor={pointColor}>
        <Text fontType="Button3" color={color.G900}>
          참석 의사 전달하기
        </Text>
      </ActionButton>
    </StyledAttendFloatButton>
  );
};

export default AttendFloatButton;

const StyledAttendFloatButton = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  border-radius: 28px;
  z-index: 10;
`;

const ActionButton = styled.div<{ $pointColor: string }>`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  height: 42px;
  box-shadow:
    -2px 0px 6px 0px rgba(200, 200, 200, 0.25),
    3px 3px 6px 0px rgba(200, 200, 200, 0.25);
  background-color: ${(p) => p.$pointColor};
  padding: 14px 24px;
  border-radius: 999px;
`;
